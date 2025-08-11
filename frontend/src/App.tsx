import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Alert,
  Backdrop,
  CircularProgress,
  Button,
} from '@mui/material';
import {
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import HangmanGame from './components/HangmanGame';
import CipherTool from './components/CipherTool';
import PeriodicElements from './components/PeriodicElements';
import WordCounter from './components/WordCounter';
import CellularSimulation from './components/CellularSimulation';
import { CalculatorAPI } from './services/api';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [backendStatus, setBackendStatus] = useState<'loading' | 'connected' | 'error'>('loading');

  // Create theme based on dark mode preference
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2563eb',
        dark: '#1d4ed8',
      },
      secondary: {
        main: '#7c3aed',
        dark: '#6d28d9',
      },
      background: {
        default: darkMode ? '#0f172a' : '#f8fafc',
        paper: darkMode ? '#1e293b' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h3: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
    },
  });

  // Check backend connectivity on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await CalculatorAPI.healthCheck();
        setBackendStatus('connected');
      } catch (error) {
        console.error('Backend connectivity check failed:', error);
        setBackendStatus('error');
      }
    };

    checkBackend();
  }, []);

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Loading backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backendStatus === 'loading'}
      >
        <Box textAlign="center">
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>

      {/* Navigation Bar - Always visible */}
      <AppBar 
        position="fixed" 
        elevation={0} 
        sx={{ 
          bgcolor: darkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              color: '#2563eb',
              cursor: 'pointer',
              fontSize: '1.5rem',
            }}
            onClick={() => navigate('/')}
          >
            Bryan Quant
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button
              color="inherit"
              onClick={() => navigate('/')}
              sx={{ 
                fontWeight: location.pathname === '/' ? 600 : 500,
                color: location.pathname === '/' ? 'primary.main' : 'text.primary',
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => scrollToSection('all-projects')}
              sx={{ 
                fontWeight: 500,
                color: 'text.primary',
              }}
            >
              Projects
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/about')}
              sx={{ 
                fontWeight: 500,
                color: 'text.primary',
              }}
            >
              About
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/contact')}
              sx={{ 
                fontWeight: 500,
                color: 'text.primary',
              }}
            >
              Contact
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer for fixed navbar */}
      <Toolbar />

      {/* Dark Mode Toggle - Bottom Right */}
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
        <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <IconButton 
            onClick={toggleDarkMode} 
            sx={{ 
              bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
              color: darkMode ? 'white' : 'black',
              backdropFilter: 'blur(10px)',
              boxShadow: 3,
              '&:hover': {
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.95)',
                boxShadow: 4,
              }
            }}
          >
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Backend Status Alert */}
      {backendStatus === 'error' && location.pathname !== '/' && (
        <Alert 
          severity="warning" 
          sx={{ m: 2 }}
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={() => window.location.reload()}
            >
              <Typography variant="button">Retry</Typography>
            </IconButton>
          }
        >
          Backend connection failed. Make sure the FastAPI server is running on port 8000.
        </Alert>
      )}

      {/* Main Content */}
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} />} />
          <Route path="/about" element={<AboutPage darkMode={darkMode} />} />
          <Route path="/contact" element={<ContactPage darkMode={darkMode} />} />
          <Route path="/hangman" element={<HangmanGame />} />
          <Route path="/cipher-tool" element={<CipherTool />} />
          <Route path="/periodic-elements" element={<PeriodicElements />} />
          <Route path="/word-counter" element={<WordCounter />} />
          <Route path="/cellular-simulation" element={<CellularSimulation />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;