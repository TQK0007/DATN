package com.datn.module_management_product.dto.ProductDTO;

import com.datn.module_management_product.dto.ProductAttributeDTO.ProductAttributeResponseDTO;

import java.util.List;

public record ProductResponseDetailDTO(int id, double price, int discount, String name, String description,
                                       List<ProductAttributeResponseDTO> productAttributes, String categoryName) {
}
