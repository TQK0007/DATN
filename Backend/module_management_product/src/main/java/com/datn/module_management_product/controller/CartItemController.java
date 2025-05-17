package com.datn.module_management_product.controller;

import com.datn.module_management_product.dto.CartDTO.CartCreateUpdateDTO;
import com.datn.module_management_product.dto.CartItemDTO.CartItemCreateUpdateDTO;
import com.datn.module_management_product.entity.Cart;
import com.datn.module_management_product.entity.CartItem;
import com.datn.module_management_product.entity.Product;
import com.datn.module_management_product.mapper.CartItemMapper;
import com.datn.module_management_product.service.ICartItemService;
import com.datn.module_management_product.service.ICartService;
import com.datn.module_management_product.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cartitem")
@RequiredArgsConstructor
public class CartItemController {
    private final ICartItemService cartItemService;
    private final ICartService cartService;
    private final IProductService productService;

    @PostMapping("/create")
    public ResponseEntity<String> createCartItem(@RequestBody CartItemCreateUpdateDTO cartItemCreateUpdateDTO)
    {
        Cart cart = cartService.findById(cartItemCreateUpdateDTO.getCartId());
        Product product = productService.findById(cartItemCreateUpdateDTO.getProductId());
        CartItem cartItem = CartItemMapper.MapCartItemCreateUpdateDTOToCartItem(cartItemCreateUpdateDTO, cart, product);
        CartItem cartItemAdded = cartItemService.save(cartItem);
        if(cartItemAdded.getId()>0) return ResponseEntity.ok("Add success");
        return ResponseEntity.ok("Add fail");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCartItem(@RequestBody Map<String,Object> dataUpdate, @PathVariable(name = "id") int id) {
        CartItem cartItem = cartItemService.findById(id);
        cartItem.setQuality((int) dataUpdate.get("quality"));
        cartItemService.update(cartItem);
        return ResponseEntity.ok("Update success");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable(name = "id") int id) {
        CartItem cartItem = cartItemService.findById(id);
        cartItemService.delete(cartItem);
        return ResponseEntity.ok("Delete success");
    }

}
