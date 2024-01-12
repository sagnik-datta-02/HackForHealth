import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper, Typography, TextField, Button, List, ListItem, Container, Grid, Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import ChatMessage from '../components/Chatbot';


function ChatBotApp() {
  const [ques] = useState([
    //'How are you feeling today?',
    //'What is your favorite color?',
    //'Tell me about your day.',
    "Are you feeling happy or sad? How often u feel so?",
    "What do you think about future?",
    "Do you feel like a winner?",
    "How satisfied are you with things you used to enjoy?",
    //"How often do you feel guilty?"
    //,"Do you feel like you're being punished?"
    "How do you feel about yourself?"
    //,"Do you blame yourself for things?"
    //"Do you have thoughts about living a long life?"
    //,"How often do you cry?"
    , "How are you behaving with others usually nowadays?"
    //,"Have you lost interest in other people?"
    , "How well can you make decisions?"
    , "What do you feel about your demeanor?"
    //,"How well can you work compared to before?"
    //,"How well are you sleeping?"
    //,"Do you feel more tired than usual?"
    , "How's your appetite compared to usual?"
    //,"Have you lost weight recently?"
    , "How worried are you about anything in last few days?"
    //,"Have you lost interest in sex?"
    // Add more questions here
  ]);
  const [questions, setQuestions] = useState(['']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messageHistory, setMessageHistory] = useState([]);
  const [averageSentiment, setAverageSentiment] = useState('');
  const [userInput, setUserInput] = useState('');
  const [positiveSentiments, setPositiveSentiments] = useState([]);
  const [negativeSentiments, setNegativeSentiments] = useState([]);
  const [userResponses, setUserResponses] = useState([]);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const [translatedContent, setTranslatedContent] = useState({
    header: 'Want to Take Professional Help?',
    thankYouMessage: 'Thank You For Answering the Questions',
    analysisMessage: '',
    callMessage: 'Help us by providing your Phone number and We will reach to you. Be free to talk and sort out all your quiries from our Psychologists at Your Therapy.Enter your Phone Number',


  });
  const navigate = useNavigate();
  const fetchTranslatedTypographyText = async (text) => {
    const requestBody = {
      "questions": [text],
      "to": selectedLanguage,
    };

    try {
      const response = await axios.post(`https://chatu-rf63-git-master-swapnendu003.vercel.app/translate/questions`, requestBody);
      console.log(response.data.translatedQuestions[0]);
      return response.data.translatedQuestions[0];
    } catch (error) {
      console.error('Error fetching translated text:', error);
      return text; 
    }
  };

  const translateContent = async () => {
    try {
      const [header, thankYouMessage , callMessage] = await Promise.all([
        fetchTranslatedTypographyText('Want to Take Professional Help?'),
        fetchTranslatedTypographyText('Thank You For Answering the Questions'),
        fetchTranslatedTypographyText('Help us by providing your Phone number and We will reach to you. Be free to talk and sort out all your quiries from our Psychologists at Your Therapy. Enter your Phone Number')
      ]);
  
      const analysisMessage = await fetchTranslatedTypographyText(
        averageSentiment === 'positive'
          ? "As per Analysis it seems like you are in a good state of mind. Be happy, be cheerful. However, if you want, you can still contact any psychologist."
          : "As per analysis, it seems like you might need a professional psychologist to sort out what you are going through. A psychologist will give you better advice."
      );
  
      setTranslatedContent({
        header,
        thankYouMessage,
        analysisMessage,
        callMessage
      });
    } catch (error) {
      console.error('Error translating content:', error);
    }
  };
  

  useEffect(() => {
    
    translateContent();
  }, [currentQuestionIndex>questions.length-1]);

  const fetchTranslatedQuestions = () => {
    const requestBody = {
      "questions": ques,
      "to": selectedLanguage,
    };

    axios.post(`https://chatu-rf63-git-master-swapnendu003.vercel.app/translate/questions`, requestBody)
      .then(response => {
        console.log('API Response:', response.data.translatedQuestions);
        const updatedQuestions = response.data.translatedQuestions;
        console.log(updatedQuestions);
        setQuestions(updatedQuestions);
        console.log(questions);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  };

  useEffect(() => {
    fetchTranslatedQuestions();
  }, [selectedLanguage]);
  useEffect(() => {

    const updatedMessageHistory = messageHistory.slice();
    if (currentQuestionIndex < questions.length) {
      updatedMessageHistory.push({
        message: questions[currentQuestionIndex],
        isUser: false,
      });
    }
    setMessageHistory(updatedMessageHistory);
  }, [currentQuestionIndex, selectedLanguage, questions]);

  const handleUserResponse = async () => {
    try {
      console.log(userInput);
      setMessageHistory((prevHistory) => [
        ...prevHistory,
        { message: userInput, isUser: true },
      ]);

      const sentiment = await fetchSentiment(userInput);
      console.log(sentiment);
      const sentimentValue = sentiment[0];
      setUserResponses((prevResponses) => [...prevResponses, { message: userInput, isUser: true }]);
      if (sentimentValue === 'POSITIVE') {
        setPositiveSentiments((prev) => [...prev, sentiment[1]]);
      } else {
        setNegativeSentiments((prev) => [...prev, sentiment[1]]);
      }

      if (currentQuestionIndex < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        calculateAverageSentiments();
      } else {

        calculateAverageSentiments();
      }
      setUserInput('');
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }

    if (currentQuestionIndex === questions.length) {
      try {

        await axios.post('https://chatu-rf63-git-master-swapnendu003.vercel.app/api/calls/makeCall', {
          phoneNumber: phoneNumber,
        });

        console.log('SMS sent successfully');
      } catch (error) {
        console.error('Error sending SMS:', error);
      }
    }
  };


  const fetchSentiment = async (text) => {
    const response = await fetch('https://chatu-rf63-git-master-swapnendu003.vercel.app/api/sentiment/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response: [text], from: selectedLanguage }),
    });
    const data = await response.json();
    return data.sentiments;
  };

  const calculateAverageSentiments = () => {
    const positiveAverage = calculateAverage(positiveSentiments);
    const negativeAverage = calculateAverage(negativeSentiments);

    const suggestion =
      positiveAverage >= negativeAverage ? 'positive' : 'negative';
    console.log(suggestion);
    setAverageSentiment(suggestion);
  };

  const calculateAverage = (values) => {
    if (values.length === 0) {
      return 0;
    }
    const total = values.reduce((sum, value) => sum + value, 0);
    return total / values.length;
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleUserResponse();
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Paper elevation={3} square={false} style={{ margin: '20px', padding: '20px', height: 'auto', overflowY: 'auto',  backdropFilter: 'blur(13.184196472167969px)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',}}>

        <Grid container justifyContent="space-between" alignItems="center" marginBottom="20px">
          <Typography variant="h4" align="center" style={{fontFamily: 'Kanit, sans-serif',}}>
            Your Therapy 
          </Typography>
          {currentQuestionIndex === questions.length && currentQuestionIndex != 0 && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
          )}
          <InputLabel htmlFor="language-select" style={{ marginRight: '10px' }}>
            Select Your Language 👉
          </InputLabel>
          <Select
            label="Language"
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <MenuItem value="af">Afrikaans</MenuItem>
            <MenuItem value="sq">Albanian</MenuItem>
            <MenuItem value="am">Amharic</MenuItem>
            <MenuItem value="ar">Arabic</MenuItem>
            <MenuItem value="hy">Armenian</MenuItem>
            <MenuItem value="az">Azerbaijani</MenuItem>
            <MenuItem value="eu">Basque</MenuItem>
            <MenuItem value="ba">Bashkir</MenuItem>
            <MenuItem value="bn">Bengali</MenuItem>
            <MenuItem value="bho">Bhojpuri</MenuItem>
            <MenuItem value="bs">Bosnian</MenuItem>
            <MenuItem value="bg">Bulgarian</MenuItem>
            <MenuItem value="ca">Catalan</MenuItem>
            <MenuItem value="yue">Cantonese</MenuItem>
            <MenuItem value="zh-Hans">Chinese (Simplified)</MenuItem>
            <MenuItem value="zh-Hant">Chinese (Traditional)</MenuItem>
            <MenuItem value="hr">Croatian</MenuItem>
            <MenuItem value="cs">Czech</MenuItem>
            <MenuItem value="da">Danish</MenuItem>
            <MenuItem value="prs">Dari</MenuItem>
            <MenuItem value="dv">Divehi</MenuItem>
            <MenuItem value="nl">Dutch</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="et">Estonian</MenuItem>
            <MenuItem value="fil">Filipino</MenuItem>
            <MenuItem value="fi">Finnish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="fj">Fijian</MenuItem>
            <MenuItem value="gl">Galician</MenuItem>
            <MenuItem value="ka">Georgian</MenuItem>
            <MenuItem value="de">German</MenuItem>
            <MenuItem value="el">Greek</MenuItem>
            <MenuItem value="gu">Gujarati</MenuItem>
            <MenuItem value="ht">Haitian Creole</MenuItem>
            <MenuItem value="ha">Hausa</MenuItem>
            <MenuItem value="he">Hebrew</MenuItem>
            <MenuItem value="hi">Hindi</MenuItem>
            <MenuItem value="mww">Hmong Daw</MenuItem>
            <MenuItem value="hu">Hungarian</MenuItem>
            <MenuItem value="is">Icelandic</MenuItem>
            <MenuItem value="ig">Igbo</MenuItem>
            <MenuItem value="id">Indonesian</MenuItem>
            <MenuItem value="ga">Irish</MenuItem>
            <MenuItem value="it">Italian</MenuItem>
            <MenuItem value="ja">Japanese</MenuItem>
            <MenuItem value="kn">Kannada</MenuItem>
            <MenuItem value="ks">Kashmiri</MenuItem>
            <MenuItem value="kk">Kazakh</MenuItem>
            <MenuItem value="km">Khmer</MenuItem>
            <MenuItem value="rw">Kinyarwanda</MenuItem>
            <MenuItem value="ko">Korean</MenuItem>
            <MenuItem value="ku">Kurdish (Kurmanji)</MenuItem>
            <MenuItem value="ky">Kyrgyz</MenuItem>
            <MenuItem value="lo">Lao</MenuItem>
            <MenuItem value="lv">Latvian</MenuItem>
            <MenuItem value="lt">Lithuanian</MenuItem>
            <MenuItem value="mk">Macedonian</MenuItem>
            <MenuItem value="mg">Malagasy</MenuItem>
            <MenuItem value="ms">Malay</MenuItem>
            <MenuItem value="ml">Malayalam</MenuItem>
            <MenuItem value="mt">Maltese</MenuItem>
            <MenuItem value="mi">Maori</MenuItem>
            <MenuItem value="mr">Marathi</MenuItem>
            <MenuItem value="mn-Mong">Mongolian(Traditional)</MenuItem>
            <MenuItem value="my">Burmese</MenuItem>
            <MenuItem value="ne">Nepali</MenuItem>
            <MenuItem value="nb">Norwegian</MenuItem>
            <MenuItem value="nya">Nyanja</MenuItem>
            <MenuItem value="or">Odia</MenuItem>
            <MenuItem value="ps">Pashto</MenuItem>
            <MenuItem value="fa">Persian</MenuItem>
            <MenuItem value="pl">Polish</MenuItem>
            <MenuItem value="pt">Portuguese</MenuItem>
            <MenuItem value="pa">Punjabi</MenuItem>
            <MenuItem value="ro">Romanian</MenuItem>
            <MenuItem value="ru">Russian</MenuItem>
            <MenuItem value="sm">Samoan</MenuItem>
            <MenuItem value="gd">Scots Gaelic</MenuItem>
            <MenuItem value="sr-Latn">Serbian-Latin</MenuItem>
            <MenuItem value="st">Sesotho</MenuItem>
            <MenuItem value="sd">Sindhi</MenuItem>
            <MenuItem value="si">Sinhala</MenuItem>
            <MenuItem value="sk">Slovak</MenuItem>
            <MenuItem value="sl">Slovenian</MenuItem>
            <MenuItem value="so">Somali</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="su">Sundanese</MenuItem>
            <MenuItem value="sw">Swahili</MenuItem>
            <MenuItem value="sv">Swedish</MenuItem>
            <MenuItem value="bo">Tibetian</MenuItem>
            <MenuItem value="ta">Tamil</MenuItem>
            <MenuItem value="te">Telugu</MenuItem>
            <MenuItem value="th">Thai</MenuItem>
            <MenuItem value="tr">Turkish</MenuItem>
            <MenuItem value="uk">Ukrainian</MenuItem>
            <MenuItem value="ur">Urdu</MenuItem>
            <MenuItem value="ug">Uyghur</MenuItem>
            <MenuItem value="uz">Uzbek</MenuItem>
            <MenuItem value="vi">Vietnamese</MenuItem>
            <MenuItem value="cy">Welsh</MenuItem>
            <MenuItem value="xh">Xhosa</MenuItem>
            <MenuItem value="yo">Yoruba</MenuItem>
            <MenuItem value="zu">Zulu</MenuItem>


          </Select>
        </Grid>


        <List sx={{ overflowY: 'auto', maxHeight: '60vh', marginBottom: '15px', borderRadius: '10px', padding: '10px', backgroundColor: '#f4f4f4' }}>
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
              <ChatMessage message={messageData.message} isUser={messageData.isUser} />
            </ListItem>
          ))}
        </List>


        {currentQuestionIndex < questions.length && (
          <div>
            <TextField
              label="Type your Answer"
              variant="outlined"
              fullWidth
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ marginTop: '10px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUserResponse}
              sx={{ marginTop: '10px' }}
            >
              Submit
            </Button>
          </div>
        )}


{currentQuestionIndex === questions.length && currentQuestionIndex != 0 && (
          <div>
            <Typography variant="h6">
              Your Therapy
            </Typography>

            <Typography variant="body1">
              {translatedContent.thankYouMessage}
            </Typography>

            <Typography variant="body1">
              {translatedContent.analysisMessage}
            </Typography>
          </div>
        )}
      </Paper>



      {currentQuestionIndex === questions.length && currentQuestionIndex != 0 && (
        <div>
          <Paper elevation={3} style={{ margin: '20px', padding: '20px', height: '35vh', overflowY: 'auto' }}>
            <Typography variant="h6">{translatedContent.header}</Typography>
            <Typography variant="body1">{translatedContent.callMessage}</Typography>
            <TextField
              label="Enter your phone number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              sx={{ marginTop: '10px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUserResponse}
              sx={{ marginTop: '10px' }}
            >
              Submit 
            </Button>
          </Paper>
        </div>
      )}

    </Container>
  );
}

export default ChatBotApp;
