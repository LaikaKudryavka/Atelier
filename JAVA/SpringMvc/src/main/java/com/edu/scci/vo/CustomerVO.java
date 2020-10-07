package com.edu.scci.vo;

public class CustomerVO {
	private String custId;
	private String custNm;
	private String address;
	private String phone;

	public CustomerVO() {
		
	}
	
	public CustomerVO(String custId, String custNm, String address, String phone) {
		super();
		this.custId = custId;
		this.custNm = custNm;
		this.address = address;
		this.phone = phone;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getCustNm() {
		return custNm;
	}

	public void setCustNm(String custNm) {
		this.custNm = custNm;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}
