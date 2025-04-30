package com.datn.module_management_product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private double price;
    private String color;
    private String image;
    private String description;
    @OneToMany(mappedBy = "material", cascade = CascadeType.ALL)
    private List<UserOrder> userOrders = new ArrayList<>();
}
