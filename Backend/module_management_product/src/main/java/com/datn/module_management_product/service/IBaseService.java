package com.datn.module_management_product.service;

public interface IBaseService<T> {

    Iterable<T> findAll();

    T save(T t);
    T update(T t);
    void delete(T t);
    T findById(int id);
}
