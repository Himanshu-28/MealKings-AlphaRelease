package com.mealkings.cart.exceptions;

public class CartNotFoundException extends RuntimeException {
    
    /**
	 * 
	 */
	private static final long serialVersionUID = -1607207901751539631L;

	public CartNotFoundException(String message) {
        super(message);
    }
}
