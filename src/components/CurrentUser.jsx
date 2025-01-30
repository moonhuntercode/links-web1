// src/components/CurrentUser.jsx
import React from "react";

const CurrentUser = ({ currentUser, handleAvatarUpload, setAvatar, uploadAvatar }) => (
  <div className="current-user">
    <p>
      Usuario actual: <strong>{currentUser.username}</strong>
    </p>
    {currentUser.avatar && (
      <img src={currentUser.avatar} alt="Avatar" className="avatar" />
    )}
    <label htmlFor="avatar-upload" className="upload-label">
      Cargar avatar:
    </label>
    <input
      id="avatar-upload"
      type="file"
      accept="image/*"
      className="upload-input"
      onChange={handleAvatarUpload(uploadAvatar, setAvatar, currentUser)}
    />
  </div>
);

export default CurrentUser;
