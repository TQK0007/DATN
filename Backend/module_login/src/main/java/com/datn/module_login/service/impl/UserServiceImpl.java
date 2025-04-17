package com.datn.module_login.service.impl;

import com.datn.module_login.entity.User;
import com.datn.module_login.repository.UserRepository;
import com.datn.module_login.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements IUserService {

    private  UserRepository userRepository;

    @Value("${pagesize}")
    private final int PAGE_SIZE;

    @Override
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Iterable<User> findAllByPage(int page) {
        return null;
    }

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
}
