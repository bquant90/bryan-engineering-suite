import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Container,
  Link,
  IconButton,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Email,
  Launch,
} from '@mui/icons-material';

interface Project {
  title: string;
  icon: string;
  description: string;
  tags: string[];
  link: string;
  featured?: boolean;
}

interface HomePageProps {
  darkMode?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode = false }) => {
  const featuredProjects: Project[] = [
    {
      title: 'Hangman Game',
      icon: '🎮',
      description: 'Interactive word guessing game with smooth animations and multiple difficulty levels. Built with React and modern UI principles.',
      tags: ['React', 'TypeScript', 'Game Logic'],
      link: '/hangman',
      featured: true,
    },
    {
      title: 'Cipher Tool',
      icon: '🔐',
      description: 'Multi-algorithm encryption and decryption tool supporting Caesar cipher, ROT13, and custom algorithms with real-time processing.',
      tags: ['Security', 'Algorithms', 'Cryptography'],
      link: '/cipher-tool',
      featured: true,
    },
    {
      title: 'Periodic Elements Finder',
      icon: '⚛️',
      description: 'Interactive periodic table with advanced search, filtering, and detailed element information. Educational and visually appealing.',
      tags: ['Data Viz', 'Search', 'Education'],
      link: '/periodic-elements',
      featured: true,
    },
  ];

  const engineeringTools: Project[] = [
    {
      title: 'Periodic Elements Finder',
      icon: '⚛️',
      description: 'Interactive periodic table with search and filtering capabilities',
      tags: ['Chemistry', 'Data'],
      link: '/periodic-elements',
    },
    {
      title: 'Cipher/Encryption Tool',
      icon: '🔐',
      description: 'Multi-algorithm encryption and decryption utility',
      tags: ['Security', 'Cryptography'],
      link: '/cipher-tool',
    },
    {
      title: 'Word Counter & Text Analyzer',
      icon: '📝',
      description: 'Advanced text analysis with statistics and insights',
      tags: ['Text', 'Analysis'],
      link: '/word-counter',
    },
  ];

  const interactiveApps: Project[] = [
    {
      title: 'Hangman Game',
      icon: '🎮',
      description: 'Classic word guessing game with modern UI',
      tags: ['Game', 'React'],
      link: '/hangman',
    },
    {
      title: 'Cellular Simulation',
      icon: '🦠',
      description: "Conway's Game of Life with customizable parameters",
      tags: ['Simulation', 'Algorithms'],
      link: '/cellular-simulation',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: darkMode 
            ? 'linear-gradient(135deg, #4c5fbf 0%, #5a3a7f 100%)' 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 10, md: 15 },
          textAlign: 'center',
          mt: -2,
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Bryan Quant
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 1,
              opacity: 0.95,
              fontSize: { xs: '1.1rem', md: '1.5rem' },
            }}
          >
            Salesforce Developer & Full-Stack Engineer
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.2rem' },
            }}
          >
            Building modern web applications and engineering tools
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              const element = document.getElementById('featured-projects');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            sx={{
              bgcolor: 'white',
              color: darkMode ? '#4c5fbf' : '#667eea',
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            View My Work
          </Button>
        </Container>
      </Box>

      {/* Featured Projects Section */}
      <Box 
        id="featured-projects"
        sx={{ 
          bgcolor: darkMode ? '#1e293b' : '#f8fafc',
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center"
            sx={{ 
              mb: 6,
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: darkMode ? 'white' : '#1e293b',
            }}
          >
            Featured Projects
          </Typography>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}>
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  bgcolor: darkMode ? '#0f172a' : 'white',
                  boxShadow: darkMode 
                    ? '0 4px 6px rgba(0,0,0,0.3)' 
                    : '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: darkMode 
                      ? '0 8px 12px rgba(0,0,0,0.4)' 
                      : '0 8px 12px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: '#2563eb',
                      mb: 2,
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{project.icon}</span>
                    {project.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 3, 
                      lineHeight: 1.6,
                      color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.tags.map((tag, tagIndex) => (
                      <Chip
                        key={tagIndex}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
                          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* All Projects Section */}
      <Box 
        id="all-projects"
        sx={{ 
        py: 10, 
        bgcolor: darkMode ? '#0f172a' : 'background.default',
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center"
            sx={{ 
              mb: 6,
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: darkMode ? 'white' : '#1e293b',
            }}
          >
            All Projects
          </Typography>

          {/* Engineering Tools Category */}
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 3,
                fontWeight: 'bold',
                color: darkMode ? 'white' : '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: { xs: '1.5rem', md: '1.8rem' },
              }}
            >
              🔧 Engineering & Analysis Tools
            </Typography>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}>
              {engineeringTools.map((project, index) => (
                <Card
                  key={index}
                  sx={{
                    borderRadius: 2,
                    bgcolor: darkMode ? '#1e293b' : 'white',
                    border: '1px solid',
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
                    transition: 'border-color 0.3s ease',
                    '&:hover': {
                      borderColor: '#2563eb',
                    },
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 1,
                        fontWeight: 'bold',
                        color: darkMode ? 'white' : '#1e293b',
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 2,
                        color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
                      }}
                    >
                      {project.description}
                    </Typography>
                    <Link
                      href={project.link}
                      sx={{
                        color: '#2563eb',
                        textDecoration: 'none',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Launch Tool
                      <Launch sx={{ fontSize: '1rem' }} />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Interactive Applications Category */}
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 3,
                fontWeight: 'bold',
                color: darkMode ? 'white' : '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: { xs: '1.5rem', md: '1.8rem' },
              }}
            >
              🎮 Interactive Applications
            </Typography>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}>
              {interactiveApps.map((project, index) => (
                <Card
                  key={index}
                  sx={{
                    borderRadius: 2,
                    bgcolor: darkMode ? '#1e293b' : 'white',
                    border: '1px solid',
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
                    transition: 'border-color 0.3s ease',
                    '&:hover': {
                      borderColor: '#2563eb',
                    },
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 1,
                        fontWeight: 'bold',
                        color: darkMode ? 'white' : '#1e293b',
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 2,
                        color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
                      }}
                    >
                      {project.description}
                    </Typography>
                    <Link
                      href={project.link}
                      sx={{
                        color: '#2563eb',
                        textDecoration: 'none',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Play Game
                      <Launch sx={{ fontSize: '1rem' }} />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* About Preview Section */}
      <Box
        id="about"
        sx={{
          bgcolor: '#1e293b',
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            About Me
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            Salesforce Developer with 2+ years of experience building enterprise applications. 
            Passionate about creating clean, efficient code and user-friendly interfaces.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: '#1e293b',
              fontSize: '1rem',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            Learn More
          </Button>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        id="contact"
        sx={{
          bgcolor: '#0f172a',
          color: 'white',
          py: 5,
          textAlign: 'center',
        }}
      >
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 3 }}>
            <IconButton
              href="https://github.com/bquant90"
              target="_blank"
              sx={{ color: 'white' }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              href="https://linkedin.com/in/bryan-quant"
              target="_blank"
              sx={{ color: 'white' }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              href="mailto:bquant90@gmail.com"
              sx={{ color: 'white' }}
            >
              <Email />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2025 Bryan Quant. Built with modern web technologies.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;