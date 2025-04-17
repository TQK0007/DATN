package com.datn.module_login.service.impl;

import com.datn.module_login.entity.Account;
import com.datn.module_login.entity.User;
import com.datn.module_login.repository.AccountRepository;
import com.datn.module_login.service.IAccountService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements IAccountService {

    private AccountRepository accountRepository;

    @Override
    public Iterable<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public Iterable<Account> findAllByPage(int page) {
        return null;
    }

    @Override
    public Account save(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account update(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public void delete(Account account) {
        accountRepository.delete(account);
    }

    @Override
    public Account register(Account account, User user) {
        account.setUser(user);
        account.setRoleName("User");
        Account registerAccount =  save(account);
        return registerAccount;
    }
}
