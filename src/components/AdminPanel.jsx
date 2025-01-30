// src/components/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { useUserContext } from "../contexts/UserContext.jsx";
import CurrentUser from "./CurrentUser.jsx";
import UserList from "./UserList.jsx";
import UserForm from "./UserForm.jsx";
import SongUpload from "./SongUpload.jsx";
import ErrorMessages from "./ErrorMessages.jsx";
import {
  handleAddUser,
  handleUpdateUser,
  handleDeleteUser,
  handleAvatarUpload,
  handleSongUpload,
} from "../utils/adminUtils"; // Importar funciones utilitarias
import "../css/AdminPanel.css"; // Importar los estilos

// Componente para el panel de administración
function AdminPanel() {
  const {
    users,
    currentUser,
    addUser,
    updateUser,
    deleteUser,
    deleteAllUsers,
    uploadAvatar,
    uploadSong,
    logout,
  } = useUserContext();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateUsername, setUpdateUsername] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [song, setSong] = useState(null);
  const [errors, setErrors] = useState({});
  const [userAdded, setUserAdded] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUpdateUsername(user.username);
  };

  useEffect(() => {
    if (userAdded) {
      console.log(`Usuario ${newUsername} creado correctamente.`);
    }
  }, [userAdded, newUsername]);

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      {currentUser && (
        <CurrentUser
          currentUser={currentUser}
          handleAvatarUpload={handleAvatarUpload}
          setAvatar={setAvatar}
          uploadAvatar={uploadAvatar}
        />
      )}
      <h3>Lista de Usuarios</h3>
      <UserList users={users} handleUserSelect={handleUserSelect} />
      <UserForm
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        updateUsername={updateUsername}
        setUpdateUsername={setUpdateUsername}
        updatePassword={updatePassword}
        setUpdatePassword={setUpdatePassword}
        handleAddUser={handleAddUser}
        addUser={addUser}
        setErrors={setErrors}
        setUserAdded={setUserAdded}
        handleUpdateUser={handleUpdateUser}
        updateUser={updateUser}
        handleDeleteUser={handleDeleteUser}
        deleteUser={deleteUser}
        errors={errors}
        selectedUser={selectedUser}
        userAdded={userAdded}
        setUserAdded={setUserAdded}
      />
      <SongUpload
        handleSongUpload={handleSongUpload}
        uploadSong={uploadSong}
        setSong={setSong}
      />
      <button
        className="btn btn-danger"
        onClick={() => deleteAllUsers(currentUser.username)}
      >
        Eliminar Todos los Usuarios Excepto el Actual
      </button>
      <button className="btn btn-logout" onClick={logout}>
        Cerrar sesión
      </button>
      <ErrorMessages errors={errors} />
    </div>
  );
}

export default AdminPanel;
