import "./Cart.css";

function Cart({
  restaurant,
  cart,
  setCart,
  goBack,
  goToCheckout
}) {

  const increaseQuantity = (id) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );
  };


  const decreaseQuantity = (id) => {
    setCart(currentCart =>
      currentCart
        .map(item =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };


  const removeItem = (id) => {
    setCart(currentCart =>
      currentCart.filter(item => item.id !== id)
    );
  };


  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  const deliveryFee = subtotal > 0 ? 40 : 0;

  const grandTotal = subtotal + deliveryFee;


  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  return (
    <div className="cart-page">

      {/* HEADER */}

      <header className="cart-topbar">

        <button
          className="cart-back-btn"
          onClick={goBack}
        >
          ← Back to Menu
        </button>

        <div className="cart-logo">
          FoodFlow
        </div>

        <div className="cart-header-btn">
          🛒 Cart ({cartCount})
        </div>

      </header>


      {/* CART */}

      <main className="cart-container">

        <div className="cart-heading">

          <h1>
            Your Cart
          </h1>

          <p>
            {restaurant.name}
          </p>

        </div>


        {cart.length === 0 ? (

          /* EMPTY CART */

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Add some delicious food from the menu.
            </p>

            <button
              className="back-menu-btn"
              onClick={goBack}
            >
              Browse Menu
            </button>

          </div>

        ) : (

          /* CART WITH ITEMS */

          <div className="cart-layout">


            {/* ITEMS */}

            <section className="cart-items">

              {cart.map(item => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <div className="cart-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      ₹{item.price} each
                    </p>

                  </div>


                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>


                  <strong className="cart-item-price">
                    ₹{item.price * item.quantity}
                  </strong>


                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              ))}

            </section>


            {/* SUMMARY */}

            <section className="order-summary">

              <h2>
                Order Summary
              </h2>


              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹{subtotal}
                </span>

              </div>


              <div className="summary-row">

                <span>
                  Delivery Fee
                </span>

                <span>
                  ₹{deliveryFee}
                </span>

              </div>


              <div className="summary-divider"></div>


              <div className="summary-total">

                <span>
                  Total
                </span>

                <span>
                  ₹{grandTotal}
                </span>

              </div>


              <button
                className="checkout-btn"
                onClick={goToCheckout}
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>

            </section>

          </div>

        )}

      </main>

    </div>
  );
}

export default Cart;