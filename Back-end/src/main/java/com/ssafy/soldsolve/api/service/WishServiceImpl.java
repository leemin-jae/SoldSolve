package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.entity.Wish;
import com.ssafy.soldsolve.db.repository.ProductRepository;
import com.ssafy.soldsolve.db.repository.WishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishServiceImpl implements WishService {

    @Autowired
    WishRepository wishRepository;
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Wish> getWishProduct(User user) {
        return wishRepository.findAllByUser(user).orElseGet(null);
    }

    @Override
    public void createWishProduct(User user, int product) {
        Wish wish = new Wish();
        Product wishedProduct = productRepository.findByNo(product);
        wish.setProduct(wishedProduct);
        wish.setUser(user);
        wishRepository.save(wish);
    }
}
