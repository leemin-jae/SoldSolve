package com.ssafy.soldsolve.api.service;

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
public class PopWordServiceImpl implements PopWordService {

    @Autowired
    PopWordRepository popWordRepository;


    @Override
    public void registWord(String title) {
        for (String token : title.split(" ")){
            PopWord pop = popWordRepository.findByTitle(token);
            if(pop != null){
                pop.setCount(pop.getCount() + 1);
            }else{
                pop = new PopWord();
                pop.setCount(1);
                pop.setTitle(token);
            }
            popWordRepository.save(pop);
        }
    }

    @Override
    public List<PopWord> getList() {
        return  popWordRepository.findAllOrderByCountDesc();
    }

    @Override
    public void resetPopList() {
        List<PopWord> pw = popWordRepository.findAll();

        for(int i = 0 ; i < pw.size(); i++){
            PopWord p = pw.get(i);
            p.setCount(0);
        }
        popWordRepository.saveAll(pw);

    }
}
