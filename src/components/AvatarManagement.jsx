// src/components/AvatarManagement.jsx
import React from "react";
import CurrentUser from "./CurrentUser.jsx";
import { handleAvatarUpload } from "../utils/adminUtils";

const AvatarManagement = ({ currentUser, setAvatar, avatar }) => (
  <div className="avatar-section">
    <h3>Gestión de Avatares</h3>
    <CurrentUser
      currentUser={currentUser}
      handleAvatarUpload={(event) => handleAvatarUpload(setAvatar, currentUser)(event)}
      setAvatar={setAvatar}
      uploadAvatar={setAvatar}
    />
    {avatar && (
      <div>
        <button className="btn btn-delete-avatar" onClick={() => setAvatar(null)}>
          Eliminar Avatar
        </button>
      </div>
    )}
  </div>
);

export default AvatarManagement;
