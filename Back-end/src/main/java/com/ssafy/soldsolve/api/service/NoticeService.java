package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.NoticePostReq;
import com.ssafy.soldsolve.db.entity.Notice;

public interface NoticeService {
    Notice createNotice(NoticePostReq registerInfo);
    Notice getNotice(int noticeId);
    void updateNotice(NoticePostReq noticePostReq, Notice notice);
    void deleteNotice(int noticeId);

    void readNotice(NoticePostReq noticePostReq, Notice notice);
}
