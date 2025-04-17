package com.datn.module_login.controller;

import com.datn.module_login.dto.AccountDTO.AccountDetails;
import com.datn.module_login.entity.Account;
import com.datn.module_login.entity.User;
import com.datn.module_login.mapper.AccountMapper;
import com.datn.module_login.mapper.UserMapper;
import com.datn.module_login.service.IAccountService;
import com.datn.module_login.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/account")
public class AccountController {
    private IAccountService _accountService;
    private IUserService _userService;

    @PostMapping("/register")
    public String register(@RequestBody AccountDetails accountDetails)
    {
        User user = UserMapper.MapAccountDetailsToUser(accountDetails);
        Account account = AccountMapper.MapAccountDetailsToAccount(accountDetails);
        User registerUser = _userService.save(user);
        Account registerAccount = _accountService.register(account,registerUser);
        if(registerAccount.getId() > 0 && registerUser.getId() > 0) return "Đăng ký thành công";
        return "Đăng ký thất bại";
    }

    @GetMapping("/test")
    public String test()
    {
        return "abc";
    }

}
