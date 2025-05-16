package com.datn.module_login.mapper;

import com.datn.module_login.dto.AccountDTO.*;
import com.datn.module_login.entity.Account;
import com.datn.module_login.entity.User;
import com.datn.module_login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class AccountMapper {

    public static Account MapAccountDetailsToAccount(AccountDetails accountDetails, String hashPassword)
    {
        Account account = new Account();
        account.setEmail(accountDetails.email());
        account.setPassword(hashPassword);
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

    public static Account MapAccountCreateDTOToAccount(AccountCreateDTO accountCreateDTO, User userRegister, String hashPassword)
    {
        Account account = new Account();
        account.setEmail(accountCreateDTO.email());
        account.setPhoneNumber(accountCreateDTO.phoneNumber());
        account.setRoleName(accountCreateDTO.roleName());
        account.setPassword(hashPassword);
        account.setRoleName(accountCreateDTO.roleName());
        account.setUser(userRegister);
        return account;
    }

    public static Account MapAccountUpdateDTOToAccount(AccountUpdateDTO accountUpdateDTO, Account accountUpdate,  String hashPassword)
    {
        accountUpdate.setEmail(accountUpdateDTO.email());
        accountUpdate.setPhoneNumber(accountUpdateDTO.phoneNumber());
        accountUpdate.setRoleName(accountUpdateDTO.roleName());
        accountUpdate.setPassword(hashPassword);
        return accountUpdate;
    }

    public static Account MapUpdatePasswordDTOToAccount(Account accountUpdate,  String hashPassword)
    {
        accountUpdate.setPassword(hashPassword);
        return  accountUpdate;
    }


    public static AccountUserUpdateDTO MapAccountUserToAccountUserUpdateDTO(Account account, User user)
    {
        AccountUserUpdateDTO accountUserUpdateDTO = new AccountUserUpdateDTO(
                user.getFirstName(),
                user.getLastName(),
                account.getEmail(),
                account.getPhoneNumber(),
                account.getPassword(),
                user.isSex()
        );
        return accountUserUpdateDTO;
    }

    public static Account MapAccountUserUpdateDTOToAccount(AccountUserUpdateDTO accountUserUpdateDTO, Account account)
    {
        account.setEmail(accountUserUpdateDTO.getEmail());
        account.setPhoneNumber(accountUserUpdateDTO.getPhoneNumber());
        account.setPassword(accountUserUpdateDTO.getPassword());
        return account;
    }
}
