package com.datn.module_management_product.dto.OrderDTO;

public record OrderResponseDTO(double totalPrice, String shippingAddress, boolean isPaid) {
}
