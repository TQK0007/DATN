package com.datn.module_management_product.service;

import com.datn.module_management_product.dto.CategoryDTO.CategoryResponseDTO;
import com.datn.module_management_product.dto.OrderDTO.OrderResponseDTO;
import com.datn.module_management_product.dto.OrderDTO.OrderResponseDetailDTO;
import com.datn.module_management_product.entity.Order;

import java.util.List;

public interface IOrderService extends IBaseService<Order> {
    Iterable<OrderResponseDTO> findAllByPage(int page);

    List<OrderResponseDTO> findAllByUserId(int userId);

    List<OrderResponseDetailDTO> findAllDetailByUserId(int userId);
}
