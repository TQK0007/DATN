package com.datn.module_management_product.repository;

import com.datn.module_management_product.entity.Product;
import com.datn.module_management_product.entity.ProductAttribute;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, Integer> {
    @Query(value = "Select p from ProductAttribute p")
    Page<ProductAttribute> findAllByPage(Pageable pageable);

    List<ProductAttribute> findByProduct(Product product);
}
