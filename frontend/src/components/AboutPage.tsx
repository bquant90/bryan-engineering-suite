import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Work,
  School,
  Code,
  Download,
  GitHub,
  LinkedIn,
  Email,
} from '@mui/icons-material';

interface AboutPageProps {
  darkMode?: boolean;
}

const AboutPage: React.FC<AboutPageProps> = ({ darkMode = false }) => {
  const skills = {
    'Programming Languages': ['JavaScript', 'TypeScript', 'Python', 'Apex', 'Java'],
    'Frontend': ['React', 'HTML5', 'CSS3', 'Material-UI', 'Tailwind CSS'],
    'Backend': ['Node.js', 'FastAPI', 'REST APIs', 'GraphQL'],
    'Salesforce': ['Lightning Web Components', 'Apex', 'SOQL', 'Flow Builder', 'Admin'],
    'Databases': ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
    'Tools & DevOps': ['Git', 'Docker', 'AWS', 'CI/CD', 'Agile/Scrum'],
  };

  const experience = [
    {
      title: 'Salesforce Developer',
      company: 'Professional Experience',
      period: '2022 - Present',
      description: 'Developed custom Salesforce solutions, automated business processes, and integrated third-party systems.',
      achievements: [
        'Built custom Lightning Web Components for enhanced user experience',
        'Automated complex business workflows using Apex and Flow Builder',
        'Integrated external APIs for real-time data synchronization',
      ],
    },
  ];

  const education = [
    {
      degree: 'Bachelor\'s Degree',
      institution: 'Texas Tech University',
      period: 'Graduated',
      focus: 'Strong foundation in computer science and software engineering principles',
    },
  ];

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
            About Me
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              color: darkMode ? 'rgba(255, 255, 255, 0.8)' : '#64748b',
              lineHeight: 1.6,
            }}
          >
            Passionate Salesforce Developer and Full-Stack Engineer with a love for building 
            innovative solutions and continuous learning.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Professional Summary */}
        <Paper 
          sx={{ 
            p: 4, 
            mb: 4,
            bgcolor: darkMode ? '#1e293b' : 'white',
            color: darkMode ? 'white' : 'inherit',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Professional Summary
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            I'm a dedicated Salesforce Developer and Full-Stack Engineer with over 2 years of experience 
            building enterprise-level applications and custom solutions. My journey in software development 
            began with a fascination for problem-solving and has evolved into a career focused on creating 
            efficient, scalable, and user-friendly applications.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            My expertise spans from Salesforce development, where I specialize in Lightning Web Components 
            and Apex programming, to modern web development using React, TypeScript, and FastAPI. I'm passionate 
            about clean code, best practices, and delivering solutions that make a real impact.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
            or working on personal projects that challenge me to grow as a developer.
          </Typography>
        </Paper>

        {/* Experience Section */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Professional Experience
        </Typography>
        {experience.map((exp, index) => (
          <Card 
            key={index} 
            sx={{ 
              mb: 3,
              bgcolor: darkMode ? '#0f172a' : 'white',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {exp.title}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
                    {exp.company} • {exp.period}
                  </Typography>
                </Box>
                <Work sx={{ color: 'primary.main' }} />
              </Box>
              <Typography variant="body1" paragraph sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'text.primary' }}>
                {exp.description}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Key Achievements:
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {exp.achievements.map((achievement, i) => (
                  <Typography 
                    key={i} 
                    component="li" 
                    variant="body2" 
                    sx={{ 
                      mb: 0.5,
                      color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
                    }}
                  >
                    {achievement}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* Education Section */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3, mt: 5 }}>
          Education
        </Typography>
        {education.map((edu, index) => (
          <Card 
            key={index} 
            sx={{ 
              mb: 3,
              bgcolor: darkMode ? '#0f172a' : 'white',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
                    {edu.institution} • {edu.period}
                  </Typography>
                </Box>
                <School sx={{ color: 'primary.main' }} />
              </Box>
              <Typography variant="body1" sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'text.primary' }}>
                {edu.focus}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {/* Skills Section */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3, mt: 5 }}>
          Technical Skills
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 3,
        }}>
          {Object.entries(skills).map(([category, items]) => (
              <Card 
                sx={{ 
                  height: '100%',
                  bgcolor: darkMode ? '#0f172a' : 'white',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Code sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {category}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {items.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e0e7ff',
                          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : '#4c1d95',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
          ))}
        </Box>

        {/* Resume Download Section */}
        <Paper 
          sx={{ 
            p: 4, 
            mt: 5,
            textAlign: 'center',
            bgcolor: darkMode ? '#1e293b' : '#f8fafc',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Download Resume
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
            Get a copy of my detailed resume with complete work history and qualifications.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Download />}
            sx={{ mt: 2 }}
            onClick={() => alert('Resume PDF will be available soon!')}
          >
            Download Resume (PDF)
          </Button>
        </Paper>

        {/* Contact CTA */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Let's Connect!
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
            I'm always interested in new opportunities and collaborations.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
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
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: '#0f172a',
          color: 'white',
          py: 3,
          textAlign: 'center',
          mt: 6,
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © 2025 Bryan Quant. Built with modern web technologies.
        </Typography>
      </Box>
    </>
  );
};

export default AboutPage;