package com.datn.module_management_product.dto.FeedBackDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FeedBackCreateUpDateDTO {
    private String comment;
    private double rating;
    private int userId;
    private int productId;
}
