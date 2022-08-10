package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.ProductPostReq;
import com.ssafy.soldsolve.db.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {



    int registProduct(ProductPostReq product);

    int updateProduct(String no, ProductPostReq product, List<MultipartFile> files) throws IOException;

    int deleteProduct(String no);

    Product getProduct(String no);

    List<Product> searchProduct(String t, String c, String r);
}
