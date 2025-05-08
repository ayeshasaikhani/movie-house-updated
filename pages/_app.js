import "@/styles/globals.css";
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

function AppContent({ Component, pageProps }) {
  const { isDarkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: isDarkMode ? '#1a1a1a' : '#ffffff',
        paper: isDarkMode ? '#2d2d2d' : '#ffffff',
      },
    },
  });

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </MUIThemeProvider>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <AppContent Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
