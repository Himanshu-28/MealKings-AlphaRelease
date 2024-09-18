package com.service;

import java.util.Optional;
import com.entity.User;

public interface UserService {
    User registerUser(User user);
    Optional<User> loginUser(String email, String password);
}
