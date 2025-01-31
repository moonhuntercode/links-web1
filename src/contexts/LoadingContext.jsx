// src/contexts/LoadingContext.jsx
import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [totalImageCount, setTotalImageCount] = useState(0);

  const markImageAsLoaded = () => {
    setProgress((prevProgress) => prevProgress + 1);
  };

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        progress,
        setProgress,
        totalImageCount,
        setTotalImageCount,
        markImageAsLoaded,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);
