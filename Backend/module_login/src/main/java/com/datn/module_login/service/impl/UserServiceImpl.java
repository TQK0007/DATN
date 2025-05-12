package com.datn.module_login.service.impl;

import com.datn.module_login.dto.UserDTO.UserResponseDTO;
import com.datn.module_login.entity.User;
import com.datn.module_login.mapper.UserMapper;
import com.datn.module_login.repository.UserRepository;
import com.datn.module_login.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class UserServiceImpl implements IUserService {

    @Autowired
    private  UserRepository userRepository;

    @Value("${pagesize}")
    private  int PAGE_SIZE;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
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

    @Override
    public User findById(int id) {
        return userRepository.findById(id).get();
    }

    @Override
    public int getTotalPage() {
        return (int) Math.ceil((double) findAll().size() / PAGE_SIZE);
    }

    @Override
    public Iterable<UserResponseDTO> findAllByPage(int page) {
        Page<User> userPage = userRepository.findAllByPage(PageRequest.of(page-1,PAGE_SIZE));
        List<User> users = userPage.getContent();
        List<UserResponseDTO> userResponseDTOS = users.stream().map(user -> UserMapper.MapUserToUserResponseDTO(user)).collect(Collectors.toList());
        return  userResponseDTOS;
    }

    @Override
    public Iterable<UserResponseDTO> findAllUserDTO() {
        return userRepository.findAll().stream().map(user -> UserMapper.MapUserToUserResponseDTO(user)).collect(Collectors.toList());
    }

    public List<UserResponseDTO> findAllUserDTOWithNoAccount()
    {
        List<User> users = userRepository.findAll().stream().filter(u->u.getAccount()==null).collect(Collectors.toList());
        return users.stream().map(user -> UserMapper.MapUserToUserResponseDTO(user)).collect(Collectors.toList());
    }
}
