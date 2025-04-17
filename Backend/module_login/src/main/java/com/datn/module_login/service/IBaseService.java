package com.datn.module_login.service;

public interface IBaseService<T> {

    Iterable<T> findAll();
    Iterable<T> findAllByPage(int page);
    T save(T t);
    T update(T t);
    void delete(T t);
}
