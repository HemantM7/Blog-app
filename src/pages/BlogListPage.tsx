import React, { useState, useMemo } from 'react';
import { Container, Grid, ToggleButton, ToggleButtonGroup, Box, Typography, Alert, keyframes } from '@mui/material';
import { ViewList, ViewModule } from '@mui/icons-material';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import BlogListItem from '../components/BlogListItem';
import GradientLoader from '../components/GradientLoader';
import CategoryFilter from '../components/CategoryFilter';
import { ViewMode } from '../types/blog';
import { useBlog } from '../context/BlogContext';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const BlogListPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { blogs, loading } = useBlog();

  // Filter blogs by category
  const filteredBlogs = useMemo(() => {
    if (!selectedCategory) return blogs;
    return blogs.filter(blog => blog.category.id === selectedCategory);
  }, [blogs, selectedCategory]);

  // Calculate blog counts per category
  const blogCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    blogs.forEach(blog => {
      counts[blog.category.id] = (counts[blog.category.id] || 0) + 1;
    });
    return counts;
  }, [blogs]);

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: ViewMode | null) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            animation: `${slideIn} 0.6s ease-out`
          }}
        >
          <Typography 
            variant="h3" 
            component="h1"
            sx={{
              background: 'linear-gradient(45deg, #00f5ff, #ff6b9d, #c471f5)',
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            📚 Blog Collection
          </Typography>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            aria-label="view mode"
            sx={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: '20px',
                color: 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.05)',
                },
                '&.Mui-selected': {
                  background: 'linear-gradient(45deg, #00f5ff, #ff6b9d)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff6b9d, #c471f5)',
                  },
                },
              },
            }}
          >
            <ToggleButton value="card" aria-label="card view">
              <ViewModule />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewList />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          blogCounts={blogCounts}
        />

        {loading ? (
          <GradientLoader message="Loading your amazing blogs..." size="large" />
        ) : filteredBlogs.length === 0 ? (
          <Alert 
            severity="info" 
            sx={{ 
              mt: 4,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              color: 'white',
              animation: `${fadeInUp} 0.6s ease-out`,
              '& .MuiAlert-icon': {
                color: '#4facfe',
              },
            }}
          >
            {selectedCategory 
              ? `📂 No blogs found in this category. Try selecting a different category!`
              : `🚀 No blogs found. Create your first blog to get started!`
            }
          </Alert>
        ) : viewMode === 'card' ? (
          <Grid container spacing={3}>
            {filteredBlogs.map((blog, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={blog.id}
                sx={{
                  animation: `${fadeInUp} 0.6s ease-out`,
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both',
                }}
              >
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>
            {filteredBlogs.map((blog, index) => (
              <Box
                key={blog.id}
                sx={{
                  animation: `${fadeInUp} 0.6s ease-out`,
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both',
                }}
              >
                <BlogListItem blog={blog} />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </>
  );
};

export default BlogListPage;