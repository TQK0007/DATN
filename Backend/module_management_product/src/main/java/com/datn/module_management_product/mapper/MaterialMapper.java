package com.datn.module_management_product.mapper;

import com.datn.module_management_product.dto.MaterialDTO.MaterialCreateUpdateDTO;
import com.datn.module_management_product.dto.MaterialDTO.MaterialResponseDTO;
import com.datn.module_management_product.entity.Material;

public class MaterialMapper {
    public static MaterialResponseDTO MapMaterialToMaterialResponseDTO(Material material)
    {
        MaterialResponseDTO materialResponseDTO = new MaterialResponseDTO(
                material.getId(),
                material.getName(),
                material.getPrice(),
                material.getColor(),
                material.getImage()
        );
        return materialResponseDTO;
    }

    public static Material MapMaterialCreateUpdateDTOToMaterial(MaterialCreateUpdateDTO materialCreateUpdateDTO)
    {
        Material material = new Material();
        material.setName(materialCreateUpdateDTO.getName());
        material.setPrice(materialCreateUpdateDTO.getPrice());
        material.setColor(materialCreateUpdateDTO.getColor());
        material.setImage(materialCreateUpdateDTO.getImage());
        return material;
    }

    public static Material MapMaterialCreateUpdateDTOToMaterial(MaterialCreateUpdateDTO materialCreateUpdateDTO, Material material)
    {
        material.setName(materialCreateUpdateDTO.getName());
        material.setPrice(materialCreateUpdateDTO.getPrice());
        material.setColor(materialCreateUpdateDTO.getColor());
        material.setImage(materialCreateUpdateDTO.getImage());
        return material;
    }
}
