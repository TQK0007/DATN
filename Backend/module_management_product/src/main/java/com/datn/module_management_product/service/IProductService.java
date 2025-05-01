package com.datn.module_management_product.service;

import com.datn.module_management_product.dto.CategoryDTO.CategoryResponseDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductResponseDTO;
import com.datn.module_management_product.entity.Product;

public interface IProductService extends IBaseService<Product> {
    Iterable<ProductResponseDTO> findAllByPage(int page);
}
