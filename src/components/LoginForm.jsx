// src/components/LoginForm.jsx
import React, { useState, useRef, useEffect } from "react";
import { useUserContext } from "../contexts/UserContext.jsx";
import "../css/LoginForm.css"; // Importar los estilos

// Componente para el formulario de inicio de sesión y creación de cuenta
function LoginForm() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { addUser, loginUser, users, getAllUsers, error, setError } = useUserContext();
  const passwordRef = useRef(null);
  const [userAdded, setUserAdded] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    if (userAdded) {
      console.log(`Usuario ${username} creado correctamente.`);
    }
  }, [userAdded, username]);

  useEffect(() => {
    if (error) {
      setErrors({ global: error });
    }
  }, [error]);

  const handleAddUser = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const result = addUser({ username, password });
    if (result && result.error) {
      setErrors({ username: result.error });
      return;
    }
    setUserAdded(true);
    setUsername("");
    setPassword("");
    setErrors({});
    localStorage.removeItem("currentUserDraft"); // Limpiar el draft al añadir usuario
    setError(null);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const result = loginUser(username, password);
    if (result.error) {
      setErrors({ login: result.error });
      return;
    }
    setErrors({});
    setError(null);
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!username) {
      validationErrors.username = "El nombre de usuario es obligatorio";
    }
    if (!password) {
      validationErrors.password = "La contraseña es obligatoria";
    }
    return validationErrors;
  };

  const handleShowUsers = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <label htmlFor="username">Nombre de usuario</label>
        <input
          id="username"
          type="text"
          name="username"
          autoComplete="username"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={`input ${errors.username ? "input-error" : ""}`}
        />
        <div className="error">{errors.username}</div>

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={`input ${errors.password ? "input-error" : ""}`}
          ref={passwordRef}
        />
        <div className="error">{errors.password}</div>

        <button type="submit" className="submit-button">
          Iniciar sesión
        </button>
        <button onClick={handleAddUser} className="submit-button">
          Crear cuenta
        </button>
        <div className="error">{errors.login}</div>
        {userExists && <p className="error">El usuario {username} ya existe.</p>}
        {userAdded && (
          <p className="success">¡Usuario {username} creado correctamente!</p>
        )}
        <button onClick={handleShowUsers} className="show-users-button">
          {showUsers ? "Ocultar Usuarios" : "Mostrar Usuarios"}
        </button>
        {showUsers && (
          <div>
            <h3>Usuarios Guardados:</h3>
            {getAllUsers().map((user, index) => (
              <p key={index}>
                {user.username}: {user.password}
              </p>
            ))}
          </div>
        )}
      </form>
      {errors.global && <div className="error">{errors.global}</div>}
    </div>
  );
}

export default LoginForm;
