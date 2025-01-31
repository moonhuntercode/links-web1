// src/hooks/useUserForm.js
import { useState } from "react";

// Custom hook que maneja el estado del formulario de usuario
export const useUserForm = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [userAdded, setUserAdded] = useState(false);
  const [users, setUsers] = useState([]);

  return {
    newUsername,
    newPassword,
    setNewUsername,
    setNewPassword,
    errors,
    setErrors,
    userAdded,
    setUserAdded,
    setUsers,
  };
};
