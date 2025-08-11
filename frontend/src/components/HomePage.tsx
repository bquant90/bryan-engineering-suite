import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Container,
} from '@mui/material';
import {
  Code,
  School,
  Work,
  LocationOn,
  Email,
  GitHub,
  LinkedIn,
  Launch,
  Engineering,
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const skills = [
    'Salesforce Development', 'JavaScript', 'TypeScript', 'Python', 'React', 
    'FastAPI', 'Apex', 'SOQL', 'Lightning Web Components', 'Flow Builder',
    'Material-UI', 'REST APIs', 'Git', 'SQL', 'Problem Solving'
  ];

  const experiences = [
    {
      title: 'Salesforce Developer',
      company: 'Professional Experience',
      duration: '2+ Years',
      description: 'Specialized in custom Salesforce solutions, automation, and integrations.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Bryan Quant
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Salesforce Developer & Software Engineer
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
          Passionate software developer with 2+ years of Salesforce experience and a strong foundation 
          in modern web technologies. Currently seeking challenging opportunities to grow and contribute 
          to innovative software solutions.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Email />}
            href="mailto:bryan.quant@outlook.com"
            sx={{ textTransform: 'none' }}
          >
            Get in Touch
          </Button>
          <Button
            variant="outlined"
            startIcon={<GitHub />}
            href="https://github.com/bquant90"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textTransform: 'none' }}
          >
            GitHub
          </Button>
          <Button
            variant="outlined"
            startIcon={<LinkedIn />}
            href="https://linkedin.com/in/bryan-quant"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textTransform: 'none' }}
          >
            LinkedIn
          </Button>
        </Box>
      </Box>

      {/* About Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 6 }}>
        {/* About Me Card */}
        <Card sx={{ flex: 1, height: 'fit-content' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Work sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="h2">
                About Me
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              I'm a dedicated software developer with a strong background in Salesforce development 
              and modern web technologies. My experience spans custom application development, 
              automation solutions, and full-stack web development.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              I thrive in collaborative environments and am always eager to learn new technologies 
              and tackle complex challenges. My goal is to contribute to meaningful projects that 
              make a positive impact.
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 1, color: 'text.secondary', fontSize: 'small' }} />
                <Typography variant="body2" color="text.secondary">
                  Open to Remote & On-site Opportunities
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Education Card */}
        <Card sx={{ flex: 1, height: 'fit-content' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <School sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="h2">
                Education
              </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Texas Tech University
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Strong academic foundation with focus on technology and problem-solving
            </Typography>
            
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2 }}>
              Continuous Learning
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Always staying updated with the latest technologies, certifications, and best practices 
              in software development and cloud platforms.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Skills Section */}
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Code sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h2">
              Technical Skills
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                variant="outlined"
                color="primary"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'primary.main', 
                    color: 'white' 
                  } 
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Work sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h2">
              Professional Experience
            </Typography>
          </Box>
          {experiences.map((exp, index) => (
            <Box key={index} sx={{ mb: 3, '&:last-child': { mb: 0 } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {exp.title}
              </Typography>
              <Typography variant="body2" color="primary.main" sx={{ fontWeight: 'medium' }}>
                {exp.company} • {exp.duration}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {exp.description}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* What I'm Looking For Section */}
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Launch sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h2">
              What I'm Looking For
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            I'm actively seeking opportunities in software development where I can:
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Apply my Salesforce expertise while expanding into new technologies
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Work on challenging projects that drive business value
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Collaborate with talented teams in an innovative environment
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Continue learning and growing as a full-stack developer
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Project Showcase */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Engineering sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h2">
              Featured Project: Engineering Calculator Suite
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            This application showcases my full-stack development skills, combining:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {['FastAPI Backend', 'React Frontend', 'TypeScript', 'Material-UI', 'Railway Deployment', 'Vercel Hosting'].map((tech) => (
              <Chip key={tech} label={tech} size="small" color="secondary" />
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            The suite includes practical engineering calculators with professional UI/UX, 
            demonstrating my ability to create production-ready applications with modern 
            development practices.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Launch />}
            href="https://github.com/bquant90/bryan-engineering-suite"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textTransform: 'none' }}
          >
            View Source Code
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default HomePage;