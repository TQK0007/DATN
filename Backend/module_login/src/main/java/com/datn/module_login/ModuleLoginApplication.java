package com.datn.module_login;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(
				title = "Module Login",
				version = "1.0",
				description = "Module Login For Datn Microservice"
		)
)
public class ModuleLoginApplication {

	public static void main(String[] args) {
		SpringApplication.run(ModuleLoginApplication.class, args);
	}



}
