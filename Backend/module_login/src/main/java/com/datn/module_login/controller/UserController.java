package com.datn.module_login.controller;

import com.datn.module_login.dto.UserDTO.UserCreateUpdateDTO;
import com.datn.module_login.dto.UserDTO.UserResponseDTO;
import com.datn.module_login.entity.User;
import com.datn.module_login.mapper.UserMapper;
import com.datn.module_login.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private IUserService userService;

    @GetMapping("/getAll")
    public Iterable<UserResponseDTO> getAll()
    {
       return userService.findAllUserDTO();
    }

    @GetMapping("/getByPage")
    public Iterable<UserResponseDTO> getByPage(@RequestParam(name = "page", defaultValue = "1") int page)
    {
        return userService.findAllByPage(page);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewUser(@RequestBody UserCreateUpdateDTO userCreateUpdateDTO)
    {
        User newUser = UserMapper.MapUserCreateUpdateDTOToNewUser(userCreateUpdateDTO);
        User userAdded = userService.update(newUser);
        if(userAdded.getId()>0) return ResponseEntity.ok("Thêm thành công");
        return ResponseEntity.badRequest().body("Thêm thất bại");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@RequestBody UserCreateUpdateDTO userCreateUpdateDTO,
                                             @PathVariable(name = "id") int id)
    {
        User user = userService.findById(id);
        User updateUser = UserMapper.MapUserCreateUpdateDTOToUpdateUser(userCreateUpdateDTO,user);
        User userUpdated = userService.update(updateUser);
        if(userUpdated.getId()>0) return ResponseEntity.ok("Cập nhật thành công");
        return ResponseEntity.badRequest().body("Cập nhật thất bại");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable(name = "id") int id)
    {
        User deleteUser = userService.findById(id);
        userService.delete(deleteUser);
        return ResponseEntity.ok("Xoá thành công");
    }

    @GetMapping("/totalPage")
    public int getTotalPage()
    {
        return userService.getTotalPage();
    }

    @GetMapping("/getAllWithNoAccount")
    public List<UserResponseDTO> findAllUserDTOWithNoAccount()
    {
        return userService.findAllUserDTOWithNoAccount();
    }
}

