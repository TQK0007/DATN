package com.datn.module_management_product.mapper;

import com.datn.module_management_product.dto.OrderDTO.OrderCreateUpdateDTO;
import com.datn.module_management_product.dto.OrderDTO.OrderResponseDTO;
import com.datn.module_management_product.entity.Order;

public class OrderMapper {

    public static OrderResponseDTO MapOrderToOrderResponseDTO(Order order) {
        OrderResponseDTO orderResponseDTO = new OrderResponseDTO(
          order.getTotalPrice(),
          order.getShippingAddress(),
          order.isPaid()
        );
        return orderResponseDTO;
    }

    public static Order MapOrderCreateUpdateDTOToOrder(OrderCreateUpdateDTO orderCreateUpdateDTO, int userId) {
        Order order = new Order();
        double totalPrice = orderCreateUpdateDTO.getOrderItems().stream()
                .mapToDouble(oi-> oi.getPrice() * oi.getQuality())
                .sum();
        order.setUserId(userId);
        order.setTotalPrice(totalPrice);
        order.setShippingAddress(orderCreateUpdateDTO.getShippingAddress());
        order.setPaid(orderCreateUpdateDTO.isPaid());
        return order;
    }

    public static Order MapOrderCreateUpdateDTOToOrder(OrderCreateUpdateDTO orderCreateUpdateDTO, int userId, Order order) {
        double totalPrice = orderCreateUpdateDTO.getOrderItems().stream()
                .mapToDouble(oi-> oi.getPrice() * oi.getQuality())
                .sum();
        order.setUserId(userId);
        order.setTotalPrice(totalPrice);
        order.setShippingAddress(orderCreateUpdateDTO.getShippingAddress());
        order.setPaid(orderCreateUpdateDTO.isPaid());
        return order;
    }
}
