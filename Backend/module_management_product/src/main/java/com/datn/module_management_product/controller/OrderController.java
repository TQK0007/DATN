package com.datn.module_management_product.controller;

import com.datn.module_management_product.dto.OrderDTO.OrderCreateUpdateDTO;
import com.datn.module_management_product.dto.OrderDTO.OrderResponseDTO;
import com.datn.module_management_product.dto.OrderItemDTO.OrderItemCreateUpdateDTO;
import com.datn.module_management_product.entity.Order;
import com.datn.module_management_product.entity.OrderItem;
import com.datn.module_management_product.mapper.OrderItemMapper;
import com.datn.module_management_product.mapper.OrderMapper;
import com.datn.module_management_product.service.IOrderItemService;
import com.datn.module_management_product.service.IOrderService;
import com.datn.module_management_product.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
}
