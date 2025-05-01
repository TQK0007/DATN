package com.datn.module_management_product.controller;

import com.datn.module_management_product.dto.MaterialDTO.MaterialCreateUpdateDTO;
import com.datn.module_management_product.dto.MaterialDTO.MaterialResponseDTO;
import com.datn.module_management_product.entity.Material;
import com.datn.module_management_product.mapper.MaterialMapper;
import com.datn.module_management_product.service.IMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/material")
@RequiredArgsConstructor
public class MaterialController {
    private final IMaterialService materialService;

    @GetMapping("/getByPage")
    public Iterable<MaterialResponseDTO> getByPage(@RequestParam(name = "page", defaultValue = "1") int page)
    {
        return materialService.findAllByPage(page);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewMaterial(@RequestBody MaterialCreateUpdateDTO materialCreateUpdateDTO)
    {
        Material newMaterial = MaterialMapper.MapMaterialCreateUpdateDTOToMaterial(materialCreateUpdateDTO);
        Material materialAdded = materialService.save(newMaterial);
        if(materialAdded.getId()>0) return ResponseEntity.ok("Thêm thành công");
        return ResponseEntity.badRequest().body("Thêm thất bại");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateMaterial(@RequestBody MaterialCreateUpdateDTO materialCreateUpdateDTO,
                                             @PathVariable(name = "id") int id)
    {
        Material material = materialService.findById(id);
        Material updateMaterial = MaterialMapper.MapMaterialCreateUpdateDTOToMaterial(materialCreateUpdateDTO,material);
        Material materialUpdated = materialService.update(updateMaterial);
        if(materialUpdated.getId()>0) return ResponseEntity.ok("Cập nhật thành công");
        return ResponseEntity.badRequest().body("Cập nhật thất bại");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMaterial(@PathVariable(name = "id") int id)
    {
        Material deleteMaterial = materialService.findById(id);
        materialService.delete(deleteMaterial);
        return ResponseEntity.ok("Xoá thành công");
    }
}
