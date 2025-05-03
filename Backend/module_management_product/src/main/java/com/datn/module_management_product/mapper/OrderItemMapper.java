package com.datn.module_management_product.mapper;

import com.datn.module_management_product.dto.OrderDTO.OrderCreateUpdateDTO;
import com.datn.module_management_product.dto.OrderDTO.OrderResponseDTO;
import com.datn.module_management_product.dto.OrderItemDTO.OrderItemCreateUpdateDTO;
import com.datn.module_management_product.dto.OrderItemDTO.OrderItemResponseDTO;
import com.datn.module_management_product.entity.Order;
import com.datn.module_management_product.entity.OrderItem;
import com.datn.module_management_product.entity.Product;

public class OrderItemMapper {

    public static OrderItemResponseDTO MapOrderItemToOrderItemResponseDTO(OrderItem orderItem) {
        OrderItemResponseDTO orderItemResponseDTO = new OrderItemResponseDTO(
                orderItem.getId(),
                orderItem.getQuality(),
                orderItem.getImage(),
                orderItem.getSize(),
                orderItem.getColor()
        );
        return orderItemResponseDTO;
    }

    public static OrderItem MapOrderItemCreateUpdateDTOToOrderItem(OrderItemCreateUpdateDTO orderItemCreateUpdateDTO, Order order, Product product) {
        OrderItem orderItem = new OrderItem();
        orderItem.setQuality(orderItemCreateUpdateDTO.getQuality());
        orderItem.setImage(orderItemCreateUpdateDTO.getImage());
        orderItem.setSize(orderItemCreateUpdateDTO.getSize());
        orderItem.setColor(orderItemCreateUpdateDTO.getColor());
        orderItem.setPrice(orderItemCreateUpdateDTO.getPrice());
        orderItem.setOrder(order);
        orderItem.setProduct(product);
        return orderItem;
    }

}
