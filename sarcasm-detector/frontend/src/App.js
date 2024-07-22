import React, { useState, useEffect } from 'react';
import Form from './Form';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './App.css'; 

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

function App() {
  const [prediction, setPrediction] = useState(null);
  const [inputText, setInputText] = useState(''); // Track input value
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  const handleSubmit = async (text) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ headline: text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrediction(data.sarcastic ? 'Sarcastic' : 'Not Sarcastic');
    } catch (error) {
      setPrediction(null);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (inputText.trim() === '') {
      setPrediction(null);
    }
  }, [inputText]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: isDarkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default,
            color: isDarkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary
          },
        }}
      />
      <Container>
        <IconButton
          sx={{ position: 'absolute', top: 16, right: 16 }}
          onClick={toggleTheme}
          color="inherit"
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Card sx={{ m: 5, p: 3, opacity: 0.9 }}>
          <Form onSubmit={handleSubmit} onInputChange={setInputText} /> {/* Pass input change handler */}
          <CardContent sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            {prediction && (
              <Typography variant="h6">
                {prediction === 'Sarcastic' && (
                  <span className="emoji bounce">You are being Sarcastic! 😏</span>
                )}
                {prediction === 'Not Sarcastic' && (
                  <span className="emoji bounce">This is not a Sarcastic sentence. 🥸</span>
                )}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;
