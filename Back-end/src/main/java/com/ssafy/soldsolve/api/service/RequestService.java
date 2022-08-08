package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.db.entity.Request;
import com.ssafy.soldsolve.db.entity.User;

import java.util.List;

public interface RequestService {
    List<Request> getRequest(User user);
    void createRequest(User user, int product);
    boolean checkRequest(User user, int product);
    void deleteRequest(User user, int product);
}
