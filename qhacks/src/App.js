import React, { useState } from 'react';
import './App.css';

// Resources
import Logo from './Resources/TennisLogo.png';
import DemoVideo from "./Resources/sampledemodim.mp4";

function App() {
  const [summaryPoints, setSummaryPoints] = useState([]);

  const handleFileUpload = async (event) => {
    const videoFile = event.target.files[0];
    
    const formData = new FormData();
    formData.append('file', videoFile);
  
    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        headers: { 'content-type': 'multipart/form-data' },
        body: formData,
      });
  
      console.log(response);

      const data = await response.json();
      console.log({ data });

      // if (response.type === 'opaque' || response.ok) {
      //   const summary = await response.json();
      //   console.log(summary);
      //   setSummaryPoints(summary.points);
      // } else {
      //   console.error('Failed to upload video');
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      {/* Video Background */}
      <video className="background-video" autoPlay muted loop>
        <source src={DemoVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Landing Page */}
      <header className="header">
        <h1 className="title">TENNIS ANALYZER</h1>
        <img className="logo" src={Logo} alt="Logo" />
      </header>
      
      <div className="main-content">
        <p className="small-text">BECOME A CHAMPION TODAY.</p>
        <p className="massive-text">TENNIS GAMES ANALYZER</p>
        <p className="description-text">Never lose another match to the same mistakes again.</p>
      </div>

      {/* Bottom Section */}
      <div className='background-green'>
        {/* Space */}
        <div style={{ marginBottom: '50px' }} />
      
      {/* Video Input Section */}
      <div className="video-input-section">
        <h2 className="Upload-header">Upload Your Tennis Game Video (MP4)</h2>
        <label className="file-input-label">
          <input type="file" accept="video/mp4" className="file-input" onChange={handleFileUpload} />
          <span className="Upload-buttontext">Choose File</span>
        </label>
        <p className="Upload-desc">Start Your Premium AI Analysis to Improve Your Matches Today</p>
      </div>

      {/* Space */}
      <div style={{ marginBottom: '50px' }} />

      {/* Your Summary Section */}
      <div className="summary-section">
        <h2>Your Summary</h2>
        <div className="summary-box">
          <ul>
            {summaryPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
