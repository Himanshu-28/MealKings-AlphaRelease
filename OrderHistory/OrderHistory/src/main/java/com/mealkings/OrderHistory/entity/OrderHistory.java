package com.mealkings.OrderHistory.entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Order_History")
public class OrderHistory {
	
	@Id
	private int order_id;
	private int user_id;
	private int restaurant_id;
	private String order_items;
	private double cost;
	private Timestamp timestamp;
}
