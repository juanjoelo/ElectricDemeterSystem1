import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import StickersPage from "./pages/Stickers"; // Importa el nuevo componente
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import StickerDetail from "./pages/StickerDetail";
import Footer from "./components/footer";

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/stickers/:type" element={<StickersPage />} />
            <Route path="/sticker/:id" element={<StickerDetail />} />
            {/* Aquí está la corrección */}
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
