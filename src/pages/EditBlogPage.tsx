import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Chip
} from '@mui/material';
import { ArrowBack, Save, PhotoCamera, Delete } from '@mui/icons-material';
import Header from '../components/Header';
import { useBlog } from '../context/BlogContext';
import { BLOG_CATEGORIES, BlogCategory } from '../types/blog';

const EditBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { blogs, updateBlog } = useBlog();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorName: '',
    imageUrl: ''
  });
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>(BLOG_CATEGORIES[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [blogNotFound, setBlogNotFound] = useState(false);

  // Find the blog to edit
  const blog = blogs.find(b => b.id === id);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        authorName: blog.author.name,
        imageUrl: blog.image || ''
      });
      setSelectedCategory(blog.category);
      setImagePreview(blog.image || '');
    } else if (id) {
      setBlogNotFound(true);
    }
  }, [blog, id]);

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!blog) return;

    // Update the blog
    updateBlog(blog.id, {
      title: formData.title,
      content: formData.content,
      author: { name: formData.authorName },
      image: formData.imageUrl || undefined,
      category: selectedCategory
    });

    setShowSuccess(true);
    setTimeout(() => {
      navigate(`/blog/${blog.id}`);
    }, 2000);
  };

  const isFormValid = formData.title.trim() && formData.content.trim() && formData.authorName.trim();

  if (blogNotFound) {
    return (
      <>
        <Header />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{ mb: 3 }}
          >
            Back to Blog List
          </Button>
          <Alert severity="error">
            Blog not found. It may have been deleted or the URL is incorrect.
          </Alert>
        </Container>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Typography>Loading...</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(`/blog/${blog.id}`)}
          sx={{ mb: 3 }}
        >
          Back to Blog
        </Button>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Blog
          </Typography>

          {showSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Blog updated successfully! Redirecting to blog page...
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
              <Typography variant="subtitle1" gutterBottom>
                📂 Blog Category
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Select Category</InputLabel>
                <Select
                  value={selectedCategory.id}
                  label="Select Category"
                  onChange={(e) => {
                    const category = BLOG_CATEGORIES.find(cat => cat.id === e.target.value);
                    if (category) setSelectedCategory(category);
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
                <Typography variant="body2" color="text.secondary">
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
                  label="Image URL (optional)"
                  value={formData.imageUrl}
                  onChange={handleInputChange('imageUrl')}
                  variant="outlined"
                  placeholder="https://example.com/image.jpg"
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
                          <IconButton component="span" color="primary">
                            <PhotoCamera />
                          </IconButton>
                        </label>
                      </InputAdornment>
                    ),
                  }}
                />
                {imagePreview && (
                  <IconButton onClick={removeImage} color="error">
                    <Delete />
                  </IconButton>
                )}
              </Box>

              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Image Preview:
                  </Typography>
                  <Box
                    component="img"
                    sx={{
                      width: '100%',
                      maxWidth: 400,
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                    src={imagePreview}
                    alt="Preview"
                  />
                </Box>
              )}

              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                You can either paste an image URL or upload an image file. Leave empty to keep current image.
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

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                disabled={!isFormValid || showSuccess}
              >
                Update Blog
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(`/blog/${blog.id}`)}
                disabled={showSuccess}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default EditBlogPage;