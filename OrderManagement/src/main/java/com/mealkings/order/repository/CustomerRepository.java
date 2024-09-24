package com.mealkings.Order.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.Order.entity.Customer;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long>{}