package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.Request;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.ProductRepository;
import com.ssafy.soldsolve.db.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestServiceImpl implements RequestService {

    @Autowired
    RequestRepository requestRepository;
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Request> getRequest(User user) {
        return requestRepository.findAllByUser(user).orElseGet(null);
    }

    @Override
    public boolean checkRequest(User user, int product) {
        Product requestedProduct = productRepository.findByNo(product);
        int check = requestRepository.countByUserAndProduct(user, requestedProduct);
        if (check == 0) return false;
        else return true;
    }

    @Override
    public void createRequest(User user, int product) {
        Request request = new Request();
        Product requestedProduct = productRepository.findByNo(product);
        request.setProduct(requestedProduct);
        request.setUser(user);
        if (requestRepository.countByUserAndProduct(user, requestedProduct) == 0) {
            requestRepository.save(request);
        }
        else return;
    }

    @Override
    public void deleteRequest(User user, int product) {
        Product requestedProduct = productRepository.findByNo(product);
        Request request = requestRepository.findByUserAndProduct(user, requestedProduct).orElse(null);
        requestRepository.delete(request);
    }

    @Override
    public List<Request> getUserList(Product p) {
        return requestRepository.findAllByProduct(p).orElseGet(null);
    }
}