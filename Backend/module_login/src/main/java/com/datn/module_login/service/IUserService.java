package com.datn.module_login.service;

import com.datn.module_login.dto.UserDTO.UserResponseDTO;
import com.datn.module_login.entity.User;

public interface IUserService extends IBaseService<User> {
    Iterable<UserResponseDTO> findAllByPage(int page);
}
