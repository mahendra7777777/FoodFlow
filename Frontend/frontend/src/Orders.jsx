import { useEffect, useState } from "react";
import "./Orders.css";

function Orders({ currentUser, goBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    fetch(`https://foodflow-backend-kgzn.onrender.com/api/orders/user/${currentUser.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, [currentUser]);

  const formatDate = (dateString) => {
    if (!dateString) return "Date unavailable";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="orders-page">
        <header className="orders-header">
          <button className="orders-back-btn" onClick={goBack}>
            ← Back
          </button>

          <div className="orders-logo">
            Food<span>Flow</span>
          </div>

          <span className="orders-header-title">
            Order History
          </span>
        </header>

        <main className="orders-container">
          <div className="orders-loading">
            Loading your orders...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="orders-page">

      {/* HEADER */}
      <header className="orders-header">

        <button
          className="orders-back-btn"
          onClick={goBack}
        >
          ← Back
        </button>

        <div className="orders-logo">
          Food<span>Flow</span>
        </div>

        <span className="orders-header-title">
          Order History
        </span>

      </header>


      {/* MAIN */}
      <main className="orders-container">

        {/* PAGE HEADING */}
        <div className="orders-heading">

          <span className="orders-label">
            FOODFLOW
          </span>

          <h1>
            Your Orders
          </h1>

          <p>
            Track your previous orders and view what you ordered.
          </p>

        </div>


        {/* EMPTY STATE */}
        {orders.length === 0 ? (

          <div className="orders-empty">

            <div className="empty-icon">

              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2h12v20H6z" />
                <path d="M9 6h6" />
                <path d="M9 10h6" />
                <path d="M9 14h4" />
              </svg>

            </div>

            <h2>
              No orders yet
            </h2>

            <p>
              Your previous orders will appear here once you place one.
            </p>

            <button
              className="browse-food-btn"
              onClick={goBack}
            >
              Start Ordering
            </button>

          </div>

        ) : (

          /* ORDERS */
          <div className="orders-list">

            {orders.map((order) => (

              <article
                className="order-card"
                key={order.id}
              >

                {/* CARD HEADER */}
                <div className="order-card-top">

                  <div>

                    <span className="order-number">
                      Order #{order.id}
                    </span>

                    <span className="order-date">
                      {formatDate(order.createdAt)}
                      {" · "}
                      {formatTime(order.createdAt)}
                    </span>

                  </div>

                  <span
                    className={`order-status ${order.status?.toLowerCase()}`}
                  >
                    <span className="status-dot"></span>
                    {order.status}
                  </span>

                </div>


                <div className="order-divider"></div>


                {/* ITEMS */}
                <div className="order-items-section">

                  <h3>
                    Order Items
                  </h3>

                  {order.items && order.items.length > 0 ? (

                    <div className="order-items-list">

                      {order.items.map((item) => (

                        <div
                          className="order-item-row"
                          key={item.id}
                        >

                          <div className="order-item-left">

                            <div className="item-icon">

                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M6 3h12" />
                                <path d="M7 3l1 18h8l1-18" />
                                <path d="M9 8h6" />
                              </svg>

                            </div>

                            <div className="order-item-info">

                              <strong>
                                {item.itemName}
                              </strong>

                              <span>
                                {item.quantity} × ₹{item.price}
                              </span>

                            </div>

                          </div>

                          <strong className="item-total">
                            ₹{item.price * item.quantity}
                          </strong>

                        </div>

                      ))}

                    </div>

                  ) : (

                    <p className="no-items">
                      Item details unavailable.
                    </p>

                  )}

                </div>


                <div className="order-divider"></div>


                {/* ORDER INFORMATION */}
                <div className="order-details">

                  <div className="order-detail">

                    <span className="detail-label">
                      DELIVERY ADDRESS
                    </span>

                    <strong>
                      {order.address}
                    </strong>

                    <span className="detail-subtext">
                      {order.city} · {order.pincode}
                    </span>

                  </div>


                  <div className="order-detail">

                    <span className="detail-label">
                      PAYMENT
                    </span>

                    <strong>
                      {order.paymentMethod}
                    </strong>

                  </div>


                  <div className="order-detail">

                    <span className="detail-label">
                      ORDER STATUS
                    </span>

                    <strong className="status-text">
                      {order.status}
                    </strong>

                  </div>


                  <div className="order-detail order-total-box">

                    <span className="detail-label">
                      TOTAL AMOUNT
                    </span>

                    <strong className="order-total">
                      ₹{order.totalAmount}
                    </strong>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default Orders;