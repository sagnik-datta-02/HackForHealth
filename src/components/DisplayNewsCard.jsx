import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Container, Link } from '@mui/material';

export default function RecipeReviewCard(article) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <Container maxWidth='lg' style={{ background: '#EAFFF0' }}>
      <Card sx={{ minHeight:530 , maxWidth: 345 }}>
        <CardHeader
          title={ article.article.title ? (
            
            article.article.title.length > 70
              ? `${article.article.title.substring(0, 80)}...`
              : article.article.title):( ''

              )
          }
          subheader={article.article.publishedAt}
        />
        <CardMedia component="img" height="194" image={article.article.urlToImage} alt="Image" />
        <CardContent>
        {article.article.description ? (
            <Typography variant="body2" color="text.secondary">
              {article.article.description.length > 120
                ? `${article.article.description.substring(0, 120)}...`
                : article.article.description}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No description available.
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handleLikeClick}
            color={liked ? 'error' : 'default'} 
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Link href={article.article.url} target="_blank" rel="noopener noreferrer" underline="none">
            <IconButton aria-label="open in new window">
              <OpenInNewIcon />
            </IconButton>
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
}
