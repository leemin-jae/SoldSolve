package com.ssafy.soldsolve.db.repository;


import com.ssafy.soldsolve.db.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DealRepository extends JpaRepository<Deal, Integer> {

    List<Deal> findByBuyer(User user);

    Optional<List<Deal>> findAllByProduct(Product product);
}
