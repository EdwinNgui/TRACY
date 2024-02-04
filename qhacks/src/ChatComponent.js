/*

I THINK THIS FILE CAN BE DELETED

*/

"use strict";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/chatgpt', { inputText: 'Tell me a joke' });
      const messageFromChatGPT = response.data.message;
      setMessage(messageFromChatGPT);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    "Message from ChatGPT: {message}"
  );
};

export default ChatComponent;