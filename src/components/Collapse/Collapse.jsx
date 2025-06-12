// src/components/Collapse/Collapse.jsx
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
    contentElement = <p>{content.split('\n').map((line, i) => <React.Fragment key={i}>{line}{i < content.split('\n').length - 1 && <br />}</React.Fragment>)}</p>;
  } else {
    contentElement = <div>{content}</div>;
  }

  return (
    <div className={`collapse-item ${isOpen ? 'open' : ''}`}>
      <div className="collapse-header">
        <h3 className="collapse-title">{title}</h3>
        <FontAwesomeIcon
          icon={faChevronUp}
          className={iconClassName}
          onClick={toggleCollapse}
          role="button"
          tabIndex="0"
          aria-expanded={isOpen}
          aria-controls={contentId}
          aria-label={`Ouvrir/fermer la section ${title}`}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCollapse(); } }}
        />
      </div>
      {isOpen && (
        <div className="collapse-content" id={contentId}>
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