package com.ssafy.soldsolve.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.FetchType.LAZY;

/**
 * 채팅 기록
 */
@Entity
@Data
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chatId;

    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp chatDate;

    @Column(length = 200)
    private String chatContent;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_pk")
    private User writeUser;

    private boolean isRead;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "roomId")
    @JsonIgnore
    private Room room;
}