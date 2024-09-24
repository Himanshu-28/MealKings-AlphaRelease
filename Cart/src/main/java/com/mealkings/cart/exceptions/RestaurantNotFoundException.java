package com.mealkings.cart.exceptions;

public class RestaurantNotFoundException extends RuntimeException {
    
    /**
	 * 
	 */
	private static final long serialVersionUID = -1607207901751539631L;

	public RestaurantNotFoundException(String message) {
        super(message);
    }
}
