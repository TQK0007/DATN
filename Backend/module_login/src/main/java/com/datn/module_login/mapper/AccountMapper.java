package com.datn.module_login.mapper;

import com.datn.module_login.dto.AccountDTO.AccountCreateDTO;
import com.datn.module_login.dto.AccountDTO.AccountDetails;
import com.datn.module_login.dto.AccountDTO.AccountResponseDTO;
import com.datn.module_login.dto.AccountDTO.AccountUpdateDTO;
import com.datn.module_login.entity.Account;
import com.datn.module_login.entity.User;
import com.datn.module_login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class AccountMapper {

    public static Account MapAccountDetailsToAccount(AccountDetails accountDetails)
    {
        Account account = new Account();
        account.setEmail(accountDetails.email());
        account.setPassword(accountDetails.password());
        account.setPhoneNumber(accountDetails.phoneNumber());
        return account;
    }

    public static AccountResponseDTO MapAccountToAccountResponseDTO(Account account)
    {
        AccountResponseDTO accountResponseDTO = new AccountResponseDTO(
                account.getId(),
                account.getEmail(),
                account.getPhoneNumber(),
                account.getPassword(),
                account.getUser().getId()
        );
        return accountResponseDTO;
    }

    public static Account MapAccountCreateDTOToAccount(AccountCreateDTO accountCreateDTO, User userRegister)
    {
        Account account = new Account();
        account.setEmail(accountCreateDTO.email());
        account.setPhoneNumber(accountCreateDTO.phoneNumber());
        account.setRoleName(accountCreateDTO.roleName());
        account.setPassword(accountCreateDTO.password());
        account.setRoleName(accountCreateDTO.roleName());
        account.setUser(userRegister);
        return account;
    }

    public static Account MapAccountUpdateDTOToAccount(AccountUpdateDTO accountUpdateDTO, Account accountUpdate)
    {
        accountUpdate.setEmail(accountUpdateDTO.email());
        accountUpdate.setPhoneNumber(accountUpdateDTO.phoneNumber());
        accountUpdate.setRoleName(accountUpdateDTO.roleName());
        accountUpdate.setPassword(accountUpdateDTO.password());
        return accountUpdate;
    }

}
