package com.datn.module_management_product.dto.OrderDTO;

import com.datn.module_management_product.dto.OrderItemDTO.OrderItemCreateUpdateDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreateUpdateDTO {
    private String shippingAddress;
    private boolean paid;
    private List<OrderItemCreateUpdateDTO> orderItems;
}
