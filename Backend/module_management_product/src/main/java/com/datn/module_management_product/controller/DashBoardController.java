package com.datn.module_management_product.controller;

import com.datn.module_login.service.IAccountService;
import com.datn.module_login.service.IUserService;
import com.datn.module_management_product.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/dashboard")
public class DashBoardController {

    private final IOrderService orderService;

    @GetMapping("/statistical")
    public ResponseEntity<Map<String,Object>> getDashboard() {

        int nowYear = java.time.LocalDate.now().getYear();

        int totalOrder = orderService.findAll().size();
        int totalOrderIsPaid = orderService.findAll().stream().filter(o->o.isPaid()==true).toList().size();
        double totalRevenue = orderService.findAll().stream().filter(o->o.isPaid()==true).mapToDouble(o->o.getTotalPrice()).sum();
        double totalRevenueByYear = orderService.findAll().stream().filter(o->o.isPaid()==true && o.getCreateAt().getYear()==nowYear).mapToDouble(o->o.getTotalPrice()).sum();



        Map<String, Double> monthlyRevenue = new TreeMap<>(Comparator.comparingInt(s -> Integer.parseInt(s.replace("Tháng ", ""))));
        orderService.findAll().stream()
                .filter(o -> o.isPaid() && o.getCreateAt().getYear() == nowYear)
                .forEach(o -> {
                    String monthKey = "Tháng " + o.getCreateAt().getMonthValue();
                    monthlyRevenue.merge(monthKey, o.getTotalPrice(), Double::sum);
                });

        Map<String, Object> response = new HashMap<>();
        response.put("totalOrder", totalOrder);
        response.put("totalOrderIsPaid", totalOrderIsPaid);
        response.put("totalRevenue", totalRevenue);
        response.put("totalRevenueByYear", totalRevenueByYear);
        response.put("monthlyRevenue", monthlyRevenue); // <== Map<Integer, Double>
        return ResponseEntity.ok(response);
    }
}
