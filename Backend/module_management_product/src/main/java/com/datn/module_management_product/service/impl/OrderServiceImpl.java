package com.datn.module_management_product.service.impl;

import com.datn.module_management_product.dto.OrderDTO.OrderResponseDTO;
import com.datn.module_management_product.entity.Order;
import com.datn.module_management_product.mapper.OrderMapper;
import com.datn.module_management_product.repository.OrderRepository;
import com.datn.module_management_product.service.IOrderService;
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
public class OrderServiceImpl implements IOrderService {

    private final OrderRepository orderRepository;
    @Value("${pagesize}")
    private  int PAGE_SIZE;

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order update(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public void delete(Order order) {
        orderRepository.delete(order);
    }

    @Override
    public Order findById(int id) {
        return orderRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Order with id " + id + " not found"));
    }

    @Override
    public int getTotalPages() {
        return (int) Math.ceil((double) orderRepository.count() / PAGE_SIZE);
    }

    @Override
    public Iterable<OrderResponseDTO> findAllByPage(int page) {
        Page<Order> orderPage = orderRepository.findAllByPage(PageRequest.of(page-1,PAGE_SIZE));
        List<OrderResponseDTO> orderResponseDTOS = orderPage.get().map(o-> OrderMapper.MapOrderToOrderResponseDTO(o)).collect(Collectors.toList());
        return orderResponseDTOS;
    }
}
