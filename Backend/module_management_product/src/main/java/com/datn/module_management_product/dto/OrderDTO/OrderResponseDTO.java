package com.datn.module_management_product.dto.OrderDTO;

public record OrderResponseDTO(int id,double totalPrice, String shippingAddress, boolean paid) {
}
