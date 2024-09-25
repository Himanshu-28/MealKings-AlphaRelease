package com.mealkings.order.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.order.entity.Cart;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long>{}