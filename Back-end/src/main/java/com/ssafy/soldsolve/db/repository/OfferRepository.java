package com.ssafy.soldsolve.db.repository;

import com.ssafy.soldsolve.db.entity.Offer;
import com.ssafy.soldsolve.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {
    Optional<List<Offer>> findAllByProduct(Product product);
}
