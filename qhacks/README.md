# Introducing TRACY: Tennis Real-time Analysis Coaching

![tracy_thumbnail](https://raw.githubusercontent.com/EdwinNgui/QHacks2024/main/qhacks/src/Resources/tracey_thumbnail_v2_00000.png)

>Transforming tennis footage with AI insights from ChatGPT and statistical analysis. 🎾
Elevate your game with dynamic visuals and strategic summaries. 🚀

## What It Does and How It Works
TRACY utilizes computer vision algorithms and pre-trained neural networks to analyze tennis footage, tracking player movements, and ball trajectories. The system then employs ChatGPT for AI-driven insights, generating personalized natural language summaries highlighting players' strengths and weaknesses. The output includes dynamic visuals and statistical data, offering a comprehensive overview and further insights into the player's performance.

[Submission to *QHacks 2024*](https://devpost.com/software/tracy-dm41vu)

# Table of Contents
- [Introducing TRACY: Tennis Real-time Analysis Coaching](#introducing-tracy-tennis-real-time-analysis-coaching)
  - [What It Does and How It Works](#what-it-does-and-how-it-works)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Available Scripts](#available-scripts)
    - [`npm run start`](#npm-run-start)
    - [`python gptRequest.py`](#python-gptrequestpy)
- [Contributors](#contributors)


# Getting Started

## Prerequisites
- FFmpeg
- [yolov3 weights](https://pjreddie.com/media/files/yolov3.weights)
- Node.js
  - React.js
  - Axios
- Python 3.x
  - Flask
  - Tensorflow (Keras)
  - OpenCV
  - OpenAI

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the web app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `python gptRequest.py`

Runs the ChatGPT API fetcher that returns a response from ChatGPT to the front-end.


# Contributors
- **Vu Cao**: @mizly
- **Daniel Lu**: @FinityFly
- **Edwin Ngui**: @EdwinNgui
