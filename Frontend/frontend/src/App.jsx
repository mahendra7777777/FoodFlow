import Menu from "./Menu";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/restaurants")
      .then(response => response.json())
      .then(data => setRestaurants(data));
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
    restaurant.address.toLowerCase().includes(search.toLowerCase())
  );
  if (selectedRestaurant) {
    return (
      <Menu
        restaurant={selectedRestaurant}
        goBack={() => setSelectedRestaurant(null)}
      />
    );
  }

  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">FoodFlow</div>

        <div className="nav-links">
          <span>Home</span>
          <span>Restaurants</span>
          <span>Orders</span>
        </div>

        <button className="login-btn">Login</button>
      </nav>

      <section className="hero">
        <h1>Hungry? We've got you covered.</h1>
        <p>Discover the best food and restaurants near you.</p>

        <input
          type="text"
          placeholder="Search for restaurants or food..."
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
      </section>

      <section className="restaurants">
        <h2>Popular Restaurants</h2>

        <div className="restaurant-grid">

          {filteredRestaurants.map(restaurant => (
            <div className="restaurant-card" key={restaurant.restaurantId}>

              <div className="restaurant-image">
                🍽️
              </div>

              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>

                <p>{restaurant.address}</p>

                <div className="rating">
                  ⭐ {restaurant.rating}
                </div>

                <button
                  className="order-btn"
                  onClick={() => setSelectedRestaurant(restaurant)}
                >
                  Order Now
                </button>

             </div>

            </div>
          ))}

        </div>

        {filteredRestaurants.length === 0 && (
          <p>No restaurants found.</p>
        )}

      </section>

    </div>
  );
}

export default App;