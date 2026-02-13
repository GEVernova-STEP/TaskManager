package com.example.taskmanager.service;

import com.example.taskmanager.dto.CreateUserRequest;
import com.example.taskmanager.exception.UserNotFoundException;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service layer for User business logic
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // Create new user from DTO
    public User createUser(CreateUserRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .createdAt(LocalDateTime.now())
                .build();

        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by id
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
