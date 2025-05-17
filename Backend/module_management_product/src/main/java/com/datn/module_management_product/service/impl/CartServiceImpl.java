package com.datn.module_management_product.service.impl;

import com.datn.module_management_product.entity.Cart;
import com.datn.module_management_product.repository.CartRepository;
import com.datn.module_management_product.service.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements ICartService {

    private final CartRepository cartRepository;

    @Override
    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    @Override
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart update(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public void delete(Cart cart) {
        cartRepository.delete(cart);
    }

    @Override
    public Cart findById(int id) {
        return cartRepository.findById(id).get();
    }

    @Override
    public int getTotalPages() {
        return 0;
    }
}
