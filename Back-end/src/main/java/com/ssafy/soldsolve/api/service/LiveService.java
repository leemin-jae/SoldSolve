package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.LiveCreatePostReq;
import com.ssafy.soldsolve.db.entity.Live;
import com.ssafy.soldsolve.db.entity.User;

import java.util.List;

public interface LiveService {

    String createLive(LiveCreatePostReq req, User user);

    Live getLive(String sessionId);

    void deleteLive(String sessionId);

    List<Live> getList();
}
