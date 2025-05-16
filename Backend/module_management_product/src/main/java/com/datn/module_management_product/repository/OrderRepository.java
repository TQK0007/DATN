package com.datn.module_management_product.repository;

import com.datn.module_management_product.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query(value = "Select o from Order o")
    Page<Order> findAllByPage(Pageable pageable);

    List<Order> findByUserId(int userId);
}
