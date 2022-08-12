package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.NoticePostReq;
import com.ssafy.soldsolve.db.entity.Notice;
import org.springframework.data.domain.Page;

import java.util.List;

public interface NoticeService {
    List<Notice> findAll();
    Notice getNotice(int noticeId);
}
