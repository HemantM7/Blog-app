import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  useTheme,
  Chip
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Blog } from '../types/blog';
import { useBlog } from '../context/BlogContext';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();
  const { deleteBlog } = useBlog();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';

  const handleDelete = () => {
    deleteBlog(blog.id);
    setDeleteDialogOpen(false);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #00f5ff, #ff6b9d, #c471f5, #00f5ff)',
          backgroundSize: '200% 100%',
          animation: 'gradient 3s ease infinite',
        },
        '@keyframes gradient': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="200"
          image={blog.image}
          alt={blog.title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        {/* Category Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 2,
          }}
        >
          <Chip
            icon={<span style={{ fontSize: '14px' }}>{blog.category.icon}</span>}
            label={blog.category.name}
            size="small"
            sx={{
              background: `${blog.category.color}20`,
              backdropFilter: 'blur(10px)',
              border: `2px solid ${blog.category.color}60`,
              color: blog.category.color,
              fontWeight: 600,
              fontSize: '0.75rem',
              '& .MuiChip-icon': {
                color: blog.category.color,
              },
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 700,
            color: isLightMode ? '#1a202c' : '#ffffff',
            mb: 2,
            lineHeight: 1.3,
          }}
        >
          {blog.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              mr: 1.5,
              background: 'linear-gradient(45deg, #00f5ff, #ff6b9d)',
              fontWeight: 600,
              color: '#ffffff',
            }}
          >
            {blog.author.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{
              color: isLightMode ? '#2d3748' : 'rgba(255, 255, 255, 0.9)',
              fontWeight: 500
            }}>
              {blog.author.name}
            </Typography>
            <Typography variant="caption" sx={{
              color: isLightMode ? '#718096' : 'rgba(255, 255, 255, 0.6)'
            }}>
              {new Date(blog.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: isLightMode ? '#4a5568' : 'rgba(255, 255, 255, 0.8)',
            lineHeight: 1.6,
          }}
        >
          {blog.excerpt}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 3, pt: 0 }}>
        <Button
          size="small"
          onClick={() => navigate(`/blog/${blog.id}`)}
          sx={{
            background: 'linear-gradient(45deg, #00f5ff, #ff6b9d)',
            color: '#ffffff',
            borderRadius: '20px',
            px: 3,
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(45deg, #ff6b9d, #c471f5)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          📖 Read More
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => navigate(`/edit/${blog.id}`)}
            title="Edit blog"
            sx={{
              background: 'rgba(0, 245, 255, 0.2)',
              color: '#00f5ff',
              '&:hover': {
                background: 'rgba(0, 245, 255, 0.3)',
                transform: 'scale(1.1)',
              },
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setDeleteDialogOpen(true)}
            title="Delete blog"
            sx={{
              background: 'rgba(255, 107, 157, 0.2)',
              color: '#ff6b9d',
              '&:hover': {
                background: 'rgba(255, 107, 157, 0.3)',
                transform: 'scale(1.1)',
              },
            }}
          >
            <Delete />
          </IconButton>
        </Box>
      </CardActions>

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
    </Card>
  );
};

export default BlogCard;