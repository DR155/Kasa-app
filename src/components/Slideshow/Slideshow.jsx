// src/components/Slideshow/Slideshow.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Slideshow.css';

function Slideshow({ pictures }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPictures = pictures.length;
  const showControls = totalPictures > 1;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalPictures - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalPictures - 1 ? 0 : prevIndex + 1
    );
  };

  if (!pictures || totalPictures === 0) {
    return <div className="slideshow-container slideshow-no-image">Aucune image disponible</div>;
  }

  return (
    <div className="slideshow-container">
      <img
        src={pictures[currentIndex]}
        alt={`Logement photo ${currentIndex + 1}`}
        className="slideshow-image"
      />
      {showControls && (
        <>
          <button
            onClick={goToPrevious}
            className="slideshow-arrow slideshow-arrow-left"
            aria-label="Image précédente"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={goToNext}
            className="slideshow-arrow slideshow-arrow-right"
            aria-label="Image suivante"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <div className="slideshow-counter">
            {currentIndex + 1}/{totalPictures}
          </div>
        </>
      )}
    </div>
  );
}

export default Slideshow;