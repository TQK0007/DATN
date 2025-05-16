package com.datn.module_management_product.mapper;

import com.datn.module_management_product.dto.FeedBackDTO.FeedBackCreateUpDateDTO;
import com.datn.module_management_product.dto.FeedBackDTO.FeedBackResponseDTO;
import com.datn.module_management_product.entity.FeedBack;
import com.datn.module_management_product.entity.Product;

public class FeedBackMapper {

    public static FeedBackResponseDTO MapFeedBackToFeedBackResponseDTO(FeedBack feedBack) {
        FeedBackResponseDTO feedBackResponseDTO = new FeedBackResponseDTO(
            feedBack.getId(),
            feedBack.getComment(),
            feedBack.getRating(),
            feedBack.getUserId()
        );
        return feedBackResponseDTO;
    }

    public static FeedBack MapFeedBackCreateUpDateDTOToFeedBack(FeedBackCreateUpDateDTO feedBackCreateUpDateDTO, Product product) {
        FeedBack feedBack = new FeedBack();
        feedBack.setComment(feedBackCreateUpDateDTO.getComment());
        feedBack.setRating(feedBackCreateUpDateDTO.getRating());
        feedBack.setUserId(feedBackCreateUpDateDTO.getUserId());
        feedBack.setProduct(product);
        return feedBack;
    }

}
