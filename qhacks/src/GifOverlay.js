// GifOverlay.js
import React, { useState, useEffect } from 'react';
import logo from "./Resources/TracyGif2.gif";

const GifOverlay = ({ showGif, handleShowGif }) => {
  useEffect(() => {
    if (showGif) {
      const timeoutId = setTimeout(() => {
        handleShowGif(false);
      }, 8000);

      return () => clearTimeout(timeoutId);
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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
