package com.datn.module_management_product.repository;

import com.datn.module_management_product.entity.Category;
import com.datn.module_management_product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "Select p from Product p")
    Page<Product> findAllByPage(Pageable pageable);
}
