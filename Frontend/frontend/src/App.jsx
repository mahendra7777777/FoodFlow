import Login from "./Login";
import Checkout from "./Checkout";
import Menu from "./Menu";
import Cart from "./Cart";
import { useEffect, useState } from "react";
import "./App.css";
import Orders from "./Orders";

import paneerImage from "./assets/paneerbutter.jpg";
import biryaniImage from "./assets/biryani.jpg";
import dosaImage from "./assets/dosa.jpg";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
 const [page, setPage] = useState("login");
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/restaurants")
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => {
        console.error("Error fetching restaurants:", error);
      });
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
    restaurant.address.toLowerCase().includes(search.toLowerCase())
  );

  const restaurantImages = [
    paneerImage,
    biryaniImage,
    dosaImage
  ];

  // =========================
  // MENU
  // =========================
if (page === "login") {
  return (
    <Login
      onLogin={(user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setPage("home");
      }}
    />
  );
}
  if (page === "menu" && selectedRestaurant) {
    return (
      <Menu
        restaurant={selectedRestaurant}
        cart={cart}
        setCart={setCart}
        goBack={() => {
          setPage("home");
          setSelectedRestaurant(null);
        }}
        goToCart={() => setPage("cart")}
      />
    );
  }

  // =========================
  // CART
  // =========================

  if (page === "cart" && selectedRestaurant) {
    return (
      <Cart
        restaurant={selectedRestaurant}
        cart={cart}
        setCart={setCart}
        goBack={() => setPage("menu")}
        goToCheckout={() => {
          if (cart.length > 0) {
            setPage("checkout");
          }
        }}
      />
    );
  }

  // =========================
  // CHECKOUT
  // =========================

 if (page === "checkout" && selectedRestaurant && cart.length > 0) {
   return (
     <Checkout
       restaurant={selectedRestaurant}
       cart={cart}
       currentUser={currentUser}
       goBack={() => setPage("cart")}
       goToMenu={() => setPage("menu")}
     />
   );
 }
 if (page === "orders") {
   return (
     <Orders
       currentUser={currentUser}
       goBack={() => setPage("home")}
     />
   );
 }

  // =========================
  // HOME
  // =========================

  return (
    <div className="app">

      {/* NAVBAR */}

      <nav className="navbar">

        <div
          className="logo"
          onClick={() => {
            setPage("home");
            setSelectedRestaurant(null);
          }}
        >
          Food<span>Flow</span>
        </div>

        <div className="nav-links">

          <span
            className="active"
            onClick={() => {
              setPage("home");
              setSelectedRestaurant(null);
            }}
          >
            Home
          </span>

          <span
            onClick={() => {
              document
                .getElementById("restaurants")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Restaurants
          </span>

         <span
           onClick={() => setPage("orders")}
         >
           Orders
         </span>

        </div>

        <span
          onClick={() => {
            setIsLoggedIn(false);
            setPage("login");
          }}
        >
          Logout
        </span>

      </nav>


      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            🍴 Delicious food. Delivered fast.
          </div>

          <h1>
            Your cravings,
            <br />
            <span>delivered.</span>
          </h1>

          <p>
            Discover great restaurants, order your favourite
            meals and enjoy them at your doorstep.
          </p>


          {/* SEARCH */}

          <div className="search-box">

           <span className="search-icon">
             <svg
               width="20"
               height="20"
               viewBox="0 0 24 24"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <circle
                 cx="11"
                 cy="11"
                 r="7"
                 stroke="currentColor"
                 strokeWidth="2"
               />
               <path
                 d="M20 20L16.65 16.65"
                 stroke="currentColor"
                 strokeWidth="2"
                 strokeLinecap="round"
               />
             </svg>
           </span>

            <input
              type="text"
              placeholder="Search restaurants or food..."
              value={search}
              onChange={event => setSearch(event.target.value)}
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

          </div>


          {/* QUICK CATEGORIES */}

          <div className="categories">

            <button onClick={() => setSearch("Pizza")}>
              🍕 Pizza
            </button>

            <button onClick={() => setSearch("Biryani")}>
              🍚 Biryani
            </button>

            <button onClick={() => setSearch("Paneer")}>
              🥘 Indian
            </button>

            <button onClick={() => setSearch("Dosa")}>
              🫓 South Indian
            </button>

          </div>

        </div>

      </section>


      {/* RESTAURANTS */}

      <section
        className="restaurants"
        id="restaurants"
      >

        <div className="section-heading">

          <div>
            <span className="section-label">
              EXPLORE
            </span>

            <h2>
              Popular Restaurants
            </h2>

            <p>
              Handpicked places you'll love
            </p>
          </div>

          <span className="restaurant-count">
            {filteredRestaurants.length} restaurants
          </span>

        </div>


        {filteredRestaurants.length > 0 ? (

          <div className="restaurant-grid">

            {filteredRestaurants.map((restaurant, index) => (

              <div
                className="restaurant-card"
                key={restaurant.restaurantId}
              >

                {/* IMAGE */}

                <div className="restaurant-image">

                  <img
                    src={
                      restaurantImages[
                        index % restaurantImages.length
                      ]
                    }
                    alt={restaurant.name}
                  />

                  <div className="image-overlay"></div>

                  <div className="rating-badge">
                    ⭐ {restaurant.rating}
                  </div>

                </div>


                {/* DETAILS */}

                <div className="restaurant-info">

                  <div className="restaurant-title-row">

                    <h3>
                      {restaurant.name}
                    </h3>

                    <span className="verified">
                      ✓
                    </span>

                  </div>

                  <p className="restaurant-location">
                    📍 {restaurant.address}
                  </p>


                  <div className="restaurant-meta">

                    <span>
                      🕐 25–35 min
                    </span>

                    <span>
                      •
                    </span>

                    <span>
                      ₹₹
                    </span>

                  </div>


                  <button
                    className="order-btn"
                    onClick={() => {

                      setSelectedRestaurant(restaurant);
                      setCart([]);
                      setPage("menu");

                    }}
                  >
                    View Menu
                    <span>→</span>
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="no-results">

            <div>
              🔍
            </div>

            <h3>
              No restaurants found
            </h3>

            <p>
              Try searching for another restaurant or cuisine.
            </p>

            <button
              onClick={() => setSearch("")}
            >
              Clear Search
            </button>

          </div>

        )}

      </section>


      {/* SIMPLE FEATURES */}

      <section className="features">

        <div className="feature">

          <div className="feature-icon">
            ⚡
          </div>

          <div>
            <h3>
              Fast Delivery
            </h3>

            <p>
              Fresh food delivered quickly.
            </p>
          </div>

        </div>


        <div className="feature">

          <div className="feature-icon">
            🍽️
          </div>

          <div>
            <h3>
              Great Restaurants
            </h3>

            <p>
              Discover restaurants you'll love.
            </p>
          </div>

        </div>


        <div className="feature">

          <div className="feature-icon">
            🔒
          </div>

          <div>
            <h3>
              Secure Ordering
            </h3>

            <p>
              Simple and reliable checkout.
            </p>
          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-logo">
          Food<span>Flow</span>
        </div>

        <p>
          Good food. Good mood. Delivered.
        </p>

        <span>
          © 2026 FoodFlow
        </span>

      </footer>

    </div>
  );
}

export default App;