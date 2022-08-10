package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.ProductPostReq;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.ProductImg;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.ProductImgRepository;
import com.ssafy.soldsolve.db.repository.ProductRepository;
import com.ssafy.soldsolve.db.repository.UserRepository;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductImgRepository productImgRepository;

    @Autowired
    FileService fileService;



    @Override
    public int registProduct(ProductPostReq product) {
        Product p = new Product();
        p.setCategory(product.getCategory());
        p.setContent(product.getContent());
        p.setPrice(product.getPrice());

        p.setRegion(product.getRegion());
        p.setTitle(product.getTitle());
        User user = userRepository.findByUserid(product.getUserId());
        p.setUser(user);

        return productRepository.save(p).getNo();
    }

    @Override
    public int updateProduct(String no , ProductPostReq product, List<MultipartFile> files) throws IOException {
        Product p = productRepository.findByNo(Integer.parseInt(no));

        if(p != null){
            if(files != null){
                for(ProductImg del : productImgRepository.findByNo(p)) {
                    productImgRepository.delete(del);
                }

                fileService.ListImageDir(files,p.getNo(), "productImg");
            }
            p.setCategory(product.getCategory());
            p.setContent(product.getContent());
            p.setPrice(product.getPrice());
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
        p.setProductImg(productImgRepository.findByNo(p));
        return p;
    }

    @Override
    public List<Product> searchProduct(String t, String c, String r) {

        return productRepository.findByTitleContainingAndCategoryContainingAndRegionContaining(t,c,r);
    }

    @Override
    public List<Product> getSellProduct(User user) {
        return productRepository.findByUser(user);
    }


}
