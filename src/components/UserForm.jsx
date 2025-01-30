// src/components/UserForm.jsx
import React, { useState, useEffect } from "react";

const UserForm = ({
  newUsername,
  setNewUsername,
  newPassword,
  setNewPassword,
  updateUsername,
  setUpdateUsername,
  updatePassword,
  setUpdatePassword,
  handleAddUser,
  addUserFunction,
  setErrors,
  setUserAddedStatus,
  handleUpdateUser,
  updateUserFunction,
  handleDeleteUser,
  deleteUserFunction,
  errors,
  selectedUser,
  userAdded,
  setUserAdded,
  users,
}) => {
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (userAdded) {
      console.log(`Usuario ${newUsername} creado correctamente.`);
    }
  }, [userAdded, newUsername]);

  const validateUser = (username, password) => {
    const newErrors = {};
    if (users.some((user) => user.username === username)) {
      newErrors.username = "El nombre de usuario ya existe.";
    }
    if (users.some((user) => user.password === password)) {
      newErrors.password = "La contraseña ya está en uso.";
    }
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <div className="form-section">
        <h3>Añadir Usuario</h3>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={newUsername}
          className={`input ${errors.username ? "input-error" : ""}`}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={newPassword}
          className={`input ${errors.password ? "input-error" : ""}`}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          className="btn btn-add"
          onClick={() => {
            if (validateUser(newUsername, newPassword)) {
              handleAddUser(
                addUserFunction,
                setErrors,
                setUserAddedStatus,
                setNewUsername,
                setNewPassword
              )();
              setUserAddedStatus(true);
            }
          }}
        >
          Añadir
        </button>
        {errors.username && <p className="error">{errors.username}</p>}
        {errors.password && <p className="error">{errors.password}</p>}
        {validationErrors.username && (
          <p className="error">{validationErrors.username}</p>
        )}
        {validationErrors.password && (
          <p className="error">{validationErrors.password}</p>
        )}
        {userAdded && (
          <p className="success">¡Usuario {newUsername} creado correctamente!</p>
        )}
      </div>
      {selectedUser && (
        <div className="form-section">
          <h3>Editar Usuario: {selectedUser.username}</h3>
          <input
            type="text"
            placeholder="Nuevo nombre de usuario"
            value={updateUsername}
            className={`input ${errors.updateUsername ? "input-error" : ""}`}
            onChange={(e) => setUpdateUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={updatePassword}
            className={`input ${errors.updatePassword ? "input-error" : ""}`}
            onChange={(e) => setUpdatePassword(e.target.value)}
          />
          <button
            className="btn btn-update"
            onClick={() => {
              if (validateUser(updateUsername, updatePassword)) {
                handleUpdateUser(
                  updateUserFunction,
                  setErrors,
                  setUpdateUsername,
                  setUpdatePassword
                )();
                setUserAddedStatus(true);
              }
            }}
          >
            Actualizar
          </button>
          <button
            className="btn btn-delete"
            onClick={() => {
              handleDeleteUser(deleteUserFunction, setErrors, setUpdateUsername)();
              setUserAddedStatus(true);
            }}
          >
            Eliminar
          </button>
          {errors.updateUsername && <p className="error">{errors.updateUsername}</p>}
          {errors.updatePassword && <p className="error">{errors.updatePassword}</p>}
          {validationErrors.updateUsername && (
            <p className="error">{validationErrors.updateUsername}</p>
          )}
          {validationErrors.updatePassword && (
            <p className="error">{validationErrors.updatePassword}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserForm;
