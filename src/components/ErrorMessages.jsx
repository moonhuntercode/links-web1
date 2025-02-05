// src/components/ErrorMessages.jsx
import React from "react";

const ErrorMessages = ({ errors }) => (
  <div className="error-messages">
    {Object.keys(errors).map((key) => (
      <p key={key} className="error">
        {errors[key]}
      </p>
    ))}
  </div>
);

export default ErrorMessages;
