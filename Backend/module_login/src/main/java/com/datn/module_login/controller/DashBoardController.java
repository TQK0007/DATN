package com.datn.module_login.controller;

import com.datn.module_login.dto.UserDTO.UserResponseDTO;
import com.datn.module_login.service.IAccountService;
import com.datn.module_login.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.datn.module_login.mapper.UserMapper.MapUserToUserResponseDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dashboard")
public class DashBoardController {
    private final IUserService userService;
    private final IAccountService accountService;

    @GetMapping("/statistical")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        int totalSubscriber = accountService.findAll().size();
        List<UserResponseDTO> userResponseDTOS = userService.findAll().stream()
                .filter(u->u.getAccount() != null)
                .map(user -> MapUserToUserResponseDTO(user)).toList();
        Map<String, Object> response = new HashMap<>();
        response.put("totalSubscriber", totalSubscriber);
        response.put("users", userResponseDTOS);
        return ResponseEntity.ok(response);
    } // <== Map<String, Object>
}
