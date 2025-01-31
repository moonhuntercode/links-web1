// src/contexts/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { fakeDbofUsers, fakeDbofSongs } from "../assets/links_db";
import {
  getUsersFromLocalStorage,
  getCurrentUserFromLocalStorage,
  getSongsFromLocalStorage,
  saveUsersToLocalStorage,
  saveCurrentUserToLocalStorage,
  saveSongToLocalStorage,
} from "../utils/userUtils"; // Ruta de utilidades para manejo de localStorage

// Crear el contexto del usuario
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Estado de usuarios, canciones y usuario actual
  const [users, setUsers] = useState(() => {
    const storedUsers = getUsersFromLocalStorage(); // Verifica que los usuarios se obtienen de localStorage
    return storedUsers.length ? storedUsers : fakeDbofUsers;
  });

  const [songs, setSongs] = useState(() => {
    const storedSongs = getSongsFromLocalStorage(); // Verifica que las canciones se obtienen de localStorage
    return storedSongs.length ? storedSongs : fakeDbofSongs;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return getCurrentUserFromLocalStorage() || null; // Obtiene el usuario actual desde localStorage
  });

  // Sincroniza los estados con el localStorage cuando cambian
  useEffect(() => {
    saveUsersToLocalStorage(users);
    saveSongToLocalStorage(songs);
  }, [users, songs]);

  useEffect(() => {
    saveCurrentUserToLocalStorage(currentUser);
  }, [currentUser]);

  // Función para agregar un nuevo usuario
  const addUser = (newUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      saveUsersToLocalStorage(updatedUsers); // Guarda los usuarios actualizados en localStorage
      return updatedUsers;
    });
  };

  // Función para actualizar un usuario
  const updateUser = (updatedUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      saveUsersToLocalStorage(updatedUsers); // Guarda los usuarios actualizados en localStorage
      return updatedUsers;
    });
  };

  // Función para eliminar un usuario
  const deleteUser = (userId) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((user) => user.id !== userId);
      saveUsersToLocalStorage(updatedUsers); // Guarda los usuarios actualizados en localStorage
      return updatedUsers;
    });
  };

  // Función para eliminar todos los usuarios excepto el actual
  const deleteAllUsersExceptCurrent = () => {
    const updatedUsers = users.filter((user) => user.id === currentUser.id);
    setUsers(updatedUsers); // Actualiza el estado de los usuarios
    saveUsersToLocalStorage(updatedUsers); // Guarda los usuarios actualizados en localStorage
  };

  // Función para agregar una canción
  const addSong = (newSong) => {
    const updatedSongs = [...songs, newSong];
    setSongs(updatedSongs); // Actualiza el estado de las canciones
    saveSongToLocalStorage(updatedSongs); // Guarda las canciones en localStorage
  };

  // Función para obtener las canciones del localStorage
  const getSongs = () => {
    return getSongsFromLocalStorage() || fakeDbofSongs;
  };

  // Función para iniciar sesión
  const login = (username, password) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setCurrentUser(user);
      saveCurrentUserToLocalStorage(user);
      return true;
    }
    return false;
  };

  // Función para cerrar sesión
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  // Exportamos la función y valores para ser utilizados por otros componentes
  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        addUser, // Aquí estamos exportando la función addUser
        updateUser,
        deleteUser,
        deleteAllUsersExceptCurrent, // Asegúrate de que la función esté aquí para que sea accesible
        addSong, // Función para agregar canción
        getSongs, // Función para obtener las canciones
        login, // Función para iniciar sesión
        logout, // Función para cerrar sesión
      }}
    >
      {children}
      {/* // Componente hijo donde se usará el contexto */}
    </UserContext.Provider>
  );
};

// Hook para consumir el contexto del usuario
export const useUserContext = () => useContext(UserContext);
