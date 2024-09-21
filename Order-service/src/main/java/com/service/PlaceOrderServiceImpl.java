package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.entity.Order;
import com.repo.OrderRepository;

public class PlaceOrderServiceImpl implements PlaceOrderService{
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private OrderRepository orderRepository;
	private Order order;
//	private Order order;
	
	@Override
	public Order placeOrder(Order order, Long userId) {
		order.setUserId(userId);
				
		return orderService.createOrder(order);

	}

	@Override
	public Order getOrderForUser(Long userId) {
		List<Order> orderList = orderService.getAllOrder();
		for( Order o:orderList) {
			if(o.getUserId()== userId) {
				return orderService.getOrderById(userId) ;
			}
		}
		
		return null;
	}

}
