package com.example.taskmanager.exception;

public class PriorityNotFoundException extends RuntimeException {

    public PriorityNotFoundException(Long id) {
        super("Priority not found with id: " + id);
    }
}
