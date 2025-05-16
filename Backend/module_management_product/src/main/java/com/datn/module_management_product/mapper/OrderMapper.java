package com.datn.module_management_product.mapper;

import com.datn.module_management_product.dto.OrderDTO.OrderCreateUpdateDTO;
import com.datn.module_management_product.dto.OrderDTO.OrderDashBoardDTO;
import com.datn.module_management_product.dto.OrderDTO.OrderResponseDTO;
import com.datn.module_management_product.dto.OrderDTO.OrderResponseDetailDTO;
import com.datn.module_management_product.dto.OrderItemDTO.OrderItemResponseDTO;
import com.datn.module_management_product.entity.Order;

import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderResponseDTO MapOrderToOrderResponseDTO(Order order) {
        OrderResponseDTO orderResponseDTO = new OrderResponseDTO(
          order.getId(),
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

    public static OrderDashBoardDTO MapOrderToOrderDashBoardDTO(Order order) {
        OrderDashBoardDTO orderDashBoardDTO = new OrderDashBoardDTO(
          order.getId(),
          order.getCreateAt(),
          order.getTotalPrice(),
          order.isPaid()
        );
        return orderDashBoardDTO;
    }

    public static OrderResponseDetailDTO MapOrderToOrderResponseDetailDTO(Order order) {
        List<OrderItemResponseDTO> orderItemResponseDTOs = order.getOrderItems().stream().map(OrderItemMapper::MapOrderItemToOrderItemResponseDTO).collect(Collectors.toList());
        OrderResponseDetailDTO orderResponseDetailDTO = new OrderResponseDetailDTO(
          order.getId(),
          order.getShippingAddress(),
          order.isPaid(),
          orderItemResponseDTOs
        );
        return orderResponseDetailDTO;
    }
}
