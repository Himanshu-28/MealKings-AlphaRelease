package com.mealkings.restaurant.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.restaurant.entity.Credentials;

@Repository
public interface CredentialsRepository extends CrudRepository<Credentials, Long> {}
