package com.datn.module_management_product.service;

import com.datn.module_management_product.dto.CategoryDTO.CategoryResponseDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductResponseDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductResponseDetailDTO;
import com.datn.module_management_product.entity.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IProductService extends IBaseService<Product> {
    Iterable<ProductResponseDTO> findAllByPage(int page);
    List<ProductResponseDetailDTO> findByName(String name, int page);

    Page<Product> getProductsByFilters(int page, String gender, String collection,
                                       Double minPrice, Double maxPrice, String search);


    // them chuc nang loc
    public Page<ProductResponseDTO> findFilteredProducts(
            String gender, String collection, Double minPrice, Double maxPrice, String search,
            int page, String sortType);

}
