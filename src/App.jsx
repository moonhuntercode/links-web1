// src/App.jsx
import React, { Suspense, lazy } from "react";
import { useUserContext } from "./contexts/UserContext";
import Navbar from "./components/Navbar/Navbar";
import "./css/App.css";

// Cargar componentes de manera diferida
const LoginForm = lazy(() => import("./components/LoginForm"));
const AdminPanel = lazy(() => import("./components/AdminPanel"));

// Componente principal de la aplicación
function App() {
  const { currentUser, isLoading, error } = useUserContext();

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
      <Navbar />
      <Suspense fallback={<p>Cargando componentes...</p>}>{content}</Suspense>
    </div>
  );
}

export default App;
