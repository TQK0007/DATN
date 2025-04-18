package com.datn.module_login.service.impl;

import com.datn.module_login.entity.User;
import com.datn.module_login.repository.UserRepository;
import com.datn.module_login.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserServiceImpl implements IUserService {

    @Autowired
    private  UserRepository userRepository;

    @Value("${pagesize}")
    private  int PAGE_SIZE;

    @Override
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

//    @Override
//    public Iterable<User> findAllByPage(int page) {
//        Page<User> userPage = userRepository.findAllByPage(PageRequest.of(page-1, PAGE_SIZE));
//        List<User> users = userPage.getContent();
//
//    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        return userRepository.save(user);
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public User findById(int id) {
        return userRepository.findById(id).get();
    }
}
