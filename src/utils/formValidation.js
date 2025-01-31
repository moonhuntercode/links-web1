// src/utils/formValidation.js

// Función para validar los campos del formulario
export const validateForm = (username, password, setErrors) => {
  const errors = [];

  if (!username) {
    errors.push("Username is required.");
  }

  if (!password) {
    errors.push("Password is required.");
  }

  if (errors.length > 0) {
    setErrors(errors);
    return false;
  }

  return true;
};
