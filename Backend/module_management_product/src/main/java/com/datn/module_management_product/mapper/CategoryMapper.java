package com.datn.module_management_product.mapper;

import com.datn.module_management_product.dto.CategoryDTO.CategoryCreateDTO;
import com.datn.module_management_product.dto.CategoryDTO.CategoryResponseDTO;
import com.datn.module_management_product.dto.CategoryDTO.CategoryUpdateDTO;
import com.datn.module_management_product.entity.Category;

public class CategoryMapper {
    public static CategoryResponseDTO MapCategoryToCategoryResponseDTO(Category category) {
        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO(
                category.getId(),
                category.getName(),
                category.getType(),
                category.getWage()
        );
        return categoryResponseDTO;
    }

    public static Category MapCategoryCreateDTOToCategory(CategoryCreateDTO categoryCreateDTO)
    {
        Category category = new Category();
        category.setName(categoryCreateDTO.getName());
        category.setType(categoryCreateDTO.getType());
        category.setWage(categoryCreateDTO.getWage());
        return category;
    }

    public static Category MapCategoryUpdateDTOToCategory(CategoryUpdateDTO categoryUpdateDTO, Category category)
    {
        category.setName(categoryUpdateDTO.getName());
        category.setType(categoryUpdateDTO.getType());
        category.setWage(categoryUpdateDTO.getWage());
        return category;
    }
}
