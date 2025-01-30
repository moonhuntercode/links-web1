// src/contexts/UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getUsersFromLocalStorage,
  getCurrentUserFromLocalStorage,
  saveUsersToLocalStorage,
  saveCurrentUserToLocalStorage,
  saveSongToLocalStorage,
} from "../utils/userUtils";

// Crear el contexto de usuario
const UserContext = createContext();

// Proveedor del contexto de usuario
export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedUsers = getUsersFromLocalStorage();
      const storedCurrentUser = getCurrentUserFromLocalStorage();
      setUsers(storedUsers);
      setCurrentUser(storedCurrentUser);
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  }, []);

  // Función para añadir usuario con validación
  const addUser = (user) => {
    if (users.some((u) => u.username === user.username)) {
      setError("El nombre de usuario ya existe.");
      return;
    }
    if (users.some((u) => u.password === user.password)) {
      setError("La contraseña ya está en uso.");
      return;
    }
    const newUserList = [...users, user];
    setUsers(newUserList);
    saveUsersToLocalStorage(newUserList);
    setError(null);
  };

  const updateUser = (updatedUser) => {
    const newUserList = users.map((user) =>
      user.username === updatedUser.username ? updatedUser : user
    );
    setUsers(newUserList);
    saveUsersToLocalStorage(newUserList);
  };

  const deleteUser = (username) => {
    const newUserList = users.filter((user) => user.username !== username);
    setUsers(newUserList);
    saveUsersToLocalStorage(newUserList);
  };

  const deleteAllUsers = (currentUsername) => {
    const newUserList = users.filter((user) => user.username === currentUsername);
    setUsers(newUserList);
    saveUsersToLocalStorage(newUserList);
    console.log(`Todos los usuarios eliminados excepto ${currentUsername}.`);
  };

  const uploadAvatar = (username, avatar) => {
    const newUserList = users.map((user) =>
      user.username === username ? { ...user, avatar } : user
    );
    setUsers(newUserList);
    saveUsersToLocalStorage(newUserList);
  };

  const uploadSong = (songUrl) => {
    saveSongToLocalStorage(songUrl);
  };

  const loginUser = (username, password) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setCurrentUser(user);
      saveCurrentUserToLocalStorage(user);
      setError(null);
      return { success: true };
    } else {
      setError("Usuario o contraseña incorrectos.");
      return { error: "Usuario o contraseña incorrectos." };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    saveCurrentUserToLocalStorage(null);
  };

  const getAllUsers = () => {
    return users;
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        isLoading,
        error,
        addUser,
        updateUser,
        deleteUser,
        deleteAllUsers,
        uploadAvatar,
        uploadSong,
        loginUser,
        logout,
        getAllUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Gancho personalizado para usar el contexto de usuario
export const useUserContext = () => {
  return useContext(UserContext);
};
