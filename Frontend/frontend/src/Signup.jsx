import { useState } from "react";
import "./Login.css";

function Signup({ onSignup, goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://foodflow-backend-kgzn.onrender.com/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Signup failed");
      }

      const user = await response.json();

      onSignup(user);

    } catch (error) {
      setError(error.message || "Signup failed");
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

          <h2>Create an account</h2>

          <p className="login-subtitle">
            Sign up to start ordering from FoodFlow
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                placeholder="Create a password"
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
              {loading ? "Creating account..." : "Create account"}
            </button>

          </form>

          <p className="signup-text">
            Already have an account?{" "}
            <span onClick={goToLogin}>Login</span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Signup;