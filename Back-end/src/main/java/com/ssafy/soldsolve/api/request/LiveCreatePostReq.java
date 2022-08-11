package com.ssafy.soldsolve.api.request;


import lombok.Data;


@Data
public class LiveCreatePostReq {

	String sessionId;

	String title;

	String content;
	
	String productNo;

}
