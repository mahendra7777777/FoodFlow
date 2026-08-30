package com.foodflow.model;

public class Restaurant {

    private int restaurantId;
    private String name;
    private String address;
    private double rating;

    public Restaurant(int restaurantId, String name, String address, double rating) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.address = address;
        this.rating = rating;
    }

    public int getRestaurantId() {
        return restaurantId;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public double getRating() {
        return rating;
    }
}
