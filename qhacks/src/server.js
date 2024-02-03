const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const port = 3001;

app.use(cors());

app.use(fileUpload());

app.post('/upload', (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const videoFile = req.files.file;
    console.log(videoFile);
    const videoFilePath = path.join(__dirname, 'uploads', videoFile.name);
    console.log(videoFilePath);

    videoFile.mv(videoFilePath, (err) => {
      // if (err) {
      //   console.error('File upload error:', err);
      //   return res.status(500).send(err);
      // }

      const pythonProcess = spawn('python', ['extract_gameplay.py', videoFilePath]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        // Handle response or send some confirmation to the client
        res.json({ success: true });
      });
    });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
