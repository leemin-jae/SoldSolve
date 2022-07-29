package com.ssafy.soldsolve.api.service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

import javax.mail.Message;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
public class MailSendService{
	@Autowired // context-mail에서 빈 등록했기 때문에 주입받을 수 있다. Spring에서 제공하는 MailSender.
	private JavaMailSenderImpl mailSender;

	public static String createKey() {
		StringBuffer key = new StringBuffer();
		Random rnd = new Random();

				for (int i = 0; i < 8; i++) { // 인증코드 8자리
					int index = rnd.nextInt(3); // 0~2 까지 랜덤

					switch (index) {
						case 0:
							key.append((char) ((int) (rnd.nextInt(26)) + 97));
							// a~z (ex. 1+97=98 => (char)98 = 'b')
							break;
						case 1:
							key.append((char) ((int) (rnd.nextInt(26)) + 65));
							// A~Z
							break;
						case 2:
				key.append((rnd.nextInt(10)));
				// 0~9
				break;
			}
		}

		return key.toString();
	}

	public String sendAuthMail(String mail) throws MessagingException, UnsupportedEncodingException {
		String authKey = createKey();
		MimeMessage mailMessage = mailSender.createMimeMessage();
		

		mailMessage.setSubject("soldsolve 인증 이메일", "utf-8"); // 메일 제목
		mailMessage.addRecipients(RecipientType.TO, mail); // 받는 사람(mail)
		
		mailMessage.setFrom(new InternetAddress("list3985@gmail.com","soldsolve"));//보내는 사람
		
		String msgg = "";
		msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 soldsolve입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다!<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= authKey+"</strong><div><br/> ";
        msgg+= "</div>";
		
		
		mailMessage.setText(msgg, "utf-8", "html");

		mailSender.send(mailMessage);

		return authKey;
	}


	public String sendPwMail(String mail) throws MessagingException, UnsupportedEncodingException {
		String authKey = createKey();
		MimeMessage mailMessage = mailSender.createMimeMessage();


		mailMessage.setSubject("soldsolve 임시 비밀번호", "utf-8"); // 메일 제목
		mailMessage.addRecipients(RecipientType.TO, mail); // 받는 사람(mail)

		mailMessage.setFrom(new InternetAddress("list3985@gmail.com","soldsolve"));//보내는 사람

		String msgg = "";
		msgg+= "<div style='margin:100px;'>";
		msgg+= "<h1> 안녕하세요 soldsolve입니다. </h1>";
		msgg+= "<br>";
		msgg+= "<p>임시 비밀번호가 발급되었습니다.<p>";
		msgg+= "<br>";
		msgg+= "<p>임시 비밀번호로 로그인 후 꼭 비밀번호를 변경해주세요<p>";
		msgg+= "<br>";
		msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
		msgg+= "<h3 style='color:blue;'>임시 비밀번호입니다.</h3>";
		msgg+= "<div style='font-size:130%'>";
		msgg+= "CODE : <strong>";
		msgg+= authKey+"</strong><div><br/> ";
		msgg+= "</div>";


		mailMessage.setText(msgg, "utf-8", "html");

		mailSender.send(mailMessage);

		return authKey;
	}
}
