package com.edu.scci;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.edu.scci.service.BookMarketService;
import com.edu.scci.service.CustomerService;
import com.edu.scci.vo.BookVO;
import com.edu.scci.vo.CustomerVO;
import com.edu.scci.vo.OrderDetVO;
import com.edu.scci.vo.OrderVO;

@Controller
@RequestMapping("/bookMarket")
public class BookMarketController {
	@Autowired
	@Qualifier("bookMarketServiceImpl")
	BookMarketService bookService;
	
	@Resource
	CustomerService customerService;
	
	private static final Logger logger = LoggerFactory.getLogger(BookMarketController.class);
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String bookMarket(Model model) {
		List<CustomerVO> customers = customerService.getAllCustomers();
		List<BookVO> books = bookService.getAllBooks();
	    model.addAttribute("books", books);
		model.addAttribute("customers", customers );
		
	    return "bookMarket";
	}
	
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public String bookMarket(OrderVO order, Model model) {
		
		bookService.addOrder(order,order.getDetails());
		model.addAttribute("Result", "success");
		
	    return "bookMarket";
	}
}
