package com.foodflow.controller;

import com.foodflow.model.Order;
import com.foodflow.model.OrderItem;
import com.foodflow.repository.OrderItemRepository;
import com.foodflow.repository.OrderRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderController(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository
    ) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    // Create a new order
    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestBody Order order
    ) {

        // Save the order first
        Order savedOrder = orderRepository.save(order);

        // Save all items belonging to this order
        if (savedOrder.getItems() != null) {

            for (OrderItem item : savedOrder.getItems()) {
                item.setOrderId(savedOrder.getId());
            }

            orderItemRepository.saveAll(savedOrder.getItems());
        }

        return ResponseEntity
                .status(201)
                .body(savedOrder);
    }


    // Get all orders
    @GetMapping
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderRepository.findByUserId(userId);
    }


    // Get order by ID
    @GetMapping("/{id}")
    public Order getOrderById(
            @PathVariable Long id
    ) {

        return orderRepository
                .findById(id)
                .orElse(null);
    }
}