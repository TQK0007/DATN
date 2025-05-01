package com.datn.module_management_product.dto.ProductDTO;

import com.datn.module_management_product.dto.ProductAttributeDTO.ProductAttributeCreateUpdateDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateUpdateDTO {
    private double price;
    private int discount;
    private String name;
    private String description;
    private String categoryName;
    private List<ProductAttributeCreateUpdateDTO> productAttributes;
}
