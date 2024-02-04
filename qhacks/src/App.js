import React, { useState, useRef } from 'react';
import './App.css';
import axios from 'axios';

// Resources
import Logo from './Resources/tracylogo.png';
import DemoVideo from "./Resources/sampledim.mp4";
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
    setActiveHeatmap((prev) => {
      // Cycle through 0, 1, 2
      return (prev + 1) % 3;
    });

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
            <p>Let's tackle this one step at a time.<br/><br/>

<strong>Firstly</strong>, well done on cleverly steering clear of placing balls in the middle of the court. Your shot placement statistics show a good distribution with <strong>37.54%</strong> on the opponent's left court, <strong>24.57%</strong> in the middle and <strong>37.88%</strong> on the right court. A good strategy, giving your opponent a tough time predicting your shots.

Your opponent's shot distribution, however, suggests the majority of their shots are coming either to the middle or right side of your court. <br/><br/>Investing some time to ensure your fitness and footwork supports quick recovery in these areas could prove invaluable.<br/>

Your forehand and backhand both show potential. Right now, I need to see more balls on your backhand to give you a fair assessment. Challenge yourself to return more shots with your backhand during practice.<br/><br/>

Your serve data presents an invaluable opportunity for improvement. Your first serve speed of <strong>201.03 km/h</strong> is great. As for your second serve, it averages at <strong>136.81 km/h</strong>, which is below the men's average, and it's a slice serve. Working on generating more spin while maintaining or improving the service speed could give your second serve that magic touch.<br/>

Now, let's look at this ball trajectory plot in the rally with a top-down view. The plot reveals that you're making good use of the court space. Remember to capitalize on the depth of the court. Pushing your opponent backward will create opportunities in the court for your following shots.<br/><br/>

<strong>Recommendations include:</strong><br/>

1. Practice sessions to enhance your backhand. Add some drills to put you in challenging positions in both the left and middle areas of the court.<br/>

2. Work on your footwork agility and speed to quickly recover for shots placed in the middle and to your right.<br/>

3. Implement ‘serve plus one’ drills. Begin every point with a designated serve followed by a particular shot.<br/>

4. Increase your second serve speed. Incorporate physical regimens in your workouts to improve your upper body and core strength.<br/><br/>

Keep these points in mind, and remember without persistence, your greatest strengths can become dormant. Keep practicing and push boundaries, and soon, we'll have you completely owning that court like a pro!
</p>
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
            {/* Button to swap heatmaps */}
            <button class="swap" onClick={swapHeatmaps}>Swap!</button>
            </div>
            {activeHeatmap === 0 ? (
            <div>
              <img src={P2Heatmap} className="player-heatmap" alt="p2_heatmap" />
              <img src={P1Heatmap} className="player-heatmap" alt="p1_heatmap" />
            </div>
          ) : activeHeatmap === 1 ? (
              <img src={BallHeatmap} className="ball-heatmap" alt="ball_heatmap" />
          ) : (
            <div>
              <img src={BallTrajectory} className="ball-trajectory" alt="ball_trajectory" />
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
