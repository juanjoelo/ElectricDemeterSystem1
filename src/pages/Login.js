import React, { useState } from "react";
import "./Login.css"; // Importa el archivo CSS

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState(""); // Nuevo estado para el nombre de usuario (si se registra)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Construye el cuerpo de la solicitud
    const requestBody = {
      username,
      email,
      password,
    };

    try {
      // Determina la URL correcta para el endpoint de acuerdo a si es login o register
      const url = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/register";

      // Realiza la solicitud al backend
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error || "Error en la solicitud");
      }

      const userData = await response.json();
      console.log(userData); // Maneja la respuesta del servidor según necesites

      // Restablece los campos después del éxito
      setUsername("");
      setEmail("");
      setPassword("");
      setError(""); // Limpia cualquier error previo
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">{isLogin ? "Login" : "Register"}</h2>
        <form className="form" onSubmit={handleFormSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {isLogin ? "Signup" : "Login"}
            </button>
          </p>
        </div>
        {error && <p className="form-error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
