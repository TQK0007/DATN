package com.datn.module_management_product.repository;

import com.datn.module_management_product.entity.Category;
import com.datn.module_management_product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "Select p from Product p")
    Page<Product> findAllByPage(Pageable pageable);

    @Query(value = "SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<Product> findByName(@Param("name") String name, Pageable pageable);


    @Query("SELECT p FROM Product p " +
            "WHERE (:gender IS NULL OR p.category.type = :gender) " +
            "AND (:collection IS NULL OR p.category.name = :collection) " +
            "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
            "AND (:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Product> findByFilters(@Param("gender") String gender,
                                @Param("collection") String collection,
                                @Param("minPrice") Double minPrice,
                                @Param("maxPrice") Double maxPrice,
                                @Param("search") String search,
                                Pageable pageable);



    @Query("""
    SELECT p FROM Product p
    LEFT JOIN OrderItem oi ON oi.product = p
    LEFT JOIN Category c ON p.category = c
    WHERE (:gender IS NULL OR c.type = :gender)
      AND (:collection IS NULL OR c.name = :collection)
      AND (:minPrice IS NULL OR p.price >= :minPrice)
      AND (:maxPrice IS NULL OR p.price <= :maxPrice)
      AND (:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')))
    GROUP BY p.id
    ORDER BY COALESCE(SUM(oi.quality), 0) DESC
    """)
    Page<Product> findBestSellingProducts(
            @Param("gender") String gender,
            @Param("collection") String collection,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("search") String search,
            Pageable pageable
    );

}
