package com.datn.module_management_product.service.impl;

import com.datn.module_management_product.dto.ProductDTO.ProductResponseDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductResponseDetailDTO;
import com.datn.module_management_product.entity.Product;
import com.datn.module_management_product.mapper.ProductMapper;
import com.datn.module_management_product.repository.ProductRepository;
import com.datn.module_management_product.service.IProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;
    @Value("${pagesize}")
    private  int PAGE_SIZE;

    @Override
    public List<Product> findAll() {
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
    public int getTotalPages() {
        return (int) Math.ceil((double) productRepository.count() / PAGE_SIZE);
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

    @Override
    public Page<Product> getProductsByFilters(int page, String gender, String collection, Double minPrice, Double maxPrice, String search) {
        Pageable pageable = PageRequest.of(page - 1, PAGE_SIZE);

        return productRepository.findByFilters(
                gender, collection, minPrice, maxPrice, search,
                pageable
        );
    }

    @Override
    public Page<ProductResponseDTO> findFilteredProducts(String gender, String collection, Double minPrice, Double maxPrice, String search, int page, String sortType) {
        Pageable pageable;

        if ("bestSelling".equals(sortType)) {
            // Sử dụng native query riêng
            Page<Product> productPage = productRepository.findBestSellingProducts(
                    gender, collection, minPrice, maxPrice, search,
                    PageRequest.of(page-1, PAGE_SIZE)
            );
            return productPage.map(ProductMapper::MapProductToProductResponseDTO);
        }

        // Các sort còn lại
        Sort sort = switch (sortType) {
            case "newest" -> Sort.by(Sort.Direction.DESC, "createAt");
            case "priceLowToHigh" -> Sort.by(Sort.Direction.ASC, "price");
            case "priceHighToLow" -> Sort.by(Sort.Direction.DESC, "price");
            default -> Sort.unsorted();
        };

        pageable = PageRequest.of(page-1, PAGE_SIZE, sort);
        Page<Product> productPage = productRepository.findByFilters(
                gender, collection, minPrice, maxPrice, search, pageable
        );
        return productPage.map(ProductMapper::MapProductToProductResponseDTO);
    }
}
