import React from 'react';
import './HostInfo.css';

function HostInfo({ hostName, hostPicture }) {
  const [firstName, lastName] = hostName.split(' '); // Sépare le nom et prénom

  return (
    <div className="host-info-container">
      <div className="host-name">
        <span>{firstName}</span>
        <span>{lastName}</span>
      </div>
      <img src={hostPicture} alt={`Profil de ${hostName}`} className="host-picture" />
    </div>
  );
}

export default HostInfo;