import React from 'react';
import { Paper, Typography, Avatar } from '@mui/material';

const ChatMessage = ({ message, isUser }) => {
  if (!message) {
    return null; 
  }

  const messageStyle = {
    padding: '10px 15px',
    borderRadius: '10px',
    marginBottom: '10px',
    maxWidth: '80%',
    display: 'flex',
    alignItems: 'center',
  };

  const userStyle = {
    backgroundColor: '#2DCF57',
    alignSelf: 'flex-end',
  };

  const chatbotStyle = {
    backgroundColor: '#EAFFF0',
    alignSelf: 'flex-start',
  };

  const messageTypeStyle = isUser ? userStyle : chatbotStyle;

  const avatarStyle = {
    marginRight: isUser ? '0' : '8px', 
    marginLeft: isUser ? '8px' : '0', 
  };

  return (
    <Paper style={{ ...messageStyle, ...messageTypeStyle }}>
      {!isUser && (
        <Avatar style={avatarStyle}>
          <img
            src="https://i.postimg.cc/pXzz4vVZ/Avatar-Image.png"
            alt="Chatbot Avatar"
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          />
        </Avatar>
      )}
      <Typography variant="body1">{message}</Typography>
      {isUser && (
        <Avatar style={avatarStyle}>
          <img
            src="https://i.postimg.cc/0NqtFZq6/8801434.png"
            alt="User Avatar"
            style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor:'white' }}
          />
        </Avatar>
      )}
    </Paper>
  );
};

export default ChatMessage;
