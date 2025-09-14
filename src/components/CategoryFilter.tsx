import React from 'react';
import {
  Box,
  Chip,
  Typography,
  useTheme,
  keyframes
} from '@mui/material';
import { BLOG_CATEGORIES, BlogCategory } from '../types/blog';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  blogCounts: Record<string, number>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  blogCounts
}) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        mb: 4,
        animation: `${slideIn} 0.6s ease-out`,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: isLightMode ? '#1a202c' : '#ffffff',
          textAlign: 'center',
        }}
      >
        📂 Browse by Category
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          mb: 2,
        }}
      >
        {/* All Categories Chip */}
        <Chip
          label={`All (${Object.values(blogCounts).reduce((sum, count) => sum + count, 0)})`}
          onClick={() => onCategoryChange(null)}
          sx={{
            background: selectedCategory === null 
              ? 'linear-gradient(135deg, #00f5ff, #ff6b9d)' 
              : isLightMode 
                ? 'rgba(255, 255, 255, 0.8)' 
                : 'rgba(255, 255, 255, 0.1)',
            color: selectedCategory === null 
              ? '#ffffff' 
              : isLightMode 
                ? '#2d3748' 
                : 'rgba(255, 255, 255, 0.8)',
            border: selectedCategory === null 
              ? 'none' 
              : `2px solid ${isLightMode ? 'rgba(0, 245, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`,
            fontWeight: 600,
            fontSize: '0.9rem',
            px: 2,
            py: 1,
            height: 'auto',
            borderRadius: '25px',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-2px) scale(1.05)',
              boxShadow: selectedCategory === null 
                ? '0 8px 25px rgba(0, 245, 255, 0.4)' 
                : '0 8px 25px rgba(0, 0, 0, 0.2)',
              background: selectedCategory === null 
                ? 'linear-gradient(135deg, #ff6b9d, #c471f5)' 
                : isLightMode 
                  ? 'rgba(255, 255, 255, 0.9)' 
                  : 'rgba(255, 255, 255, 0.15)',
            },
          }}
        />

        {/* Category Chips */}
        {BLOG_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.id;
          const count = blogCounts[category.id] || 0;
          
          return (
            <Chip
              key={category.id}
              icon={<span style={{ fontSize: '16px' }}>{category.icon}</span>}
              label={`${category.name} (${count})`}
              onClick={() => onCategoryChange(category.id)}
              sx={{
                background: isSelected 
                  ? `linear-gradient(135deg, ${category.color}, ${category.color}dd)` 
                  : isLightMode 
                    ? 'rgba(255, 255, 255, 0.8)' 
                    : 'rgba(255, 255, 255, 0.1)',
                color: isSelected 
                  ? '#ffffff' 
                  : isLightMode 
                    ? category.color 
                    : 'rgba(255, 255, 255, 0.8)',
                border: isSelected 
                  ? 'none' 
                  : `2px solid ${category.color}60`,
                fontWeight: 600,
                fontSize: '0.9rem',
                px: 2,
                py: 1,
                height: 'auto',
                borderRadius: '25px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '& .MuiChip-icon': {
                  color: isSelected ? '#ffffff' : category.color,
                },
                '&:hover': {
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: `0 8px 25px ${category.color}40`,
                  background: isSelected 
                    ? `linear-gradient(135deg, ${category.color}dd, ${category.color})` 
                    : isLightMode 
                      ? `${category.color}10` 
                      : `${category.color}20`,
                },
              }}
            />
          );
        })}
      </Box>

      {/* Selected Category Description */}
      {selectedCategory && (
        <Box
          sx={{
            mt: 3,
            p: 3,
            background: isLightMode 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(15px)',
            borderRadius: '16px',
            border: `2px solid ${BLOG_CATEGORIES.find(cat => cat.id === selectedCategory)?.color}40`,
            textAlign: 'center',
            animation: `${slideIn} 0.4s ease-out`,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: isLightMode ? '#4a5568' : 'rgba(255, 255, 255, 0.8)',
              fontStyle: 'italic',
            }}
          >
            {BLOG_CATEGORIES.find(cat => cat.id === selectedCategory)?.description}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CategoryFilter;