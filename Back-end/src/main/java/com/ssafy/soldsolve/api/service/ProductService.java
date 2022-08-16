package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.ProductPostReq;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;

public interface ProductService {



    int registProduct(ProductPostReq product);

    int updateProduct(String no, ProductPostReq product, List<MultipartFile> files) throws IOException;

    int deleteProduct(String no);

    Product getProduct(String no);

    Product getProductByNo(int no);

    List<Product> searchProduct(String t, String c, String r);

    List<Product> getSellProduct(User user);

    String setLiveTime(Timestamp time, String no);

    List<Product> searchTagProduct(String tag);
}
