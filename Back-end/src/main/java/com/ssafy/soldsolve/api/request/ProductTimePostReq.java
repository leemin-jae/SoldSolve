package com.ssafy.soldsolve.api.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;


@Getter
@Setter
public class ProductTimePostReq {

    private String no;
    private Timestamp time;


}
