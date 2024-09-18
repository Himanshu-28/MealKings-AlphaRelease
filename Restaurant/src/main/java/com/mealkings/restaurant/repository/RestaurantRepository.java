package com.mealkings.restaurant.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.restaurant.entity.Restaurant;

@Repository
public interface RestaurantRepository extends CrudRepository<Restaurant, Integer> {}
