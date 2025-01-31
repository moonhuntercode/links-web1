// src/components/Admin.jsx

import React, { useState, useEffect } from "react";
import { useUserContext } from "../contexts/UserContext.jsx";
import UserManagement from "./UserManagement.jsx";
import SongManagement from "./SongManagement.jsx";
import AvatarManagement from "./AvatarManagement.jsx";
import "../css/Admin.css";
import * as icons from "../assets/imgs/icons/index.js";

const Admin = () => {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
    deleteAllUsersExceptCurrent,
    currentUser,
    setCurrentUser,
  } = useUserContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateUsername, setUpdateUsername] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userAdded, setUserAdded] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [song, setSong] = useState(() => {
    return localStorage.getItem("song") || null;
  });
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    if (userAdded) {
      console.log("Usuario añadido con éxito.");
    }
  }, [userAdded]);

  // Función para manejar la eliminación de todos los usuarios excepto el actual
  const handleDeleteAllUsers = () => {
    deleteAllUsersExceptCurrent();
    setDeleteMessage("Todos los usuarios, excepto el actual, han sido eliminados.");
    console.log(deleteMessage);
  };

  // Función para manejar la selección de canción
  const handleSongChange = (newSong) => {
    setSong(newSong);
    localStorage.setItem("song", newSong);
  };

  // Cargar usuarios desde el localStorage
  const localStorageUsers = JSON.parse(localStorage.getItem("users")) || [];

  return (
    <div className="admin-container">
      <h1>Panel de Administrador</h1>

      {/* Gestión de usuarios */}
      <UserManagement
        users={users}
        addUser={addUser}
        updateUser={updateUser}
        deleteUser={deleteUser}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        errors={errors}
        setErrors={setErrors}
        userAdded={userAdded}
        setUserAdded={setUserAdded}
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        updateUsername={updateUsername}
        setUpdateUsername={setUpdateUsername}
        updatePassword={updatePassword}
        setUpdatePassword={setUpdatePassword}
      />

      {/* Botón para eliminar todos los usuarios excepto el actual */}
      <button className="btn btn-danger" onClick={handleDeleteAllUsers}>
        Borrar todos los usuarios excepto el actual
      </button>
      {deleteMessage && <p>{deleteMessage}</p>}

      {/* Gestión de canciones */}
      <SongManagement song={song} setSong={handleSongChange} />

      {/* Gestión de avatares */}
      <AvatarManagement currentUser={currentUser} setAvatar={setAvatar} avatar={avatar} />

      {/* Mostrar usuarios del localStorage */}
      <div className="local-storage-users">
        <h3>Usuarios en LocalStorage</h3>
        {localStorageUsers.length > 0 ? (
          <ul>
            {localStorageUsers.map((user) => (
              <li key={user.id}>
                {user.name} ({user.username})
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay usuarios en el almacenamiento local.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
