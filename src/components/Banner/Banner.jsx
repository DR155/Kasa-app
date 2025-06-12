import React from 'react';
import './Banner.css';

function Banner({ imageSrc, text, altText = "Bannière", showTextOverlay = false }) {
  const bannerClassName = `banner-container ${!showTextOverlay ? 'banner-no-text' : ''}`;

  return (
    <div className={bannerClassName}>
      <img src={imageSrc} alt={altText} className="banner-image" />
      {showTextOverlay && text && (
        <div className="banner-overlay">
          <h1 className="banner-text">{text}</h1>
        </div>
      )}
    </div>
  );
}

export default Banner;