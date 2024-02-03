// src/App.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #333;
  padding: 10px;
  color: white;
  text-align: left;
`;

const Title = styled.h1`
  margin: 0;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 10%;
  text-align: left;
`;

const SmallText = styled.p`
  font-size: 40px;
  color: #e6c910;
  margin: 5px 0;
`;

const MassiveText = styled.p`
  font-size: 140px;
  font-weight: bold;
  color: black;
  margin: 20px 0;
`;

const DescriptionText = styled.p`
  font-size: 36px;
  color: black;
  margin-bottom: 40px;
`;

const VideoInputSection = styled.div`
  text-align: center;
`;

function App() {
  return (
    <Container>

      {/* Landing Page */}
      <Header>
        <Title>TENNIS ANALYZER</Title>
      </Header>
      <MainContent>
        <SmallText>BECOME A CHAMPION TODAY.</SmallText>
        <MassiveText>
          TENNIS GAMES ANALYZER
        </MassiveText>
        <DescriptionText>
          Never lose another match to the same mistakes again. 
        </DescriptionText>
      </MainContent>

      {/* Space */}
      <div style={{ marginBottom: '50px' }} />

      {/* Video Input Section */}
      <VideoInputSection>
        <h2>Upload Your Tennis Game Video (MP4)</h2>
        <input type="file" accept="video/mp4" />
        <p>Upload your tennis game video to start the analysis.</p>
      </VideoInputSection>

    </Container>
  );
}

export default App;
