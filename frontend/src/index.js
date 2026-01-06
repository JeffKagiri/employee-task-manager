import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './styles/global.css';
import App from './App';

// Import Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2',
      dark: '#357ABD',
      light: '#EAF3FD',
    },
    secondary: {
      main: '#7ED321',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Lora", "serif"',
    },
    h2: {
      fontFamily: '"Lora", "serif"',
    },
    h3: {
      fontFamily: '"Lora", "serif"',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GoogleOAuthProvider clientId="721668409074-rn39k3g8iu6515ss58pv4mcc5eiml862.apps.googleusercontent.com">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);