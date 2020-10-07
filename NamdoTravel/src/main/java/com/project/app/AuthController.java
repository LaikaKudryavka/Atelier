package com.project.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.project.app.service.AccountService;
import com.project.app.vo.AccountVO;

/**
 * Handles requests for the application home page.
 */

@Controller
@RequestMapping(value="/auth")
public class AuthController {
	
	@Autowired
	@Qualifier("AccountServiceImpl")
	AccountService accountService;
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(Model model) {
		return "login";
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String register(Model model) {
		return "register";
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public String registerAccount(@ModelAttribute AccountVO account, Model model) {
		accountService.addAccount(account);
				
		return "login";
	}
}
