// src/utils/adminUtils.js

// Función para añadir un usuario
export const handleAddUser = (
  addUser,
  setErrors,
  setUserAdded,
  setUsername,
  setPassword
) => {
  return (event) => {
    event.preventDefault();
    const validationErrors = validateForm({ username, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const result = addUser({ username, password });
    if (result.error) {
      setErrors({ username: result.error });
      return;
    }
    setUserAdded(true);
    setUsername("");
    setPassword("");
    setErrors({});
    localStorage.removeItem("currentUserDraft"); // Limpiar el draft al añadir usuario
  };
};

// Función para actualizar un usuario
export const handleUpdateUser = (
  updateUser,
  setErrors,
  setUpdateUsername,
  setUpdatePassword
) => {
  return (event) => {
    event.preventDefault();
    const result = updateUser({ username: updateUsername, password: updatePassword });
    if (result.error) {
      setErrors({ update: result.error });
      return;
    }
    setErrors({});
  };
};

// Función para eliminar un usuario
export const handleDeleteUser = (deleteUser, setErrors, setDeleteUsername) => {
  return (event) => {
    event.preventDefault();
    const result = deleteUser(deleteUsername);
    if (result.error) {
      setErrors({ delete: result.error });
      return;
    }
    setErrors({});
  };
};

// Función para cargar un avatar
export const handleAvatarUpload = (uploadAvatar, setAvatar, currentUser) => {
  return (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        uploadAvatar(currentUser.username, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
};

// Función para cargar una canción
export const handleSongUpload = (uploadSong, setSong) => {
  return (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSong(reader.result);
        uploadSong(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
};

// Función de validación
export const validateForm = ({ username, password }) => {
  const validationErrors = {};
  if (!username) {
    validationErrors.username = "El nombre de usuario es obligatorio";
  }
  if (!password) {
    validationErrors.password = "La contraseña es obligatoria";
  }
  return validationErrors;
};
