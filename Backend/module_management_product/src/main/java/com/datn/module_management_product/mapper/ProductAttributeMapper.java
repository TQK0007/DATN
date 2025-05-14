package com.datn.module_management_product.mapper;

import com.datn.module_management_product.dto.ProductAttributeDTO.ProductAttributeCreateUpdateDTO;
import com.datn.module_management_product.dto.ProductAttributeDTO.ProductAttributeResponseDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductCreateUpdateDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductResponseDTO;
import com.datn.module_management_product.entity.Product;
import com.datn.module_management_product.entity.ProductAttribute;

import java.util.ArrayList;
import java.util.List;

public class ProductAttributeMapper {
    public static ProductAttributeResponseDTO MapProductAttributeToProductAttributeResponseDTO(ProductAttribute productAttribute)
    {
       ProductAttributeResponseDTO p = new ProductAttributeResponseDTO(
               productAttribute.getId(),
               productAttribute.getImage(),
               productAttribute.getSize(),
               productAttribute.getColor(),
               productAttribute.getQuality()
       );
       return p;
    }

    public static ProductAttribute MapProductAttributeCreateUpateDTOToProductAttribute(ProductAttributeCreateUpdateDTO productAttributeCreateUpdateDTO, Product product)
    {
        ProductAttribute p = new ProductAttribute();
        p.setImage(productAttributeCreateUpdateDTO.getImage());
        p.setSize(productAttributeCreateUpdateDTO.getSize());
        p.setColor(productAttributeCreateUpdateDTO.getColor());
        p.setQuality(productAttributeCreateUpdateDTO.getQuality());
        p.setProduct(product);
        return p;
    }

    public static List<ProductAttribute> MapProductAttributeCreateUpateDTOToProductAttribute(List<ProductAttributeCreateUpdateDTO> productAttributeCreateUpdateDTOs,
                                                                                       List<ProductAttribute> productAttributes, Product product)
    {
        List<ProductAttribute> updateProductAttributes = new ArrayList<>();
        for(int i=0;i<productAttributeCreateUpdateDTOs.size();i++)
        {
            productAttributes.get(i).setImage(productAttributeCreateUpdateDTOs.get(i).getImage());
            productAttributes.get(i).setSize(productAttributeCreateUpdateDTOs.get(i).getSize());
            productAttributes.get(i).setColor(productAttributeCreateUpdateDTOs.get(i).getColor());
            productAttributes.get(i).setQuality(productAttributeCreateUpdateDTOs.get(i).getQuality());
            productAttributes.get(i).setProduct(product);
            updateProductAttributes.add(productAttributes.get(i));
        }
        return updateProductAttributes;
    }
}
