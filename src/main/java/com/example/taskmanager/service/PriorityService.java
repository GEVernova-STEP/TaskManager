package com.example.taskmanager.service;

import com.example.taskmanager.dto.CreatePriorityRequest;
import com.example.taskmanager.exception.PriorityNotFoundException;
import com.example.taskmanager.model.Priority;
import com.example.taskmanager.repository.PriorityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Business logic for priority management.
 */
@Service
@RequiredArgsConstructor
public class PriorityService {

    private final PriorityRepository priorityRepository;

    // Create new priority
    public Priority create(CreatePriorityRequest request) {

        Priority priority = Priority.builder()
                .name(request.getName())
                .level(request.getLevel())
                .build();

        return priorityRepository.save(priority);
    }

    // Get all priority list
    public List<Priority> getAll() {
        return priorityRepository.findAll();
    }

    //Get priority by id
    public Priority getById(Long id) {
        return priorityRepository.findById(id)
                .orElseThrow(() -> new PriorityNotFoundException(id));
    }

    //Delete priority
    public void delete(Long id) {
        priorityRepository.deleteById(id);
    }
}
