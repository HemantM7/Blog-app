import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Button, 
  Avatar, 
  Box, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Blog } from '../types/blog';
import { useBlog } from '../context/BlogContext';

interface BlogListItemProps {
  blog: Blog;
}

const BlogListItem: React.FC<BlogListItemProps> = ({ blog }) => {
  const navigate = useNavigate();
  const { deleteBlog } = useBlog();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteBlog(blog.id);
    setDeleteDialogOpen(false);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box
          component="img"
          sx={{
            width: 120,
            height: 80,
            objectFit: 'cover',
            borderRadius: 1,
            flexShrink: 0
          }}
          src={blog.image}
          alt={blog.title}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          <Avatar sx={{ width: 40, height: 40 }}>
            {blog.author.name.charAt(0)}
          </Avatar>
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="h6" gutterBottom>
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            By {blog.author.name} • {new Date(blog.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {blog.excerpt}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexShrink: 0 }}>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            Read More
          </Button>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton 
              size="small" 
              color="primary" 
              onClick={() => navigate(`/edit/${blog.id}`)}
              title="Edit blog"
            >
              <Edit />
            </IconButton>
            <IconButton 
              size="small" 
              color="error" 
              onClick={() => setDeleteDialogOpen(true)}
              title="Delete blog"
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Box>

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
    </Paper>
  );
};

export default BlogListItem;