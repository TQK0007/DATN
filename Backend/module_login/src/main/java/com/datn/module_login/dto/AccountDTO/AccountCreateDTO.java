package com.datn.module_login.dto.AccountDTO;

public record AccountCreateDTO(String email, String phoneNumber, String password, String roleName, int userId) {
}
