import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Logement from '../pages/Logement/Logement';
import Error404 from '../pages/Error404/Error404';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}> {/* Layout principal */}
          <Route index element={<Home />} /> {/* Accueil */}
          <Route path="logement/:id" element={<Logement />} /> {/* Détail logement */}
          <Route path="/about" element={<About />} /> {/* À propos */}
          <Route path="*" element={<Error404 />} /> {/* 404 */}
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;