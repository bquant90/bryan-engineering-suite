import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const WordCounter: React.FC = () => {
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
          📝 Word Counter & Text Analyzer
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Advanced Text Analysis with Statistics
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
            Text analyzer implementation coming soon! This will provide detailed word counts, 
            character statistics, readability scores, and linguistic insights.
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Check back later for the full text analysis experience!
        </Typography>
      </Paper>
    </Container>
  );
};

export default WordCounter;