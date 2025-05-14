package com.datn.module_management_product.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @CreatedDate
    @JsonIgnore
    @Column(updatable = false)
    private LocalDateTime createAt;

    @CreatedBy
    @JsonIgnore
    @Column(updatable = false)
    private String createBy;

    @LastModifiedDate
    @JsonIgnore
    @Column(insertable = false)
    private LocalDateTime updateAt;

    @LastModifiedBy
    @JsonIgnore
    @Column(insertable = false)
    private String updateBy;
}
