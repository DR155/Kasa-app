import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import './MainLayout.css'; 

function MainLayout() {
  return (
    <div className="main-application-wrapper"> {/* Fond global */}
      <Header />
      <main className="page-container"> {/* Contenu */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;