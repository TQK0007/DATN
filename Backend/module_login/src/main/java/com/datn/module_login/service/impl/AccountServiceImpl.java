package com.datn.module_login.service.impl;

import com.datn.module_login.dto.AccountDTO.AccountResponseDTO;
import com.datn.module_login.entity.Account;
import com.datn.module_login.entity.User;
import com.datn.module_login.mapper.AccountMapper;
import com.datn.module_login.repository.AccountRepository;
import com.datn.module_login.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class AccountServiceImpl implements IAccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Value("${pagesize}")
    private int PAGE_SIZE;

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public Iterable<AccountResponseDTO> findAllByPage(int page) {
        Page<Account> accountPage = accountRepository.findAllByPage(PageRequest.of(page-1, PAGE_SIZE));
        List<Account> accouts = accountPage.getContent();
        List<AccountResponseDTO> accountResponseDTOS = accouts.stream().map(account -> AccountMapper.MapAccountToAccountResponseDTO(account)).collect(Collectors.toList());
        return accountResponseDTOS;
    }

    @Override
    public int findUserIdByUserName(String userName) {
        return accountRepository.findUserIdByUserName(userName);
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
    public Account findById(int id) {
        return accountRepository.findById(id).get();
    }

    @Override
    public int getTotalPage() {
        return (int) Math.ceil((double) findAll().size() / PAGE_SIZE);
    }

    @Override
    public Account register(Account account, User user) {
        account.setUser(user);
        account.setRoleName("User");
        Account registerAccount =  save(account);
        return registerAccount;
    }
}
