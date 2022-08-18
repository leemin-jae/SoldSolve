package com.ssafy.soldsolve.db.repository;

import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    Product findByNo(int no);

    List<Product> findByTitleContainingAndCategoryContainingAndRegionContaining(String t, String c, String r);

    List<Product> findByUser(User user);
}
