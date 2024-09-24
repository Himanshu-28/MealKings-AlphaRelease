package com.model;
public class User {
    private Long userId;
    private String mobileNo;
    private String address;

    // Constructors, Getters, Setters

    public User(Long userId, String mobileNo, String address) {
        this.userId = userId;
        this.mobileNo = mobileNo;
        this.address = address;
    }

    public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	// Dummy user for testing
    public static User getDummyUser() {
        return new User(1L, "1234567890", "123 Main St, City");
    }
}
