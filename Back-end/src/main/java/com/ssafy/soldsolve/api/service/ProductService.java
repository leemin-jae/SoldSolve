package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.ProductPostReq;
import com.ssafy.soldsolve.db.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> searchAllProduct();

    List<Product> searchByNickNameProduct(String nickName);

    List<Product> searchByTitleProduct(String title);

    Product searchByNoProduct(int parseInt);

    int registProduct(ProductPostReq product);

    int updateProduct(ProductPostReq product);

    int deleteProduct(String no);
}
