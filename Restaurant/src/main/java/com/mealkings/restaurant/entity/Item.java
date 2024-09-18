package com.mealkings.restaurant.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
@Table(name = "MenuItems")
public class Item {
	
	@Id
	private int item_id;
	
	@OneToMany(mappedBy = "Restaurant")
	private int restaurant_id;
	
	private String item_name;
	private String description;
	private int item_cost;
	private int quantity;
	private char category;
}
