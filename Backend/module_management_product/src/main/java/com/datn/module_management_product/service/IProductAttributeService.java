package com.datn.module_management_product.service;

import com.datn.module_management_product.dto.CategoryDTO.CategoryResponseDTO;
import com.datn.module_management_product.dto.ProductAttributeDTO.ProductAttributeResponseDTO;
import com.datn.module_management_product.entity.Product;
import com.datn.module_management_product.entity.ProductAttribute;

import java.util.List;

public interface IProductAttributeService extends IBaseService<ProductAttribute>{
    Iterable<ProductAttributeResponseDTO> findAllByPage(int page);

    Iterable<ProductAttribute> saveAll(Iterable<ProductAttribute> productAttributes);

    List<ProductAttribute> findAllByProduct(Product product);

}
