package com.mealkings.OrderHistory.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.OrderHistory.entity.OrderHistory;

@Repository
public interface OrderHistoryRepository extends CrudRepository<OrderHistory, Integer>{}