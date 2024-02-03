import React, { useState } from 'react';
import './App.css';

// Resources
import Logo from './Resources/tracylogo.png';
import DemoVideo from "./Resources/sampledemodim.mp4";

function App() {
  const [summaryPoints, setSummaryPoints] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileUpload = (event) => {
    const videoFile = event.target.files[0];

    // Simulating a successful upload locally
    const videoUrl = URL.createObjectURL(videoFile);
    setVideoPreview(videoUrl);
    setUploadStatus('File upload successful');
  };

  return (
    <div className="container">
      {/* Video Background */}
      {videoPreview ? (
        <video className="background-video" autoPlay muted loop>
          <source src={videoPreview} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <video className="background-video" autoPlay muted loop>
          <source src={DemoVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Landing Page */}
      <header className="header">
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

          {/* Conditional rendering of the horizontal bar line */}
          {videoPreview && <hr />}

          {uploadStatus && <p className="Upload-status">{uploadStatus}</p>}

          {videoPreview && (
            <div className='video-dimensions'>
              <video width="640" height="480" controls>
                <source src={videoPreview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
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

      {/* Visualized Data Section */}
      <div className="background-green">
        <div className='data-container'>

        {/* Button Section */}
        <div className="button-container">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <button key={number}>{number}</button>
            ))}
          </div>

          {/* Video and Images Section */}
          <div className="video-container">
            <div className="video">
              {/* Your big video component goes here */}
            </div>
            <div className="image-container">
              {/* First Image: Player 1 heat map */}
              <img src="path/to/first-image.jpg" alt="First Image" />

              {/* Second Image: Player 1 heat map */}
              <img src="path/to/second-image.jpg" alt="Second Image" />
            </div>
          </div>

          {/* Text Columns Section */}
          <div className="text-columns">
            <div className="column">Serve Speed Goes Here</div>
            <div className="column">Landing Spot graph goes here (it's green/red)</div>
            <div className="column">Ball Heat Map goes here</div>
          </div>






        </div>
      </div>

    </div>
  );
}

export default App;
