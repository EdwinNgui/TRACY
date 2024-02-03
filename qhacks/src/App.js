import React, { useState, useRef } from 'react';
import './App.css';
import { fetchData } from './ChatComponent';

// Resources
import Logo from './Resources/tracylogo.png';
import DemoVideo from "./Resources/sampledemodim.mp4";
import BallHeatmap from "./Resources/DataVisualized/ball_heatmap.png";
import BallTrajectory from "./Resources/DataVisualized/ball_trajectory.png";
import P1Heatmap from "./Resources/DataVisualized/p1_heatmap.png";
import P2Heatmap from "./Resources/DataVisualized/p2_heatmap.png";
const Tab = ({ label, onClick, isActive }) => {
  return (
    <div
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

const Tabs = ({ tabs, activeTab, onTabClick,containerRef }) => {
  return (
    <div className="tabs"ref={containerRef}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={`Shot ${index + 1}`}
          onClick={() => onTabClick(index)}
          isActive={index === activeTab}
        />
      ))}
    </div>
  );
};

function App() {
  const [summaryPoints, setSummaryPoints] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const numberOfTabs = 14; // Set your configurable number of tabs here

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const scrollTabs = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleFileUpload = (event) => {
    const videoFile = event.target.files[0];

    // Simulating a successful upload locally
    const videoUrl = URL.createObjectURL(videoFile);
    setVideoPreview(videoUrl);
    setUploadStatus('File upload successful');
  };

  const handleGPTRequest = (event) => {
    
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
            <p>Bot (Tennis Coach): "Impressive serve speed! To address the challenges with your backhand, let's focus on a few key areas:

                Backhand Technique:

                Ensure a proper grip on the racket.
                Work on a consistent and controlled swing motion.
                Practice using your legs to generate power and stability.
                Footwork:

                Improve your lateral movement to cover the court efficiently.
                Focus on positioning yourself early for backhand shots.
                Drills and Exercises:

                Incorporate drills specifically targeting your backhand.
                Work on both defensive and offensive scenarios to build versatility.
                Match Strategy:

                Identify patterns in opponents' shots to anticipate backhand challenges.
                Develop strategies to redirect shots effectively.
                Mental Toughness:

                Build confidence in your backhand through mental conditioning.
                Stay focused during pressure situations.
                Remember to practice consistently, and consider seeking guidance from a local tennis coach for personalized feedback. Keep up the hard work, and you'll see improvements in no time!</p>
          </div>
        </div>
      </div>

      {/* Visualized Data Section */}
      <div className="background-green">
        <div className='data-container'>

        {/* Button Section */}
        <div className="button-container">
        <div className="tabs">
        <button onClick={() => scrollTabs('left')}>←</button>
        <Tabs
          tabs={new Array(numberOfTabs).fill(null)}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          containerRef={containerRef}
        />
        <button onClick={() => scrollTabs('right')}>→</button>
      </div>
          </div>

          {/* Video and Images Section */}
          <div className="video-container">
            <div className="video">
            <video width="640" controls>
              <source src={"/out/out0/grah.mp4"} type="video/mp4" />
            </video>
            </div>
            <div className="image-container">
              {/* First Image: Player 2 heat map */}
              <img src={P2Heatmap} className="player-heatmap" alt="p1_heatmap" />
              {/* Second Image: Player 1 heat map */}
              <img src={P1Heatmap} className="player-heatmap" alt="p2_heatmap" />
            </div>
          </div>

          {/* Text Columns Section */}
          <div className="text-columns">
            <div className="column">Serve Speed: 201km/h</div>
            <div className="column">
              <div className="col-container">
                <img src={BallTrajectory} alt="ball_trajectory" />
              </div>
            </div>
            <div className="column">
              <div className="col-container">
                <img src={BallHeatmap} className='ball-heatmap' alt="ball_heatmap" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
