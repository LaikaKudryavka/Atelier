package com.project.app.service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.project.app.dao.AccountDAO;
import com.project.app.vo.AccountVO;

@Service
public class AccountServiceImpl implements AccountService{
	
	@Inject
	private AccountDAO accountDao;
	
	@Override
	public int addAccount(AccountVO acc) {
		return accountDao.addAccount(acc);
	}
}
