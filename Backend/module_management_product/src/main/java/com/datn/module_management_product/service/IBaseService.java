package com.datn.module_management_product.service;

import com.datn.module_management_product.constants.ApplicationConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.List;

public interface IBaseService<T> {

    List<T> findAll();

    T save(T t);
    T update(T t);
    void delete(T t);
    T findById(int id);

    default int getUserIdFromToken(String jwtToken) {
        SecretKey secretKey = Keys.hmacShaKeyFor(ApplicationConstants.JWT_SECRET_DEFAULT_VALUE.getBytes(StandardCharsets.UTF_8));
        Claims claims = Jwts.parser().verifyWith(secretKey)
                .build().parseSignedClaims(jwtToken).getPayload();
        return (int) claims.get("userId");
    }

    int getTotalPages();
}
