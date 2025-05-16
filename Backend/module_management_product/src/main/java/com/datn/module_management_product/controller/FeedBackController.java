package com.datn.module_management_product.controller;

import com.datn.module_management_product.dto.FeedBackDTO.FeedBackCreateUpDateDTO;
import com.datn.module_management_product.dto.FeedBackDTO.FeedBackResponseDTO;
import com.datn.module_management_product.entity.FeedBack;
import com.datn.module_management_product.entity.Product;
import com.datn.module_management_product.mapper.FeedBackMapper;
import com.datn.module_management_product.service.IFeedBackService;
import com.datn.module_management_product.service.IProductService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedBackController {

    private final IFeedBackService feedBackService;
    private final IProductService productService;

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<FeedBackResponseDTO>> getFeedBackByProductId(@PathVariable(name = "productId") int productId) {
        List<FeedBack> feedBacks = productService.findById(productId).getFeedBacks();
        List<FeedBackResponseDTO> feedBackResponseDTOs = feedBacks.stream().map(feedBack -> FeedBackMapper.MapFeedBackToFeedBackResponseDTO(feedBack)).toList();
        return ResponseEntity.ok(feedBackResponseDTOs);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createFeedBack(@RequestBody FeedBackCreateUpDateDTO feedBackCreateUpDateDTO) {
        Product product = productService.findById(feedBackCreateUpDateDTO.getProductId());
        FeedBack feedBack = FeedBackMapper.MapFeedBackCreateUpDateDTOToFeedBack(feedBackCreateUpDateDTO, product);
        FeedBack feedBackAdded = feedBackService.save(feedBack);
        if (feedBackAdded.getId() > 0) return ResponseEntity.ok("Add success");
        return ResponseEntity.badRequest().body("Add fail");
    }

}
