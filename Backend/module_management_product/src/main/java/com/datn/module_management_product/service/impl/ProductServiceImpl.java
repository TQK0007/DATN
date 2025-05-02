package com.datn.module_management_product.service.impl;

import com.datn.module_management_product.dto.CategoryDTO.CategoryResponseDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductResponseDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductResponseDetailDTO;
import com.datn.module_management_product.entity.Product;
import com.datn.module_management_product.mapper.ProductMapper;
import com.datn.module_management_product.repository.ProductRepository;
import com.datn.module_management_product.service.IProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;
    @Value("${pagesize}")
    private  int PAGE_SIZE;

    @Override
    public Iterable<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product update(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void delete(Product product) {
        productRepository.delete(product);
    }

    @Override
    public Product findById(int id) {
        return productRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Product with id " + id + " not found"));
    }

    @Override
    public Iterable<ProductResponseDTO> findAllByPage(int page) {
        Page<Product> productPage = productRepository.findAllByPage(PageRequest.of(page-1,PAGE_SIZE));
        List<ProductResponseDTO> productResponseDTOS = productPage.get().map(p-> ProductMapper.MapProductToProductResponseDTO(p))
                .collect(Collectors.toList());
        return productResponseDTOS;
    }

    @Override
    public List<ProductResponseDetailDTO> findByName(String name, int page) {
        Page<Product> productPage = productRepository.findByName(name, PageRequest.of(page-1,PAGE_SIZE));
        List<ProductResponseDetailDTO> products = productPage.get().map(p->ProductMapper.MapProductToProductResponseDetailDTO(p)).collect(Collectors.toList());
        if(products.isEmpty()) return List.of();
        return products;
    }
}
