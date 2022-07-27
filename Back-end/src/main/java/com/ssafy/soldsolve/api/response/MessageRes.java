package com.ssafy.soldsolve.api.response;

import com.ssafy.soldsolve.db.entity.Message;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MessageRes {
    String title;
    String content;
    Boolean isRead;

    public static MessageRes of(Message message) {
        MessageRes res = new MessageRes();
        res.setTitle(message.getTitle());
        res.setContent(message.getContent());
        res.setIsRead(message.getIsRead());
        return res;
    }
}
