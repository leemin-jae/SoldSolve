package com.ssafy.soldsolve.api.response;

import com.ssafy.soldsolve.db.entity.Message;
import com.ssafy.soldsolve.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.ManyToOne;

@Getter @Setter
public class MessageRes {
    String content;
    Boolean isRead;
    @ManyToOne
    User user;

    public static MessageRes of(Message message) {
        MessageRes res = new MessageRes();
        res.setContent(message.getContent());
        res.setIsRead(message.getIsRead());
        res.setUser(message.getUser());
        return res;
    }
}
