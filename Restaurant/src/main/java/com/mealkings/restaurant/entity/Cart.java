package com.mealkings.restaurant.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Cart")
public class Cart {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cart_id;

    @OneToOne
    @JoinColumn(name = "restaurantId", nullable = false)
    @JsonManagedReference(value = "restaurant-cart")
    private Restaurant restaurant;

    @OneToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
    @JsonManagedReference(value = "customer-cart")
    private Customer customer;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "cart-cartitems")
    private List<CartItem> items; // List of CartItems associated with this cart
}

