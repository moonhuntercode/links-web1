// src/components/SongUpload.jsx
import React from "react";

const SongUpload = ({ handleSongUpload }) => (
  <div className="song-upload">
    <label htmlFor="song-upload" className="upload-label">
      Seleccionar archivo de audio:
    </label>
    <input id="song-upload" type="file" accept="audio/*" onChange={handleSongUpload} />
  </div>
);

export default SongUpload;
