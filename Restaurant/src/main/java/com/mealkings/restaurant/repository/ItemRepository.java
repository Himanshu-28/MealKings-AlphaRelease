package com.mealkings.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.restaurant.entity.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {}
