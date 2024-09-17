package com.mealkings.OrderHistory.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mealkings.OrderHistory.entity.OrderHistory;
import com.mealkings.OrderHistory.repository.OrderHistoryRepository;

@Component
public class OrderHistoryOpsImpl implements OrderHistoryOps {
	
	@Autowired
	private OrderHistoryRepository ohrepo;	

	@Override
	public List<OrderHistory> getHistory(int user_id) {
		Iterable<OrderHistory> allOrders = ohrepo.findAll();
		
		List<OrderHistory> reqdOrderHistory = new ArrayList<OrderHistory>();
		
		for(OrderHistory order:allOrders)
			if (order.getUser_id()==user_id)
				reqdOrderHistory.add(order);
		return reqdOrderHistory;
	}

	@Override
	public void addHistory(OrderHistory orderhistory) {
		ohrepo.save(orderhistory);
	}

}
