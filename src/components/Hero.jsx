import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {useNavigate} from "react-router-dom";
const HeroSection = () => {
  const navigate=useNavigate();

  const handleClick= () =>{
    navigate("/mental-health-test");
  }
  const handleClickPage= () =>{
    navigate("/therapedia");
  }
  return (
    
    <Box style={{   position: 'relative' , background: '#EAFFF0', marginTop:'25px' ,   }}>
      <Container maxWidth='lg'>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={6} md={8}>
          <Typography
           variant="h4"
           style={{
            margin:'10px' ,
             color: '#242424',
             fontSize: { xs: '32px', sm: '64px' },
             fontFamily: 'Kanit, sans-serif',
             fontWeight: '600',
             textTransform: 'capitalize',
             lineHeight: { xs: 1.5, sm: '79.36' },
             letterSpacing: '0.13',
             wordWrap: 'break-word',
           }}
          >
            Your Therapy<br />Discreet & Anonymous Mental Wellness Hub<br />
          </Typography>
          <Typography
            variant="body1"
            style={{
                margin: '10px',
              color: '#242424',
              fontSize: { xs: '14px', sm: '16px' },
              fontFamily: 'Jost, sans-serif', 
              fontWeight: '400',
              letterSpacing: 0.32,
              wordWrap: 'break-word',
              alignContent:'center'
            }}
          >
           With a unique blend of cutting-edge technology and empathetic features, we provide a safe space for users to explore self-reflection, access expert insights, and receive support. Our multilingual YourTherapy-Bot employs advanced sentiment analysis to discreetly gauge emotional well-being, while TheraPedia, powered by Gemini AI, enriches health literacy with informative responses in 102 languages. Join us on a journey of self-discovery and empowerment as we break down barriers and foster a stigma-free environment for mental health conversations. Your well-being matters and Your Therapy is here for you.
          </Typography>
        
        
          <Button
            variant="contained"
            sx={{
                margin: 1,
                marginTop: { xs: '10px', sm: 0 },
              width: 'auto',
              paddingLeft: 2,
              paddingRight: 2,
              paddingTop: 1,
              paddingBottom: 1,
              background: '#2DCF57',
              borderRadius: 5,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 15,
              display: 'inline-flex',
              color: 'white',
            }}
            onClick={handleClick}
          >
            Take Test Now
          </Button>
          <Button
           variant="outlined"
           sx={{
            margin: 1,
             width: 'auto',
             marginTop: { xs: '10px', sm: 0 },
             paddingLeft: 2,
             paddingRight: 2,
             paddingTop: 1,
             paddingBottom: 1,
             borderRadius: 5,
             border: '1px solid black',
             justifyContent: 'flex-start',
             alignItems: 'flex-start',
             gap: 15,
             display: 'inline-flex',
             color: '#242424',
           }}
           onClick={handleClickPage}
          >
            TheraPedia
          </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
        <img
          style={{ width: '100%', height: '100%' }}
          src="https://i.postimg.cc/RZRxHZWh/unsplash-ZCztnd-OWdjs-1.png"
          alt="Placeholder Image"
        />
      </Grid>
      </Grid>
      </Container>
    </Box>
    
  );
};

export default HeroSection;
