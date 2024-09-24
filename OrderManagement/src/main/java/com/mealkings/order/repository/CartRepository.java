package com.mealkings.Order.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.Order.entity.Cart;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long>{}