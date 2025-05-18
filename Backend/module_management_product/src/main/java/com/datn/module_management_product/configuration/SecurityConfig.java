package com.datn.module_management_product.configuration;


import com.datn.module_management_product.exceptionhanding.CustomAccessDeniedHandler;
import com.datn.module_management_product.exceptionhanding.CustomBasicAuthenticationEntryPoint;
import com.datn.module_management_product.filter.JWTTokenValidatorFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrtConfig->csrtConfig.disable())
                .sessionManagement(sessionConfig->sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(new JWTTokenValidatorFilter(), BasicAuthenticationFilter.class)
                .authorizeHttpRequests((request)->request
                        .requestMatchers("/api/product/getProductByName/**",
                                "/api/product/getByPage/**",
                                "/Img/**",
                                "/api/product/detail/**",
                                "/api/product/related/**",
                                "/api/product/getByFilters/**",
                                "/api/product/getByFiltersAndSort/**",
                                "/api/feedback/product/**",
                                "/api/cart/create").permitAll()
                        .requestMatchers("/api/order/user-orders/**",
                                "/api/cartitem/**",
                                "/api/cart/getByUserId/**",
                                "/api/cart/getDetail/**").hasRole("User")
                        .requestMatchers("/api/feedback/create",
                                "/api/order/**").hasAnyRole("User", "Admin")
                        .requestMatchers("/api/**").hasRole("Admin")

                );
        http.formLogin(withDefaults());
        http.httpBasic(hbc->hbc.authenticationEntryPoint(new CustomBasicAuthenticationEntryPoint()));
        http.exceptionHandling(ehc->ehc.accessDeniedHandler(new CustomAccessDeniedHandler()));
        http.cors(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173","http://localhost:5174")); // đúng origin FE
        config.setAllowedMethods(List.of("GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}
