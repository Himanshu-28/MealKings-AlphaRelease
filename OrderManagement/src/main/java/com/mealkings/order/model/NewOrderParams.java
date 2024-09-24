package com.mealkings.Order.model;

import com.mealkings.Order.entity.Order;

import lombok.Data;

@Data
public class NewOrderParams {
	public Order neworder;
	public long customer_id;
	public long restaurant_id;
	public long cart_id;
}
