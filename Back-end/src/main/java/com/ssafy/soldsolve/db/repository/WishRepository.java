package com.ssafy.soldsolve.db.repository;

import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.entity.Wish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<Wish, Integer> {
    Optional<List<Wish>> findAllByUser(User user);
    int countByUserAndProduct(User user, Product product);
    Optional<Wish> findByUserAndProduct(User user, Product product);

    Optional<List<Wish>> findAllByProduct(Product product);

    List<Wish> findByProduct(Product wishedProduct);
}
