package com.mealkings.authentication.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
    private  UserDetailsService userDetailsService;


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
    	auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
    }

    @Bean
    public SecurityFilterChain securityFilterChain1(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
							                .requestMatchers("/users/register").permitAll()
							                .anyRequest().authenticated())
            .csrf(csrf -> csrf
            				.ignoringRequestMatchers("/users/register"))
            .formLogin(formLogin -> formLogin
            							.defaultSuccessUrl("/users/success", true))
            .logout(logout -> logout
            					.logoutRequestMatcher(new AntPathRequestMatcher("/logout")))
            .exceptionHandling(eh -> eh
            						.accessDeniedPage("/ad"));

        return http.build();
    }
    
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/users/").permitAll() // Public access
//                .requestMatchers("/customer/**").hasAuthority("Customer") // Customer role required
//                .requestMatchers("/restaurant/**").hasAuthority("Restaurant") // Restaurant role required
//                .requestMatchers("/admin/**").hasAuthority("Admin") // Administrator role required
//                .anyRequest().authenticated() // All other requests require authentication
//            )
//            .csrf(csrf -> csrf
//                .ignoringRequestMatchers("/users/**")) // CSRF protection is ignored for public endpoints
//            .formLogin(formLogin -> formLogin
//                .defaultSuccessUrl("/success", true) // Redirect to dashboard after login
//            )
//            .logout(logout -> logout
//                .logoutUrl("/logout") // URL for logging out
//                .logoutSuccessUrl("/login") // Redirect after logout
//            )
//            .exceptionHandling(eh -> eh
//                .accessDeniedPage("/ad")); // Custom access denied page
//
//        return http.build();
//    }
}
