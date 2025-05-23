package com.datn.module_management_product.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> ExceptionHandler(Exception exception)
    {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }
}
