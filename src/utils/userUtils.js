// src/utils/userUtils.js

// Función para obtener usuarios desde localStorage
export const getUsersFromLocalStorage = () => {
  const storedUsers = localStorage.getItem("users");
  return storedUsers ? JSON.parse(storedUsers) : [];
};

// Función para obtener el usuario actual desde localStorage
export const getCurrentUserFromLocalStorage = () => {
  const storedCurrentUser = localStorage.getItem("currentUser");
  return storedCurrentUser ? JSON.parse(storedCurrentUser) : null;
};

// Función para obtener la canción actual desde localStorage
export const getSongsFromLocalStorage = () => {
  const storedSong = localStorage.getItem("song");
  return storedSong ? storedSong : null;
};

// Función para guardar usuarios en localStorage
export const saveUsersToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

// Función para guardar el usuario actual en localStorage
export const saveCurrentUserToLocalStorage = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

// Función para guardar la canción en localStorage
export const saveSongToLocalStorage = (songUrl) => {
  localStorage.setItem("song", songUrl);
};
