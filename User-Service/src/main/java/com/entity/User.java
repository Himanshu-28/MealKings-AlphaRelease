package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class User {

    @Id
    private Long userId;

    private String userName;
    private String userEmail;
    private String userPass;
    private String userAddress;
    private Long userContact;
    
    private Long orderId;
    

   
}

