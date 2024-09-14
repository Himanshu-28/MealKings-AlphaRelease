package com.mealkings.restaurant.repository;

import org.springframework.data.repository.CrudRepository;

import com.mealkings.restaurant.entity.Restaurant;

public interface RestaurantRepository extends CrudRepository<Restaurant, Integer> {}
