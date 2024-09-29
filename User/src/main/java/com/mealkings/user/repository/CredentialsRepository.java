package com.mealkings.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.user.entity.Credentials;

@Repository
public interface CredentialsRepository extends JpaRepository<Credentials, Long> {}
