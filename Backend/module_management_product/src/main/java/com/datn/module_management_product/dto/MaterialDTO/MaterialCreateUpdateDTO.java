package com.datn.module_management_product.dto.MaterialDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MaterialCreateUpdateDTO {
    private String name;
    private double price;
    private String color;
    private String image;
    private String description;
}
