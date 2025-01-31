// src/utils/adminUtils.js
// Importamos los enlaces, canciones y usuarios desde los archivos correspondientes
import { fakeDbofLinks, fakeDbofSongs, fakeDbofUsers } from "../assets/links_db"; // Datos de links, usuarios y canciones

// Sincronizamos los datos de localStorage con los objetos de fakeDbofLinks, fakeDbofUsers y fakeDbofSongs
const syncLocalStorageWithDb = () => {
  // Sincronizamos los enlaces
  if (!localStorage.getItem("links")) {
    localStorage.setItem("links", JSON.stringify(fakeDbofLinks));
  }

  // Sincronizamos los usuarios
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(fakeDbofUsers));
  }

  // Sincronizamos las canciones
  if (!localStorage.getItem("songs")) {
    localStorage.setItem("songs", JSON.stringify(fakeDbofSongs));
  }
};

// Función para obtener los usuarios desde localStorage o el "fakeDbofUsers"
export const getUsers = async () => {
  syncLocalStorageWithDb(); // Aseguramos que los datos estén sincronizados
  return JSON.parse(localStorage.getItem("users")) || fakeDbofUsers; // Retorna los usuarios como una promesa
};

// Función para obtener los enlaces desde localStorage o el "fakeDbofLinks"
export const getLinks = () => {
  syncLocalStorageWithDb(); // Aseguramos que los datos estén sincronizados
  return JSON.parse(localStorage.getItem("links")) || fakeDbofLinks; // Devuelve los enlaces desde localStorage o el "fakeDbofLinks"
};

// Función para obtener las canciones desde localStorage o el "fakeDbofSongs"
export const getSongs = () => {
  syncLocalStorageWithDb(); // Aseguramos que los datos estén sincronizados
  return JSON.parse(localStorage.getItem("songs")) || fakeDbofSongs; // Devuelve las canciones desde localStorage o el "fakeDbofSongs"
};

// Función para agregar un usuario
export const handleAddUser =
  (setUsers, setErrors, setUserAdded, newUsername, newPassword) => (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Lógica para agregar un usuario
    const newUser = {
      id: Date.now(), // Usamos el timestamp para generar un ID único
      username: newUsername, // Utilizamos los valores proporcionados para el nombre de usuario
      password: newPassword, // Utilizamos los valores proporcionados para la contraseña
      avatar: fakeDbofUsers[0].avatar, // Usamos el primer avatar en los usuarios ficticios (o puede ser otro avatar predeterminado)
    };

    const currentUsers = getUsers(); // Obtenemos los usuarios actuales desde localStorage
    currentUsers.push(newUser); // Añadimos el nuevo usuario

    // Actualizamos el estado y el localStorage
    setUsers(currentUsers);
    localStorage.setItem("users", JSON.stringify(currentUsers)); // Guardamos los usuarios actualizados en localStorage

    // Limpiamos los campos
    setUserAdded(true); // Marcamos como "usuario agregado"
  };

// Función para actualizar un usuario
export const handleUpdateUser = (setUsers, setErrors) => (event) => {
  event.preventDefault();

  // Lógica para actualizar un usuario
  const currentUsers = getUsers(); // Obtenemos los usuarios actuales desde localStorage

  const userIndex = currentUsers.findIndex(
    (user) => user.username === event.target.username.value
  ); // Buscamos al usuario a actualizar
  if (userIndex === -1) {
    setErrors(["Usuario no encontrado"]); // Si no lo encontramos, mostramos un error
    return;
  }

  currentUsers[userIndex].username = event.target.username.value; // Actualizamos el nombre de usuario
  currentUsers[userIndex].password = event.target.password.value; // Actualizamos la contraseña

  // Actualizamos el localStorage
  setUsers(currentUsers);
  localStorage.setItem("users", JSON.stringify(currentUsers)); // Guardamos los usuarios actualizados en localStorage
};

// Función para eliminar un usuario
export const handleDeleteUser = (setUsers, userId) => (event) => {
  event.preventDefault();

  // Lógica para eliminar un usuario
  let currentUsers = getUsers(); // Obtenemos los usuarios actuales desde localStorage

  currentUsers = currentUsers.filter((user) => user.id !== userId); // Filtramos el usuario a eliminar

  // Actualizamos el estado y el localStorage
  setUsers(currentUsers);
  localStorage.setItem("users", JSON.stringify(currentUsers)); // Guardamos los usuarios actualizados en localStorage
};

// Función para cargar una canción
export const handleSongUpload = (setSongs, event) => {
  event.preventDefault();

  const newSong = {
    id: Date.now(),
    name: event.target.songName.value, // Usamos el nombre de la canción desde el formulario
    url: event.target.songUrl.value, // Usamos la URL de la canción desde el formulario
  };

  const currentSongs = getSongs(); // Obtenemos las canciones actuales desde localStorage
  currentSongs.push(newSong); // Añadimos la nueva canción

  // Actualizamos el estado y el localStorage
  setSongs(currentSongs);
  localStorage.setItem("songs", JSON.stringify(currentSongs)); // Guardamos las canciones actualizadas en localStorage
};
