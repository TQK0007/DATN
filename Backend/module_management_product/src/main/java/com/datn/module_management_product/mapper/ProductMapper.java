package com.datn.module_management_product.mapper;

import com.datn.module_management_product.dto.ProductAttributeDTO.ProductAttributeResponseDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductCreateUpdateDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductResponseDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductResponseDetailDTO;
import com.datn.module_management_product.entity.Category;
import com.datn.module_management_product.entity.Product;

import java.util.List;
import java.util.stream.Collectors;

public class ProductMapper {
    public static ProductResponseDTO MapProductToProductResponseDTO(Product product)
    {
        ProductResponseDTO p = new ProductResponseDTO(
                product.getId(),
                product.getPrice(),
                product.getDiscount(),
                product.getName(),
                product.getDescription(),
                product.getCategory().getName(),
                product.getCategory().getId()
        );
        return p;
    }

    public static ProductResponseDetailDTO MapProductToProductResponseDetailDTO(Product product)
    {
        List<ProductAttributeResponseDTO> productAttributes = product.getProductAttributes().stream()
                .map(p->ProductAttributeMapper.MapProductAttributeToProductAttributeResponseDTO(p)).collect(Collectors.toList());
        ProductResponseDetailDTO p = new ProductResponseDetailDTO(
                product.getId(),
                product.getPrice(),
                product.getDiscount(),
                product.getName(),
                product.getDescription(),
                productAttributes,
                product.getCategory().getName(),
                product.getCategory().getId()
        );
        return p;
    }

    public static Product MapProductCreateUpdateDTOToProduct(ProductCreateUpdateDTO productCreateUpdateDTO, Category category)
    {
        Product p = new Product();
        p.setPrice(productCreateUpdateDTO.getPrice());
        p.setDiscount(productCreateUpdateDTO.getDiscount());
        p.setName(productCreateUpdateDTO.getName());
        p.setDescription(productCreateUpdateDTO.getDescription());
        p.setCategory(category);
        return  p;
    }

    public static Product MapProductCreateUpdateDTOToProduct(ProductCreateUpdateDTO productCreateUpdateDTO, Product p, Category category)
    {
        p.setPrice(productCreateUpdateDTO.getPrice());
        p.setDiscount(productCreateUpdateDTO.getDiscount());
        p.setName(productCreateUpdateDTO.getName());
        p.setDescription(productCreateUpdateDTO.getDescription());
        p.setCategory(category);
        return  p;
    }
}
