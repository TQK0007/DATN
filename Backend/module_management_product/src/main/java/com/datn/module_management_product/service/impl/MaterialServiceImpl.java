package com.datn.module_management_product.service.impl;

import com.datn.module_management_product.dto.MaterialDTO.MaterialResponseDTO;
import com.datn.module_management_product.entity.Material;
import com.datn.module_management_product.mapper.MaterialMapper;
import com.datn.module_management_product.repository.MaterialRepository;
import com.datn.module_management_product.service.IMaterialService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MaterialServiceImpl implements IMaterialService {

    private final MaterialRepository materialRepository;

    @Value("${pagesize}")
    private  int PAGE_SIZE;
    @Override
    public List<Material> findAll() {
        return materialRepository.findAll();
    }

    @Override
    public Material save(Material material) {
        return materialRepository.save(material);
    }

    @Override
    public Material update(Material material) {
        return materialRepository.save(material);
    }

    @Override
    public void delete(Material material) {
        materialRepository.delete(material);
    }

    @Override
    public Material findById(int id) {
        return materialRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Material with id " + id + " not found"));
    }

    @Override
    public int getTotalPages() {
        return (int) Math.ceil((double) materialRepository.count() / PAGE_SIZE);
    }

    @Override
    public Iterable<MaterialResponseDTO> findAllByPage(int page) {
        Page<Material> materialPage = materialRepository.findAllByPage(PageRequest.of(page-1,PAGE_SIZE));
        List<MaterialResponseDTO> materialResponseDTOS = materialPage.get().map(m-> MaterialMapper.MapMaterialToMaterialResponseDTO(m))
                .collect(Collectors.toList());
        return materialResponseDTOS;
    }
}
