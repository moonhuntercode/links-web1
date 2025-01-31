// src/pages/Links.jsx
import React, { useState, useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";
import "../css/Links.css";

const Links = () => {
  const { users, currentUser, addUser, updateUser, deleteUser } = useUserContext();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem("links"));
    setLinks(storedLinks || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  return (
    <div className="links-container">
      <h1>Gestión de Usuarios y Enlaces</h1>
      <p>Aquí puedes gestionar usuarios y enlaces asociados.</p>
      {/* Renderiza la lista de usuarios y enlaces aquí */}
    </div>
  );
};

export default Links;
