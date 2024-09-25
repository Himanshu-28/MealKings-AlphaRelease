package com.mealkings.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.user.entity.Credentials;
import com.mealkings.user.entity.Customer;

@Repository
public interface CredentialsRepository extends JpaRepository<Credentials, Long> {}
