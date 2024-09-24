package com.mealkings.Order.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
@Table(name = "MenuItems")
public class Item {
    
    @Id
    @GeneratedValue
    private int itemId;
    
    private String itemName;
    private String description;
    private int itemCost;
    private int quantity;
    private char category;

    // Foreign key to Restaurant
    @ManyToOne
    @JoinColumn(name = "restaurantId", nullable = false)
    @JsonBackReference(value = "restaurant-item")
    private Restaurant restaurant; // This will be the restaurant that owns this item
    
    // List of CartItems associated with this item (optional)
    @OneToMany(mappedBy = "item")
    @JsonManagedReference(value = "item-cartitems")
    private List<CartItem> cartItems;

	public Item(String item_name, String description, int item_cost, int quantity, char category) {
		super();
		this.itemName = item_name;
		this.description = description;
		this.itemCost = item_cost;
		this.quantity = quantity;
		this.category = category;
	}
    
    
}
