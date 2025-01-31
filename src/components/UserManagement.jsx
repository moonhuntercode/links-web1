// src/components/UserManagement.jsx

import React from "react";

const UserManagement = ({
  users,
  addUser,
  updateUser,
  deleteUser,
  selectedUser,
  setSelectedUser,
  errors,
  setErrors,
  userAdded,
  setUserAdded,
  newUsername,
  setNewUsername,
  newPassword,
  setNewPassword,
  updateUsername,
  setUpdateUsername,
  updatePassword,
  setUpdatePassword,
}) => {
  const handleAddUser = () => {
    if (!newUsername || !newPassword) {
      setErrors({ ...errors, addUser: "Nombre de usuario y contraseña son requeridos." });
      return;
    }
    const newUser = { id: Date.now(), username: newUsername, password: newPassword };
    addUser(newUser);
    setUserAdded(true);
    setNewUsername("");
    setNewPassword("");
  };

  const handleUpdateUser = () => {
    if (!updateUsername || !updatePassword) {
      setErrors({
        ...errors,
        updateUser: "Nombre de usuario y contraseña son requeridos para actualizar.",
      });
      return;
    }
    const updatedUser = {
      ...selectedUser,
      username: updateUsername,
      password: updatePassword,
    };
    updateUser(updatedUser);
    setSelectedUser(null);
    setUpdateUsername("");
    setUpdatePassword("");
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
  };

  return (
    <div className="user-management">
      <h2>Gestión de Usuarios</h2>
      {/* Agregar usuario */}
      <div className="add-user">
        <input
          type="text"
          placeholder="Nuevo nombre de usuario"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleAddUser}>Agregar Usuario</button>
        {errors.addUser && <p>{errors.addUser}</p>}
      </div>

      {/* Actualizar usuario */}
      {selectedUser && (
        <div className="update-user">
          <input
            type="text"
            placeholder="Nuevo nombre de usuario"
            value={updateUsername}
            onChange={(e) => setUpdateUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={updatePassword}
            onChange={(e) => setUpdatePassword(e.target.value)}
          />
          <button onClick={handleUpdateUser}>Actualizar Usuario</button>
          {errors.updateUser && <p>{errors.updateUser}</p>}
        </div>
      )}

      {/* Listar usuarios */}
      <div className="user-list">
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username}
              <button onClick={() => setSelectedUser(user)}>Editar</button>
              <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
