import React, { useEffect, useState } from 'react';
import Banner from '../../components/Banner/Banner';
import Card from '../../components/Card/Card';
import { getAllLogements } from '../../services/logementService';
import homeBannerImage from '../../assets/images/homeBanner.jpg';
import './Home.css';

function Home() {
  const [logements, setLogements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogements = async () => {
      try {
        setLoading(true);
        const data = await getAllLogements();
        setLogements(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Erreur chargement.');
        setLogements([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogements();
  }, []);

  return (
    <div className="home-page-content">
      <Banner
        imageSrc={homeBannerImage}
        altText="Paysage côtier brumeux"
        text="Chez vous, partout et ailleurs"
        showTextOverlay={true}
      />
      <section className="gallery-section">
        {loading && <p className="loading-message">Chargement...</p>}
        {error && <p className="error-message">Erreur : {error}</p>}
        {!loading && !error && logements.length === 0 && (
          <p className="no-logements-message">Aucun logement.</p>
        )}
        {!loading && !error && logements.length > 0 && (
          <div className="cards-grid">
            {logements.map((logement) => (
              <Card
                key={logement.id}
                id={logement.id}
                title={logement.title}
                cover={logement.cover}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
