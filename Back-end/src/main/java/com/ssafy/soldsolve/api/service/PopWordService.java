package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.db.entity.PopWord;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.entity.Wish;

import java.util.List;

public interface PopWordService {

    void registWord(String title);

    List<PopWord> getList();

    void resetPopList();
}