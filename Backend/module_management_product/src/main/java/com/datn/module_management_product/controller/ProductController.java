package com.datn.module_management_product.controller;

import com.datn.module_management_product.dto.ProductAttributeDTO.ProductAttributeCreateUpdateDTO;
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
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

        Category category = categoryService.findById(productCreateUpdateDTO.getCategoryId());
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
        //Category category = categoryService.findByName(productCreateUpdateDTO.getCategoryName());
        Category category = categoryService.findById(productCreateUpdateDTO.getCategoryId());
        Product product = productService.findById(id);
        Product updateProduct = ProductMapper.MapProductCreateUpdateDTOToProduct(productCreateUpdateDTO,product,category);
        Product productUpdated = productService.update(updateProduct);

        //cap nhat danh sach thuoc tinh
        List<ProductAttribute> productAttributes = productAttributeService.findAllByProduct(productUpdated);
        List<ProductAttributeCreateUpdateDTO> productAttributeCreateUpdateDTOS = productCreateUpdateDTO.getProductAttributes();
        List<ProductAttribute> updateProductAttributes = ProductAttributeMapper.MapProductAttributeCreateUpateDTOToProductAttribute(productAttributeCreateUpdateDTOS,productAttributes,productUpdated);
        productAttributeService.saveAll(updateProductAttributes);
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

    @GetMapping("/getTotalProductAndPage")
    public ResponseEntity<Map<String, Integer>> getTotalProductAndPage() {
        int count = productService.findAll().size();
        int page = productService.getTotalPages();
        Map<String, Integer> result = Map.of("count", count, "page", page);
        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/uploadImg")
    public ResponseEntity<String> uploadImg(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(productService.uploadImg(file));
    }

    @GetMapping("/getByFilters")
    public ResponseEntity<Map<String, Object>> getByPageWithFilters(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String collection,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String search) {

        Page<Product> productPage = productService.getProductsByFilters(
                page, gender,collection,minPrice,maxPrice,search
        );

        List<ProductResponseDTO> dtos = productPage.getContent().stream()
                .map(ProductMapper::MapProductToProductResponseDTO)
                .toList();

        Map<String, Object> response = new HashMap<>();
        response.put("products", dtos);
        response.put("totalItems", productPage.getTotalElements());
        response.put("totalPages", productPage.getTotalPages());
        response.put("currentPage", productPage.getNumber() + 1);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/getByFiltersAndSort")
    public ResponseEntity<Map<String, Object>> getFilteredProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String collection,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "newest") String sortType
    ) {
        Page<ProductResponseDTO> result = productService.findFilteredProducts(
                gender, collection, minPrice, maxPrice, search, page, sortType
        );

        Map<String, Object> response = new HashMap<>();
        response.put("products", result.getContent());
        response.put("totalItems", result.getTotalElements());
        response.put("totalPages", result.getTotalPages());
        response.put("currentPage", result.getNumber());

        return ResponseEntity.ok(response);
    }

}
