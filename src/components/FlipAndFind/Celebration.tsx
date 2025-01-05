import React, { useEffect } from 'react';
import './Celebration.css';

export function Celebration() {
  useEffect(() => {
    // Cleanup fireworks after 5 seconds
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.pyro');
      elements.forEach(el => el.remove());
    }, 50000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="celebration-container">
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
    </div>
  );
}