package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
