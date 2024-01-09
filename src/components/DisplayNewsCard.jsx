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
console.log(article.article);
  const handleLikeClick = () => {
    setLiked(!liked);
  };
  const content = article.article.Sections.section[0].Content;
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };
  return (
    <Container maxWidth='lg' style={{ background: '#EAFFF0' }}>
      <Card sx={{ minHeight:530 , maxWidth: 345 }}>
        <CardHeader
          title={ article.article.Title ? (
            
            article.article.Title.length > 70
              ? `${article.article.Title.substring(0, 80)}...`
              : article.article.Title):( ''

              )
          }
          
        />
        <CardMedia component="img" height="194" image={article.article.ImageUrl} alt="Image" />
        <CardContent>
        {content ? (
        <Typography variant="body2" color="text.secondary">
          {content.length > 280
            ? `${stripHtmlTags(content).substring(0, 280)}...`
            : stripHtmlTags(content)}
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
          <Link href={article.article.AccessibleVersion} target="_blank" rel="noopener noreferrer" underline="none">
            <IconButton aria-label="open in new window">
              <OpenInNewIcon />
            </IconButton>
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
}
