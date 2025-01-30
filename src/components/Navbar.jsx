// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";
import UserIcon from "./UserIcon"; // Importamos UserIcon
import "../css/Navbar.css"; // Importar los estilos

// Componente SVG para ícono e música (ejemplo)
const MusicIcon = ({ isPlaying }) => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    {isPlaying ? (
      <path d="M3 22v-20l18-3v20m-14-5v-14m8 16v-14" />
    ) : (
      <path d="M8 5v14l11-5v-14z" />
    )}
  </svg>
);

// Componente Navbar
function Navbar() {
  const { currentUser, song, logout } = useUserContext();
  const [isPlaying, setIsPlaying] = useState(true);

  // Controlar reproducción de la música
  useEffect(() => {
    if (song) {
      const audio = new Audio(song);
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [song, isPlaying]);

  const handleMusicToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <nav className={`navbar ${currentUser ? "logged-in" : "logged-out"}`}>
      <div className="navbar-content">
        {/* Mostrar el avatar del usuario si está disponible, de lo contrario mostrar un ícono predeterminado */}
        {currentUser && currentUser.avatar ? (
          <img src={currentUser.avatar} alt="Avatar" className="avatar" />
        ) : (
          <UserIcon className="user-icon" />
        )}
        {currentUser ? (
          <div>
            <span>Usuario actual: {currentUser.username}</span>
            <button onClick={logout}>Cerrar sesión</button>
          </div>
        ) : (
          <button onClick={() => alert("Por favor, inicia sesión")}>
            Iniciar sesión
          </button>
        )}
        {song && (
          <button onClick={handleMusicToggle}>
            <MusicIcon isPlaying={isPlaying} />
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
