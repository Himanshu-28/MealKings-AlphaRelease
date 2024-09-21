package com.exceptions;

public class OrderAlreadyExistsException extends RuntimeException {
    public OrderAlreadyExistsException(Long long1) {
        super("Order with id " + long1 + " already exists.");
    }
}
