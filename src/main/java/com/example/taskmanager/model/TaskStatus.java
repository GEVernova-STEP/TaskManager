package com.example.taskmanager.model;

/**
 * Enum representing the lifecycle status of a Task.
 * Stored as STRING in database for readability and safety.
 */
public enum TaskStatus {

    PENDING,
    IN_PROGRESS,
    DONE

}
