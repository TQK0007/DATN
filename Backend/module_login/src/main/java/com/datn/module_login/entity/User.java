package com.datn.module_login.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int Id;
    private String FirstName;
    private String LastName;
    private boolean Sex;
    @OneToOne(mappedBy = "User", cascade = CascadeType.ALL)
    private Account Account;
}
