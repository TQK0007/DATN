package com.datn.module_management_product.service;

import com.datn.module_management_product.constants.ApplicationConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.crypto.SecretKey;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

public interface IBaseService<T> {

    String ROOT_PATH = (System.getProperty("user.dir") + File.separator + "uploaded_images").replace("\\", "\\\\");

    List<T> findAll();

    T save(T t);
    T update(T t);
    void delete(T t);
    T findById(int id);

    int getTotalPages();

    default int getUserIdFromToken(String jwtToken) {
        SecretKey secretKey = Keys.hmacShaKeyFor(ApplicationConstants.JWT_SECRET_DEFAULT_VALUE.getBytes(StandardCharsets.UTF_8));
        Claims claims = Jwts.parser().verifyWith(secretKey)
                .build().parseSignedClaims(jwtToken).getPayload();
        return (int) claims.get("userId");
    }

    default String uploadImg(MultipartFile file) throws IOException {
        String rootURL = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();

        // Kiểm tra file rỗng
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Please select a file to upload.");
        }

        // Kiểm tra phần mở rộng
        String fileExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        if (fileExtension == null || !fileExtension.matches("(?i)jpg|jpeg|png|webp")) {
            throw new IllegalArgumentException("Only JPG, JPEG, and PNG files are allowed.");
        }

        // Tạo tên file ngẫu nhiên
        String fileName = UUID.randomUUID().toString() + "." + fileExtension;
        String filePath = ROOT_PATH  + File.separator + fileName;

        System.out.println(filePath);

        // Lưu file
        file.transferTo(new File(filePath));

        // Trả về URL ảnh
        return rootURL + "/Img/" + fileName;
    }

}
