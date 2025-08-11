import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PeriodicElements: React.FC = () => {
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
          ⚛️ Periodic Elements Finder
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Interactive Periodic Table with Advanced Search
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
            Periodic table implementation coming soon! This will feature interactive element exploration, 
            advanced search and filtering, and detailed chemical information.
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Check back later for the full educational experience!
        </Typography>
      </Paper>
    </Container>
  );
};

export default PeriodicElements;