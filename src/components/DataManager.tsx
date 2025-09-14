import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Storage, 
  Backup, 
  Refresh, 
  Download, 
  Upload,
  Close 
} from '@mui/icons-material';
import { useBlog } from '../context/BlogContext';

interface DataManagerProps {
  open: boolean;
  onClose: () => void;
}

const DataManager: React.FC<DataManagerProps> = ({ open, onClose }) => {
  const { blogs, saveToFile, loadFromFile, createBackup } = useBlog();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    storageSize: 0,
    lastSaved: ''
  });

  React.useEffect(() => {
    if (open) {
      updateStats();
    }
  }, [open, blogs]);

  const updateStats = () => {
    const data = localStorage.getItem('blog_data');
    setStats({
      totalBlogs: blogs.length,
      storageSize: data ? new Blob([data]).size : 0,
      lastSaved: new Date().toLocaleString()
    });
  };

  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(blogs, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `blog-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data');
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          if (Array.isArray(importedData)) {
            localStorage.setItem('blog_data', JSON.stringify(importedData, null, 2));
            loadFromFile();
            alert('Data imported successfully!');
          } else {
            alert('Invalid file format');
          }
        } catch (error) {
          console.error('Error importing data:', error);
          alert('Error importing data');
        }
      };
      reader.readAsText(file);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Storage />
          Data Management
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          All blog data is automatically saved to browser localStorage. Use these tools to manage your data.
        </Alert>

        {/* Storage Statistics */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Storage Statistics
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip 
              label={`${stats.totalBlogs} Blogs`} 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label={`${formatBytes(stats.storageSize)}`} 
              color="secondary" 
              variant="outlined" 
            />
            <Chip 
              label={`Last saved: ${stats.lastSaved}`} 
              variant="outlined" 
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* File Operations */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            File Operations
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Tooltip title="Manually save current data">
              <Button
                variant="outlined"
                startIcon={<Storage />}
                onClick={() => {
                  saveToFile();
                  updateStats();
                  alert('Data saved successfully!');
                }}
              >
                Save Data
              </Button>
            </Tooltip>

            <Tooltip title="Reload data from storage">
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => {
                  loadFromFile();
                  updateStats();
                  alert('Data reloaded successfully!');
                }}
              >
                Reload Data
              </Button>
            </Tooltip>

            <Tooltip title="Create backup copy">
              <Button
                variant="outlined"
                startIcon={<Backup />}
                onClick={() => {
                  createBackup();
                  updateStats();
                }}
              >
                Create Backup
              </Button>
            </Tooltip>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Import/Export */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Import/Export
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleExportData}
            >
              Export JSON
            </Button>

            <Button
              variant="contained"
              component="label"
              startIcon={<Upload />}
            >
              Import JSON
              <input
                type="file"
                accept=".json"
                hidden
                onChange={handleImportData}
              />
            </Button>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Export your blog data as JSON file or import from a previously exported file.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataManager;