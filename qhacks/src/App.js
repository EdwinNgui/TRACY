import React, { useState, useRef } from 'react';
import './App.css';
import axios from 'axios';

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
  const [text, setText] = useState('');
  const [activeHeatmap, setActiveHeatmap] = useState(0);

  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const numberOfTabs = 14; // Set your configurable number of tabs here

  const swapHeatmaps = () => {
    setActiveHeatmap((prev) => (prev === 0 ? 1 : 0));
  };
  
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

  const handleFileUpload = async (event) => {
    const videoFile = event.target.files[0];

    // Simulating a successful upload locally
    const videoUrl = URL.createObjectURL(videoFile);
    setVideoPreview(videoUrl);
    setUploadStatus('File upload successful');

    try {
      let payload = {'sample': 'sample'}
      const response = await axios.get('http://127.0.0.1:3000/post_text');
      const responseData = response.data; // Assuming the response is a JSON object
      console.log(responseData);
    } catch (error) {
      console.error('Error posting text:', error);
    }
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

        {/* Data components revealed when loading complete */}
        {uploadStatus && (
          <div>
            {/* Your Summary Section */}
            <div className="summary-section">
          <h2 className='summary-header'>Your AI-Powered Summary</h2>
          <div className="summary-box">
            <p><strong>Tracy your Tennis Coach</strong>: "Impressive serve speed! To address the challenges with your backhand, let's focus on a few key areas:<br/><br/>

                <strong>Backhand Technique:</strong><br/>

                Ensure a proper grip on the racket.<br/>
                Work on a consistent and controlled swing motion.<br/>
                Practice using your legs to generate power and stability.<br/><br/>
                <strong>Footwork:</strong><br/>

                Improve your lateral movement to cover the court efficiently.<br/>
                Focus on positioning yourself early for backhand shots.<br/><br/>
                <strong>Drills and Exercises:</strong><br/>

                Incorporate drills specifically targeting your backhand.<br/>
                Work on both defensive and offensive scenarios to build versatility.<br/><br/>
                <strong>Match Strategy:</strong><br/>

                Identify patterns in opponents' shots to anticipate backhand challenges.<br/>
                Develop strategies to redirect shots effectively.<br/><br/>
                <strong>Mental Toughness:</strong><br/>

                Build confidence in your backhand through mental conditioning.<br/>
                Stay focused during pressure situations.<br/><br/>
                Remember to practice consistently, and consider seeking guidance from a local tennis coach for personalized feedback. Keep up the hard work, and you'll see improvements in no time!</p>
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
            <p className="headings">Video</p>
            <video key={activeTab} width="640" autoPlay controls>
            <source src={`/out/out${activeTab}/video.mp4`} type="video/mp4" />
            </video>
            </div>

            <div className="image-container">
            <div className="headings">
            <p>Global heatmaps</p>
            {/* Button to swap heatmaps */}
            <button class="button" onClick={swapHeatmaps}>Swap!</button>
            </div>
            {activeHeatmap === 0 ? (
              <div>
              <img src={P2Heatmap} className="player-heatmap" alt="p1_heatmap" />
              <img src={P1Heatmap} className="player-heatmap" alt="p2_heatmap" />
              </div>
            ) : (
              <div>
              <img src={BallHeatmap} className="player-heatmap" alt="p1_heatmap" />
              <img src={BallTrajectory} className="player-heatmap" alt="p2_heatmap" />
              </div>
            )}
            </div>
          </div>

        </div>
      </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
