package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.NoticePostReq;
import com.ssafy.soldsolve.db.entity.Notice;
import com.ssafy.soldsolve.db.entity.User;

import java.util.List;

public interface AdminService {
    // 유저 관련
    List<User> findAllUser();
    User getUserByUserId(String userId);
    void suspendUser(int userId);
    void recoverUser(int userId);
    void deleteUser(int userId);

    // 공지사항 관련
    List<Notice> findAll();
    Notice createNotice(NoticePostReq registerInfo);
    Notice getNotice(int noticeId);
    void updateNotice(NoticePostReq noticePostReq, int noticeId);
    void deleteNotice(int noticeId);
}
