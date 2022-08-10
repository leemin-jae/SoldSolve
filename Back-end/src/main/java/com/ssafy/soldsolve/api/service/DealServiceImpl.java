package com.ssafy.soldsolve.api.service;


import com.ssafy.soldsolve.db.entity.Deal;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.DealRepository;
import com.ssafy.soldsolve.db.repository.ProductRepository;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DealServiceImpl implements DealService {

    @Autowired
    DealRepository dealRepository;

    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Deal> getBuyProduct(User user) {
        return dealRepository.findByBuyer(user);
    }

    @Override
    public void createDeal(User buy,  Product p) {
        Deal d = new Deal();
        d.setBuyer(buy);
        d.setProduct(p);
        dealRepository.save(d);
        p.setState(1);
        productRepository.save(p);

    }
}
