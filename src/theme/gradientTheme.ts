import { createTheme } from '@mui/material/styles';

export const gradientTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f5ff',
      light: '#ff6b9d',
      dark: '#c471f5',
    },
    secondary: {
      main: '#ff6b9d',
      light: '#00f5ff',
      dark: '#c471f5',
    },
    background: {
      default: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.9)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
          minHeight: '100vh',
          backgroundAttachment: 'fixed',
          color: '#ffffff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            background: 'rgba(255, 255, 255, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #00f5ff 30%, #ff6b9d 70%, #c471f5 90%)',
          color: '#ffffff',
          fontWeight: 700,
          '&:hover': {
            background: 'linear-gradient(45deg, #ff6b9d 30%, #c471f5 70%, #00f5ff 90%)',
          },
        },
        outlined: {
          borderColor: 'rgba(0, 245, 255, 0.5)',
          color: '#00f5ff',
          fontWeight: 600,
          '&:hover': {
            borderColor: '#ff6b9d',
            background: 'rgba(255, 107, 157, 0.1)',
            color: '#ff6b9d',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1) rotate(5deg)',
            background: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#667eea',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#00f5ff',
            fontWeight: 500,
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff',
            fontWeight: 500,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          color: '#ffffff',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
        h1: {
          color: '#ffffff',
          fontWeight: 800,
        },
        h2: {
          color: '#ffffff',
          fontWeight: 700,
        },
        h3: {
          color: '#ffffff',
          fontWeight: 700,
        },
        h4: {
          color: '#ffffff',
          fontWeight: 600,
        },
        h5: {
          color: '#ffffff',
          fontWeight: 600,
        },
        h6: {
          color: '#ffffff',
          fontWeight: 600,
        },
        body1: {
          color: 'rgba(255, 255, 255, 0.9)',
        },
        body2: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
  },
});

export const lightGradientTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2d3748',
      light: '#4a5568',
      dark: '#1a202c',
    },
    secondary: {
      main: '#00f5ff',
      light: '#ff6b9d',
      dark: '#c471f5',
    },
    background: {
      default: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #e2e8f0 100%)',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#1a202c',
      secondary: '#2d3748',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #e2e8f0 100%)',
          minHeight: '100vh',
          backgroundAttachment: 'fixed',
          color: '#1a202c',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          color: '#1a202c',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 40px rgba(0, 245, 255, 0.2)',
            background: 'rgba(255, 255, 255, 1)',
            border: '1px solid rgba(0, 245, 255, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          borderRadius: '16px',
          transition: 'all 0.3s ease',
          color: '#1a202c',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #00f5ff 30%, #ff6b9d 70%, #c471f5 90%)',
          color: '#ffffff',
          fontWeight: 700,
          '&:hover': {
            background: 'linear-gradient(45deg, #ff6b9d 30%, #c471f5 70%, #00f5ff 90%)',
          },
        },
        outlined: {
          borderColor: '#00f5ff',
          color: '#00f5ff',
          fontWeight: 600,
          '&:hover': {
            borderColor: '#ff6b9d',
            background: 'rgba(255, 107, 157, 0.1)',
            color: '#ff6b9d',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          color: '#2d3748',
          '&:hover': {
            transform: 'scale(1.1) rotate(5deg)',
            background: 'rgba(0, 245, 255, 0.1)',
            color: '#00f5ff',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            '& fieldset': {
              borderColor: 'rgba(0, 245, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 245, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00f5ff',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#00f5ff',
            fontWeight: 600,
          },
          '& .MuiOutlinedInput-input': {
            color: '#1a202c',
            fontWeight: 500,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          color: '#1a202c',
          boxShadow: '0 4px 20px rgba(0, 245, 255, 0.1)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#1a202c',
        },
        h1: {
          color: '#1a202c',
          fontWeight: 800,
        },
        h2: {
          color: '#1a202c',
          fontWeight: 700,
        },
        h3: {
          color: '#1a202c',
          fontWeight: 700,
        },
        h4: {
          color: '#1a202c',
          fontWeight: 600,
        },
        h5: {
          color: '#1a202c',
          fontWeight: 600,
        },
        h6: {
          color: '#1a202c',
          fontWeight: 600,
        },
        body1: {
          color: '#2d3748',
        },
        body2: {
          color: '#4a5568',
        },
        caption: {
          color: '#718096',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
        },
        standardSuccess: {
          background: 'rgba(72, 187, 120, 0.1)',
          border: '1px solid rgba(72, 187, 120, 0.3)',
          color: '#2f855a',
        },
        standardError: {
          background: 'rgba(245, 101, 101, 0.1)',
          border: '1px solid rgba(245, 101, 101, 0.3)',
          color: '#c53030',
        },
        standardWarning: {
          background: 'rgba(237, 137, 54, 0.1)',
          border: '1px solid rgba(237, 137, 54, 0.3)',
          color: '#c05621',
        },
        standardInfo: {
          background: 'rgba(0, 245, 255, 0.1)',
          border: '1px solid rgba(0, 245, 255, 0.3)',
          color: '#00b8cc',
        },
      },
    },
  },
});