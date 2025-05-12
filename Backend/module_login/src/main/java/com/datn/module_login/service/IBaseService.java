package com.datn.module_login.service;

import java.util.List;

public interface IBaseService<T> {

    List<T> findAll();

    T save(T t);
    T update(T t);
    void delete(T t);
    T findById(int id);

    int getTotalPage();
}
