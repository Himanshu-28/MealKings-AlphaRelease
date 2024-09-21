package com.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString

@Table(name = "Orders")
public class Order {

    @Id
    private Long orderId;

    private Long userId;
    private Long restaurantId;
    private Long quantity;
    private Long  totalAmount;
    private String orderStatus;
    private String paymentMethod;
    private String deliveryAddress;
    private String discountApplied;
    private Long discountAmount;
   
  
    
    long time= System.currentTimeMillis();
    

   
}

