package com.mealkings.order.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.order.entity.Customer;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long>{}