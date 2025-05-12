package com.datn.module_management_product.service.impl;

import com.datn.module_management_product.dto.ProductAttributeDTO.ProductAttributeResponseDTO;
import com.datn.module_management_product.entity.ProductAttribute;
import com.datn.module_management_product.repository.ProductAttributeRepository;
import com.datn.module_management_product.service.IProductAttributeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductAttributeServiceImpl implements IProductAttributeService {

    private final ProductAttributeRepository productAttributeRepository;

    @Value("${pagesize}")
    private  int PAGE_SIZE;
    @Override
    public List<ProductAttribute> findAll() {
        return productAttributeRepository.findAll();
    }

    @Override
    public ProductAttribute save(ProductAttribute productAttribute) {
        return productAttributeRepository.save(productAttribute);
    }

    @Override
    public ProductAttribute update(ProductAttribute productAttribute) {
        return productAttributeRepository.save(productAttribute);
    }

    @Override
    public void delete(ProductAttribute productAttribute) {
        productAttributeRepository.delete(productAttribute);
    }

    @Override
    public ProductAttribute findById(int id) {
        return productAttributeRepository.findById(id).get();
    }

    @Override
    public int getTotalPages() {
        return (int) Math.ceil((double) productAttributeRepository.count() / PAGE_SIZE);
    }

    @Override
    public Iterable<ProductAttributeResponseDTO> findAllByPage(int page) {
        return null;
    }

    @Override
    public Iterable<ProductAttribute> saveAll(Iterable<ProductAttribute> productAttributes) {
        return productAttributeRepository.saveAll(productAttributes);
    }
}
