package com.mealkings.Discount.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@Entity
@Table(name = "Discount")
public class Discount {
	
	@Id
	@GeneratedValue
	private int discountId;
	
	@Column(unique = true)
	private String discountCode;
	
	@Column(nullable = false)
	private String discountPercentage;
	
	@Column(nullable = false)
	private boolean isActive;
	
	@Column(nullable = false)
	private Timestamp startDate;
	
	@Column(nullable = false)
	private Timestamp endDate;
	
	public Discount(String discountCode, String discountPercentage, boolean isActive, Timestamp startDate,
			Timestamp endDate) {
		super();
		this.discountCode = discountCode;
		this.discountPercentage = discountPercentage;
		this.isActive = isActive;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	
}
