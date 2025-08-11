import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Send,
  Email,
  GitHub,
  LinkedIn,
  Schedule,
  CheckCircle,
  LocationOn,
  Phone,
} from '@mui/icons-material';

interface ContactPageProps {
  darkMode?: boolean;
}

const ContactPage: React.FC<ContactPageProps> = ({ darkMode = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: darkMode
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            : 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              color: darkMode ? 'white' : '#1e293b',
            }}
          >
            Get In Touch
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              color: darkMode ? 'rgba(255, 255, 255, 0.8)' : '#64748b',
              lineHeight: 1.6,
            }}
          >
            I'm always interested in hearing about new opportunities and exciting projects.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
          gap: 4,
        }}>
          {/* Contact Form */}
          <Box>
            <Paper 
              sx={{ 
                p: 4,
                bgcolor: darkMode ? '#1e293b' : 'white',
                color: darkMode ? 'white' : 'inherit',
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Send Me a Message
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
                Fill out the form below and I'll get back to you as soon as possible.
              </Typography>

              {showSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Thank you for your message! I'll get back to you soon.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 3,
                }}>
                  <Box>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'white',
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'white',
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'white',
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'white',
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      sx={{ mt: 2 }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Contact Information */}
          <Box>
            {/* Availability Card */}
            <Card 
              sx={{ 
                mb: 3,
                bgcolor: darkMode ? '#0f172a' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Schedule sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Availability
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    icon={<CheckCircle />} 
                    label="Available for Full-Time" 
                    color="success" 
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip 
                    icon={<CheckCircle />} 
                    label="Open to Contract" 
                    color="primary" 
                    sx={{ mb: 1 }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
                  I'm currently open to new opportunities and can start immediately. 
                  Available for both remote and on-site positions.
                </Typography>
              </CardContent>
            </Card>

            {/* Direct Contact Card */}
            <Card 
              sx={{ 
                mb: 3,
                bgcolor: darkMode ? '#0f172a' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Direct Contact
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'text.secondary' }}>
                      Email
                    </Typography>
                    <Typography variant="body1">
                      bquant90@gmail.com
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'text.secondary' }}>
                      Location
                    </Typography>
                    <Typography variant="body1">
                      United States
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'text.secondary' }}>
                      Response Time
                    </Typography>
                    <Typography variant="body1">
                      Within 24 hours
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Social Links Card */}
            <Card 
              sx={{ 
                bgcolor: darkMode ? '#0f172a' : 'white',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Connect on Social
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton
                    href="https://github.com/bquant90"
                    target="_blank"
                    sx={{ 
                      bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e0e7ff',
                      '&:hover': { bgcolor: darkMode ? 'rgba(255, 255, 255, 0.2)' : '#c7d2fe' },
                    }}
                  >
                    <GitHub />
                  </IconButton>
                  <IconButton
                    href="https://linkedin.com/in/bryan-quant"
                    target="_blank"
                    sx={{ 
                      bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e0e7ff',
                      '&:hover': { bgcolor: darkMode ? 'rgba(255, 255, 255, 0.2)' : '#c7d2fe' },
                    }}
                  >
                    <LinkedIn />
                  </IconButton>
                  <IconButton
                    href="mailto:bquant90@gmail.com"
                    sx={{ 
                      bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e0e7ff',
                      '&:hover': { bgcolor: darkMode ? 'rgba(255, 255, 255, 0.2)' : '#c7d2fe' },
                    }}
                  >
                    <Email />
                  </IconButton>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
                  Feel free to connect with me on any platform. I'm always happy to chat about 
                  technology, projects, or opportunities.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* FAQ Section */}
        <Paper 
          sx={{ 
            p: 4, 
            mt: 5,
            bgcolor: darkMode ? '#1e293b' : '#f8fafc',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Frequently Asked Questions
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              What type of opportunities are you looking for?
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
              I'm interested in full-time positions as a Salesforce Developer or Full-Stack Engineer. 
              I'm also open to interesting contract work or consulting opportunities.
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, mt: 3 }}>
              Are you open to relocation?
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
              Yes, I'm open to relocation for the right opportunity. I'm also very comfortable with 
              remote work and have experience collaborating with distributed teams.
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, mt: 3 }}>
              What's your ideal work environment?
            </Typography>
            <Typography variant="body1" sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
              I thrive in collaborative environments where innovation is encouraged, continuous learning 
              is valued, and there's a good balance between challenging work and work-life balance.
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: '#0f172a',
          color: 'white',
          py: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © 2025 Bryan Quant. Built with modern web technologies.
        </Typography>
      </Box>
    </>
  );
};

export default ContactPage;