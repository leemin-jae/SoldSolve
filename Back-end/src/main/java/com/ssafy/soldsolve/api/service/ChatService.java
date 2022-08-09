package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.db.entity.Chat;

import java.util.List;

public interface ChatService {
    List<Chat> getChat(int no);
}
