package com.mealkings.cart.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@Entity
@ToString
@Table(name = "Credentials")
public class Credentials {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
   
    @Column(nullable = false)
    private String role;

    @OneToOne(mappedBy = "credentials", cascade = CascadeType.REMOVE)
    @JsonBackReference(value = "customer-creds")
    private Customer customer;

    @OneToOne(mappedBy = "credentials", cascade = CascadeType.REMOVE)
    @JsonBackReference(value = "restaurant-creds")
    private Restaurant restaurant;

    public Credentials(String username, String email, String password, String role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}