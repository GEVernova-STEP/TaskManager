package com.example.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

/**
 * DTO for creating priority level.
 */
@Getter
@Setter
public class CreatePriorityRequest {

    @NotBlank(message = "Priority name is required")
    private String name;

    @NotNull(message = "Priority level is required")
    private Integer level;
}
