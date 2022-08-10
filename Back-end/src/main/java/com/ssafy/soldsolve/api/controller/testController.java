package com.ssafy.soldsolve.api.controller;

import com.ssafy.soldsolve.api.request.ChatMessage;
import com.ssafy.soldsolve.api.request.ProductPostReq;
import com.ssafy.soldsolve.api.service.FileService;
import com.ssafy.soldsolve.api.service.ProductService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.db.entity.Chat;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.repository.ChatRepository;
import com.ssafy.soldsolve.db.repository.RoomRepository;
import com.ssafy.soldsolve.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/soldsolve")
public class testController {
	@GetMapping
	public void a() {

		Room room =  roomRepository.findById(2).orElse(null);

	}

	@Autowired
	ChatRepository MessageRepository;

	@Autowired
	RoomRepository roomRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	FileService fileService;

	@Autowired
	ProductService productService;

	//      /pub/chat/message/
	@PostMapping("/chat/message/")
	public void message(@RequestBody ChatMessage message) {
		Chat chat = new Chat();
		chat.setChatContent(message.getMessage());
		Room r = roomRepository.getOne(message.getRoomId());
		System.out.println(r.getRoomId());
		chat.setRoom(r);
		chat.setWriteUser(userRepository.findByUserid(message.getSender()));
		MessageRepository.save(chat);

		System.out.println("sdfsdfsad" + message.getRoomId());

//        chat.setChatContent(message.getMessage());
//        chat.setChatFrom(message.getSender());
//        chatRepository.save(chat);

	}


	@PostMapping("/test")
	public ResponseEntity<?> testregistProduct(@RequestPart("files") List<MultipartFile> file, @RequestPart("data") ProductPostReq product, Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		product.setUserId(userId);
		try {
			int number = productService.registProduct(product);
			fileService.ListImageDir(file,number, "productImg");

			return new ResponseEntity<Product>(productService.getProduct(Integer.toString(number)), HttpStatus.OK);


		} catch (Exception e) {
			return new ResponseEntity<String>("등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
