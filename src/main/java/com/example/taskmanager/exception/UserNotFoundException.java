package com.example.taskmanager.exception;

/**
 * Thrown when user is not found in database.
 */
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(Long id) {
        super("User not found with id: " + id);
    }
}
