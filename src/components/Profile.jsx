// src/components/Profile.jsx
import React from "react";
import { useUserContext } from "../contexts/UserContext.jsx";

const Profile = () => {
  const { currentUser } = useUserContext();

  return (
    <div className="profile-container">
      {currentUser ? (
        <div>
          <h2>Perfil de {currentUser.username}</h2>
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt="Avatar" className="profile-avatar" />
          ) : (
            <div className="placeholder-avatar">Sin Avatar</div>
          )}
        </div>
      ) : (
        <p>Por favor, inicia sesión para ver tu perfil.</p>
      )}
    </div>
  );
};

export default Profile;
