import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import RecipeReviewCard from './DisplayNewsCard';

const NewsDisplay = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  

  const fetchNews = async () => {
    try {
      const apiUrl = 'https://health.gov/myhealthfinder/api/v3/topicsearch.json?lang=en&topicId=539%2C34692%2C30604';

      const response = await axios.get(apiUrl);

      setNews(response.data.Result.Resources.Resource);
      console.log(response.data.Result.Resources.Resource);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <Container maxWidth='lg'>
      <Typography variant="h4"
                  style={{
                    margin: '20px',
                    color: '#242424',
                    fontSize: { xs: '32px', sm: '64px' },
                    fontFamily: 'Anek Telugu',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    lineHeight: { xs: 1.5, sm: '79.36' },
                    letterSpacing: '0.13',
                    wordWrap: 'break-word',
                  }}>
        Latest News on Mental Health
      </Typography>
      <Grid container spacing={2}>
        {news.map((article, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <RecipeReviewCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsDisplay;
