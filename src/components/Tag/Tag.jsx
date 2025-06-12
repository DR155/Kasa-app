import React from 'react';
import './Tag.css';

function Tag({ tagName }) {
  return (
    <span className="tag-item">{tagName}</span>
  );
}

export default Tag;