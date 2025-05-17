package com.datn.module_management_product.dto.CartDTO;

import com.datn.module_management_product.dto.CartItemDTO.CartItemResponseDTO;

import java.util.List;

public record CartResponseDTO(int id, int userId, List<CartItemResponseDTO> cartItems) {
}
