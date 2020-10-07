package com.edu.scci.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.edu.scci.dao.BookMarketDAO;
import com.edu.scci.service.BookMarketService;
import com.edu.scci.vo.BookVO;
import com.edu.scci.vo.OrderDetVO;
import com.edu.scci.vo.OrderVO;

@Service
public class BookMarketServiceImpl implements BookMarketService{
	
	@Inject
	private BookMarketDAO bookMarketDao;
	
	@Override
	public List<BookVO> getAllBooks() {
		// TODO Auto-generated method stub
		return bookMarketDao.getAllBooks();
	}

	@Override
	public void addOrder(OrderVO order, List<OrderDetVO> orderDets) {
		String ordId = bookMarketDao.getOrderId();
		order.setOrdId(ordId);
		bookMarketDao.addOrder(order);
		for(int i=0; i<orderDets.size(); i++) {
			OrderDetVO det = orderDets.get(i);
			det.setOrdId(ordId);
			det.setUnitPrice(10000);
			bookMarketDao.addDetail(det);
		}
	}
}