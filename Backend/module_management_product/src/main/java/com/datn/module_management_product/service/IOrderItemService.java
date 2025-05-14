package com.datn.module_management_product.service;

import com.datn.module_management_product.dto.CategoryDTO.CategoryResponseDTO;
import com.datn.module_management_product.dto.OrderItemDTO.OrderItemResponseDTO;
import com.datn.module_management_product.entity.Order;
import com.datn.module_management_product.entity.OrderItem;
import com.datn.module_management_product.entity.ProductAttribute;

import java.util.List;

public interface IOrderItemService extends IBaseService<OrderItem>{
    Iterable<OrderItemResponseDTO> findAllByPage(int page);

    Iterable<OrderItem> saveAll(Iterable<OrderItem> orderItems);

    List<OrderItem> findAllByOrder(Order order);

}
