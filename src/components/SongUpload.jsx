// src/components/SongUpload.jsx
import React from "react";

const SongUpload = ({ handleSongUpload, uploadSong, setSong }) => (
  <div className="form-section">
    <h3>Cargar Canción</h3>
    <label htmlFor="song-upload" className="upload-label">
      Seleccionar archivo de audio:
    </label>
    <input
      id="song-upload"
      type="file"
      accept="audio/*"
      className="upload-input"
      onChange={handleSongUpload(uploadSong, setSong)}
    />
  </div>
);

export default SongUpload;
