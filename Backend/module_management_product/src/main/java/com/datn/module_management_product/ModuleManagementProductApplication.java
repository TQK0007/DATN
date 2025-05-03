package com.datn.module_management_product;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class ModuleManagementProductApplication {

	public static void main(String[] args) {
		SpringApplication.run(ModuleManagementProductApplication.class, args);
	}
}
