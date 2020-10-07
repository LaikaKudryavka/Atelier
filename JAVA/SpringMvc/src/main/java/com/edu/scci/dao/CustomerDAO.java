package com.edu.scci.dao;

import java.util.List;
import java.util.Map;

import com.edu.scci.vo.CustomerVO;

public interface CustomerDAO {
	public List<CustomerVO> getAllCustomer();
	public Map<String, String> getOrderAmtByCustId(String custId);
	public int addCustomer(CustomerVO cust);
}
