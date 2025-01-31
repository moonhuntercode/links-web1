// src/routes/Routes.jsx
import { lazy } from "react";
import { Route, Routes } from "react-router";
import ErrorBoundary from "../components/ErrorBoundary.jsx"; // Asegúrate de que la ruta sea correcta

// Lazy load de las páginas
const Home = lazy(() => import("../pages/Home.jsx"));
const Links = lazy(() => import("../pages/Links.jsx"));

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
