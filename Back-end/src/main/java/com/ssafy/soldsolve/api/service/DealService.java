package com.ssafy.soldsolve.api.service;


import com.ssafy.soldsolve.db.entity.Deal;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;

import java.util.List;

public interface DealService {


    List<Deal> getBuyProduct(User user);

    void createDeal(User buy, Product p);
}
