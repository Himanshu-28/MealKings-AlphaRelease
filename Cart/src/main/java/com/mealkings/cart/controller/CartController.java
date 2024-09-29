package com.mealkings.cart.controller;

import com.mealkings.cart.entity.Cart;
import com.mealkings.cart.entity.CartItem;
import com.mealkings.cart.service.CartImpl;
import com.model.AddItemRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartImpl cartService;

    @GetMapping("/{customerId}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable Long customerId) {
        Cart cart = cartService.getCartByUserId(customerId);
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/{customerId}/items")
    public ResponseEntity<List<CartItem>> viewCartItems(@PathVariable Long customerId) {
        List<CartItem> items = cartService.viewCartItems(customerId);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/{customerId}/item")
    public ResponseEntity<Void> addItemToCart(@PathVariable Long customerId, @RequestBody AddItemRequest request) {
        cartService.addItemToCart(customerId, request.getItemId(), request.getQuantity());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{customerId}/items/{itemId}")
    public ResponseEntity<Void> updateItemQuantity(@PathVariable Long customerId, @PathVariable int itemId, @RequestBody int quantity) {
        cartService.updateCartQuantity(customerId, itemId, quantity);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{customerId}/items/{itemId}")
    public ResponseEntity<Void> removeItemFromCart(@PathVariable Long customerId, @PathVariable Long itemId) {
    	cartService.removeItemFromCart(customerId, itemId);
    	cartService.checkEmpty(customerId);
    	return ResponseEntity.ok().build();
    }
}
