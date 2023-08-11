package com.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.pojo.Admin;
import com.restaurant.repo.AdminRepo;

@Service
public class AdminService {
	@Autowired
	AdminRepo adminRepo;

	public Admin getAdminByEmail(String email) {
		return adminRepo.findByEmail(email);
	}

	public void registerAdmin(Admin admin) {
		adminRepo.save(admin);
	}

	public Admin getAdminByEmployeeId(String employeeId) {
		return adminRepo.findByEmployeeId(employeeId);
	}

	public String checkAdminCredentials(String email, String password) {
		Admin admin = adminRepo.findByEmailAndPassword(email, password);
		if (admin == null)
			return "invalid";
		else
			return admin.getEmployeeId();
	}

	public Admin updateAdmin(Admin admin) {
		return adminRepo.save(admin);
	}
}
