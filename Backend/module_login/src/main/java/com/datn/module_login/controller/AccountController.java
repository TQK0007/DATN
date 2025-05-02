package com.datn.module_login.controller;

import com.datn.module_login.constants.ApplicationConstants;
import com.datn.module_login.dto.AccountDTO.*;
import com.datn.module_login.entity.Account;
import com.datn.module_login.entity.User;
import com.datn.module_login.mapper.AccountMapper;
import com.datn.module_login.mapper.UserMapper;
import com.datn.module_login.service.IAccountService;
import com.datn.module_login.service.IUserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/api/account")
public class AccountController {
    private IAccountService accountService;
    private IUserService userService;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private final Environment env;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AccountDetails accountDetails)
    {
        String hashPassword = passwordEncoder.encode(accountDetails.password());
        User user = UserMapper.MapAccountDetailsToUser(accountDetails);
        Account account = AccountMapper.MapAccountDetailsToAccount(accountDetails,hashPassword);
        User registerUser = userService.save(user);
        Account registerAccount = accountService.register(account,registerUser);
        if(registerAccount.getId() > 0 && registerUser.getId() > 0) return ResponseEntity.ok("Đăng ký thành công");
        return ResponseEntity.badRequest().body("Đăng ký thất bại");
    }

    @GetMapping("/getByPage")
    public Iterable<AccountResponseDTO> getAllByPage(@RequestParam(value = "page", defaultValue = "1") int page)
    {
        return accountService.findAllByPage(page);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewAccount(@RequestBody AccountCreateDTO accountCreateDTO)
    {
        String hashPassword = passwordEncoder.encode(accountCreateDTO.password());
        User userRegister = userService.findById(accountCreateDTO.userId());
        Account account = AccountMapper.MapAccountCreateDTOToAccount(accountCreateDTO,userRegister,hashPassword);
        Account accountCreate = accountService.save(account);
        if(accountCreate.getId() > 0) return ResponseEntity.ok("Tạo thành công");
        return ResponseEntity.badRequest().body("Tạo thất bại");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateAccount(@RequestBody AccountUpdateDTO accountUpdateDTO,
                                                @PathVariable(value = "id") int id)
    {
        String hashPassword = passwordEncoder.encode(accountUpdateDTO.password());
        Account account = accountService.findById(id);
        Account accountUpdate = AccountMapper.MapAccountUpdateDTOToAccount(accountUpdateDTO,account, hashPassword);
        Account accountUpdated = accountService.update(accountUpdate);
        if(accountUpdated.getId() > 0) return ResponseEntity.ok("Cập nhật thành công");
        return ResponseEntity.badRequest().body("Cập nhật thất bại");
    }

    @PatchMapping("/updatePassword/{id}")
    public ResponseEntity<String> updatePasswordAccount(@RequestBody UpdatePasswordDTO updatePassword,
                                                        @PathVariable(name = "id") int id)
    {
        String hashPassword = passwordEncoder.encode(updatePassword.password());
        Account account = accountService.findById(id);
        Account accountUpdate = AccountMapper.MapUpdatePasswordDTOToAccount(account,hashPassword);
        Account accountUpdated = accountService.update(accountUpdate);
        if(accountUpdated.getId() > 0) return ResponseEntity.ok("Cập nhật thành công");
        return ResponseEntity.badRequest().body("Cập nhật thất bại");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable(value = "id") int id)
    {
        Account accountDelete = accountService.findById(id);
        accountService.delete(accountDelete);
        return ResponseEntity.ok("Xoá thành công");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO)
    {
        String jwt = "";
        Authentication authentication = new UsernamePasswordAuthenticationToken(loginDTO.emailPhoneNumber(),loginDTO.password());
        Authentication authenticationResponse = authenticationManager.authenticate(authentication);

        int userId = accountService.findUserIdByUserName(loginDTO.emailPhoneNumber());

        if(null!=authenticationResponse && authenticationResponse.isAuthenticated())
        {
            if(null!=env)
            {
                String secret = env.getProperty(ApplicationConstants.JWT_SECRET_KEY,
                        ApplicationConstants.JWT_SECRET_DEFAULT_VALUE);
                SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
                jwt = Jwts.builder().issuer("Khanh").subject("JWT Token")
                        .claim("userId",userId)
                        .claim("username", authenticationResponse.getName())
                        .claim("authorities", authenticationResponse.getAuthorities().stream().map(
                                GrantedAuthority::getAuthority).collect(Collectors.joining(",")))
                        .issuedAt(new java.util.Date())
                        .expiration(new java.util.Date((new java.util.Date()).getTime() + 30000000))
                        .signWith(secretKey).compact();
            }
        }
        return ResponseEntity.status(HttpStatus.OK).header(ApplicationConstants.JWT_HEADER,jwt)
                .body(jwt);
    }
}
