import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: 1,
            fontWeight: 'bold'
          }}
        >
          MovieHouse
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            href="/genres"
            color="inherit"
          >
            Genres
          </Button>
          <Button
            component={Link}
            href="/directors"
            color="inherit"
          >
            Directors
          </Button>
          <IconButton 
            onClick={toggleTheme} 
            color="inherit"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 