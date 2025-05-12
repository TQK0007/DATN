package com.datn.module_management_product.controller;

import com.datn.module_management_product.dto.CategoryDTO.CategoryCreateDTO;
import com.datn.module_management_product.dto.CategoryDTO.CategoryResponseDTO;
import com.datn.module_management_product.dto.CategoryDTO.CategoryUpdateDTO;
import com.datn.module_management_product.entity.Category;
import com.datn.module_management_product.mapper.CategoryMapper;
import com.datn.module_management_product.service.ICategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/category")
@AllArgsConstructor
public class CategoryController {

    private ICategoryService categoryService;

    @GetMapping("/getByPage")
    public Iterable<CategoryResponseDTO> getByPage(@RequestParam(name = "page", defaultValue = "1") int page)
    {
        return categoryService.findAllByPage(page);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewCategory(@RequestBody CategoryCreateDTO categoryCreateDTO)
    {
        Category newCategory = CategoryMapper.MapCategoryCreateDTOToCategory(categoryCreateDTO);
        Category categoryAdded = categoryService.save(newCategory);
        if(categoryAdded.getId()>0) return ResponseEntity.ok("Thêm thành công");
        return ResponseEntity.badRequest().body("Thêm thất bại");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCategory(@RequestBody CategoryUpdateDTO categoryUpdateDTO,
                                             @PathVariable(name = "id") int id)
    {
        Category category = categoryService.findById(id);
        Category updateCategory = CategoryMapper.MapCategoryUpdateDTOToCategory(categoryUpdateDTO, category);
        Category categoryUpdated = categoryService.update(updateCategory);
        if(categoryUpdated.getId()>0) return ResponseEntity.ok("Cập nhật thành công");
        return ResponseEntity.badRequest().body("Cập nhật thất bại");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable(name = "id") int id)
    {
        Category deleteCategory = categoryService.findById(id);
        categoryService.delete(deleteCategory);
        return ResponseEntity.ok("Xoá thành công");
    }

    @GetMapping("/getTotalCategoryAndPage")
    public ResponseEntity<Map<String, Integer>> getTotalCategoryAndPage() {
        int count = categoryService.findAll().size();
        int page = categoryService.getTotalPages();
        Map<String, Integer> result = Map.of("count", count, "page", page);
        return ResponseEntity.ok(result);
    }
}
