package com.mealkings.InventoryManagement.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name = "Inventory")
public class Item {
	@Id
	private int item_id;
	private int restaurant_id;
	private String item_name;
	private int item_cost;
	private int quantity;
	private char food_class;
}
