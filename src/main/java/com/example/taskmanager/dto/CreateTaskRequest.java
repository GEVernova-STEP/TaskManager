package com.example.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * DTO used when creating a task.
 * Only IDs are passed for relationships.
 */
@Getter
@Setter
public class CreateTaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private LocalDate dueDate;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @NotNull(message = "Priority ID is required")
    private Long priorityId;
}
