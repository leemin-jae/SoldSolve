package com.ssafy.soldsolve.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    // 메시지 타입 : 입장, 채팅
    public enum MessageType {
        ENTER, TALK, JOIN;
    }
    private MessageType type; // 메시지 타입
    private int roomId; // 방번호
    private String sender; // 메시지 보낸사람
    private String message; // 메시지
}