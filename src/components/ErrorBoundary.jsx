// src/components/ErrorBoundary.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLoadingContext } from "../contexts/LoadingContext";

const logErrorToService = (error, errorInfo) => {
  console.error("Enviando error a un servicio de logs:", error, errorInfo);
};

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);
  const { setError } = useLoadingContext();

  const handleError = (error, errorInfo) => {
    setHasError(true);
    setErrorInfo({ error, info: errorInfo });
    logErrorToService(error, errorInfo);
    setError("Algo salió mal con la carga de los enlaces.");
  };

  if (hasError) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
          borderRadius: "5px",
        }}
      >
        <h2>¡Algo salió mal!</h2>
        <p>Se produjo un error inesperado. Intenta recargar la página.</p>
        {errorInfo && <pre>{errorInfo.info.componentStack}</pre>}
        <button
          onClick={() => window.location.reload()}
          style={{ marginTop: "10px", padding: "8px 15px", cursor: "pointer" }}
        >
          Recargar página
        </button>
      </div>
    );
  }

  try {
    return children;
  } catch (error) {
    handleError(error, error.info);
    return null;
  }
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
