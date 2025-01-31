import React, { useState, useEffect, useRef } from "react";
import { useUserContext } from "../../contexts/UserContext"; // Importamos el contexto de usuario

const MusicControl = () => {
  const { getSongs, addSong } = useUserContext(); // Accedemos a las canciones desde el contexto
  const songs = getSongs(); // Obtenemos las canciones desde el estado global
  const storedSong = localStorage.getItem("currentSong");
  const storedIsPlaying = localStorage.getItem("isPlaying") === "true"; // Verificamos si está reproduciendo

  // Si no hay canción en el localStorage, usamos la primera de fakeDbofSongs
  const [isPlaying, setIsPlaying] = useState(storedIsPlaying);
  const [currentSong, setCurrentSong] = useState(storedSong || songs[0].url);
  const audioRef = useRef(new Audio(currentSong)); // Usamos useRef para manejar la reproducción de audio

  useEffect(() => {
    // Asignamos la canción actual al cargar el componente
    audioRef.current.src = currentSong;

    if (isPlaying) {
      // Intentamos reproducir la canción si está en estado de reproducción
      audioRef.current.play().catch((err) => {
        console.error("Error al reproducir la música:", err);
      });
    } else {
      // Pausamos la canción si no está en estado de reproducción
      audioRef.current.pause();
    }

    // Guardamos la canción y el estado de la reproducción en localStorage
    localStorage.setItem("currentSong", currentSong);
    localStorage.setItem("isPlaying", isPlaying.toString());
  }, [currentSong, isPlaying]);

  // Función para cambiar entre reproducción y pausa
  const handleMusicToggle = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Error al reproducir la música:", err);
      });
    }
    setIsPlaying(!isPlaying); // Cambiar el estado de reproducción
  };

  // Función para cambiar la canción
  const handleChangeSong = (newSongUrl) => {
    setCurrentSong(newSongUrl);
    addSong({ id: songs.length, name: "Nuevo tema", url: newSongUrl }); // Agregar la nueva canción al estado global
  };

  return (
    <div>
      {/* Botón de música */}
      <button onClick={handleMusicToggle}>
        {isPlaying ? "🔇 Pausar Música" : "🔊 Reproducir Música"}
      </button>

      {/* Lista de canciones disponibles */}
      <div>
        <h3>Selecciona una canción</h3>
        {songs.map((song) => (
          <button
            key={song.id}
            onClick={() => handleChangeSong(song.url)} // Cambiar a la canción seleccionada
          >
            {song.name}
          </button>
        ))}
      </div>

      {/* Reproductor de música */}
      <audio ref={audioRef} />
    </div>
  );
};

export default MusicControl;
