package com.mealkings.Discount.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.Discount.entity.Discount;
@Repository
public interface DiscountRepository extends CrudRepository<Discount, Integer> {}