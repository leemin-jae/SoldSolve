package com.ssafy.soldsolve.api.request;

import com.ssafy.soldsolve.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.ManyToOne;

@Getter
@Setter
public class MessagePostReq {
    String id;
    String title;
    String content;
    String isRead;
    @ManyToOne
    User user;
}