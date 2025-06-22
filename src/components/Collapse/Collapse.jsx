// src/components/Collapse/Collapse.jsx
import React, { useState } from 'react'; // On garde useState pour l'état ouvert/fermé
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './Collapse.css'; // On va modifier ce fichier CSS

function Collapse({ title, content, contentType = 'text' }) {
  // On garde un état pour savoir si le panneau est ouvert ou fermé
  const [isOpen, setIsOpen] = useState(false);

  // Quand on clique sur le titre, on change l'état (ouvert devient fermé, fermé devient ouvert)
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  // On prépare la classe CSS pour l'icône chevron pour qu'elle tourne
  const iconClassName = `collapse-icon ${isOpen ? 'open' : 'closed'}`;

  // On prépare le contenu à afficher (texte ou liste)
  let contentElement;
  if (contentType === 'list' && Array.isArray(content)) {
    contentElement = (
      <ul>
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  } else if (typeof content === 'string') {
    contentElement = <p>{content.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>;
  } else {
    contentElement = <div>{content}</div>;
  }

  return (
    <div className={`collapse-item ${isOpen ? 'open' : ''}`}>
      {/* L'en-tête cliquable (le titre et la flèche) */}
      <div
        className="collapse-header"
        onClick={toggleCollapse} // Quand on clique, on appelle toggleCollapse
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleCollapse(); }} // Pour que ça marche aussi avec le clavier (Entrée/Espace)
        role="button" // On dit que c'est un bouton pour l'accessibilité
        tabIndex="0" // On peut y accéder avec la touche Tab
        aria-expanded={isOpen} // On dit si le contenu est visible ou non (pour les lecteurs d'écran)
        // aria-controls et aria-label peuvent rester si tu les as ajoutés pour l'accessibilité
      >
        <h3 className="collapse-title">{title}</h3> {/* Le titre (vient des props) */}
        {/* L'icône chevron. Elle tourne grâce à la classe iconClassName et au CSS */}
        <FontAwesomeIcon icon={faChevronUp} className={iconClassName} aria-hidden="true" />
      </div>

      {/* Le conteneur du contenu. Il est TOUJOURS là dans le HTML. */}
      {/* C'est le CSS qui va le cacher/montrer avec une animation grâce à la classe 'open' */}
      <div
        className={`collapse-content ${isOpen ? 'open' : ''}`} // La classe 'open' est ajoutée si isOpen est true
        // id, role, aria-labelledby peuvent rester si tu les as ajoutés pour l'accessibilité
      >
         <div className="collapse-content-inner">
            {contentElement} {/* Le contenu (texte ou liste) */}
         </div>
      </div>
    </div>
  );
}

Collapse.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.node,
  ]).isRequired,
  contentType: PropTypes.oneOf(['text', 'list', 'node']),
};

export default Collapse;