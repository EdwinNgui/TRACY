import React from 'react';

function readFileContent(filePath) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;
      resolve(fileContent);
    };

    reader.onerror = (event) => {
      reject(event.target.error);
    };

    // Assuming you want to read the file as text
    reader.readAsText(filePath);
  });
}

function FileReaderComponent({ filePath }) {
  const handleFileSelect = async (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      try {
        const fileContent = await readFileContent(file);
        console.log('File content:', fileContent);
        // You can process the file content here or perform other actions.
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
    </div>
  );
}

export default FileReaderComponent;
