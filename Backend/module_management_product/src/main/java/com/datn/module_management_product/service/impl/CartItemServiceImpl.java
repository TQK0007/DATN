package com.datn.module_management_product.service.impl;

import com.datn.module_management_product.entity.Cart;
import com.datn.module_management_product.entity.CartItem;
import com.datn.module_management_product.repository.CartItemRepository;
import com.datn.module_management_product.service.ICartItemService;
import com.datn.module_management_product.service.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements ICartItemService {

    private final CartItemRepository cartItemRepository;

    @Override
    public List<CartItem> findAll() {
        return cartItemRepository.findAll();
    }

    @Override
    public CartItem save(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem update(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    @Override
    public void delete(CartItem cartItem) {
        cartItemRepository.delete(cartItem);
    }

    @Override
    public CartItem findById(int id) {
        return cartItemRepository.findById(id).get();
    }

    @Override
    public int getTotalPages() {
        return 0;
    }
}
