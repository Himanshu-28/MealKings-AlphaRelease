package com.mealkings.authentication.exceptions;

public class InvalidPasswordException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 5002103278370153739L;

	public InvalidPasswordException(String message) {
        super("INVALID CREDENTIALS");
    }
}
