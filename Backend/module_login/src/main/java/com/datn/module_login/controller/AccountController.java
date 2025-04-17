package com.datn.module_login.controller;

import com.datn.module_login.dto.AccountDTO.AccountCreateDTO;
import com.datn.module_login.dto.AccountDTO.AccountDetails;
import com.datn.module_login.dto.AccountDTO.AccountResponseDTO;
import com.datn.module_login.dto.AccountDTO.AccountUpdateDTO;
import com.datn.module_login.entity.Account;
import com.datn.module_login.entity.User;
import com.datn.module_login.mapper.AccountMapper;
import com.datn.module_login.mapper.UserMapper;
import com.datn.module_login.service.IAccountService;
import com.datn.module_login.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/account")
public class AccountController {
    private IAccountService _accountService;
    private IUserService _userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AccountDetails accountDetails)
    {
        User user = UserMapper.MapAccountDetailsToUser(accountDetails);
        Account account = AccountMapper.MapAccountDetailsToAccount(accountDetails);
        User registerUser = _userService.save(user);
        Account registerAccount = _accountService.register(account,registerUser);
        if(registerAccount.getId() > 0 && registerUser.getId() > 0) return ResponseEntity.ok("Đăng ký thành công");
        return ResponseEntity.badRequest().body("Đăng ký thất bại");
    }

    @GetMapping("/getByPage")
    public Iterable<AccountResponseDTO> getAllByPage(@RequestParam(value = "page", defaultValue = "1") int page)
    {
        return _accountService.findAllByPage(page);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewAccount(@RequestBody AccountCreateDTO accountCreateDTO)
    {
        User userRegister = _userService.findById(accountCreateDTO.userId());
        Account account = AccountMapper.MapAccountCreateDTOToAccount(accountCreateDTO,userRegister);
        Account accountCreate = _accountService.save(account);
        if(accountCreate.getId() > 0) return ResponseEntity.ok("Tạo thành công");
        return ResponseEntity.badRequest().body("Tạo thất bại");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateAccount(@RequestBody AccountUpdateDTO accountUpdateDTO,
                                                @PathVariable(value = "id") int id)
    {
        Account account = _accountService.findById(id);
        Account accountUpdate = AccountMapper.MapAccountUpdateDTOToAccount(accountUpdateDTO,account);
        Account accountUpdated = _accountService.update(accountUpdate);
        if(accountUpdated.getId() > 0) return ResponseEntity.ok("Cập nhật thành công");
        return ResponseEntity.badRequest().body("Cập nhật thất bại");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable(value = "id") int id)
    {
        Account accountDelete = _accountService.findById(id);
        _accountService.delete(accountDelete);
        return ResponseEntity.ok("Xoá thành công");
    }
}
