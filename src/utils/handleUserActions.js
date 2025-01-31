// src/utils/handleUserActions.js
import { getUsers } from "../utils/adminUtils"; // Obtenemos los usuarios desde localStorage o fakeDb

// Función para agregar un nuevo usuario
export const handleAddUser = (
  setUsers,
  setErrors,
  setUserAdded,
  newUsername,
  newPassword
) => {
  const currentUsers = getUsers(); // Obtenemos los usuarios actuales desde localStorage

  const newUser = {
    id: Date.now(), // Generamos un ID único usando el timestamp
    username: newUsername,
    password: newPassword,
    avatar: "default-avatar.png", // Avatar por defecto (puedes cambiar esto según tus necesidades)
  };

  currentUsers.push(newUser); // Agregamos el nuevo usuario

  setUsers(currentUsers); // Actualizamos el estado de los usuarios
  localStorage.setItem("users", JSON.stringify(currentUsers)); // Guardamos los usuarios en localStorage

  setUserAdded(true); // Marcamos el usuario como añadido
  setErrors([]); // Limpiamos los errores
};

// Función para actualizar un usuario
export const handleUpdateUser = (setUsers, setErrors) => (event) => {
  event.preventDefault();

  const currentUsers = getUsers(); // Obtenemos los usuarios actuales desde localStorage

  const userIndex = currentUsers.findIndex(
    (user) => user.username === event.target.username.value
  );
  if (userIndex === -1) {
    setErrors(["User not found."]); // Si no se encuentra el usuario
    return;
  }

  currentUsers[userIndex].username = event.target.username.value; // Actualizamos el nombre de usuario
  currentUsers[userIndex].password = event.target.password.value;

  setUsers(currentUsers); // Actualizamos el estado de los usuarios
  localStorage.setItem("users", JSON.stringify(currentUsers)); // Guardamos los usuarios en localStorage
};

// Función para eliminar un usuario
export const handleDeleteUser = (setUsers, userId) => {
  const currentUsers = getUsers(); // Obtenemos los usuarios actuales desde localStorage

  const updatedUsers = currentUsers.filter((user) => user.id !== userId); // Eliminamos el usuario

  setUsers(updatedUsers); // Actualizamos el estado de los usuarios
  localStorage.setItem("users", JSON.stringify(updatedUsers)); // Guardamos los usuarios actualizados en localStorage
};
