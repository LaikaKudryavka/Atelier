package com.edu.scci.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.edu.scci.vo.BookVO;
import com.edu.scci.vo.OrderDetVO;
import com.edu.scci.vo.OrderVO;

@Repository
public class BookMarketDAOImpl implements BookMarketDAO {
	@Inject
	private SqlSession sqlSession;

	@Override
	public List<BookVO> getAllBooks() {
		// TODO Auto-generated method stub
		return sqlSession.selectList("com.edu.scci.book.getAllBooks");
		
	}

	@Override
	public int addOrder(OrderVO order) {
		// TODO Auto-generated method stub
		return sqlSession.insert("com.edu.scci.book.addOrder", order);
				
	}

	@Override
	public String getOrderId() {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("com.edu.scci.book.getOrdId");
	}

	@Override
	public int addDetail(OrderDetVO details) {
		// TODO Auto-generated method stub
		return sqlSession.insert("com.edu.scci.book.addDetails", details);
	}

}
