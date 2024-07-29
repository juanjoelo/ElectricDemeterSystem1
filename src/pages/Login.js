import React, { useState } from "react";
import "./Login.css"; // Importa el archivo CSS
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState(""); // Nuevo estado para el nombre de usuario (si se registra)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [message, setMessage] = useState(""); // Estado para manejar el mensaje de sesión iniciada
  const { setCurrentUser } = useUser(); // Obtén la función para establecer el usuario actual desde el contexto
  const navigate = useNavigate(); // Obtén la función navigate para la redirección

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Inicia el estado de carga

    const requestBody = {
      username,
      email,
      password,
    };

    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

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
      setCurrentUser(userData); // Establece el usuario actual en el contexto

      setUsername("");
      setEmail("");
      setPassword("");
      setError(""); // Limpia cualquier error previo

      setMessage("Sesión iniciada con éxito");
      setTimeout(() => {
        setMessage("");

        // Redireccionar a la página de administrador si el usuario es 'admin'
        if (userData.username === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000); // Desaparece el mensaje después de 1 segundo
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false); // Termina el estado de carga
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
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Loading..." : isLogin ? "Login" : "Register"}
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
        {message && <p className="form-success">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
