// src/components/UserList.jsx
import React from "react";

const UserList = ({ users, handleUserSelect }) => (
  <div className="user-list">
    <h3>Lista de Usuarios</h3>
    <ul>
      {users.map((user, index) => (
        // Usamos `user.id` si está disponible, sino usamos un índice con un prefijo para hacerlo único
        <li key={user.id || `user-${index}`} onClick={() => handleUserSelect(user)}>
          {user.username}
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
