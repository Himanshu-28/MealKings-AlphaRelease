package com.mealkings.InventoryManagement.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.InventoryManagement.entity.Item;

@Repository
public interface ItemRepository extends CrudRepository<Item, Integer> {}
