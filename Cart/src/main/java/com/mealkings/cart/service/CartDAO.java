package com.mealkings.cart.service;

import com.mealkings.cart.entity.Cart;
import com.mealkings.cart.entity.CartItem;

import java.util.List;

public interface CartDAO {
    
    Cart getCartByUserId(Long userId);
    
    List<Cart> getAllCarts();
    
    void addItemToCart(Long customerId,  int item_id,  int quantity);
    
    void removeItemFromCart(Long userId, Long itemId);
    
    List<CartItem> viewCartItems(Long userId);
    
    void deleteCart(Long userId);
    
    public void updateCartQuantity(Long customerId, int itemId, int quantity);
}
