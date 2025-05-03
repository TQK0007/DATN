package com.datn.module_management_product.repository;

import com.datn.module_management_product.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
}
