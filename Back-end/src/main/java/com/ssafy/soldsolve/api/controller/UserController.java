package com.ssafy.soldsolve.api.controller;

import com.ssafy.soldsolve.api.service.MailSendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ssafy.soldsolve.api.request.UserRegisterPostReq;
import com.ssafy.soldsolve.api.response.UserRes;
import com.ssafy.soldsolve.api.service.UserService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.User;


/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */

/**
 * 	post 요청 시에
 	UserRegisterPostReq 안의
 	userId, password, userName, nickName, email을 받아서 사용

 	get 요청 시에
 	해당 변수를 params로 받아서 사용


 	Authentication authentication
 	로그인 후 생성되는 엑세스 토큰이 헤더에 등록되어 있으면 자동으로 사용
 */
@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final String SUCCESS = "success";
	private final String FAIL = "fail";
	
	@Autowired
	UserService userService;

	@Autowired
	MailSendService mailSendService;


	@PostMapping()
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody  UserRegisterPostReq registerInfo) {
		
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.createUser(registerInfo);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, SUCCESS));
	}
	
	@GetMapping("/me")
	public ResponseEntity<UserRes> getUserInfo(Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		
		return ResponseEntity.status(200).body(UserRes.of(user));
	}
	
	@GetMapping("/check/id")
	public ResponseEntity<?> getIdCheck(@RequestParam String userId){
		User user = userService.getUserByUserId(userId);
		
		if(user == null) {
			return new ResponseEntity<String>(user.getUserid(), HttpStatus.OK);
		}else {
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}
		
	}

	@GetMapping("/check/password")
	public ResponseEntity<?> getPasswordCheck(@RequestParam String password, Authentication authentication){

		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();

		if(userService.getPasswordCheck(userId, password)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}else {
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/check/email")
	public ResponseEntity<?> getEmailCheck(@RequestParam String email){
		if(userService.getEmailCheck(email)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}else {
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}

	}



	@PatchMapping("/update/password")
	public ResponseEntity<? extends BaseResponseBody> updateUserPassword(
			@RequestBody UserRegisterPostReq info,
			Authentication authentication) {

		String password = info.getPassword();
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();

		userService.updateUserPassword(userId, password);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, SUCCESS));
	}




	@PatchMapping("/update/userinfo")
	public ResponseEntity<? extends BaseResponseBody> updateUserNickName(
			@RequestBody UserRegisterPostReq info,
			Authentication authentication) {

		String nickName = info.getNickName();
		String password = info.getPassword();
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		userService.updateUserUserInfo(userId , password , nickName);


		return ResponseEntity.status(200).body(BaseResponseBody.of(200, SUCCESS));
	}

	@DeleteMapping()
	public ResponseEntity<? extends BaseResponseBody> deleteUser(Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		int Id = userDetails.getUser().getId();
		userService.deleteUser(Id);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, SUCCESS));
	}



	@GetMapping("/mail/auth")
	public ResponseEntity<String> mailAuth(@RequestParam String email) throws Exception {

		String authKey = mailSendService.sendAuthMail(email); //사용자가 입력한 메일주소로 메일을 보냄
		return new ResponseEntity<String>(authKey, HttpStatus.OK);
	}



	@PatchMapping("/mail/password")
	public ResponseEntity<String> temporaryPw(@RequestBody UserRegisterPostReq userInfo) throws Exception {

		String userName = userInfo.getUserName();
		String userId = userInfo.getId();
		String userEmail = userInfo.getEmail();

		User user = userService.getUserByUserIdAndEmailAndUserName(userId,userEmail,userName);

		if(user != null) {
			String temporaryPwd = mailSendService.sendPwMail(userEmail);
			userService.updateUserPassword(userId, temporaryPwd);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}else {
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}

	}


	@GetMapping("confirm/id")
	public ResponseEntity<?> getId(@RequestParam String userName, @RequestParam String email){
		User user = userService.getUserByUserNameAndUserEmail(userName,email);
		String userId = user.getUserid();
		//userId.
		if(user == null) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}else {
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}

	}



}
