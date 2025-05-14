package com.datn.module_management_product.repository;

import com.datn.module_management_product.entity.Order;
import com.datn.module_management_product.entity.OrderItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    @Query(value = "Select oi from OrderItem oi")
    Page<OrderItem> findAllByPage(Pageable pageable);

    List<OrderItem> findByOrder(Order order);
}
