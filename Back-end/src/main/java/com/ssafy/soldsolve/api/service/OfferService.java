package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.OfferPostReq;
import com.ssafy.soldsolve.db.entity.Offer;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;

import java.util.List;

public interface OfferService {
    boolean createOffer(User user, int product, OfferPostReq Info);
    List<Offer> getOfferList(Product product);
}
