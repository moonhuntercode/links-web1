// src/App.jsx
import React, { Suspense, lazy, useEffect } from "react";
import { useUserContext } from "./contexts/UserContext";
import Navbar from "./components/Navbar"; // Importamos Navbar
import "./css/App.css"; // Importamos los estilos

// Cargar componentes de manera diferida
const LoginForm = lazy(() => import("./components/LoginForm"));
const AdminPanel = lazy(() => import("./components/AdminPanel"));

// Componente principal de la aplicación
function App() {
  const { currentUser, isLoading, error } = useUserContext();

  // Enlazar la reproducción de música automáticamente cuando el usuario esté logueado
  useEffect(() => {
    if (currentUser && !isLoading && !error) {
      // Iniciar la música si hay una canción cargada
      const audioElement = document.getElementById("background-audio");
      if (audioElement) {
        audioElement.play().catch((err) => {
          console.error("Error al reproducir la música:", err);
          alert(
            "No se pudo reproducir la música automáticamente. Por favor, intente manualmente."
          );
        });
      }
    }
  }, [currentUser, isLoading, error]);

  // Renderizar el contenido basado en el estado de autenticación
  let content;
  if (isLoading) {
    content = <p>Cargando...</p>;
  } else if (error) {
    content = (
      <div>
        <p>Error: {error}</p>
        <a href="/" className="error-link">
          Volver al inicio
        </a>
      </div>
    );
  } else if (currentUser) {
    content = <AdminPanel />;
  } else {
    content = <LoginForm />;
  }

  return (
    <div>
      <Navbar /> {/* Incluimos Navbar */}
      <Suspense fallback={<p>Cargando componentes...</p>}>{content}</Suspense>
      {/* Añadimos un elemento de audio para la música de fondo */}
      <audio id="background-audio" src={currentUser?.song || ""} loop></audio>
    </div>
  );
}

export default App;
