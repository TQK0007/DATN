package com.datn.module_login.mapper;

import com.datn.module_login.dto.AccountDTO.AccountDetails;
import com.datn.module_login.entity.User;

public class UserMapper {

    public static User MapAccountDetailsToUser(AccountDetails accountDetails) {
        User user = new User();
        user.setFirstName(accountDetails.firstName());
        user.setLastName(accountDetails.lastName());
        return user;
    }

}
