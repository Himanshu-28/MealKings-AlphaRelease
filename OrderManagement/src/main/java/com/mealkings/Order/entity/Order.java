package com.mealkings.Order.entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "Order")
public class Order {
	
	@Id
	private int order_id;
	
	@OneToMany(mappedBy = "User")
	private int user_id;
	
	@OneToMany(mappedBy = "Restaurant")
	private int restaurant_id;
	
	private double totalAmount;
	private String orderStatus;
	private String paymentMethod;
	private Timestamp orderDate;
	private String deliverAddress;
	private boolean discuntApplied;
	private double discountAmount;
}