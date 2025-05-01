package com.datn.module_management_product.service;

import com.datn.module_management_product.dto.CategoryDTO.CategoryResponseDTO;
import com.datn.module_management_product.dto.MaterialDTO.MaterialResponseDTO;
import com.datn.module_management_product.entity.Material;

public interface IMaterialService extends IBaseService<Material>{
    Iterable<MaterialResponseDTO> findAllByPage(int page);
}
