package com.ssafy.soldsolve.api.request;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Data
//@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	//@ApiModelProperty(name="유저 ID", example="ssafy_web")
	String id;

	String userId;
	//@ApiModelProperty(name="유저 Password", example="your_password")
	String password;
	
	String userName;

	String nickName;
	
	String email;
}
