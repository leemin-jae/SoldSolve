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
    public boolean checkWishProduct(User user, int product) {
        Product wishedProduct = productRepository.findByNo(product);
        int check = wishRepository.countByUserAndProduct(user, wishedProduct);
        if (check==0) return false;
        else return true;
    }

    @Override
    public void createWishProduct(User user, int product) {
        Wish wish = new Wish();
        Product wishedProduct = productRepository.findByNo(product);
        wish.setProduct(wishedProduct);
        wish.setUser(user);
        if (wishRepository.countByUserAndProduct(user, wishedProduct)==0) wishRepository.save(wish);
        else return;
    }

    @Override
    public void deleteWishProduct(User user, int product) {
        Product wishedProduct = productRepository.findByNo(product);
        Wish wish = wishRepository.findByUserAndProduct(user, wishedProduct).orElse(null);
        wishRepository.delete(wish);
    }

    @Override
    public List<Wish> getWishUser(int product) {
        Product wishedProduct = productRepository.findByNo(product);
        List<Wish> l = wishRepository.findByProduct(wishedProduct);
        return l;
    }

}
