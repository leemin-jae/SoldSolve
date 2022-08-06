package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.entity.Wish;

import java.util.List;

public interface WishService {
    List<Wish> getWishProduct(User user);
    void createWishProduct(User user, int product);

}