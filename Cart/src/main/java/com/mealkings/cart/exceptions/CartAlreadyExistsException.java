package com.mealkings.cart.exceptions;

public class CartAlreadyExistsException extends RuntimeException {
    
    /**
	 * 
	 */
	private static final long serialVersionUID = -4925214307243617069L;

	public CartAlreadyExistsException(String message) {
        super(message);
    }
}
