package com.restaurant.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.pojo.Admin;

public interface AdminRepo extends JpaRepository<Admin, Long> {

	Admin findByEmail(String email);

	Admin findByEmployeeId(String employeeId);

	Admin findByEmailAndPassword(String email, String password);

}
