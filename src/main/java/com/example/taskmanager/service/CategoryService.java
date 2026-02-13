package com.example.taskmanager.service;

import com.example.taskmanager.dto.CreateCategoryRequest;
import com.example.taskmanager.exception.CategoryNotFoundException;
import com.example.taskmanager.model.Category;
import com.example.taskmanager.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Business logic for category operations
 */
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    // Create new category
    public Category create(CreateCategoryRequest request) {

        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        return categoryRepository.save(category);
    }

    // Get all category
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    // Get category by Id
    public Category getById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    // Delete Category
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
