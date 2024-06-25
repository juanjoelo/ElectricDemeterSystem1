import React, { useState } from "react";
import "./Login.css"; // Importa el archivo CSS

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">{isLogin ? "Login" : "Register"}</h2>
        <form className="form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-input"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" id="email" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="form-button">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div className="form-footer">
          <p className="form-footer-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="form-toggle"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
