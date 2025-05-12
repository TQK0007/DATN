package com.datn.module_management_product.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadPath = (System.getProperty("user.dir") + File.separator + "uploaded_images").replace("\\", "\\\\");
        registry.addResourceHandler("/Img/**")
                .addResourceLocations("file:" + uploadPath);
    }
}
