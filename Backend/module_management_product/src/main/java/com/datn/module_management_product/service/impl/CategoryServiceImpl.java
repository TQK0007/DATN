package com.datn.module_management_product.service.impl;

import com.datn.module_management_product.dto.CategoryDTO.CategoryResponseDTO;
import com.datn.module_management_product.entity.Category;
import com.datn.module_management_product.mapper.CategoryMapper;
import com.datn.module_management_product.repository.CategoryRepository;
import com.datn.module_management_product.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements ICategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Value("${pagesize}")
    private  int PAGE_SIZE;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void delete(Category category) {
        categoryRepository.delete(category);
    }

    @Override
    public Category findById(int id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public int getTotalPages() {
        return (int) Math.ceil((double) categoryRepository.count() / PAGE_SIZE);
    }

    @Override
    public Iterable<CategoryResponseDTO> findAllByPage(int page) {
        Page<Category> categoryPage = categoryRepository.findAllByPage(PageRequest.of(page-1,PAGE_SIZE));
        List<Category> categories = categoryPage.getContent();
        List<CategoryResponseDTO> categoryResponseDTOS = categories.stream().map(category -> CategoryMapper.MapCategoryToCategoryResponseDTO(category))
                                                            .collect(Collectors.toList());
        return categoryResponseDTOS;
    }

    @Override
    public List<CategoryResponseDTO> findAllDTO() {
        return categoryRepository.findAll().stream().map(category -> CategoryMapper.MapCategoryToCategoryResponseDTO(category)).collect(Collectors.toList());
    }

    @Override
    public Category findByName(String name) {
        return categoryRepository.findByName(name).get();
    }
}
