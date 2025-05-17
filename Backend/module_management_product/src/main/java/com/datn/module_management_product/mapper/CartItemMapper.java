package com.datn.module_management_product.mapper;

import com.datn.module_management_product.dto.CartDTO.CartResponseDTO;
import com.datn.module_management_product.dto.CartItemDTO.CartItemCreateUpdateDTO;
import com.datn.module_management_product.dto.CartItemDTO.CartItemResponseDTO;
import com.datn.module_management_product.entity.Cart;
import com.datn.module_management_product.entity.CartItem;
import com.datn.module_management_product.entity.Product;

public class CartItemMapper {

    public static CartItem MapCartItemCreateUpdateDTOToCartItem(CartItemCreateUpdateDTO cartItemCreateUpdateDTO, Cart cart, Product product) {
        CartItem cartItem = new CartItem();
        cartItem.setQuality(cartItemCreateUpdateDTO.getQuality());
        cartItem.setImage(cartItemCreateUpdateDTO.getImage());
        cartItem.setSize(cartItemCreateUpdateDTO.getSize());
        cartItem.setColor(cartItemCreateUpdateDTO.getColor());
        cartItem.setPrice(cartItemCreateUpdateDTO.getPrice());
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        return cartItem;
    }

    public static CartItemResponseDTO MapCartItemToCartItemResponseDTO(CartItem cartItem)
    {
        CartItemResponseDTO cartItemResponseDTO = new CartItemResponseDTO(
                cartItem.getId(),
                cartItem.getQuality(),
                cartItem.getImage(),
                cartItem.getSize(),
                cartItem.getColor(),
                cartItem.getPrice(),
                cartItem.getProduct().getName()
        );
        return cartItemResponseDTO;
    }
}
