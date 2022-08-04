package com.ssafy.soldsolve.api.controller;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/soldsolve")
public class testController {
	@GetMapping
	@ResponseBody
	public String a() {
		return "fo";
	}

	@GetMapping("1")
	public String b(HttpServletRequest request) {
		return "fo";
	}

	@PostMapping
	public String c(HttpServletRequest request) {
		return "fo";
	}

	@PostMapping("1")
	public String d(HttpServletRequest request) {
		return "fo";
	}
}
