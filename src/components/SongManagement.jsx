// src/components/SongManagement.jsx
import React, { useState, useEffect } from "react";
import { useUserContext } from "../contexts/UserContext.jsx"; // Importamos el contexto de usuario
import SongUpload from "./SongUpload.jsx";
import { handleSongUpload } from "../utils/adminUtils";
import { fakeDbofSongs } from "../assets/links_db"; // Importamos la base de datos de canciones
import { defaultSong } from "../assets/imgs/icons"; // Importamos la canción predeterminada

const SongManagement = () => {
  const { currentUser, setCurrentUser } = useUserContext(); // Usamos el estado global
  const [selectedSong, setSelectedSong] = useState(null);

  // Función para actualizar la canción en el estado global y en localStorage
  const updateSong = (song) => {
    setCurrentUser({ ...currentUser, song }); // Actualizamos el usuario con la canción seleccionada
    localStorage.setItem("selectedSong", JSON.stringify(song)); // Guardamos la canción en localStorage
  };

  // Cargar la canción desde localStorage o usar la predeterminada
  useEffect(() => {
    const storedSong = JSON.parse(localStorage.getItem("selectedSong"));
    if (storedSong) {
      setSelectedSong(storedSong);
    } else {
      setSelectedSong(fakeDbofSongs.find((s) => s.name === "Default Song")); // Establecer la canción predeterminada
    }
  }, [currentUser]);

  return (
    <div className="song-section">
      <h3>Gestión de Canción</h3>
      <SongUpload
        handleSongUpload={(event) => handleSongUpload(updateSong, event)} // Modificamos para usar updateSong
        uploadSong={updateSong}
        setSong={setSelectedSong}
      />
      {selectedSong && (
        <div>
          <p>{selectedSong.name}</p> {/* Mostrar el nombre de la canción seleccionada */}
          <button className="btn btn-delete-song" onClick={() => updateSong(null)}>
            Eliminar Canción
          </button>
        </div>
      )}
    </div>
  );
};

export default SongManagement;
