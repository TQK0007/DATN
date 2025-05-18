package com.datn.module_login.repository;

import com.datn.module_login.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    @Query(value = "Select a from Account a")
    Page<Account> findAllByPage(Pageable pageable);

    @Query(value = "Select a from Account a where a.Email = :email")
    Optional<Account> findByEmail(@Param(value = "email") String email);

    @Query(value = "Select a from Account a where a.PhoneNumber = :phoneNumber")
    Optional<Account> findByPhoneNumber(@Param(value = "phoneNumber")String phoneNumber);

    @Query(value = "Select a.User.Id from Account a where a.Email = :userName or a.PhoneNumber = :userName")
    Integer findUserIdByUserName(@Param(value = "userName") String userName);

    @Query(value = "Select a.Id from Account a where a.Email = :userName or a.PhoneNumber = :userName")
    Integer findAccountIdByUserName(@Param(value = "userName") String userName);
}
