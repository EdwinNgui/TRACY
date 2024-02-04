// GifOverlay.js
import React, { useState, useEffect, useRef } from 'react';
import logo from "./Resources/TracyGif2.gif";

const GifOverlay = ({ showGif, handleShowGif }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (showGif) {
      // Disable scrolling when the GIF is shown
      document.body.style.overflow = 'hidden';

      // Triggering the fade-in effect
      setIsFading(true);

      const timeoutId = setTimeout(() => {
        handleShowGif(false);

        // Enable scrolling when the GIF is hidden
        document.body.style.overflow = 'auto';

        // Automatically scroll to the bottom of the page
        document.getElementsByClassName("summary-section")[0].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 8000);

      return () => {
        // Triggering the fade-out effect before hiding the GIF
        setIsFading(false);
        clearTimeout(timeoutId);
      };
    }
  }, [showGif, handleShowGif]);

  return (
    <div>
      {showGif && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isFading ? 1 : 0, // Apply fade effect
            transition: 'opacity 4s ease', // CSS transition for fading
          }}
        >
          <img
            src={logo}
            alt="Animated GIF"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default GifOverlay;