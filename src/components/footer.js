import React from "react";
import "./footer.css";
//import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4" id="piedepag">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; 2024 VinylVibe. Todos los derechos reservados.</p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="/">Términos y Condiciones</a>
            </li>
            <li>
              <a href="/">Política de Privacidad</a>
            </li>
            <li>
              <a href="/">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
