package com.example.taskmanager.service;

import com.example.taskmanager.dto.CreateTaskRequest;
import com.example.taskmanager.dto.UpdateTaskStatusRequest;
import com.example.taskmanager.exception.CategoryNotFoundException;
import com.example.taskmanager.exception.PriorityNotFoundException;
import com.example.taskmanager.exception.TaskNotFoundException;
import com.example.taskmanager.exception.UserNotFoundException;
import com.example.taskmanager.model.*;
import com.example.taskmanager.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Core business logic for Task operations.
 */
@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PriorityRepository priorityRepository;

    //Create task with relationship validation.
    public Task createTask(CreateTaskRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException(request.getUserId()));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException(request.getCategoryId()));

        Priority priority = priorityRepository.findById(request.getPriorityId())
                .orElseThrow(() -> new PriorityNotFoundException(request.getPriorityId()));

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .status(TaskStatus.PENDING)
                .user(user)
                .category(category)
                .priority(priority)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return taskRepository.save(task);
    }

    //Get all task
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    //Get task by id
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    //Delete task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    //Update task status
    public Task updateStatus(Long taskId, UpdateTaskStatusRequest request) {

        Task task = getTaskById(taskId);

        task.setStatus(request.getStatus());
        task.setUpdatedAt(LocalDateTime.now());

        return taskRepository.save(task);
    }
}
