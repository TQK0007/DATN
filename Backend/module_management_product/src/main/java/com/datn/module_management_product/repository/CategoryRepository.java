package com.datn.module_management_product.repository;

import com.datn.module_management_product.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query(value = "Select c from Category c")
    Page<Category> findAllByPage(Pageable pageable);
}
