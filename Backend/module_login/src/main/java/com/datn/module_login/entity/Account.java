package com.datn.module_login.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String Email;
    private String PhoneNumber;
    private String Password;
    private String RoleName;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "UserId", nullable = false)
    private User User;
}
