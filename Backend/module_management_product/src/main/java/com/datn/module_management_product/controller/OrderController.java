package com.datn.module_management_product.controller;

import com.datn.module_management_product.dto.OrderDTO.OrderCreateUpdateDTO;
import com.datn.module_management_product.dto.OrderDTO.OrderResponseDTO;
import com.datn.module_management_product.dto.OrderDTO.OrderResponseDetailDTO;
import com.datn.module_management_product.dto.OrderItemDTO.OrderItemCreateUpdateDTO;
import com.datn.module_management_product.entity.Order;
import com.datn.module_management_product.entity.OrderItem;
import com.datn.module_management_product.entity.Product;
import com.datn.module_management_product.entity.ProductAttribute;
import com.datn.module_management_product.mapper.OrderItemMapper;
import com.datn.module_management_product.mapper.OrderMapper;
import com.datn.module_management_product.service.IOrderItemService;
import com.datn.module_management_product.service.IOrderService;
import com.datn.module_management_product.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService orderService;
    private final IOrderItemService orderItemService;
    private final IProductService productService;
    @GetMapping("/getByPage")
    public Iterable<OrderResponseDTO> getByPage(@RequestParam(name = "page", defaultValue = "1") int page)
    {
        return orderService.findAllByPage(page);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewOrder(@RequestBody OrderCreateUpdateDTO orderCreateUpdateDTO,
                                                    @RequestHeader(name = "Authorization") String jwtToken)
    {
        int userId = orderService.getUserIdFromToken(jwtToken);

        // kiem tra so luong order co lon hon trong kho,va cap nhat;
        for(int i=0;i<orderCreateUpdateDTO.getOrderItems().size();i++)
        {
            Product product = productService.findById(orderCreateUpdateDTO.getOrderItems().get(i).getProductId());
            OrderItemCreateUpdateDTO o = orderCreateUpdateDTO.getOrderItems().get(i);
            List<ProductAttribute> productAttributes = product.getProductAttributes().stream()
                    .filter(pa->pa.getSize().equals(o.getSize())
                    && pa.getColor().equals(o.getColor()))
                    .toList();
            if(productAttributes.size() == 0 ) throw new RuntimeException("Khong tim thay thong tin san pham");
            else
            {
                if(productAttributes.get(0).getQuality() < o.getQuality()) throw new RuntimeException("Khong du so luong san pham");
                else
                {
                    productAttributes.forEach(pa->pa.setQuality(pa.getQuality()-o.getQuality()));
                }
            }
        }

        Order newOrder = OrderMapper.MapOrderCreateUpdateDTOToOrder(orderCreateUpdateDTO, userId);
        Order orderAdded = orderService.save(newOrder);
        List<OrderItem> orderItems = orderCreateUpdateDTO.getOrderItems().stream().map(oi ->
                OrderItemMapper.MapOrderItemCreateUpdateDTOToOrderItem(oi, orderAdded, productService.findById(oi.getProductId()))).collect(Collectors.toList());

        orderItemService.saveAll(orderItems);
        if(orderAdded.getId()>0) return ResponseEntity.ok("Thêm thành công");
        return ResponseEntity.badRequest().body("Thêm thất bại");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCategory(@RequestBody OrderCreateUpdateDTO orderCreateUpdateDTO,
                                                 @PathVariable(name = "id") int id,
                                                 @RequestHeader(name = "Authorization") String jwtToken)
    {
        int userId = orderService.getUserIdFromToken(jwtToken);

        // kiem tra so luong order co lon hon trong kho,va cap nhat;
        for(int i=0;i<orderCreateUpdateDTO.getOrderItems().size();i++)
        {
            Product product = productService.findById(orderCreateUpdateDTO.getOrderItems().get(i).getProductId());
            OrderItemCreateUpdateDTO o = orderCreateUpdateDTO.getOrderItems().get(i);
            List<ProductAttribute> productAttributes = product.getProductAttributes().stream()
                    .filter(pa->pa.getSize().equals(o.getSize())
                            && pa.getColor().equals(o.getColor()))
                    .toList();
            if(productAttributes.size() == 0 ) throw new RuntimeException("Khong tim thay thong tin san pham");
            else
            {
                if(productAttributes.get(0).getQuality() < o.getQuality()) throw new RuntimeException("Khong du so luong san pham");
                else
                {
                    productAttributes.forEach(pa->pa.setQuality(pa.getQuality()-o.getQuality()));
                }
            }
        }

        Order order = orderService.findById(id);
        Order updateOrder = OrderMapper.MapOrderCreateUpdateDTOToOrder(orderCreateUpdateDTO, userId, order);
        Order orderUpdated = orderService.update(updateOrder);

        //cap nhat danh sach order item
        List<OrderItem> orderItemsByOrder = orderItemService.findAllByOrder(updateOrder);
        List<OrderItemCreateUpdateDTO> orderItemCreateUpdateDTOS = orderCreateUpdateDTO.getOrderItems();
        List<OrderItem> updateOrderItem = OrderItemMapper.MapOrderItemCreateUpdateDTOToOrderItem(orderItemCreateUpdateDTOS, orderItemsByOrder);
        orderItemService.saveAll(updateOrderItem);
        if(orderUpdated.getId()>0) return ResponseEntity.ok("Cập nhật thành công");
        return ResponseEntity.badRequest().body("Cập nhật thất bại");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable(name = "id") int id)
    {
        Order deleteOrder = orderService.findById(id);
        orderService.delete(deleteOrder);
        return ResponseEntity.ok("Xoá thành công");
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<OrderResponseDetailDTO> findById(@PathVariable(name = "id") int id)
    {
        Order order = orderService.findById(id);
        OrderResponseDetailDTO orderResponseDetailDTO = OrderMapper.MapOrderToOrderResponseDetailDTO(order);
        return ResponseEntity.ok(orderResponseDetailDTO);
    }

    @GetMapping("/user-orders/{userId}")
    public ResponseEntity<List<OrderResponseDTO>> findAllByUserId(@PathVariable(name = "userId") int userId)
    {
        List<OrderResponseDTO> orderResponseDTOS = orderService.findAllByUserId(userId);
        return ResponseEntity.ok(orderResponseDTOS);
    }

    @GetMapping("/getTotalOrderAndPage")
    public ResponseEntity<Map<String, Integer>> getTotalOrderAndPage() {
        int count = orderService.findAll().size();
        int page = orderService.getTotalPages();
        Map<String, Integer> result = Map.of("count", count, "page", page);
        return ResponseEntity.ok(result);
    }

}
