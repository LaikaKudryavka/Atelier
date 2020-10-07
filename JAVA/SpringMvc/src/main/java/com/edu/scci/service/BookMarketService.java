package com.edu.scci.service;

import java.util.List;

import com.edu.scci.vo.BookVO;
import com.edu.scci.vo.OrderDetVO;
import com.edu.scci.vo.OrderVO;

public interface BookMarketService {
	public List<BookVO> getAllBooks();
	public void addOrder(OrderVO order, List<OrderDetVO> orderDets);
}
