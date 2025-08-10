import React, { useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Chip,
  Container,
  useTheme,
  alpha,
  Grid,
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  Public as PlanetIcon,
  Scale as ScaleIcon,
} from '@mui/icons-material';
import { CalculatorAPI } from '../services/api';
import type { WeightRequest, PlanetWeightResult } from '../types/calculator';

// Utility function to format numbers with commas
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
};

// Planet color mapping for visual appeal
const planetColors: Record<string, string> = {
  'Sun': '#FDB813',
  'Mercury': '#8C7853',
  'Venus': '#FFC649',
  'Earth': '#6B93D6',
  'Moon': '#C9C9C9',
  'Mars': '#CD5C5C',
  'Jupiter': '#D8CA9D',
  'Saturn': '#FAD5A5',
  'Uranus': '#4FD0E7',
  'Neptune': '#4B70DD',
  'Pluto': '#9CA6B7'
};

const PlanetCalculator: React.FC = () => {
  const theme = useTheme();
  const [weight, setWeight] = useState<number>(0);
  const [result, setResult] = useState<PlanetWeightResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWeightChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    setWeight(value);
    // Clear previous results when input changes
    if (result) {
      setResult(null);
    }
    if (error) {
      setError(null);
    }
  }, [result, error]);

  const handleCalculate = async () => {
    if (weight <= 0) {
      setError('Please enter a valid weight greater than 0');
      return;
    }

    if (weight > 10000) {
      setError('Please enter a weight of 10,000 pounds or less');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await CalculatorAPI.calculatePlanetWeight({ weight });
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.error || 'Calculation failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during calculation');
    } finally {
      setLoading(false);
    }
  };

  // Enhanced validation
  const isFormValid = weight > 0 && weight <= 10000;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <PlanetIcon sx={{ fontSize: '1em', mr: 1, verticalAlign: 'middle' }} />
          Planet Weight Calculator
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover Your Weight Across the Solar System
        </Typography>
      </Box>

      {/* Input Form */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <ScaleIcon sx={{ mr: 1 }} />
            Your Earth Weight
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
              <TextField
                fullWidth
                label="Weight"
                type="number"
                variant="outlined"
                value={weight || ''}
                onChange={handleWeightChange}
                inputProps={{ min: 0.1, max: 10000, step: 0.1 }}
                helperText="Enter your weight in pounds (0.1 to 10,000 lbs)"
                InputProps={{
                  endAdornment: <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>lbs</Typography>
                }}
              />
            </Box>
            
            <Button
              variant="contained"
              size="large"
              onClick={handleCalculate}
              disabled={!isFormValid || loading}
              startIcon={loading ? <CircularProgress size={20} /> : <CalculateIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                minWidth: '200px',
              }}
            >
              {loading ? 'Calculating...' : 'Calculate Weights'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Results Display */}
      {result && (
        <>
          {/* Summary */}
          <Card elevation={2} sx={{ mb: 4 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h4" gutterBottom color="primary">
                Your Weight: {formatNumber(result.earth_weight)} lbs on Earth
              </Typography>
              <Typography variant="body1" color="text.secondary">
                See how your weight would change across our solar system!
              </Typography>
            </CardContent>
          </Card>

          {/* Planet Results Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
            {result.planet_weights.map((planet) => (
              <Card 
                key={planet.planet_id} 
                elevation={2}
                sx={{ 
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: planetColors[planet.name] || theme.palette.grey[500],
                        mr: 2,
                        boxShadow: `0 0 10px ${planetColors[planet.name] || theme.palette.grey[500]}40`
                      }}
                    />
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                      {planet.display_name}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h4" color="primary" gutterBottom>
                    {formatNumber(planet.weight_on_planet)} lbs
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Gravity: {planet.multiplier}× Earth
                    </Typography>
                    <Chip 
                      label={planet.weight_on_planet > result.earth_weight ? 'Heavier' : 'Lighter'}
                      color={planet.weight_on_planet > result.earth_weight ? 'error' : 'success'}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Fun Facts */}
          <Card elevation={2} sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <PlanetIcon sx={{ mr: 1 }} />
                Interesting Facts
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, mt: 2 }}>
                <Paper elevation={1} sx={{ p: 2, bgcolor: alpha(theme.palette.info.main, 0.05) }}>
                  <Typography variant="subtitle2" color="info.main" gutterBottom>Lightest Weight</Typography>
                  <Typography variant="body2">
                    {result.planet_weights.reduce((min, planet) => 
                      planet.weight_on_planet < min.weight_on_planet ? planet : min
                    ).display_name}: {formatNumber(
                      result.planet_weights.reduce((min, planet) => 
                        planet.weight_on_planet < min.weight_on_planet ? planet : min
                      ).weight_on_planet
                    )} lbs
                  </Typography>
                </Paper>
                
                <Paper elevation={1} sx={{ p: 2, bgcolor: alpha(theme.palette.warning.main, 0.05) }}>
                  <Typography variant="subtitle2" color="warning.main" gutterBottom>Heaviest Weight</Typography>
                  <Typography variant="body2">
                    {result.planet_weights.reduce((max, planet) => 
                      planet.weight_on_planet > max.weight_on_planet ? planet : max
                    ).display_name}: {formatNumber(
                      result.planet_weights.reduce((max, planet) => 
                        planet.weight_on_planet > max.weight_on_planet ? planet : max
                      ).weight_on_planet
                    )} lbs
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
};

export default PlanetCalculator;