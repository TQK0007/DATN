package com.datn.module_login.service;

import com.datn.module_login.dto.AccountDTO.AccountResponseDTO;
import com.datn.module_login.entity.Account;
import com.datn.module_login.entity.User;

public interface IAccountService extends IBaseService<Account>{
    Account register(Account account, User user);
    Iterable<AccountResponseDTO> findAllByPage(int page);
    int findUserIdByUserName(String userName);
}
