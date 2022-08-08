package com.ssafy.soldsolve.api.response;

import com.ssafy.soldsolve.db.entity.Notice;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeRes {
    String title;
    String content;

    public static NoticeRes of(Notice notice) {
        NoticeRes res = new NoticeRes();
        res.setTitle(notice.getTitle());
        res.setContent(notice.getContent());
        return res;
    }
}
