// src/pages/Logement/Logement.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLogementById } from '../../services/logementService';
import Slideshow from '../../components/Slideshow/Slideshow';
import Tag from '../../components/Tag/Tag';
import HostInfo from '../../components/HostInfo/HostInfo';
import Rating from '../../components/Rating/Rating';
import Collapse from '../../components/Collapse/Collapse';
import './Logement.css';
// ... (Collapse sera importé plus tard)

function Logement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [logement, setLogement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogementData = async () => {
      try {
        setLoading(true);
        const data = await getLogementById(id);
        setLogement(data);
      } catch (err) {
        navigate('/404', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchLogementData();
  }, [id, navigate]);

  if (loading || !logement) {
    return <div className="loading-message page-container">Chargement...</div>;
  }

  return (
    <div className="logement-detail-page page-container">
      <Slideshow pictures={logement.pictures} />
      <div className="logement-info-layout">
        <div className="logement-primary-info">
          <h1 className="logement-title">{logement.title}</h1>
          <p className="logement-location">{logement.location}</p>
          <div className="logement-tags-container">
            {logement.tags.map((tag, index) => (
              <Tag key={index} tagName={tag} />
            ))}
          </div>
        </div>
        <div className="logement-secondary-info">
          <HostInfo hostName={logement.host.name} hostPicture={logement.host.picture} />
          <Rating ratingValue={logement.rating} />
        </div>
      </div>
      <div className="logement-collapse-sections">
        <Collapse title="Description" content={logement.description} contentType="text" />
        <Collapse title="Équipements" content={logement.equipments} contentType="list" />
      </div>
    </div>
  );
}

export default Logement;