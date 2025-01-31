// src/components/ThemeToggleButton.jsx
import { useTheme } from "../../contexts/ThemeContext"; // Importamos el contexto de tema

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Estado de tema oscuro o claro

  return (
    <button
      className={`theme-toggle-btn ${isDarkMode ? "dark" : "light"}`}
      onClick={toggleTheme}
    >
      {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggleButton;
