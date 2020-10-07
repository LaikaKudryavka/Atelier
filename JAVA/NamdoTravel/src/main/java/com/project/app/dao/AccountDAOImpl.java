package com.project.app.dao;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.project.app.vo.AccountVO;

@Repository
public class AccountDAOImpl implements AccountDAO {
	@Inject
	private SqlSession sqlSession;
	
	@Override
	public int addAccount(AccountVO acc) {
		return sqlSession.insert("com.project.app.account.addAccount",acc);
	}
}
