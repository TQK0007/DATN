package com.datn.module_management_product.dto.OrderDTO;

import com.datn.module_management_product.dto.OrderItemDTO.OrderItemResponseDTO;

import java.util.List;

public record OrderResponseDetailDTO(int id, String shippingAddress, boolean paid, List<OrderItemResponseDTO> orderItems) {
}
