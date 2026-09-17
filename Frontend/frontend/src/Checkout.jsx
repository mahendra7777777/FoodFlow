import { useState } from "react";
import "./Checkout.css";

function Checkout({
  restaurant,
  cart,
  currentUser,
  goBack,
  goToMenu
}) {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [orderPlaced, setOrderPlaced] =
    useState(false);


  /* =========================================
     CALCULATE TOTAL
  ========================================= */

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;

  const grandTotal = subtotal + deliveryFee;


  /* =========================================
     FORM CHANGE
  ========================================= */

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData(currentData => ({
      ...currentData,
      [name]: value
    }));

  };


  /* =========================================
     PLACE ORDER
  ========================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.pincode.trim()
    ) {
      alert("Please fill in all delivery details.");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (formData.pincode.length !== 6) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderData = {
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      paymentMethod: paymentMethod,
      totalAmount: grandTotal,
      userId: currentUser.id,

      items: cart.map(item => ({
        itemName: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };

    try {
      const response = await fetch(
        "https://foodflow-backend-kgzn.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const savedOrder = await response.json();

      console.log("Order placed:", savedOrder);

      setOrderPlaced(true);

    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong while placing your order. Please try again.");
    }
  };


  /* =========================================
     SUCCESS PAGE
  ========================================= */

  if (orderPlaced) {

    return (

      <div className="checkout-page">

        <header className="checkout-topbar">

          <div className="checkout-logo">
            FoodFlow
          </div>

        </header>


        <main className="order-success">

          <div className="success-icon">

            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>

          </div>


          <h1>
            Order Placed Successfully!
          </h1>


          <p>

            Thank you, {formData.name}.
            Your order from{" "}

            <strong>
              {restaurant.name}
            </strong>{" "}

            has been placed successfully.

          </p>


          <div className="success-details">

            <div>

              <span>
                Order Total
              </span>

              <strong>
                ₹{grandTotal}
              </strong>

            </div>


            <div>

              <span>
                Payment
              </span>

              <strong>
                {paymentMethod}
              </strong>

            </div>


            <div>

              <span>
                Delivery To
              </span>

              <strong>
                {formData.city}
              </strong>

            </div>

          </div>


          <button
            className="success-btn"
            onClick={goToMenu}
          >
            Back to Menu
          </button>

        </main>

      </div>

    );

  }


  /* =========================================
     CHECKOUT PAGE
  ========================================= */

  return (

    <div className="checkout-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <header className="checkout-topbar">


        <button
          className="checkout-back-btn"
          onClick={goBack}
        >

          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>

          <span>
            Back to Cart
          </span>

        </button>


        <div className="checkout-logo">
          FoodFlow
        </div>


        <div className="checkout-secure">

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              x="3"
              y="11"
              width="18"
              height="10"
              rx="2"
            />

            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>

          <span>
            Secure Checkout
          </span>

        </div>

      </header>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="checkout-container">


        <div className="checkout-heading">

          <h1>
            Checkout
          </h1>

          <p>
            Complete your details to place your order.
          </p>

        </div>


        <div className="checkout-layout">


          {/* =================================
              LEFT SIDE
          ================================= */}

          <section className="checkout-form-section">


            <form onSubmit={handleSubmit}>


              {/* ===============================
                  DELIVERY DETAILS
              =============================== */}

              <div className="checkout-card">


                <div className="card-heading">

                  <span className="step-number">
                    1
                  </span>

                  <div>

                    <h2>
                      Delivery Details
                    </h2>

                    <p>
                      Where should we deliver your order?
                    </p>

                  </div>

                </div>


                <div className="form-grid">


                  {/* FULL NAME */}

                  <div className="form-group">

                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                  </div>


                  {/* PHONE */}

                  <div className="form-group">

                    <label>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(event) => {

                        const value =
                          event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10);

                        setFormData(currentData => ({
                          ...currentData,
                          phone: value
                        }));

                      }}
                    />

                  </div>


                  {/* ADDRESS */}

                  <div className="form-group full-width">

                    <label>
                      Delivery Address
                    </label>

                    <textarea
                      name="address"
                      placeholder="House number, street, area..."
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                    />

                  </div>


                  {/* CITY */}

                  <div className="form-group">

                    <label>
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleChange}
                    />

                  </div>


                  {/* PINCODE */}

                  <div className="form-group">

                    <label>
                      Pincode
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      placeholder="6-digit pincode"
                      value={formData.pincode}
                      onChange={(event) => {

                        const value =
                          event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6);

                        setFormData(currentData => ({
                          ...currentData,
                          pincode: value
                        }));

                      }}
                    />

                  </div>

                </div>

              </div>


              {/* ===============================
                  PAYMENT METHOD
              =============================== */}

              <div className="checkout-card">


                <div className="card-heading">

                  <span className="step-number">
                    2
                  </span>

                  <div>

                    <h2>
                      Payment Method
                    </h2>

                    <p>
                      Choose how you want to pay.
                    </p>

                  </div>

                </div>


                <div className="payment-options">


                  {/* CASH ON DELIVERY */}

                  <label
                    className={
                      paymentMethod === "Cash on Delivery"
                        ? "payment-option selected"
                        : "payment-option"
                    }
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="Cash on Delivery"
                      checked={
                        paymentMethod === "Cash on Delivery"
                      }
                      onChange={(event) =>
                        setPaymentMethod(
                          event.target.value
                        )
                      }
                    />


                    <div className="payment-icon">

                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >

                        <rect
                          x="2"
                          y="5"
                          width="20"
                          height="14"
                          rx="2"
                        />

                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                        />

                        <path d="M6 9h.01" />

                        <path d="M18 15h.01" />

                      </svg>

                    </div>


                    <div>

                      <strong>
                        Cash on Delivery
                      </strong>

                      <p>
                        Pay when your order arrives
                      </p>

                    </div>

                  </label>


                  {/* UPI */}

                  <label
                    className={
                      paymentMethod === "UPI"
                        ? "payment-option selected"
                        : "payment-option"
                    }
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      checked={
                        paymentMethod === "UPI"
                      }
                      onChange={(event) =>
                        setPaymentMethod(
                          event.target.value
                        )
                      }
                    />


                    <div className="payment-icon">

                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >

                        <rect
                          x="5"
                          y="2"
                          width="14"
                          height="20"
                          rx="2"
                        />

                        <path d="M9 18h6" />

                        <path d="M12 6l-2 4h3l-2 4" />

                      </svg>

                    </div>


                    <div>

                      <strong>
                        UPI
                      </strong>

                      <p>
                        Pay securely using UPI
                      </p>

                    </div>

                  </label>


                  {/* CARD */}

                  <label
                    className={
                      paymentMethod === "Card"
                        ? "payment-option selected"
                        : "payment-option"
                    }
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="Card"
                      checked={
                        paymentMethod === "Card"
                      }
                      onChange={(event) =>
                        setPaymentMethod(
                          event.target.value
                        )
                      }
                    />


                    <div className="payment-icon">

                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >

                        <rect
                          x="2"
                          y="5"
                          width="20"
                          height="14"
                          rx="2"
                        />

                        <path d="M2 10h20" />

                        <path d="M6 15h4" />

                      </svg>

                    </div>


                    <div>

                      <strong>
                        Credit / Debit Card
                      </strong>

                      <p>
                        Pay using your card
                      </p>

                    </div>

                  </label>

                </div>

              </div>


              {/* ===============================
                  PLACE ORDER
              =============================== */}

              <button
                type="submit"
                className="place-order-btn"
                disabled={cart.length === 0}
              >

                Place Order

                <span>
                  ₹{grandTotal}
                </span>

              </button>

            </form>

          </section>


          {/* =================================
              RIGHT SIDE - ORDER SUMMARY
          ================================= */}

          <aside className="checkout-summary">


            <h2>
              Order Summary
            </h2>


            <p className="restaurant-name">
              {restaurant.name}
            </p>


            <div className="summary-items">

              {cart.map(item => (

                <div
                  className="summary-item"
                  key={item.id}
                >

                  <div>

                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {item.quantity} × ₹{item.price}
                    </span>

                  </div>


                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                </div>

              ))}

            </div>


            <div className="checkout-divider"></div>


            <div className="checkout-summary-row">

              <span>
                Subtotal
              </span>

              <span>
                ₹{subtotal}
              </span>

            </div>


            <div className="checkout-summary-row">

              <span>
                Delivery Fee
              </span>

              <span>
                ₹{deliveryFee}
              </span>

            </div>


            <div className="checkout-divider"></div>


            <div className="checkout-total">

              <strong>
                Total
              </strong>

              <strong>
                ₹{grandTotal}
              </strong>

            </div>


            <div className="secure-message">

              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >

                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="10"
                  rx="2"
                />

                <path d="M7 11V7a5 5 0 0 1 10 0v4" />

              </svg>

              <span>
                Your order information is secure.
              </span>

            </div>

          </aside>

        </div>

      </main>

    </div>

  );

}

export default Checkout;