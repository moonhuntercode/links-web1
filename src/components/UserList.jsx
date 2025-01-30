// src/components/UserList.jsx
import React from "react";

const UserList = ({ users, handleUserSelect }) => (
  <ul className="user-list">
    {users.map((user, index) => (
      <li key={index} className="user-item">
        {user.username}{" "}
        {user.avatar && <img src={user.avatar} alt="Avatar" className="avatar-small" />}
        <button className="btn btn-select" onClick={() => handleUserSelect(user)}>
          Seleccionar
        </button>
      </li>
    ))}
  </ul>
);

export default UserList;
