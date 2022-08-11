package com.ssafy.soldsolve.api.controller;

import com.ssafy.soldsolve.api.request.NoticePostReq;
import com.ssafy.soldsolve.api.response.NoticeRes;
import com.ssafy.soldsolve.api.service.NoticeService;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.Notice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 공지 관련 요청 처리를 위한 컨트롤러 정의.
 */
//@Api(value="Notice API", tags={"Notice"})
@RestController
@RequestMapping("/api/notices")
public class NoticeController {
    @Autowired
    NoticeService noticeService;

    // 공지 조회
    @GetMapping("")
    public ResponseEntity<?> selectNotice(@RequestParam(name="page") int page) {
        return ResponseEntity.status(200).body(noticeService.findAll(page));
    }

    // 특정 공지 조회
    @GetMapping("/{noticeId}")
    public ResponseEntity<?> choiceNotice(@PathVariable int noticeId) {
        Notice notice = noticeService.getNotice(noticeId);
        return ResponseEntity.status(200).body(NoticeRes.of(notice));
    }
}