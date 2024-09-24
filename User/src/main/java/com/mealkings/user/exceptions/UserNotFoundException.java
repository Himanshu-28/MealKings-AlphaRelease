package com.mealkings.user.exceptions;

public class UserNotFoundException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = -7538680790518417818L;

	public UserNotFoundException(Long id) {
        super("User with ID " + id + " not found.");
    }
}
