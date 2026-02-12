package com.example.taskmanager.repository;

import com.example.taskmanager.model.Priority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for Priority entity.
 */
@Repository
public interface PriorityRepository extends JpaRepository<Priority, Long> {

    Optional<Priority> findByName(String name);
}
