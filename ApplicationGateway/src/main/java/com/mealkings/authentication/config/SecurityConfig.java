package com.mealkings.authentication.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;

import com.mealkings.authentication.service.CustomUserDetailsService;
import com.mealkings.authentication.utils.CustomAuthenticationHandler;

import reactor.core.publisher.Mono;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

	@Autowired
	public CustomAuthenticationHandler authenticationHandler;

	@Autowired
	public CustomUserDetailsService detailsServiceImpl;
	

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(detailsServiceImpl).passwordEncoder(bCryptPasswordEncoder());
	}

    @SuppressWarnings("removal")
	@Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        http
            .authorizeExchange(auth -> auth
                .pathMatchers("/users/login").permitAll()
                .pathMatchers("/users/register").permitAll()
//                .pathMatchers("/restaurant/**").permitAll()
//                .pathMatchers("/customer/**").permitAll()   
                .pathMatchers("/restaurant/**").hasAuthority("Restaurant")
                .pathMatchers("/customer/**").hasAuthority("Customer")   
                .anyExchange().authenticated())
            .formLogin().and()
            .logout(logout -> logout.logoutUrl("/logout"));
        
        http.cors().disable().csrf().disable();
        return http.build();
    }
    
    @Bean
    public ReactiveAuthenticationManager reactiveAuthenticationManager() {
        return authentication -> {
            String username = authentication.getName();
            String password = authentication.getCredentials().toString();

            return Mono.just(detailsServiceImpl.loadUserByUsername(username))
                .filter(userDetails -> bCryptPasswordEncoder().matches(password, userDetails.getPassword()))
                .map(userDetails -> new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities()))
                .cast(Authentication.class) 
                .switchIfEmpty(Mono.error(new UsernameNotFoundException("User not found or invalid password")));
        };
    }
}
