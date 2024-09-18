package com.mealkings.Discount.entity;

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
@Table(name = "Discount")
public class Discount {
	
	@Id
	private int discountId;
	private String discountCode;
	private String discountPercentage;
	private boolean isActive;
	private Timestamp startDate;
	private Timestamp endDate;
}
