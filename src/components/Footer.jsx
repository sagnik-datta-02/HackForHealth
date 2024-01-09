import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, Container, Link } from '@mui/material';

export default function Footer() {
  return (
    
    <Box style={{   position: 'relative' , background: '#E4F4E8', marginTop : '20px' ,  }} >
      <Container maxWidth='lg' style={{padding:'20px'}}>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" style={{
color: '#242424' ,
 fontSize: 24,
 fontFamily: 'Anek Telugu',
 fontWeight: '600',
 wordWrap: 'break-word'}}>Your Therapy</Typography>
          <Typography component="div" style={{padding:'20px', display: 'flex', flexDirection: 'column', color: '#242424', fontSize: 20, fontFamily: 'Anek Telugu', fontWeight: '400', textDecoration: 'underline', letterSpacing: 0.40, wordWrap: 'break-word' }}>
            <Link href='#' variant="inherit" underline="hover" >About Us</Link>
            <Link href='#' variant="inherit" underline="hover" >Mission and Vision</Link>
            <Link href='#' variant="inherit" underline="hover" >Tech Stack</Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" style={{
color: '#242424' ,
 fontSize: 24,
 fontFamily: 'Anek Telugu',
 fontWeight: '600',
 wordWrap: 'break-word'}}>Support</Typography>
          <Typography component="div" style={{padding:'20px', display: 'flex', flexDirection: 'column', color: '#242424', fontSize: 20, fontFamily: 'Anek Telugu', fontWeight: '400', textDecoration: 'underline', letterSpacing: 0.40, wordWrap: 'break-word' }}>
            <Link href='#'underline="hover" >FAQs</Link>
            <Link href='#'underline="hover" >Email Us</Link>
            <Link href='#'underline="hover" >Privacy Policy</Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" style={{
color: '#242424' ,
 fontSize: 24,
 fontFamily: 'Anek Telugu',
 fontWeight: '600',
 wordWrap: 'break-word'}}>Services</Typography>
          <Typography component="div" style={{padding:'20px', display: 'flex', flexDirection: 'column', color: '#242424', fontSize: 20, fontFamily: 'Anek Telugu', fontWeight: '400', textDecoration: 'underline', letterSpacing: 0.40, wordWrap: 'break-word' }}>
            <Link href='#'underline="hover" >YourTherapy Bot</Link>
            <Link href='#'underline="hover" >TheraPedia</Link>
          </Typography>
        </Grid>
      </Grid>
      <div style={{width: '100%', height: '100%', border: '1px #5A5A5A solid'}}></div>
      <Typography style={{
color: '#242424',
 fontSize: 16,
 fontFamily: 'Anek Telugu',
 fontWeight: '400',
 letterSpacing: 0.32,
 wordWrap: 'break-word',
 textAlign: 'center', 
 padding: '20px 0',
 
 }}>Your Therapy, Made For a Cause by Sagnik & Swapnendu</Typography>
      </Container>
      </Box>
    
  );
}
