package com.datn.module_management_product.dto.CartItemDTO;

public record CartItemResponseDTO(int id, int quality, String image, String size, String color, double price, String name, int productId) {
}
