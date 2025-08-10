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
  Divider,
  Container,
  useTheme,
  alpha,
} from '@mui/material';

// Utility function to format numbers with commas
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
};
import {
  Calculate as CalculateIcon,
  Straighten as RulerIcon,
  ViewInAr as BoxIcon,
  Build as BuildIcon,
  CompareArrows as CompareIcon,
} from '@mui/icons-material';
import { CalculatorAPI } from '../services/api';
import type { BoxDimensions, BoxCalculationResult } from '../types/calculator';

const BoxCalculator: React.FC = () => {
  const theme = useTheme();
  const [dimensions, setDimensions] = useState<BoxDimensions>({
    length: 0,
    width: 0,
    height: 0,
  });
  const [result, setResult] = useState<BoxCalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((field: keyof BoxDimensions) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value) || 0;
      setDimensions(prev => ({
        ...prev,
        [field]: value,
      }));
      // Clear previous results when input changes
      if (result) {
        setResult(null);
      }
      if (error) {
        setError(null);
      }
    }, [result, error]);

  const handleCalculate = async () => {
    if (dimensions.length <= 0 || dimensions.width <= 0 || dimensions.height <= 0) {
      setError('Please enter valid dimensions greater than 0');
      return;
    }

    if (dimensions.length > 1000 || dimensions.width > 1000 || dimensions.height > 1000) {
      setError('Please enter dimensions of 1000 inches or less');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await CalculatorAPI.calculateBox(dimensions);
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

  // Enhanced validation - check if form is valid AND dimensions are within limits
  const isFormValid = dimensions.length > 0 && dimensions.width > 0 && dimensions.height > 0 &&
                     dimensions.length <= 1000 && dimensions.width <= 1000 && dimensions.height <= 1000;

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
          <BoxIcon sx={{ fontSize: '1em', mr: 1, verticalAlign: 'middle' }} />
          3D Box Calculator
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Professional Engineering Calculations
        </Typography>
      </Box>

      {/* Input Form */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <RulerIcon sx={{ mr: 1 }} />
            Box Dimensions (inches)
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 300px', minWidth: '200px' }}>
              <TextField
                fullWidth
                label="Length"
                type="number"
                variant="outlined"
                value={dimensions.length || ''}
                onChange={handleInputChange('length')}
                inputProps={{ min: 0.01, max: 1000, step: 0.01 }}
                helperText="0.01 to 1000 inches"
              />
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: '200px' }}>
              <TextField
                fullWidth
                label="Width"
                type="number"
                variant="outlined"
                value={dimensions.width || ''}
                onChange={handleInputChange('width')}
                inputProps={{ min: 0.01, max: 1000, step: 0.01 }}
                helperText="0.01 to 1000 inches"
              />
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: '200px' }}>
              <TextField
                fullWidth
                label="Height"
                type="number"
                variant="outlined"
                value={dimensions.height || ''}
                onChange={handleInputChange('height')}
                inputProps={{ min: 0.01, max: 1000, step: 0.01 }}
                helperText="0.01 to 1000 inches"
              />
            </Box>
          </Box>

          <Box textAlign="center" mt={3}>
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
              }}
            >
              {loading ? 'Calculating...' : 'Calculate Properties'}
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
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {/* Basic Calculations */}
          <Box sx={{ flex: '1 1 400px', minWidth: '350px' }}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalculateIcon sx={{ mr: 1 }} />
                  Basic Measurements
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Paper 
                    elevation={1} 
                    sx={{ p: 2, mb: 2, bgcolor: alpha(theme.palette.primary.main, 0.05) }}
                  >
                    <Typography variant="subtitle2" color="primary">Surface Area</Typography>
                    <Typography variant="h6">{formatNumber(result.basic_calculations.surface_area_sqin)} sq in</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatNumber(result.basic_calculations.surface_area_sqft)} sq ft
                    </Typography>
                  </Paper>
                  <Paper 
                    elevation={1} 
                    sx={{ p: 2, bgcolor: alpha(theme.palette.secondary.main, 0.05) }}
                  >
                    <Typography variant="subtitle2" color="secondary">Volume</Typography>
                    <Typography variant="h6">{formatNumber(result.basic_calculations.volume_cuin)} cu in</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatNumber(result.basic_calculations.volume_cuft)} cu ft • {formatNumber(result.basic_calculations.volume_liters)} liters
                    </Typography>
                  </Paper>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Dimensions */}
          <Box sx={{ flex: '1 1 400px', minWidth: '350px' }}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <RulerIcon sx={{ mr: 1 }} />
                  Dimensions
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Length:</strong> {result.dimensions.length_ft}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Width:</strong> {result.dimensions.width_ft}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Height:</strong> {result.dimensions.height_ft}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>Base Perimeter:</strong> {formatNumber(result.geometry.perimeter_base)}"
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Space Diagonal:</strong> {formatNumber(result.geometry.diagonal)}"
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Practical Applications */}
          <Box sx={{ flex: '1 1 400px', minWidth: '350px' }}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <BuildIcon sx={{ mr: 1 }} />
                  Practical Applications
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Paint Needed:</strong> {formatNumber(result.practical.paint_needed_oz)} oz
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Cardboard Sheets:</strong> {formatNumber(result.practical.cardboard_sheets)} (12"×12")
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>Weight Estimates:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {Object.entries(result.practical.weight_estimates).map(([material, weight]) => (
                      <Chip
                        key={material}
                        label={`${material}: ${formatNumber(weight)} lbs`}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Size Comparison */}
          <Box sx={{ flex: '1 1 400px', minWidth: '350px' }}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CompareIcon sx={{ mr: 1 }} />
                  Size Comparison
                </Typography>
                <Paper 
                  elevation={1} 
                  sx={{ p: 3, mt: 2, bgcolor: alpha(theme.palette.success.main, 0.05) }}
                >
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    {result.comparisons}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default BoxCalculator;