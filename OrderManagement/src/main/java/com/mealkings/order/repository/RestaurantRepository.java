package com.mealkings.Order.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.Order.entity.Restaurant;

@Repository
public interface RestaurantRepository extends CrudRepository<Restaurant, Long>{}