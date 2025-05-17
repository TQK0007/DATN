package com.datn.module_management_product.mapper;

import com.datn.module_management_product.dto.OrderItemDTO.OrderItemCreateUpdateDTO;
import com.datn.module_management_product.dto.OrderItemDTO.OrderItemResponseDTO;
import com.datn.module_management_product.entity.Order;
import com.datn.module_management_product.entity.OrderItem;
import com.datn.module_management_product.entity.Product;

import java.util.ArrayList;
import java.util.List;

public class OrderItemMapper {

    public static OrderItemResponseDTO MapOrderItemToOrderItemResponseDTO(OrderItem orderItem) {
        OrderItemResponseDTO orderItemResponseDTO = new OrderItemResponseDTO(
                orderItem.getId(),
                orderItem.getQuality(),
                orderItem.getImage(),
                orderItem.getSize(),
                orderItem.getPrice(),
                orderItem.getColor(),
                orderItem.getProduct().getName(),
                orderItem.getProduct().getId()
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

    public static List<OrderItem> MapOrderItemCreateUpdateDTOToOrderItem(List<OrderItemCreateUpdateDTO> orderItemCreateUpdateDTOS, List<OrderItem> orderItems) {
       for(int i = 0; i < orderItemCreateUpdateDTOS.size(); i++) {
           orderItems.get(i).setQuality(orderItemCreateUpdateDTOS.get(i).getQuality());
           orderItems.get(i).setImage(orderItemCreateUpdateDTOS.get(i).getImage());
           orderItems.get(i).setSize(orderItemCreateUpdateDTOS.get(i).getSize());
           orderItems.get(i).setColor(orderItemCreateUpdateDTOS.get(i).getColor());
           orderItems.get(i).setPrice(orderItemCreateUpdateDTOS.get(i).getPrice());
       }
       return orderItems;
    }
}
