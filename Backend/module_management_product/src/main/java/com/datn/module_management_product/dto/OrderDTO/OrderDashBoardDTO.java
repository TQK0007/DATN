package com.datn.module_management_product.dto.OrderDTO;

import java.time.LocalDateTime;

public record OrderDashBoardDTO (int id, LocalDateTime createdAt, double totalPrice, boolean isPaid) {
}
