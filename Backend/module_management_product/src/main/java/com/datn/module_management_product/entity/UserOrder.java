package com.datn.module_management_product.entity;

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
public class UserOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double bust;
    private double waist;
    private double armpit;
    private double shoulderWidth;
    private double bicep;
    private double armLength;
    private double shirtLength;
    private double wrist;
    private double hip;
    private double pantsLength;
    private double thigh;
    private double knee;
    private double calf;
    private int quality;
    private String image;
    private int userId;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "materialId", nullable = false)
    private Material material;
}
