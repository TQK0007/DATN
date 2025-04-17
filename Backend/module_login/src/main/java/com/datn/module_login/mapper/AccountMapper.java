package com.datn.module_login.mapper;

import com.datn.module_login.dto.AccountDTO.AccountDetails;
import com.datn.module_login.entity.Account;

public class AccountMapper {

    public static Account MapAccountDetailsToAccount(AccountDetails accountDetails)
    {
        Account account = new Account();
        account.setEmail(accountDetails.email());
        account.setPassword(accountDetails.password());
        account.setPhoneNumber(accountDetails.phoneNumber());
        return account;
    }
}
