package com.ssafy.soldsolve.db.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.FetchType.LAZY;

@Entity
@Data
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    public int id;

    @Column(length=50)
    private String title;

    private String content;

    @CreationTimestamp
    private Timestamp writtenTimes;

    private Boolean isRead;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_pk")
    private User user;
}
