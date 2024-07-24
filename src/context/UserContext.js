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
  const [purchases, setPurchasesState] = useState([]);
  const [contactInfo, setContactInfoState] = useState({
    firstName: "",
    lastName: "",
    document: "",
    country: "Argentina",
    address: "",
    floorDept: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedPurchases = localStorage.getItem("purchases");
    const storedContactInfo = localStorage.getItem("contactInfo");
    if (storedUser) {
      setCurrentUserState(JSON.parse(storedUser));
    }
    if (storedPurchases) {
      setPurchasesState(JSON.parse(storedPurchases));
    }
    if (storedContactInfo) {
      setContactInfoState(JSON.parse(storedContactInfo));
    }
  }, []);

  const setCurrentUser = (user) => {
    setCurrentUserState(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const setContactInfo = (info) => {
    setContactInfoState(info);
    localStorage.setItem("contactInfo", JSON.stringify(info));
  };

  const addPurchase = (newPurchase) => {
    const updatedPurchases = [...purchases, newPurchase];
    setPurchasesState(updatedPurchases);
    localStorage.setItem("purchases", JSON.stringify(updatedPurchases));
  };

  const logout = () => {
    setCurrentUserState(null);
    setPurchasesState([]);
    setContactInfoState({
      firstName: "",
      lastName: "",
      document: "",
      country: "Argentina",
      address: "",
      floorDept: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
      email: "",
      additionalInfo: "",
    });
    localStorage.removeItem("currentUser");
    localStorage.removeItem("purchases");
    localStorage.removeItem("contactInfo");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        purchases,
        addPurchase,
        contactInfo,
        setContactInfo,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
