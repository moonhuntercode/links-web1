// src/components/UserProfile.jsx
import UserIcon from "../UserIcon.jsx"; // Componente de icono de usuario

const UserProfile = ({ currentUser }) => {
  const handleLogout = () => {
    try {
      logout(); // Lógica de cierre de sesión
      alert("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setError("Error al cerrar sesión. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="user-info">
      {currentUser && currentUser.avatar ? (
        <img src={currentUser.avatar} alt="Avatar" className="avatar" />
      ) : (
        <UserIcon className="user-icon" />
      )}
      {currentUser ? (
        <div>
          <span>{currentUser.username}</span>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={() => alert("Por favor, inicia sesión")}>Iniciar sesión</button>
      )}
    </div>
  );
};

export default UserProfile;
