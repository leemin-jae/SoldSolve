package com.ssafy.soldsolve.api.controller;

import com.ssafy.soldsolve.api.request.NoticePostReq;
import com.ssafy.soldsolve.api.response.NoticeRes;
import com.ssafy.soldsolve.api.service.AdminService;
import com.ssafy.soldsolve.api.service.PopWordService;
import com.ssafy.soldsolve.api.service.UserService;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.Notice;
import com.ssafy.soldsolve.db.entity.PopWord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pop")
public class PopController {

    @Autowired
    PopWordService popWordService;

    @GetMapping("")
    public ResponseEntity<?> getPopList(){
        try {
            List<PopWord> pw = popWordService.getList();
            if(pw == null){
                return ResponseEntity.status(200).body(BaseResponseBody.of(400, "잘못된 요청입니다"));
            }
            else if(pw.size() == 0){
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "검색어가 없습니다"));
            }
            else{
                return ResponseEntity.status(200).body(pw);
            }
        }catch (Exception e){
            return ResponseEntity.status(200).body(BaseResponseBody.of(500, "Fail"));
        }
    }

    @PatchMapping("")
    public ResponseEntity<?> resetPopList(){
        try{
            popWordService.resetPopList();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "초기화 완료"));
        }catch (Exception e){
            return ResponseEntity.status(200).body(BaseResponseBody.of(500, "Fail"));
        }
    }
}
