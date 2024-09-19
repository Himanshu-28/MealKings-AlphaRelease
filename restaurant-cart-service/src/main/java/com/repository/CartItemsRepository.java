package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Cart;
import com.entity.CartItems;

@Repository
public interface CartItemsRepository extends JpaRepository<CartItems, Long> {
    List<CartItems> findByCart(Cart cart);  // Use Cart entity as parameter
    CartItems findByCartAndItemId(Cart cart, Long itemId); // Use Cart entity as parameter
}
