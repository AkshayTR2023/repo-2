package com.restaurant.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.pojo.Category;

public interface CategoryRepo extends JpaRepository<Category, Long > {

	public Category findByName(String categoryName);

}
