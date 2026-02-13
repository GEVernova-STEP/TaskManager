package com.example.taskmanager.controller;

import com.example.taskmanager.dto.CreateTaskRequest;
import com.example.taskmanager.dto.UpdateTaskStatusRequest;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for Task APIs.
 */
@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    //Create Task
    @PostMapping
    public ResponseEntity<Task> create(@Valid @RequestBody CreateTaskRequest request) {
        return ResponseEntity.ok(taskService.createTask(request));
    }

    //Get all task
    @GetMapping
    public ResponseEntity<List<Task>> getAll() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    //Get task by id
    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    //Update task status
    @PutMapping("/{id}/status")
    public ResponseEntity<Task> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTaskStatusRequest request) {

        return ResponseEntity.ok(taskService.updateStatus(id, request));
    }

    //Delete task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
