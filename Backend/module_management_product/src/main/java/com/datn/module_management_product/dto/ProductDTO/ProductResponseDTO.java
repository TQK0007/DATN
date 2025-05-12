package com.datn.module_management_product.dto.ProductDTO;

import com.datn.module_management_product.dto.ProductAttributeDTO.ProductAttributeResponseDTO;

import java.util.List;

public record ProductResponseDTO(int id, double price, int discount, String name, String description, String categoryName, int categoryId ) {
}
