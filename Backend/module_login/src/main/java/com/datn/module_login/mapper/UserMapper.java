package com.datn.module_login.mapper;

import com.datn.module_login.dto.AccountDTO.AccountDetails;
import com.datn.module_login.dto.UserDTO.UserCreateUpdateDTO;
import com.datn.module_login.dto.UserDTO.UserResponseDTO;
import com.datn.module_login.entity.User;

public class UserMapper {

    public static User MapAccountDetailsToUser(AccountDetails accountDetails) {
        User user = new User();
        user.setFirstName(accountDetails.firstName());
        user.setLastName(accountDetails.lastName());
        return user;
    }

    public static UserResponseDTO MapUserToUserResponseDTO(User user)
    {
        UserResponseDTO userResponseDTO = new UserResponseDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.isSex()
        );
        return userResponseDTO;
    }

    public static User MapUserCreateUpdateDTOToNewUser(UserCreateUpdateDTO userCreateUpdateDTO)
    {
        User user = new User();
        user.setFirstName(userCreateUpdateDTO.firstName());
        user.setLastName(userCreateUpdateDTO.lastName());
        user.setSex(userCreateUpdateDTO.sex());
        return user;
    }

    public static User MapUserCreateUpdateDTOToUpdateUser(UserCreateUpdateDTO userCreateUpdateDTO, User updateUser)
    {
        updateUser.setFirstName(userCreateUpdateDTO.firstName());
        updateUser.setLastName(userCreateUpdateDTO.lastName());
        updateUser.setSex(userCreateUpdateDTO.sex());
        return updateUser;
    }
}
