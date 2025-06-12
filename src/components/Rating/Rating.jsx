import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './Rating.css';

const MAX_STARS = 5;

function Rating({ ratingValue }) {
  const numRating = parseInt(ratingValue, 10);
  const currentRating = Math.min(Math.max(numRating, 0), MAX_STARS);

  return (
    <div className="rating-container">
      {[...Array(MAX_STARS)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={`rating-star ${index < currentRating ? 'active' : 'inactive'}`}
          // La classe 'active' ou 'inactive' sera utilisée pour la couleur
        />
      ))}
    </div>
  );
}

Rating.propTypes = {
  // ratingValue vient du backend sous forme de chaîne (ex: "3")
  ratingValue: PropTypes.string.isRequired,
};

export default Rating;