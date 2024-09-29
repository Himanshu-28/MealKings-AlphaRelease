package com.mealkings.authentication.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.mealkings.authentication.entity.Credentials;
import com.mealkings.authentication.repository.UserRepository;

import jakarta.transaction.Transactional;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String loginCred) throws UsernameNotFoundException {
        Credentials user = userRepository.findByEmail(loginCred)
                            .or(() -> userRepository.findByUsername(loginCred))
                            .orElseThrow(() -> new UsernameNotFoundException("User not found with creds: " + loginCred));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), // Use userName for the principal
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(user.getRole()))
        );
    }
}