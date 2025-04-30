package com.datn.module_management_product.entity;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
public class BaseEntity {
    private LocalDateTime createdDate;
    private String createdBy;
    private LocalDateTime updatedAt;
    private String updatedBy;
}
