package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.OfferPostReq;
import com.ssafy.soldsolve.db.entity.Offer;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.OfferRepository;
import com.ssafy.soldsolve.db.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfferServiceImpl implements OfferService {

    @Autowired
    OfferRepository offerRepository;

    @Autowired
    ProductRepository productRepository;

    @Override
    public boolean createOffer(User user, int product, OfferPostReq Info) {
        Offer offer = new Offer();
        Product offeredProduct = productRepository.findByNo(product);
        if (offeredProduct != null) {
            offer.setProduct(offeredProduct);
            offer.setUser(user);
            offer.setPrice(Info.getPrice());
            offerRepository.save(offer);
            return true;
        }
        return false;
    }

    @Override
    public List<Offer> getOfferList(Product product) { return offerRepository.findAllByProduct(product).orElseGet(null);
    }
}
