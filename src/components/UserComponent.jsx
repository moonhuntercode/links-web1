// src/components/UserComponent.jsx
import React, { useState, useEffect } from "react";
import {
  getUsersFromLocalStorage,
  getCurrentUserFromLocalStorage,
  getSongsFromLocalStorage,
  saveUsersToLocalStorage,
  saveCurrentUserToLocalStorage,
  saveSongToLocalStorage,
} from "../utils/userUtils";

function UserComponent() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    setUsers(getUsersFromLocalStorage());
    setCurrentUser(getCurrentUserFromLocalStorage());
    setCurrentSong(getSongsFromLocalStorage());
  }, []);

  const addUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.username === updatedUser.username ? updatedUser : user
    );
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  const deleteUser = (username) => {
    const updatedUsers = users.filter((user) => user.username !== username);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveCurrentUserToLocalStorage(null);
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
      <h2>Usuario Actual</h2>
      {currentUser ? (
        <div>
          <p>{currentUser.username}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <p>No hay usuario logueado</p>
      )}
      <h2>Canción Actual</h2>
      {currentSong ? (
        <audio controls src={currentSong}></audio>
      ) : (
        <p>No hay canción seleccionada</p>
      )}
    </div>
  );
}

export default UserComponent;
