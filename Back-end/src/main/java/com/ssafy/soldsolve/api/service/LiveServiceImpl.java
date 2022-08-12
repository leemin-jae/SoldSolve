package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.LiveCreatePostReq;
import com.ssafy.soldsolve.db.entity.Live;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LiveServiceImpl implements LiveService {


    @Autowired
    ProductRepository productRepository;
    @Autowired
    LiveRepository liveRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public String createLive(LiveCreatePostReq req, User user) {
        Live l = new Live();

        l.setContent(req.getContent());
        l.setSessionId(req.getSessionId());
        l.setTitle(req.getTitle());
        Product p = productRepository.findByNo(Integer.parseInt(req.getProductNo()));
        if(p.getUser().getId() != user.getId()){
            return null;
        }
        l.setProduct(p);


        return liveRepository.save(l).getSessionId();
    }

    @Override
    public Live getLive(String sessionId) {
        return liveRepository.findBySessionId(sessionId);
    }

    @Override
    public void deleteLive(String sessionId) {
        Live l = liveRepository.findBySessionId(sessionId);
        liveRepository.deleteById(l.getId());
    }

    @Override
    public List<Live> getList() {
        return liveRepository.findAll();
    }
}
