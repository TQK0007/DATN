package com.datn.module_management_product.service;

import com.datn.module_management_product.dto.CategoryDTO.CategoryResponseDTO;
import com.datn.module_management_product.entity.Category;

import java.util.Optional;

public interface ICategoryService extends IBaseService<Category>{

    Iterable<CategoryResponseDTO> findAllByPage(int page);
    Category findByName(String name);

}
