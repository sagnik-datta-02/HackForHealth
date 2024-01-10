import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, Container } from '@mui/material';
import axios from 'axios';
import TheraChatMessage from './Therabot';

function TheraPedia() {
  const clickableQuestions = [
    "I am feeling depressed please help me out",
    "What does Mental Health Mean?",
    "How to balance career and health?",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messageHistory, setMessageHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [clickableQuestionsAdded, setClickableQuestionsAdded] = useState(false);

  const listRef = useRef(null);

  const handleUserResponse = async (response) => {
    try {
      
      setMessageHistory((prevHistory) => [
        ...prevHistory,
        { message: response, isUser: true },
      ]);
      
      if (messageHistory!=null) {
        
     
        await handleClickableQuestionResponse(response);
      } else {
       
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }

      setUserInput('');
    } catch (error) {
      console.error('Error handling user response:', error);
    }
  };

  const handleClickableQuestionResponse = async (response) => {
    try {
    
      const apiResponse = await axios.post('https://chatu-ehd7.vercel.app/chat/runChat', {
        'userInput': response, 
      });

      const answer = apiResponse.data.chatResponse; 

      setMessageHistory((prevHistory) => [
        ...prevHistory,
        { message: answer, isUser: false },
      ]);

      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } catch (error) {
      console.error('Error handling clickable question response:', error);
    }
  };

  useEffect(() => {
   
    if (!clickableQuestionsAdded) {
      setMessageHistory((prevHistory) => [
        ...prevHistory,
        { message: 'Choose from below or Write your own issue:', isUser: false },
        ...clickableQuestions.map((question, index) => (
          { message: <Button key={index} onClick={() => handleUserResponse(question)}>{question}</Button>, isUser: false }
        )),
      ]);
      console.log(clickableQuestionsAdded);
      setClickableQuestionsAdded(true);
    }

    
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    console.log(messageHistory);
    console.log(currentQuestionIndex);
    console.log("here",clickableQuestionsAdded);
  }, [clickableQuestionsAdded]);

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Paper     elevation={3} style={{ margin: '20px', padding: '20px', height: 'auto', overflowY: 'auto' }}>
        <Typography variant="h5" align="center">
            TheraPedia - Your AI Mental Health Knowledge Hub powered by GEMINI AI
        </Typography>
        <List
          ref={listRef}
          sx={{ overflowY: 'auto', maxHeight: '60vh', marginBottom: '15px', borderRadius: '10px', padding: '10px', backgroundColor: '#f4f4f4' }}
        >
          {messageHistory.map((messageData, index) => (
            <ListItem
              key={index}
              sx={{
                marginBottom: '10px',
                borderRadius: '10px',
                padding: '10px',
                display: 'flex',
                justifyContent: messageData.isUser ? 'flex-end' : 'flex-start',
              }}
            >
              <TheraChatMessage message={messageData.message} isUser={messageData.isUser} />
            </ListItem>
          ))}
        </List>

        <div>
          <TextField
            label="Type Your Query in Any Language"
            variant="outlined"
            fullWidth
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUserResponse(userInput)}
            style={{ marginTop: '10px' }}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </Container>
  );
}

export default TheraPedia;
