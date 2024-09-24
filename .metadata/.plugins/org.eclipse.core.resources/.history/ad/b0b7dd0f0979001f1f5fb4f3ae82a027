package com.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import com.entity.Cart;
import com.entity.CartItems;
import com.model.Menu;
import com.repository.CartItemsRepository;
import com.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    CartRepository cartRepository;
    @Autowired
    CartItemsRepository cartItemsRepository;

    // Add item to cart
    public void addItemToCart(String itemName, Integer quantity, Long userId) {
        // Retrieve or create cart
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            Menu menuItem = getMenuItem(itemName);
            cart = new Cart(menuItem.getRestaurantId(), userId);
            cartRepository.save(cart);
        }
        
        // Retrieve item details
        Menu menuItem = getMenuItem(itemName);
        Double totalPrice = menuItem.getPrice() * quantity;

        // Check if item already exists in the cart, update if found
        CartItems cartItem = cartItemsRepository.findByCartAndItemId(cart, menuItem.getRestaurantId());
     
        if (cartItem != null) {
        	 if(quantity<=menuItem.getQuantity()) {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItem.setTotalPrice(cartItem.getQuantity() * menuItem.getPrice());
        	 }else {
        		System.out.println("The max quantity of item is "+menuItem.getQuantity()+menuItem.getName());
        	 }
        } else {
            // Pass the Cart object instead of cartId
        	if(quantity<=menuItem.getQuantity()) {
            cartItem = new CartItems(menuItem.getRestaurantId(), cart, quantity, totalPrice);
        	}else {
        		System.out.println("The max quantity of item is else part "+menuItem.getQuantity()+menuItem.getName());
        	}
        }

        // Save cart item
        cartItemsRepository.save(cartItem);
    }

    // View all items in the cart
    public List<CartItems> viewAllItemsInCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart != null) {
            return cartItemsRepository.findByCart(cart);
        }
        return java.util.Collections.emptyList();
    }

    // Update cart item quantity
    public void updateCartItem(Long userId, Long itemId, Integer quantity) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart != null) {
            CartItems cartItem = cartItemsRepository.findByCartAndItemId(cart, itemId);
            if (cartItem != null) {
                Menu menuItem = getMenuById(itemId);
                if(quantity<=menuItem.getQuantity()) {
                cartItem.setQuantity(quantity);
                cartItem.setTotalPrice(quantity * menuItem.getPrice());
                cartItemsRepository.save(cartItem);
                }else {
                	System.out.println("The max quantity of this "+menuItem.getName()+" is "+menuItem.getQuantity());
                }
                
            }
        }
    }

    // Remove item from cart
    public void removeItemFromCart(Long userId, Long itemId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart != null) {
            CartItems cartItem = cartItemsRepository.findByCartAndItemId(cart, itemId);
            if (cartItem != null) {
                cartItemsRepository.delete(cartItem);
            }
        }
    }

    // Delete cart and associated cart items by userId
    @Transactional
    public void deleteCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart != null) {
            cartRepository.delete(cart);  // Cascade delete will remove associated CartItems
        }
    }

    // Helper method to get item by name
    private Menu getMenuItem(String itemName) {
        return Menu.getDummyMenu().stream()
                .filter(m -> m.getName().equals(itemName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
    }

    // Helper method to get item by ID
    private Menu getMenuById(Long itemId) {
        return Menu.getDummyMenu().stream()
                .filter(m -> m.getRestaurantId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }
}
