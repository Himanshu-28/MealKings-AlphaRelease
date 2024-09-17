package com.mealkings.OrderHistory.service;

import java.util.List;

import com.mealkings.OrderHistory.entity.OrderHistory;

public interface OrderHistoryOps {
	public List<OrderHistory> getHistory(int user_id);
	public void addHistory(OrderHistory orderhistory);
}
