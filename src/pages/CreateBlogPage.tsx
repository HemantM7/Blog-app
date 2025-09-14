import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  keyframes
} from '@mui/material';
import { ArrowBack, Save, PhotoCamera, Delete } from '@mui/icons-material';
import Header from '../components/Header';
import GradientLoader from '../components/GradientLoader';
import { useBlog } from '../context/BlogContext';
import { BLOG_CATEGORIES, BlogCategory } from '../types/blog';

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

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const CreateBlogPage: React.FC = () => {
  const navigate = useNavigate();
  const { addBlog } = useBlog();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorName: '',
    imageUrl: ''
  });
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>(BLOG_CATEGORIES[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Update image preview when URL changes
    if (field === 'imageUrl') {
      setImagePreview(value);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({
          ...prev,
          imageUrl: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData(prev => ({
      ...prev,
      imageUrl: ''
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Add the new blog to the global state
    addBlog({
      title: formData.title,
      content: formData.content,
      author: { name: formData.authorName },
      image: formData.imageUrl || undefined,
      category: selectedCategory
    });

    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const isFormValid = formData.title.trim() && formData.content.trim() && formData.authorName.trim();

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{
            mb: 3,
            animation: `${slideInLeft} 0.6s ease-out`,
            background: 'linear-gradient(135deg, #00f5ff, #ff6b9d, #c471f5)',
            color: '#ffffff',
            borderRadius: '25px',
            px: 3,
            py: 1.5,
            fontWeight: 700,
            textTransform: 'none',
            boxShadow: '0 8px 32px rgba(0, 245, 255, 0.3)',
            border: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #ff6b9d, #c471f5, #00f5ff)',
              transform: 'translateY(-3px) scale(1.02)',
              boxShadow: '0 12px 40px rgba(255, 107, 157, 0.4)',
            },
          }}
        >
          ← Back to Blog List
        </Button>

        {isSubmitting ? (
          <GradientLoader message="Creating your amazing blog..." size="large" />
        ) : (
          <Paper
            sx={{
              p: 5,
              animation: `${fadeInUp} 0.6s ease-out`,
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #00f5ff, #ff6b9d, #c471f5, #00f5ff)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s ease infinite',
                borderRadius: '24px 24px 0 0',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(0, 245, 255, 0.05), rgba(255, 107, 157, 0.05), rgba(196, 113, 245, 0.05))',
                borderRadius: '24px',
                zIndex: -1,
              },
              '@keyframes shimmer': {
                '0%, 100%': {
                  backgroundPosition: '0% 50%',
                },
                '50%': {
                  backgroundPosition: '100% 50%',
                },
              },
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #00f5ff, #ff6b9d, #c471f5)',
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900,
                mb: 4,
                textAlign: 'center',
                fontSize: { xs: '2rem', md: '3rem' },
                animation: 'shimmer 3s ease infinite',
                filter: 'drop-shadow(0 4px 20px rgba(0, 245, 255, 0.3))',
                '@keyframes shimmer': {
                  '0%, 100%': {
                    backgroundPosition: '0% 50%',
                  },
                  '50%': {
                    backgroundPosition: '100% 50%',
                  },
                },
              }}
            >
              ✨ Create New Blog
            </Typography>

            {showSuccess && (
              <Alert
                severity="success"
                sx={{
                  mb: 4,
                  background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(255, 107, 157, 0.15))',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(0, 245, 255, 0.3)',
                  borderRadius: '16px',
                  color: '#00f5ff',
                  fontWeight: 700,
                  '& .MuiAlert-icon': {
                    color: '#00f5ff',
                  },
                  boxShadow: '0 8px 32px rgba(0, 245, 255, 0.2)',
                }}
              >
                🎉 Blog created successfully! Redirecting to blog list...
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Blog Title"
                value={formData.title}
                onChange={handleInputChange('title')}
                margin="normal"
                required
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Author Name"
                value={formData.authorName}
                onChange={handleInputChange('authorName')}
                margin="normal"
                required
                variant="outlined"
              />

              <Box sx={{ mt: 3, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#00f5ff', fontWeight: 600 }}>
                  📂 Blog Category
                </Typography>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#00f5ff', fontWeight: 500 }}>Select Category</InputLabel>
                  <Select
                    value={selectedCategory.id}
                    label="Select Category"
                    onChange={(e) => {
                      const category = BLOG_CATEGORIES.find(cat => cat.id === e.target.value);
                      if (category) setSelectedCategory(category);
                    }}
                    sx={{
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        border: '2px solid rgba(0, 245, 255, 0.4)',
                      },
                      '&.Mui-focused': {
                        border: '2px solid #00f5ff',
                        boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
                      },
                    }}
                  >
                    {BLOG_CATEGORIES.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              background: category.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '16px',
                            }}
                          >
                            {category.icon}
                          </Box>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {category.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {category.description}
                            </Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                {/* Selected Category Preview */}
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Selected:
                  </Typography>
                  <Chip
                    icon={<span style={{ fontSize: '16px' }}>{selectedCategory.icon}</span>}
                    label={selectedCategory.name}
                    sx={{
                      background: `linear-gradient(135deg, ${selectedCategory.color}20, ${selectedCategory.color}40)`,
                      border: `2px solid ${selectedCategory.color}60`,
                      color: selectedCategory.color,
                      fontWeight: 600,
                      '& .MuiChip-icon': {
                        color: selectedCategory.color,
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Blog Image
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <TextField
                    fullWidth
                    label="🖼️ Image URL (optional)"
                    value={formData.imageUrl}
                    onChange={handleInputChange('imageUrl')}
                    variant="outlined"
                    placeholder="https://example.com/image.jpg"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          border: '2px solid rgba(0, 245, 255, 0.4)',
                          background: 'rgba(255, 255, 255, 0.08)',
                        },
                        '&.Mui-focused': {
                          border: '2px solid #00f5ff',
                          background: 'rgba(255, 255, 255, 0.1)',
                          boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="image-upload"
                            type="file"
                            onChange={handleImageUpload}
                          />
                          <label htmlFor="image-upload">
                            <IconButton
                              component="span"
                              sx={{
                                background: 'linear-gradient(135deg, #00f5ff, #ff6b9d)',
                                color: '#ffffff',
                                '&:hover': {
                                  background: 'linear-gradient(135deg, #ff6b9d, #c471f5)',
                                  transform: 'scale(1.1)',
                                },
                              }}
                            >
                              <PhotoCamera />
                            </IconButton>
                          </label>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {imagePreview && (
                    <IconButton
                      onClick={removeImage}
                      sx={{
                        background: 'linear-gradient(135deg, #ff6b9d, #c471f5)',
                        color: '#ffffff',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #c471f5, #ff6b9d)',
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Box>

                {imagePreview && (
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#00f5ff',
                        fontWeight: 700,
                        mb: 2,
                        textShadow: '0 2px 10px rgba(0, 245, 255, 0.3)',
                      }}
                    >
                      🖼️ Image Preview:
                    </Typography>
                    <Box
                      component="img"
                      sx={{
                        width: '100%',
                        maxWidth: 400,
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: '16px',
                        border: '3px solid',
                        borderColor: 'transparent',
                        background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #00f5ff, #ff6b9d, #c471f5) border-box',
                        boxShadow: '0 12px 40px rgba(0, 245, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 16px 50px rgba(0, 245, 255, 0.4)',
                        },
                      }}
                      src={imagePreview}
                      alt="Preview"
                    />
                  </Box>
                )}

                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  You can either paste an image URL or upload an image file. If no image is provided, a default image will be assigned automatically.
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Blog Content"
                value={formData.content}
                onChange={handleInputChange('content')}
                margin="normal"
                required
                multiline
                rows={12}
                variant="outlined"
                placeholder="Write your blog content here..."
              />

              <Box sx={{ mt: 4, display: 'flex', gap: 3, justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Save />}
                  disabled={!isFormValid || showSuccess}
                  sx={{
                    background: 'linear-gradient(135deg, #00f5ff, #ff6b9d, #c471f5)',
                    color: '#ffffff',
                    borderRadius: '25px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 12px 40px rgba(0, 245, 255, 0.4)',
                    border: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #ff6b9d, #c471f5, #00f5ff)',
                      transform: 'translateY(-3px) scale(1.05)',
                      boxShadow: '0 16px 50px rgba(255, 107, 157, 0.5)',
                    },
                    '&:disabled': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.5)',
                      transform: 'none',
                      boxShadow: 'none',
                    },
                  }}
                >
                  ✨ Create Blog
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/')}
                  disabled={showSuccess}
                  sx={{
                    borderColor: 'rgba(0, 245, 255, 0.5)',
                    color: '#00f5ff',
                    borderRadius: '25px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderWidth: '2px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: '#ff6b9d',
                      background: 'rgba(255, 107, 157, 0.1)',
                      color: '#ff6b9d',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(255, 107, 157, 0.2)',
                    },
                    '&:disabled': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  🚫 Cancel
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Container>
    </>
  );
};

export default CreateBlogPage;