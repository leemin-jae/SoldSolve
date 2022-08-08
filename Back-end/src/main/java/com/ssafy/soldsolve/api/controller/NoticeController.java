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

    // 공지 생성. title과 content Json형태로 Body에 넣어주기.
    @PostMapping("")
    public ResponseEntity<? extends BaseResponseBody> createNotice(@RequestBody NoticePostReq registerInfo) {
        noticeService.createNotice(registerInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 공지 수정 // api/v1/notices/notice_id를 적으면 notice_id를 기준으로 수정 가능. title과 content Json형태로 Body
    @PatchMapping("/{noticeId}")
    public ResponseEntity<?> updateNotice(
            @PathVariable int noticeId,
            @RequestBody NoticePostReq noticeInfo){
        noticeService.updateNotice(noticeInfo,noticeId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 공지 삭제 // 마찬가지로 notice_id를 기준으로 삭제 가능.
    @DeleteMapping("/{noticeId}")
    public ResponseEntity<?> deleteNotice(@PathVariable int noticeId){
        noticeService.deleteNotice(noticeId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}