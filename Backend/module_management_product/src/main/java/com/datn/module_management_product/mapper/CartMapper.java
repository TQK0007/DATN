package com.datn.module_management_product.mapper;

import com.datn.module_management_product.dto.CartDTO.CartCreateUpdateDTO;
import com.datn.module_management_product.dto.CartDTO.CartResponseDTO;
import com.datn.module_management_product.dto.CartItemDTO.CartItemResponseDTO;
import com.datn.module_management_product.entity.Cart;

import java.util.List;

public class CartMapper {

    public static Cart MapCartCreateUpdateDTOToCart(CartCreateUpdateDTO cartCreateUpdateDTO) {
        Cart cart = new Cart();
        cart.setUserId(cartCreateUpdateDTO.getUserId());
        return cart;
    }

    public static CartResponseDTO MapCartToCartResponseDTO(Cart cart)
    {
        List<CartItemResponseDTO> cartItemResponseDTOS = cart.getCartItems().stream().map(cartItem -> CartItemMapper.MapCartItemToCartItemResponseDTO(cartItem)).toList();
        CartResponseDTO cartResponseDTO = new CartResponseDTO(
                cart.getId(),
                cart.getUserId(),
                cartItemResponseDTOS
        );
        return  cartResponseDTO;
    }
}
