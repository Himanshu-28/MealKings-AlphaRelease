package com.service;

import java.util.List;

import com.entity.Order;

public interface OrderService {

	public Order createOrder(Order user);
	public List<Order> getAllOrder();
	 public Order getOrderById(Long id);
	 public void deleteOrder(Long id);
}
