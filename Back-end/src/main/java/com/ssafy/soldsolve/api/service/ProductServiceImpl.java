package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.ProductPostReq;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.ProductRepository;
import com.ssafy.soldsolve.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> searchAllProduct() {
        return productRepository.findAll();
    }


    @Override
    public List<Product> searchByTitleProduct(String title) {
        return productRepository.findByTitleContains(title);
    }


    @Override
    public int registProduct(ProductPostReq product) {
        Product p = new Product();
        p.setCategory(product.getCategory());
        p.setContent(product.getContent());
        p.setPrice(product.getPrice());
        p.setProductImg(product.getProductImg());
        p.setRegion(product.getRegion());
        p.setTitle(product.getTitle());
        User user = userRepository.findByUserid(product.getUserId());
        p.setUser(user);

        return productRepository.save(p).getNo();
    }

    @Override
    public int updateProduct(String no , ProductPostReq product) {
        Product p = productRepository.findByNo(Integer.parseInt(no));

        if(p != null){
            p.setCategory(product.getCategory());
            p.setContent(product.getContent());
            p.setPrice(product.getPrice());
            p.setProductImg(product.getProductImg());
            p.setRegion(product.getRegion());
            p.setTitle(product.getTitle());
            productRepository.save(p);
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public int deleteProduct(String no) {
        productRepository.delete(productRepository.getOne(Integer.parseInt(no)));
        return 0;
    }

    @Override
    public Product getProduct(String no) {
        Product p = productRepository.getOne(Integer.parseInt(no));
        p.setViewCount(p.getViewCount()+1);
        productRepository.save(p);
        return p;
    }

    @Override
    public List<Product> searchByCateforyProduct(String category, String title) {
        String t = "";
        if(title != null){
            t = title;
        }
        return productRepository.findByCategoryAndTitleContains(category, t);
    }
}
