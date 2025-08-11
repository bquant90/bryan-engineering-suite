import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Tooltip,
  Alert,
  Backdrop,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  DarkMode,
  LightMode,
  Engineering,
  GitHub,
  LinkedIn,
  ViewInAr,
  Public,
  Home,
} from '@mui/icons-material';
import BoxCalculator from './components/BoxCalculator';
import PlanetCalculator from './components/PlanetCalculator';
import HomePage from './components/HomePage';
import { CalculatorAPI } from './services/api';

type PageType = 'home' | 'box' | 'planet';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [backendStatus, setBackendStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [activePage, setActivePage] = useState<PageType>(() => {
    const saved = localStorage.getItem('activePage');
    return (saved as PageType) || 'home';
  });

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

  // Switch pages and save preference
  const switchPage = (pageType: PageType) => {
    setActivePage(pageType);
    localStorage.setItem('activePage', pageType);
  };

  // Get current page title
  const getPageTitle = () => {
    switch (activePage) {
      case 'home':
        return 'Professional Portfolio & Engineering Tools';
      case 'box':
        return '3D Box Calculator';
      case 'planet':
        return 'Planet Weight Calculator';
      default:
        return 'Engineering Suite';
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
          <Typography variant="h6" sx={{ mt: 2 }}>
            Connecting to backend...
          </Typography>
        </Box>
      </Backdrop>

      {/* App Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
        <Toolbar>
          <Engineering sx={{ mr: 2, color: 'primary.main' }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              Bryan's Engineering Suite
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {getPageTitle()}
            </Typography>
          </Box>
          
          {/* Social Links */}
          <Tooltip title="GitHub">
            <IconButton 
              href="https://github.com/bquant90" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <GitHub />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="LinkedIn">
            <IconButton 
              href="https://linkedin.com/in/bryan-quant" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <LinkedIn />
            </IconButton>
          </Tooltip>

          {/* Dark Mode Toggle */}
          <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <IconButton onClick={toggleDarkMode} sx={{ ml: 1 }}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Navigation Tabs */}
      <Box sx={{ 
        bgcolor: 'background.paper', 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.06)',
      }}>
        <Tabs 
          value={activePage} 
          onChange={(_, newValue) => switchPage(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            '& .MuiTab-root': {
              minWidth: { xs: 80, sm: 140 },
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              py: 2,
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
              '&:hover': {
                color: 'primary.main',
                opacity: 0.8,
              },
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            }
          }}
        >
          <Tab 
            icon={<Home />} 
            iconPosition="start"
            label="Home" 
            value="home" 
          />
          <Tab 
            icon={<ViewInAr />} 
            iconPosition="start"
            label="3D Box Calculator" 
            value="box" 
          />
          <Tab 
            icon={<Public />} 
            iconPosition="start"
            label="Planet Calculator" 
            value="planet" 
          />
        </Tabs>
      </Box>

      {/* Backend Status Alert */}
      {backendStatus === 'error' && (
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
      <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: 'background.default' }}>
        {activePage === 'home' && <HomePage />}
        {activePage === 'box' && backendStatus === 'connected' && <BoxCalculator />}
        {activePage === 'planet' && backendStatus === 'connected' && <PlanetCalculator />}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          py: 3,
          mt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            Built with FastAPI, React, TypeScript & Material-UI
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            © 2025 Bryan Quant - Professional Engineering Tools
          </Typography>
        </Container>
      </Box>

    </ThemeProvider>
  );
};

export default App;