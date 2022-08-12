package com.ssafy.soldsolve.api.request;

import lombok.Data;

@Data
public class ReviewPostReq {
    double score;
    String content;
}
