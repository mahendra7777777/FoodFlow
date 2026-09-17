import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Invalid email or password");
      }

      const user = await response.json();

      onLogin(user);

    } catch (error) {
      setError(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo">F</div>
          <span>FoodFlow</span>
        </div>

        <div className="login-content">
          <h1>
            Discover great food
            <br />
            from local stalls.
          </h1>

          <p>
            Order delicious food from your favorite local vendors,
            all in one place.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">

          <h2>Welcome back</h2>

          <p className="login-subtitle">
            Login to continue to FoodFlow
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Email address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="signup-text">
            Don't have an account?{" "}
            <span>Sign up</span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;