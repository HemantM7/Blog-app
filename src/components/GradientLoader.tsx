import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';

const pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

interface GradientLoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const GradientLoader: React.FC<GradientLoaderProps> = ({ 
  message = 'Loading...', 
  size = 'medium' 
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 40;
      case 'large': return 80;
      default: return 60;
    }
  };

  const loaderSize = getSize();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: size === 'large' ? '50vh' : 'auto',
        py: 4,
      }}
    >
      {/* Animated Gradient Circles */}
      <Box
        sx={{
          position: 'relative',
          width: loaderSize,
          height: loaderSize,
          mb: 3,
        }}
      >
        {/* Outer rotating ring */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #00f5ff, #ff6b9d, #c471f5, #00f5ff)',
            animation: `${rotate} 2s linear infinite`,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '4px',
              left: '4px',
              right: '4px',
              bottom: '4px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
        
        {/* Inner pulsing circle */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '60%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff6b9d, #00f5ff)',
            animation: `${pulse} 1.5s ease-in-out infinite`,
          }}
        />
        
        {/* Floating dots */}
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #c471f5, #00f5ff)',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${index * 120}deg) translateY(-${loaderSize / 2 + 10}px)`,
              animation: `${float} 2s ease-in-out infinite`,
              animationDelay: `${index * 0.3}s`,
            }}
          />
        ))}
      </Box>

      {/* Loading text with gradient */}
      <Typography
        variant={size === 'large' ? 'h5' : size === 'small' ? 'body2' : 'h6'}
        sx={{
          background: 'linear-gradient(45deg, #00f5ff, #ff6b9d, #c471f5)',
          backgroundSize: '200% 200%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `${rotate} 3s ease-in-out infinite`,
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        {message}
      </Typography>

      {/* Animated dots */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mt: 2,
        }}
      >
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #00f5ff, #ff6b9d)',
              animation: `${pulse} 1s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default GradientLoader;