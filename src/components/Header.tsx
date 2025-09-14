import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { Brightness4, Brightness7, Add, Storage } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import DataManager from './DataManager';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [dataManagerOpen, setDataManagerOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              cursor: 'pointer',
              background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              fontSize: '1.5rem',
              transition: 'all 0.3s ease',
              
            }}
            onClick={() => navigate('/')}
          >
            ✨ Simple Blog UI
          </Typography>
          <Button
            color="inherit"
            startIcon={<Add />}
            onClick={() => navigate('/create')}
            sx={{ mr: 2 }}
          >
            Create New Blog
          </Button>
          <IconButton
            color="inherit"
            onClick={() => setDataManagerOpen(true)}
            sx={{ mr: 1 }}
            title="Data Management"
          >
            <Storage />
          </IconButton>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <DataManager
        open={dataManagerOpen}
        onClose={() => setDataManagerOpen(false)}
      />
    </>
  );
};

export default Header;