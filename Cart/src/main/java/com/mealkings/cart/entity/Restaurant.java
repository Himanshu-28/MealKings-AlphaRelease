package com.mealkings.cart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@ToString
@Table(name = "Restaurant")
public class Restaurant {
    
    @Id
    private long restaurantId;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String mobileNo;
    
    @Column(nullable = false)
    private String address;
    
    @Column(nullable = false)
    private byte ratings;
    
    @Column(nullable = false)
    private boolean isActive;

    @OneToOne
    @MapsId
    @JoinColumn(name = "restaurantId", referencedColumnName = "restaurantId", nullable = false)
    @JsonManagedReference(value = "restaurant-creds")
    private Credentials credentials;

    // One restaurant can have many items
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "restaurant-item")
    
    private List<Item> items; // This will hold all the items related to the restaurant
    
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "restaurant-order")
    private List<Order> order;

    public Restaurant(String name, String mobile_no, String address, byte ratings, boolean isActive,
                      Credentials credentials) {
        super();
        this.name = name;
        this.mobileNo = mobile_no;
        this.address = address;
        this.ratings = ratings;
        this.isActive = isActive;
        this.credentials = credentials;
    }
}
