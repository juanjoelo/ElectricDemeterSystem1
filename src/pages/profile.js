// src/pages/Profile.js
import React, { useState } from "react";
import { useUser } from "../context/UserContext.js";
import axios from "axios";
import "./profile.css";

const provinces = [
  "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", 
  "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", 
  "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", 
  "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", 
  "Tucumán"
];

const Profile = () => {
  const { currentUser, setCurrentUser } = useUser();
  const [form, setForm] = useState(currentUser.contactInfo || {});
  const [profilePicture, setProfilePicture] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (profilePicture) formData.append('profilePicture', profilePicture);

    try {
      const response = await axios.post("/api/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setCurrentUser({ ...currentUser, contactInfo: response.data });
    } catch (error) {
      console.error("Error al actualizar el perfil del usuario", error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Perfil de Usuario</h2>
      {currentUser ? (
        <div>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">Nombre</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="document">Documento</label>
              <input
                type="text"
                id="document"
                name="document"
                value={form.document || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">País</label>
              <input
                type="text"
                id="country"
                name="country"
                value={form.country || "Argentina"}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección Completa</label>
              <input
                type="text"
                id="address"
                name="address"
                value={form.address || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="floorDept">Piso y Depto</label>
              <input
                type="text"
                id="floorDept"
                name="floorDept"
                value={form.floorDept || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">Localidad</label>
              <input
                type="text"
                id="city"
                name="city"
                value={form.city || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="province">Provincia</label>
              <select
                id="province"
                name="province"
                value={form.province || ""}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona una provincia</option>
                {provinces.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Código Postal</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={form.postalCode || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Número de Teléfono</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={form.phone || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="additionalInfo">Información Adicional</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={form.additionalInfo || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profilePicture">Foto de Perfil</label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="profile-button">
              Guardar Cambios
            </button>
          </form>
        </div>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
};

export default Profile;
