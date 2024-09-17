package com.mealkings.OrderHistory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mealkings.OrderHistory.entity.OrderHistory;

@Service
public class OrderHistoryServiceImpl implements OrderHistoryService {
	
	@Autowired
	private OrderHistoryOps ohservice;	

	@Override
	public List<OrderHistory> getHistory(int user_id) {
		return ohservice.getHistory(user_id);
	}

	@Override
	public void addHistory(OrderHistory orderhistory) {
		ohservice.addHistory(orderhistory);
	}

}
