package com.mealkings.Order.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mealkings.Order.entity.Order;
import com.mealkings.Order.exceptions.IDNotFoundException;

@Service
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	private OrderOps oservice;	

	@Override
	public List<Order> getActiveOrderByRestaurant(int restaurant_id) {
		return oservice.getActiveOrderByRestaurant(restaurant_id);
	}

	@Override
	public List<Order> getPastOrderByRestaurant(int restaurant_id) {
		return oservice.getPastOrderByRestaurant(restaurant_id);
	}
	
	@Override
	public List<Order> getActiveOrderByUser(int user_id) {
		return oservice.getActiveOrderByUser(user_id);
	}
	
	@Override
	public List<Order> getPastOrderByUser(int user_id) {
		return oservice.getPastOrderByUser(user_id);
	}

	@Override
	public void updateOrderStatus(int order_id, String status) throws IDNotFoundException {
		oservice.updateOrderStatus(order_id, status);
	}

}
