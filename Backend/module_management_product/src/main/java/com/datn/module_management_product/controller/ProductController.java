package com.datn.module_management_product.controller;

import com.datn.module_management_product.dto.ProductDTO.ProductCreateUpdateDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductResponseDTO;
import com.datn.module_management_product.dto.ProductDTO.ProductResponseDetailDTO;
import com.datn.module_management_product.entity.Category;
import com.datn.module_management_product.entity.Product;
import com.datn.module_management_product.entity.ProductAttribute;
import com.datn.module_management_product.mapper.ProductAttributeMapper;
import com.datn.module_management_product.mapper.ProductMapper;
import com.datn.module_management_product.service.ICategoryService;
import com.datn.module_management_product.service.IProductAttributeService;
import com.datn.module_management_product.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService productService;
    private final IProductAttributeService productAttributeService;
    private final ICategoryService categoryService;

    @GetMapping("/getByPage")
    public Iterable<ProductResponseDTO> getByPage(@RequestParam(name = "page", defaultValue = "1") int page)
    {
        return productService.findAllByPage(page);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewProduct(@RequestBody ProductCreateUpdateDTO productCreateUpdateDTO)
    {
        Category category = categoryService.findByName(productCreateUpdateDTO.getCategoryName());
        Product newProduct = ProductMapper.MapProductCreateUpdateDTOToProduct(productCreateUpdateDTO,category);
        Product ProductAdded = productService.save(newProduct);

        //chuyen danh sach ProductAttributeDTO sang ProductAttribute
        List<ProductAttribute> prductAttributes = productCreateUpdateDTO.getProductAttributes().stream()
                .map(p-> ProductAttributeMapper.MapProductAttributeCreateUpateDTOToProductAttribute(p,ProductAdded)).collect(Collectors.toList());

        Iterable<ProductAttribute> prductAttributesAdded = productAttributeService.saveAll(prductAttributes);
        if(ProductAdded.getId()>0) return ResponseEntity.ok("Thêm thành công");
        return ResponseEntity.badRequest().body("Thêm thất bại");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateProduct(@RequestBody ProductCreateUpdateDTO productCreateUpdateDTO,
                                             @PathVariable(name = "id") int id)
    {
        Category category = categoryService.findByName(productCreateUpdateDTO.getCategoryName());
        Product product = productService.findById(id);
        Product updateProduct = ProductMapper.MapProductCreateUpdateDTOToProduct(productCreateUpdateDTO,product,category);
        Product productUpdated = productService.update(updateProduct);
        if(productUpdated.getId()>0) return ResponseEntity.ok("Cập nhật thành công");
        return ResponseEntity.badRequest().body("Cập nhật thất bại");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable(name = "id") int id)
    {
        Product deleteProduct = productService.findById(id);
        productService.delete(deleteProduct);
        return ResponseEntity.ok("Xoá thành công");
    }

    @GetMapping("/detail/{id}")
    public ProductResponseDetailDTO getDetail(@PathVariable(name = "id") int id)
    {
        Product product = productService.findById(id);
        ProductResponseDetailDTO productResponseDetailDTO = ProductMapper.MapProductToProductResponseDetailDTO(product);
        return  productResponseDetailDTO;
    }

    @GetMapping("/getProductByName")
    public List<ProductResponseDetailDTO> findByName(@RequestParam(name = "name") String name,
                                                     @RequestParam(name = "page", defaultValue = "1") int page)
    {
        List<ProductResponseDetailDTO> productResponseDetailDTOS = productService.findByName(name,page);
        if(productResponseDetailDTOS.isEmpty()) return List.of();
        return productResponseDetailDTOS;
    }
}
