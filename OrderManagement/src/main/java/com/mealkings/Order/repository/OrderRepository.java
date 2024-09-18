package com.mealkings.Order.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.Order.entity.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer>{}