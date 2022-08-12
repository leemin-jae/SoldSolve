package com.ssafy.soldsolve.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
/**
 *  totalChat에 가장 최근 chat id 삽입
 *  Room 유저가 1명일 때는 자기가 보내는 chat 만 갱신, 다른 한명은 tatalchat 과 값이 다름 -> 안 읽은 메세지가 있음
 *  Room 유저가 2명일 때는 양쪽 chat 갱신
 */
public class RoomRead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int readId;

    private int buyerChat;

    private int sellerChat;

    private int totalChat;

    @OneToOne
    @JoinColumn(name = "roomid")
    @JsonIgnore
    private Room room;

}
