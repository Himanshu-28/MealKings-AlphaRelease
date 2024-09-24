package com.mealkings.cart.service;

import com.mealkings.cart.entity.Cart;
import com.mealkings.cart.entity.CartItem;
import com.mealkings.cart.entity.Item;
import com.mealkings.cart.exceptions.CartNotFoundException;
import com.mealkings.cart.exceptions.CustomerNotFoundException;
import com.mealkings.cart.exceptions.ItemNotFoundException;
import com.mealkings.cart.exceptions.QuantityNotAvailableException;
import com.mealkings.cart.exceptions.RestaurantNotFoundException;
import com.mealkings.cart.exceptions.CartAlreadyExistsException;
import com.mealkings.cart.repository.CartRepository;
import com.mealkings.cart.repository.CustomerRepository;
import com.mealkings.cart.repository.ItemRepository;
import com.mealkings.cart.repository.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartImpl implements CartDAO {

    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private ItemRepository itemRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public Cart createCart(Long customer_id, Long restaurant_id) {

        Cart existingCart = cartRepository.findByCustomer_CustomerId(customer_id);
        if (existingCart != null) {
            throw new CartAlreadyExistsException("Cart already exists for user ID: " + customer_id);
        }
        
        Cart cart = new Cart();
        
        cart.setCustomer(customerRepository.findById(customer_id).orElseThrow(()->new CustomerNotFoundException(customer_id+" not found!")));
        cart.setItems(new ArrayList<CartItem>());
        cart.setRestaurant(restaurantRepository.findById(restaurant_id).orElseThrow(()->new RestaurantNotFoundException(restaurant_id+" not found!")));
        
        return cartRepository.save(cart);
    }

    @Override
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByCustomer_CustomerId(userId);
    }

    @Override
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    @Override
    public void addItemToCart( Long customerId,  int item_id,  int quantity) {
    	Item item = itemRepository.findById(item_id).orElseThrow(() -> new ItemNotFoundException(item_id+" does not exist!"));
        Cart cart = cartRepository.findByCustomer_CustomerId(customerId);
        
        if (cart == null)
            throw new CartNotFoundException("Cart not found for user ID: " + customerId);
        
        if(item.getQuantity() < quantity)
        	throw new QuantityNotAvailableException("Quantity requested is not available");
        
        CartItem citem = new CartItem();
        
        citem.setCart(cart);
        citem.setItem(item);
        citem.setQuantity(quantity);
        citem.setTotalPrice(quantity*item.getItemCost());

        cart.getItems().add(citem);
        cartRepository.save(cart);
    }

    @Override
    public void removeItemFromCart(Long userId, Long itemId) {
        Cart cart = cartRepository.findByCustomer_CustomerId(userId);
        if (cart == null) {
            throw new CartNotFoundException("Cart not found for user ID: " + userId);
        }

        cart.getItems().removeIf(item -> item.getId() == itemId);
        cartRepository.save(cart);
    }

    @Override
    public List<CartItem> viewCartItems(Long userId) {
        Cart cart = cartRepository.findByCustomer_CustomerId(userId);
        
        if (cart == null)
            throw new CartNotFoundException("Cart not found for user ID: " + userId);
            
        return cart.getItems();
    }

	@Override
	public void deleteCart(Long userId) {
		Cart cart = cartRepository.findByCustomer_CustomerId(userId);
		cartRepository.delete(cart);
	}
}
