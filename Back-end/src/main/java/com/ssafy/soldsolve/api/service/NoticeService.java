package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.NoticePostReq;
import com.ssafy.soldsolve.db.entity.Notice;
import org.springframework.data.domain.Page;

public interface NoticeService {
    Page<Notice> findAll(int page);
    Notice getNotice(int noticeId);
}
