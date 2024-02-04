import React, { useState } from 'react';
import './ScrollButton.css'; // Import the CSS file for styling

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToSection = () => {
    const targetElement = document.querySelector('.video-input-section');
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll-button ${isVisible ? 'visible' : 'hidden'}`}
      onClick={scrollToSection}
    >
      {/* Use a down arrow character instead of SVG */}
      &#9660; {/* This is the HTML code for a down arrow character */}
    </button>
  );
};

export default ScrollButton;
