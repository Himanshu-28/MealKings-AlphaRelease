package com.model;

import lombok.Data;

@Data
public class AddItemRequest {
    private int itemId;   // Use Long instead of int for item IDs
    private int quantity;
}
