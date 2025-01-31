// src/components/UserForm.jsx
import React, { useState, useEffect } from "react";
import { useUserForm } from "../utils/useUserForm"; // Importamos el custom hook from utils
import {
  handleAddUser,
  handleUpdateUser,
  handleDeleteUser,
} from "../utils/handleUserActions"; // Lógica de acciones de usuario
import { validateForm } from "../utils/formValidation"; // Validaciones de formulario

const UserForm = () => {
  const {
    newUsername,
    newPassword,
    setNewUsername,
    setNewPassword,
    setErrors,
    errors,
    setUserAdded,
    setUsers,
  } = useUserForm(); // Custom hook para manejar el formulario

  useEffect(() => {
    if (errors.length > 0) {
      // Mostrar errores de validación si existen
      alert(errors.join(", "));
    }
  }, [errors]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (validateForm(newUsername, newPassword, setErrors)) {
      handleAddUser(setUsers, setErrors, setUserAdded, newUsername, newPassword);
      setNewUsername("");
      setNewPassword("");
    }
  };

  return (
    <div className="user-form">
      <h2>Add User</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
