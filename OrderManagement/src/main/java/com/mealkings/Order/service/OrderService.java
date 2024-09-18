package com.mealkings.Order.service;

import java.util.List;

import com.mealkings.Order.entity.Order;
import com.mealkings.Order.exceptions.IDNotFoundException;

public interface OrderService {
	
	public List<Order> getActiveOrderByRestaurant(int restaurant_id);
	
	public List<Order> getPastOrderByRestaurant(int restaurant_id);
	
	public List<Order> getActiveOrderByUser(int user_id);
	
	public List<Order> getPastOrderByUser(int user_id);
	
	public void updateOrderStatus(int order_id, String status) throws IDNotFoundException;
}
