// src/utils/userUtils.js

// Función para obtener los usuarios desde localStorage
export const getUsersFromLocalStorage = () => {
  const storedUsers = localStorage.getItem("users"); // Obtiene los usuarios guardados en localStorage
  return storedUsers ? JSON.parse(storedUsers) : []; // Devuelve los usuarios o un array vacío si no existen
};

// Función para obtener el usuario actual desde localStorage
export const getCurrentUserFromLocalStorage = () => {
  const storedCurrentUser = localStorage.getItem("currentUser"); // Obtiene el usuario actual desde localStorage
  return storedCurrentUser ? JSON.parse(storedCurrentUser) : null; // Devuelve el usuario o null si no existe
};

// Función para obtener las canciones desde localStorage
export const getSongsFromLocalStorage = () => {
  const storedSongs = localStorage.getItem("songs"); // Obtiene las canciones desde localStorage
  return storedSongs ? JSON.parse(storedSongs) : []; // Devuelve las canciones o un array vacío si no existen
};

// Función para guardar los usuarios en localStorage
export const saveUsersToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users)); // Guarda los usuarios en localStorage
};

// Función para guardar el usuario actual en localStorage
export const saveCurrentUserToLocalStorage = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user)); // Guarda el usuario actual en localStorage
};

// Función para guardar las canciones en localStorage
export const saveSongToLocalStorage = (songs) => {
  localStorage.setItem("songs", JSON.stringify(songs)); // Guarda las canciones en localStorage
};
