package com.ssafy.soldsolve.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/soldsolve")
public class testController {
	@GetMapping
	public String a(HttpServletRequest request) {

		System.out.println(request.getServletContext());
		String path = System.getProperty("user.dir");
		System.out.println(path);
		return "fo";
	}
}
