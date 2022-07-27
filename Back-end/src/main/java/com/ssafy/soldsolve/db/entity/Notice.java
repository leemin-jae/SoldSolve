package com.ssafy.soldsolve.db.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private int id;

    @Column(length=50)
    private String title;

    private String content;

    private Boolean isRead;

    @CreationTimestamp
    private Timestamp writtenTimes;
}
