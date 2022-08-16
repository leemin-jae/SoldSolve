package com.ssafy.soldsolve.api.service;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.soldsolve.api.request.ProductPostReq;
import com.ssafy.soldsolve.db.entity.*;
import com.ssafy.soldsolve.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
    @Autowired
    RequestRepository requestRepository;
    @Autowired
    MessageService messageService;
    @Autowired
    WishRepository wishRepository;
    @Autowired
    LiveRepository liveRepository;
    @Autowired
    OfferRepository offerRepository;
    @Autowired
    DealRepository dealRepository;
    @Autowired
    TagRepository tagRepository;
    @Autowired
    TagProductRepository tagProductRepository;


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

        for(String tag : product.getTag()){
            Tag t = tagRepository.findByName(tag);
            if(t == null){
                t = new Tag();
                t.setName(tag);
                tagRepository.save(t).getId();
            }
            TagProduct tp = new TagProduct();
            tp.setProduct(p);
            tp.setTag(t);
            tagProductRepository.save(tp);
        }
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
        Product p = productRepository.findByNo(Integer.parseInt(no));
        List<Request> requestList = requestRepository.findAllByProduct(p).orElseGet(null);
        if (requestList!=null) {
            for (int i=0; i<requestList.size(); i++) {
                requestRepository.delete(requestList.get(i));
            }
        }
        List<Wish> wishList = wishRepository.findAllByProduct(p).orElseGet(null);
        if (wishList!=null) {
            for (int j=0; j<wishList.size(); j++) {
                wishRepository.delete(wishList.get(j));
            }
        }
        Live live = liveRepository.findByProduct(p);
        if (live!=null) {
            liveRepository.delete(live);
        }
        List<Offer> offerList = offerRepository.findAllByProduct(p).orElseGet(null);
        if (offerList!=null) {
            for (int i=0; i<offerList.size(); i++) {
                offerRepository.delete(offerList.get(i));
            }
        }
        List<Deal> dealList = dealRepository.findAllByProduct(p).orElseGet(null);
        if (dealList!=null) {
            for (int i=0; i<dealList.size(); i++) {
                dealRepository.delete(dealList.get(i));
            }
        }
        productRepository.delete(productRepository.getOne(Integer.parseInt(no)));
        return 0;
    }

    @Override
    public Product getProduct(String no) {
        Product p = productRepository.getOne(Integer.parseInt(no));
        p.setViewCount(p.getViewCount()+1);
        productRepository.save(p);


        p.setProductImg(productImgRepository.findByNo(p));

        return p;
    }

    @Override
    public Product getProductByNo(int no) {
        Product product = productRepository.findById(no).orElseGet(null);
        return product;
    }

    @Override
    public List<Product> searchProduct(String t, String c, String r) {

        return productRepository.findByTitleContainingAndCategoryContainingAndRegionContaining(t,c,r);
    }

    @Override
    public List<Product> getSellProduct(User user) {
        return productRepository.findByUser(user);
    }

    @Override
    public String setLiveTime(Timestamp time, String no) {

        Product p = productRepository.findByNo(Integer.parseInt(no));
        System.out.println(time);
        p.setLiveTime(time);
        productRepository.save(p);

        List<Request> l = requestRepository.findByProduct(p);
        if(l != null) {
            for (Request r : l) {
                String log = messageService.liveTimeLog(r.getProduct());
                messageService.createLog(r.getUser(), log);
            }
        }

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        return simpleDateFormat.format(p.getLiveTime());
    }

    @Override
    public List<Product> searchTagProduct(String tag) {
        Tag t = tagRepository.findByName(tag);
        List<Product> productList = null;
        if(t == null){
            return null;
        }else{
            List<TagProduct> l = tagProductRepository.findByTag(t);
            productList = new ArrayList<>();
            for(TagProduct tp : l){
                productList.add(tp.getProduct());
            }
        }

        return productList;
    }


}
