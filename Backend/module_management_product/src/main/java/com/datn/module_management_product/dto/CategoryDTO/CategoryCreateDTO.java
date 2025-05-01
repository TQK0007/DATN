package com.datn.module_management_product.dto.CategoryDTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryCreateDTO {
    private String name;
    private String type;
    private int wage;
}
