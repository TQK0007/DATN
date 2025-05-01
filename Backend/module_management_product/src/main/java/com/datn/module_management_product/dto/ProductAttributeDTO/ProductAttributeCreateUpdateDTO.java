package com.datn.module_management_product.dto.ProductAttributeDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductAttributeCreateUpdateDTO {
    private int id;
    private String image;
    private String size;
    private String color;
    private int quality;
}
