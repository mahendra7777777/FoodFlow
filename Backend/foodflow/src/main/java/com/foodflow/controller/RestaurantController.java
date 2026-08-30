package com.foodflow.controller;

import com.foodflow.model.Restaurant;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class RestaurantController {

    @GetMapping("/api/restaurants")
    public ArrayList<Restaurant> getRestaurants() {

        ArrayList<Restaurant> restaurants = new ArrayList<>();

        restaurants.add(
                new Restaurant(101, "Food Palace", "Lucknow", 4.5)
        );

        restaurants.add(
                new Restaurant(102, "Pizza House", "Lucknow", 4.3)
        );

        restaurants.add(
                new Restaurant(103, "Spice Garden", "Lucknow", 4.6)
        );

        return restaurants;
    }
}