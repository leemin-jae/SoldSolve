package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.LiveCreatePostReq;
import com.ssafy.soldsolve.db.entity.*;
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
    @Autowired
    RequestRepository requestRepository;
    @Autowired
    MessageRepository messageRepository;

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

        List<Request> requestList = requestRepository.findAllByProduct(p).orElseGet(null);
        if (requestList!=null) {
            String productTitle = p.getTitle();
            String requestedNickname = p.getUser().getNickname();
            for (int i=0; i<requestList.size(); i++) {
                Message m = new Message();
                User requester = requestList.get(i).getUser();
                String log = String.format("%s님이 %s 상품 라이브를 시작했습니다!", requestedNickname, productTitle);
                // requestList 내 유저들을 대상으로 message 발송
                m.setUser(requester);
                m.setContent(log);
                m.setIsRead(false);
                messageRepository.save(m);
            }
        }

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
