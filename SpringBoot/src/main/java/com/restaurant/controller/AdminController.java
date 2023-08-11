package com.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.pojo.Admin;
import com.restaurant.service.AdminService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	AdminService adminService;

	@PostMapping("/register")
	public String registerAdmin(@RequestBody Admin admin) {
		Admin testAdmin1 = adminService.getAdminByEmail(admin.getEmail());
		if (testAdmin1 != null)
			return "Email already exists!";
		Admin testAdmin2 = adminService.getAdminByEmployeeId(admin.getEmployeeId());
		if (testAdmin2 != null)
			return "Employee ID already exists!";
		adminService.registerAdmin(admin);
		return "Registered Successfully! login to continue";
	}
	
	@PostMapping("/login")
	public String loginAdminCheck(@RequestBody Admin admin) {
		return adminService.checkAdminCredentials(admin.getEmail(),admin.getPassword());
	}
	
	@GetMapping("/employeeId/{adminEmployeeId}")
	public Admin getAdminByEmployeeId(@PathVariable String adminEmployeeId) {
		adminEmployeeId= adminEmployeeId.substring(1, adminEmployeeId.length()-1);
		return adminService.getAdminByEmployeeId(adminEmployeeId);
	}
	
	@PutMapping("/update")
	public String updateAdmin(@RequestBody Admin admin) {
		if(adminService.updateAdmin(admin)!=null)
		return "done";
		return "0";
	}
}
