import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto de usuario
const UserContext = createContext();

// Hook personalizado para usar el contexto de usuario
export const useUser = () => {
  return useContext(UserContext);
};

// Proveedor del contexto de usuario
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUserState] = useState(null);

  // Recuperar usuario desde localStorage al cargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUserState(JSON.parse(storedUser));
    }
  }, []);

  const setCurrentUser = (user) => {
    setCurrentUserState(user);
    // Guardar usuario en localStorage al iniciar sesión
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null); // Limpiar el usuario actual al cerrar sesión
    localStorage.removeItem("currentUser"); // Remover el usuario del localStorage al cerrar sesión
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
