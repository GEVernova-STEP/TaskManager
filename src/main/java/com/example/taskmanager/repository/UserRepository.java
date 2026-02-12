package com.example.taskmanager.repository;

import com.example.taskmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for User entity.
 * Handles database operations for users table.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email — used for validation checks.
    Optional<User> findByEmail(String email);
}
