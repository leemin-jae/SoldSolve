package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.NoticePostReq;
import com.ssafy.soldsolve.db.entity.Notice;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.NoticeRepository;
import com.ssafy.soldsolve.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    NoticeRepository noticeRepository;

    @Override
    public Page<User> findAllUser(int page) {
        return userRepository.findAll(PageRequest.of(page, 10));
    }

    @Override
    public User getUserByUserId(String userId) {
        User user = userRepository.findByUserid(userId);
        if(user != null) {
            return user;
        }else {
            return null;
        }
    }

    @Override
    public void suspendUser(int userId) {
        User user = userRepository.findById(userId).orElseGet(null);
        user.setRole("ROLE_SUSPENDED");
    }
    // 유저 관련
    @Override
    public void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }


    // 공지 관련
    @Override
    public Notice getNotice(int noticeId) {
        return noticeRepository.findById(noticeId);
    }

    @Override
    public Page<Notice> findAll(int page) {
        return noticeRepository.findAll(PageRequest.of(page, 10, Sort.by("writtenTimes").descending()));
    }

    @Override
    public Notice createNotice(NoticePostReq registerInfo) {
        Notice notice = new Notice();
        notice.setTitle(registerInfo.getTitle());
        notice.setContent(registerInfo.getContent());
        return noticeRepository.save(notice);
    }

    @Override
    public void updateNotice(NoticePostReq noticePostReq, int noticeId) {
        Notice notice = noticeRepository.findById(noticeId);
        notice.setTitle(noticePostReq.getTitle());
        notice.setContent(noticePostReq.getContent());
        noticeRepository.save(notice);
    }

    @Override
    public void deleteNotice(int noticeId) {
        noticeRepository.delete(noticeRepository.getOne(noticeId));
    }
}