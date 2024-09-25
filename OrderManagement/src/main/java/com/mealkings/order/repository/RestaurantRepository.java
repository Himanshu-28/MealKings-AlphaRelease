package com.mealkings.order.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.order.entity.Restaurant;

@Repository
public interface RestaurantRepository extends CrudRepository<Restaurant, Long>{}