package com.datn.module_management_product.dto.OrderItemDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemCreateUpdateDTO {
    private int quality;
    private String image;
    private String size;
    private String color;
    private double price;
    private int productId;
}
