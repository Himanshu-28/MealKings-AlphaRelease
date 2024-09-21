package com.service;

import com.entity.Order;

public interface PlaceOrderService {
	public Order placeOrder(Order order, Long userId);
	public Order getOrderForUser(Long userId);
}
