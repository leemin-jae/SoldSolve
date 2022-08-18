package com.ssafy.soldsolve.db.repository;

import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.Request;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Integer> {
    Optional<List<Request>> findAllByUser(User user);
    int countByUserAndProduct(User user, Product product);
    int countByProduct(Product product);
    Optional<Request> findByUserAndProduct(User user, Product product);
    Optional<List<Request>> findAllByProduct(Product product);
    List<Request> findByProduct(Product p);
}