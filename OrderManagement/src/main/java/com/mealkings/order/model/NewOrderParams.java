package com.mealkings.order.model;

import com.mealkings.order.entity.Order;

import lombok.Data;

@Data
public class NewOrderParams {
	public Order neworder;
	public long customer_id;
	public long restaurant_id;
	public long cart_id;
}
