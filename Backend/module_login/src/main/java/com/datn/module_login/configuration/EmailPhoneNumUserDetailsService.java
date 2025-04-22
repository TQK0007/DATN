package com.datn.module_login.configuration;

import com.datn.module_login.entity.Account;
import com.datn.module_login.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmailPhoneNumUserDetailsService implements UserDetailsService {

    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account;
        if(username.contains("@"))
        {
            account = accountRepository.findByEmail(username).orElseThrow(()-> new
                    UsernameNotFoundException("Không tìm thấy người dùng: "+username));
        }
        else
        {
            account = accountRepository.findByPhoneNumber(username).orElseThrow(()-> new
                    UsernameNotFoundException("Không tìm thấy người dùng: "+username));
        }
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_"+account.getRoleName()));
        return new User(account.getEmail(), account.getPassword(), authorities);
    }
}
