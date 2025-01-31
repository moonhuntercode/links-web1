// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css"; // Importar los estilos globales
import App from "./App.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx"; // Importar el ThemeProvider
import { BrowserRouter as Router } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </UserProvider>
    </Router>
  </StrictMode>
);
