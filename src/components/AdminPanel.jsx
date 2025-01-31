// src/components/AdminPanel.jsx
import { useEffect, useState } from "react";
import { getUsers } from "../utils/adminUtils"; // Importamos la función que obtendrá los usuarios
import "../css/AdminPanel.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]); // Estado para los usuarios

  useEffect(() => {
    // Usamos getUsers() que es una función asincrónica
    const loadUsers = async () => {
      try {
        const userList = await getUsers(); // Esperamos los datos de los usuarios
        console.log(userList); // Verifica los datos de usuarios
        setUsers(userList); // Establecemos los usuarios en el estado
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    loadUsers(); // Cargamos los usuarios
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  return (
    <div>
      <h3>Usuarios</h3>
      {/* Aquí se muestra la lista de usuarios */}
      <ul>
        {users.map((user, index) => (
          <li key={user.id || index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
