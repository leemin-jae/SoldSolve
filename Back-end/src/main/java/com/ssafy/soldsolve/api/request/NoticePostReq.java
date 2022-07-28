package com.ssafy.soldsolve.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticePostReq {
    String id;
    String title;
    String content;
    Boolean isRead;
}