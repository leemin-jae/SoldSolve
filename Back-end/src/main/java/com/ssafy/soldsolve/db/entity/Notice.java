package com.ssafy.soldsolve.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @CreationTimestamp
    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp writtenTimes;
}
