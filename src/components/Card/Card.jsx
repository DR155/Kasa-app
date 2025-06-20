import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ id, title, cover }) {
  return (
    <Link to={`/logement/${id}`} className="card-link">
      <article className="card-item">
        <img src={cover} alt={title || "Logement"} className="card-image" />
        <div className="card-overlay"></div>
        <h2 className="card-title">{title}</h2>
      </article>
    </Link>
  );
}

export default Card;