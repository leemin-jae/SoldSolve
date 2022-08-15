package com.ssafy.soldsolve.api.service;


import com.ssafy.soldsolve.db.entity.PopWord;
import com.ssafy.soldsolve.db.repository.PopWordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PopWordServiceImpl implements PopWordService {

    @Autowired
    PopWordRepository popWordRepository;


    @Override
    public void registWord(String title) {
        for (String token : title.split(" ")){
            if(token.equals("")){
                continue;
            }
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
        return  popWordRepository.findAllByOrderByCountDesc();
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
