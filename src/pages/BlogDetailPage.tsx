import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Avatar, 
  Box, 
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Fab
} from '@mui/material';
import { ArrowBack, Delete, Edit } from '@mui/icons-material';
import Header from '../components/Header';
import { useBlog } from '../context/BlogContext';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { blogs, deleteBlog } = useBlog();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Find the blog by id
  const blog = blogs.find(b => b.id === id);

  const handleDelete = () => {
    if (blog) {
      deleteBlog(blog.id);
      setDeleteDialogOpen(false);
      navigate('/');
    }
  };

  if (!blog) {
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
          <Typography variant="h4">Blog not found</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
          >
            Back to Blog List
          </Button>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Edit />}
              onClick={() => navigate(`/edit/${blog.id}`)}
            >
              Edit Blog
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete Blog
            </Button>
          </Box>
        </Box>
        
        <Paper sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {blog.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ width: 48, height: 48, mr: 2 }}>
              {blog.author.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6">
                {blog.author.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </Box>
          </Box>

          {blog.image && (
            <Box
              component="img"
              sx={{
                width: '100%',
                maxHeight: 400,
                objectFit: 'cover',
                borderRadius: 2,
                mb: 3
              }}
              src={blog.image}
              alt={blog.title}
            />
          )}

          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
            {blog.content}
          </Typography>
        </Paper>

        {/* Floating Action Buttons for Mobile */}
        <Fab
          color="primary"
          aria-label="edit"
          onClick={() => navigate(`/edit/${blog.id}`)}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            display: { xs: 'flex', sm: 'none' }
          }}
        >
          <Edit />
        </Fab>
        
        <Fab
          color="error"
          aria-label="delete"
          onClick={() => setDeleteDialogOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            display: { xs: 'flex', sm: 'none' }
          }}
        >
          <Delete />
        </Fab>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          aria-labelledby="delete-dialog-title"
        >
          <DialogTitle id="delete-dialog-title">
            Delete Blog
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete "{blog.title}"? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default BlogDetailPage;