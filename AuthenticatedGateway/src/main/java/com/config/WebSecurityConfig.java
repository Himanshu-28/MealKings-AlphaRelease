package com.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
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

import reactor.core.publisher.Mono;

@EnableWebFluxSecurity
@Configuration
@SuppressWarnings("removal")
public class WebSecurityConfig {

	@Autowired
	public ServerAuthenticationSuccessHandler authenticationHandler;

	@Autowired
	public CustomUserDetailsService detailsServiceImpl;
	

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(detailsServiceImpl).passwordEncoder(bCryptPasswordEncoder());
	}


	@Bean
	public SecurityWebFilterChain configure(ServerHttpSecurity http) throws Exception {
		http.authorizeExchange(auth -> 
				auth.pathMatchers( "/restaurant/**").permitAll()
				.pathMatchers("/customer/**").permitAll()
				.pathMatchers("/restaurant/**").permitAll()
				.pathMatchers("/order/**").permitAll()
				.pathMatchers("/cart/**").permitAll()
				.pathMatchers("/discount/**").permitAll()
				.anyExchange().authenticated())
				.formLogin(formLogin -> formLogin.authenticationSuccessHandler(authenticationHandler))
				.logout(logout -> logout.logoutUrl("/logout"))
				.csrf(csrf->csrf.disable())
				.cors()
				.and()
				.exceptionHandling(eh->eh
				.accessDeniedHandler((exchange,e)->{
					exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                    return exchange.getResponse().setComplete();
				}));
				
		
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
