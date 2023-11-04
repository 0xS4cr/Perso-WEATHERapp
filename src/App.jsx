import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WeatherComponent from './components/WeatherComponent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WeatherComponent />} /> {/* Utilisez le chemin / pour la page d'accueil */}
      </Routes>
    </div>
  );
}

export default App;
