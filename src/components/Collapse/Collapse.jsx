import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './Collapse.css';

function Collapse({ title, content, contentType = 'text' }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const iconClassName = `collapse-icon ${isOpen ? 'open' : 'closed'}`;
  const contentId = `collapse-content-${title.replace(/\s+/g, '-')}`;
  const headerId = `collapse-header-${title.replace(/\s+/g, '-')}`;

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
      <div
        id={headerId}
        className="collapse-header"
        onClick={toggleCollapse}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleCollapse(); }} // Pour l'accessibilité clavier
        role="button"
        tabIndex="0"
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-label={`${title}, ${isOpen ? 'masquer le contenu' : 'afficher le contenu'}`} // Label dynamique
      >
        <h3 className="collapse-title" id={`title-${headerId}`}>{title}</h3> {/* id pour aria-labelledby si besoin */}
        <FontAwesomeIcon icon={faChevronUp} className={iconClassName} aria-hidden="true" /> {/* Explicitement aria-hidden */}
      </div>
      {isOpen && (
        <div className="collapse-content" id={contentId} role="region" aria-labelledby={`title-${headerId}`}>
             <div className="collapse-content-inner">
                {contentElement}
             </div>
        </div>
      )}
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