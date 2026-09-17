import "./Menu.css";
import paneerImage from "./assets/paneerbutter.jpg";
import biryaniImage from "./assets/biryani.jpg";
import dosaImage from "./assets/dosa.jpg";
import choleImage from "./assets/bhature.jpg";

function Menu({
  restaurant,
  cart,
  setCart,
  goBack,
  goToCart
}) {

  const foodItems = [
    {
      id: 1,
      name: "Paneer Butter Masala",
      price: 220,
      description: "Creamy paneer cooked in a rich tomato gravy.",
      image: paneerImage
    },
    {
      id: 2,
      name: "Veg Biryani",
      price: 180,
      description: "Aromatic basmati rice with fresh vegetables and spices.",
      image: biryaniImage
    },
    {
      id: 3,
      name: "Masala Dosa",
      price: 120,
      description: "Crispy dosa served with chutney and sambar.",
      image: dosaImage
    },
    {
      id: 4,
      name: "Chole Bhature",
      price: 150,
      description: "Spicy chickpeas served with fluffy bhature.",
      image: choleImage
    }
  ];

  const addToCart = (item) => {

    setCart((currentCart) => {

      const existingItem = currentCart.find(
        cartItem => cartItem.id === item.id
      );

      if (existingItem) {

        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
              }
            : cartItem
        );

      }

      return [
        ...currentCart,
        {
          ...item,
          quantity: 1
        }
      ];

    });

  };


  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );


  return (
    <div className="menu-page">

      {/* HEADER */}

      <header className="menu-topbar">

        <button
          className="back-btn"
          onClick={goBack}
        >
          ← Back
        </button>

        <div className="menu-logo">
          FoodFlow
        </div>

        <button
          className="cart-btn"
          onClick={goToCart}
        >
          🛒 Cart ({cartCount})
        </button>

      </header>


      {/* RESTAURANT INFORMATION */}

      <section className="restaurant-banner">

        <div>

          <h1>
            {restaurant.name}
          </h1>

          <p>
            {restaurant.address}
          </p>

          <span>
            ⭐ {restaurant.rating}
          </span>

        </div>

      </section>


      {/* MENU */}

      <section className="menu-content">

        <div className="menu-title">

          <h2>
            Menu
          </h2>

          <p>
            Choose your favourite dishes
          </p>

        </div>


        <div className="food-list">

          {foodItems.map(item => (

            <div
              className="food-card"
              key={item.id}
            >

              <div className="food-image">

                <img
                  src={item.image}
                  alt={item.name}
                />

              </div>


              <div className="food-details">

                <h3>
                  {item.name}
                </h3>

                <p>
                  {item.description}
                </p>


                <div className="food-bottom">

                  <strong>
                    ₹{item.price}
                  </strong>


                  <button
                    className="add-btn"
                    onClick={() => addToCart(item)}
                  >
                    + Add
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Menu;