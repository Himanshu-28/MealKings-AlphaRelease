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
import com.mealkings.cart.repository.CartItemRepository;
import com.mealkings.cart.repository.CartRepository;
import com.mealkings.cart.repository.CustomerRepository;
import com.mealkings.cart.repository.ItemRepository;
import com.mealkings.cart.repository.RestaurantRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class CartImpl implements CartDAO {
	
	@Autowired
	private CartItemRepository citemRepo;

    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private ItemRepository itemRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private RestaurantRepository restaurantRepository;

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
        {
        	 cart = new Cart();
             
             cart.setCustomer(customerRepository.findById(customerId).orElseThrow(()->new CustomerNotFoundException(customerId+" not found!")));
             cart.setItems(new ArrayList<CartItem>());
             cartRepository.save(cart);
        }
        
        List<CartItem> cartitems = cart.getItems();
        
        for(CartItem citem: cartitems)
        {
        	if(citem.getItem() == item)
        	{
        		if(citem.getQuantity()+quantity > item.getQuantity())
                	throw new QuantityNotAvailableException("Quantity requested is not available");
        		
        		cart.getItems().remove(citem);
        		
        		citem.setQuantity(citem.getQuantity()+quantity);
        		citem.setTotalPrice(citem.getQuantity()*citem.getItem().getItemCost());
        		
        		cart.getItems().add(citem);
        		cartRepository.save(cart);
        		return;
        	}
        }
        
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
    
    @Transactional
    @Override
    public void removeItemFromCart(Long userId, Long itemId) {
    	Cart cart = cartRepository.findByCustomer_CustomerId(userId);
    	
    	CartItem item = citemRepo.findByCartAndItem_itemId(cart, itemId);
    	citemRepo.delete(item);
    }
    
    @Transactional
    public void checkEmpty(Long customerId) {
    	Cart cart = cartRepository.findByCustomer_CustomerId(customerId);
    	if(cart.getItems().isEmpty())
    		cartRepository.deleteById(cart.getCart_id());
    }

    @Override
    public List<CartItem> viewCartItems(Long userId) {
        Cart cart = cartRepository.findByCustomer_CustomerId(userId);
        
        if (cart == null)
            throw new CartNotFoundException("Cart not found for user ID: " + userId);
            
        return cart.getItems();
    }
    
    public void updateCartQuantity(Long customerId, int itemId, int quantity) {
    	Item item = itemRepository.findById(itemId).orElseThrow(() -> new ItemNotFoundException(itemId+" does not exist!"));
        Cart cart = cartRepository.findByCustomer_CustomerId(customerId);
        
        if (cart == null)
        	throw new CartNotFoundException("Cart does not exist");
        
        List<CartItem> cartitems = cart.getItems();
        
        for(CartItem citem: cartitems)
        {
        	if(citem.getItem() == item)
        	{
        		if(quantity > item.getQuantity())
                	throw new QuantityNotAvailableException("Quantity requested is not available");
        		
        		cart.getItems().remove(citem);
        		
        		citem.setQuantity(quantity);
        		citem.setTotalPrice(citem.getQuantity()*citem.getItem().getItemCost());
        		
        		cart.getItems().add(citem);
        		cartRepository.save(cart);
        		return;
        	}
        }
        throw new ItemNotFoundException("Item does not exist in cart!");
    }

	@Override
	public void deleteCart(Long userId) {
		Cart cart = cartRepository.findByCustomer_CustomerId(userId);
		cartRepository.delete(cart);
	}
}
