package com.datn.module_management_product.entity;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
public class BaseEntity {
    private LocalDateTime createAt = LocalDateTime.now();
    private String createBy = "Admin";
    private LocalDateTime updateAt = LocalDateTime.now();
    private String updateBy = "Admin";
}
