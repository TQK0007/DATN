package com.datn.module_management_product.controller;

import com.datn.module_management_product.dto.CartDTO.CartCreateUpdateDTO;
import com.datn.module_management_product.dto.CartDTO.CartResponseDTO;
import com.datn.module_management_product.entity.Cart;
import com.datn.module_management_product.mapper.CartMapper;
import com.datn.module_management_product.service.ICartItemService;
import com.datn.module_management_product.service.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final ICartService cartService;
    private final ICartItemService cartItemService;

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody CartCreateUpdateDTO cartCreateUpdateDTO)
    {
        Cart cart = CartMapper.MapCartCreateUpdateDTOToCart(cartCreateUpdateDTO);
        Cart cartAdded = cartService.save(cart);
        if(cartAdded.getId()>0) return ResponseEntity.ok("Add success");
        return ResponseEntity.ok("Add fail");
    }

    @GetMapping("/getByUserId/{userId}")
    public ResponseEntity<Map<String, Integer>> getCartByUserId( @PathVariable(name = "userId") int userId) {
        Cart cart = cartService.findAll().stream().filter(c -> c.getUserId() == userId).findFirst().orElse(null);
        if (cart == null) return ResponseEntity.ok(null);
        return ResponseEntity.ok(Map.of("cartId", cart.getId()));
    }

    @GetMapping("/getDetail/{id}")
    public ResponseEntity<CartResponseDTO> getDetail(@PathVariable(name = "id") int id) {
        Cart cart = cartService.findById(id);
        if(cart == null) return ResponseEntity.ok(null);
        CartResponseDTO cartResponseDTO = CartMapper.MapCartToCartResponseDTO(cart);
        return ResponseEntity.ok(cartResponseDTO);
    }
}
