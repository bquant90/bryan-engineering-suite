import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HangmanGame: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Back to Home
      </Button>
      
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          🎮 Hangman Game
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Interactive Word Guessing Game
        </Typography>
        
        <Box sx={{ 
          bgcolor: '#f8fafc', 
          borderRadius: 2, 
          p: 4, 
          my: 4,
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography variant="body1" color="text.secondary">
            Game implementation coming soon! This will feature multiple difficulty levels, 
            smooth animations, and an engaging word-guessing experience.
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Check back later for the full interactive experience!
        </Typography>
      </Paper>
    </Container>
  );
};

export default HangmanGame;