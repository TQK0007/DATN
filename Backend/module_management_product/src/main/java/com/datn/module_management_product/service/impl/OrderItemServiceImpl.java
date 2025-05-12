package com.datn.module_management_product.service.impl;

import com.datn.module_management_product.dto.OrderItemDTO.OrderItemResponseDTO;
import com.datn.module_management_product.entity.OrderItem;
import com.datn.module_management_product.mapper.OrderItemMapper;
import com.datn.module_management_product.repository.OrderItemRepository;
import com.datn.module_management_product.service.IOrderItemService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements IOrderItemService {

    private final OrderItemRepository orderItemRepository;

    @Value("${pagesize}")
    private  int PAGE_SIZE;

    @Override
    public List<OrderItem> findAll() {
        return orderItemRepository.findAll();
    }

    @Override
    public OrderItem save(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public OrderItem update(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public void delete(OrderItem orderItem) {
        orderItemRepository.delete(orderItem);
    }

    @Override
    public OrderItem findById(int id) {
        return orderItemRepository.findById(id).orElseThrow(()->new EntityNotFoundException("OrderItem with id " + id + " not found"));
    }

    @Override
    public int getTotalPages() {
        return (int) Math.ceil((double) orderItemRepository.count() / PAGE_SIZE);
    }

    @Override
    public Iterable<OrderItemResponseDTO> findAllByPage(int page) {
        Page<OrderItem> orderItemPage = orderItemRepository.findAllByPage(PageRequest.of(page-1,PAGE_SIZE));
        List<OrderItemResponseDTO> orderItemResponseDTOS = orderItemPage.get().map(o-> OrderItemMapper.MapOrderItemToOrderItemResponseDTO(o)).collect(Collectors.toList());
        return orderItemResponseDTOS;
    }

    @Override
    public Iterable<OrderItem> saveAll(Iterable<OrderItem> orderItems) {
        return orderItemRepository.saveAll(orderItems);
    }
}
