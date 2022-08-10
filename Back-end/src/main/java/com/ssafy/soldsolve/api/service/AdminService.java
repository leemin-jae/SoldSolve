package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.NoticePostReq;
import com.ssafy.soldsolve.db.entity.Notice;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.data.domain.Page;

public interface AdminService {
    // 유저 관련
    Page<User> findAllUser(int page);
    User getUserByUserId(String userId);
    void suspendUser(int userId);
    void deleteUser(int userId);

    // 공지사항 관련
    Page<Notice> findAll(int page);
    Notice createNotice(NoticePostReq registerInfo);
    Notice getNotice(int noticeId);
    void updateNotice(NoticePostReq noticePostReq, int noticeId);
    void deleteNotice(int noticeId);
}
