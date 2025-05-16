package com.datn.module_management_product.service.impl;

import com.datn.module_management_product.entity.FeedBack;
import com.datn.module_management_product.repository.FeedBackRepository;
import com.datn.module_management_product.service.IFeedBackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedBackServiceImpl implements IFeedBackService {

    private final FeedBackRepository feedBackRepository;

    @Override
    public List<FeedBack> findAll() {
        return feedBackRepository.findAll();
    }

    @Override
    public FeedBack save(FeedBack feedBack) {
        return feedBackRepository.save(feedBack);
    }

    @Override
    public FeedBack update(FeedBack feedBack) {
        return feedBackRepository.save(feedBack);
    }

    @Override
    public void delete(FeedBack feedBack) {
        feedBackRepository.delete(feedBack);
    }

    @Override
    public FeedBack findById(int id) {
        return feedBackRepository.findById(id).get();
    }

    @Override
    public int getTotalPages() {
        return (int)feedBackRepository.count();
    }
}
