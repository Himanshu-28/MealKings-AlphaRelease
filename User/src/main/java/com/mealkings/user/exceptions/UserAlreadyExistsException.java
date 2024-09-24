package com.mealkings.user.exceptions;

public class UserAlreadyExistsException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = -8399494761242842536L;

	public UserAlreadyExistsException(String email) {
        super("User with email " + email + " already exists.");
    }
}
