// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router"; // Usamos react-router-dom para la navegación
import { useTheme } from "../../contexts/ThemeContext"; // Importamos el contexto de tema
import { useUserContext } from "../../contexts/UserContext.jsx"; // Importamos el contexto de usuario
import UserProfile from "./UserProfile"; // Componente de perfil de usuario
import ThemeToggleButton from "./ThemeToggleButton"; // Botón de cambio de tema
import MusicControl from "./MusicControl"; // Componente de control de música
import "../../css/Navbar.css"; // Estilos de la Navbar

const Navbar = () => {
  const { currentUser } = useUserContext(); // Obtiene el usuario actual desde el contexto

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          My App
        </Link>
      </div>
      <div className="navbar-center">
        <ThemeToggleButton /> {/* Componente para cambiar entre temas */}
        <MusicControl /> {/* Componente de control de música */}
      </div>
      <div className="navbar-right">
        {currentUser ? (
          <UserProfile user={currentUser} /> // Si hay un usuario, muestra su perfil
        ) : (
          <Link to="/login">Login</Link> // Si no hay usuario, muestra el enlace de login
        )}
      </div>
    </nav>
  );
};

export default Navbar;
