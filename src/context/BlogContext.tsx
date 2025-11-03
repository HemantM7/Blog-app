import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Blog, BLOG_CATEGORIES } from '../types/blog';
import { BlogService } from '../services/blogService';

interface BlogContextType {
  blogs: Blog[];
  addBlog: (blog: Omit<Blog, 'id' | 'createdAt' | 'excerpt'>) => void;
  updateBlog: (id: string, blogData: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
  loading: boolean;
  saveToFile: () => void;
  loadFromFile: () => void;
  createBackup: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};



// Initial mock data
const initialBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    content: 'Learn how to set up a React project with TypeScript and best practices for development. React and TypeScript make a powerful combination for building robust web applications.',
    author: { name: 'John Doe' },
    createdAt: '2024-01-15',
    excerpt: 'Learn how to set up a React project with TypeScript and best practices for development.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    category: BLOG_CATEGORIES[0] // Technology
  },
  {
    id: '2',
    title: 'Material UI Design System',
    content: 'Explore the comprehensive design system provided by Material UI for React applications. Material UI provides a robust set of components and theming capabilities.',
    author: { name: 'Jane Smith' },
    createdAt: '2024-01-14',
    excerpt: 'Explore the comprehensive design system provided by Material UI for React applications.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    category: BLOG_CATEGORIES[0] // Technology
  },
  {
    id: '3',
    title: 'Building Responsive Layouts',
    content: 'Master the art of creating responsive layouts that work across all device sizes. Learn about grid systems, breakpoints, and mobile-first design.',
    author: { name: 'Mike Johnson' },
    createdAt: '2024-01-13',
    excerpt: 'Master the art of creating responsive layouts that work across all device sizes.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    category: BLOG_CATEGORIES[6] // Education
  },
  {
    id: '4',
    title: 'Healthy Morning Routines for Productivity',
    content: 'Discover effective morning routines that boost your energy and productivity throughout the day. Learn about meditation, exercise, and nutrition tips.',
    author: { name: 'Sarah Wilson' },
    createdAt: '2024-01-12',
    excerpt: 'Discover effective morning routines that boost your energy and productivity throughout the day.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
    category: BLOG_CATEGORIES[5] // Health & Fitness
  },
  {
    id: '5',
    title: 'Top 10 Travel Destinations for 2024',
    content: 'Explore the most amazing travel destinations for 2024. From hidden gems to popular hotspots, discover your next adventure.',
    author: { name: 'Alex Chen' },
    createdAt: '2024-01-11',
    excerpt: 'Explore the most amazing travel destinations for 2024. From hidden gems to popular hotspots.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
    category: BLOG_CATEGORIES[2] // Travel
  },
  {
    id: '6',
    title: 'Delicious Pasta Recipes for Beginners',
    content: 'Learn to cook amazing pasta dishes with these simple recipes. Perfect for beginners who want to master Italian cuisine.',
    author: { name: 'Maria Rodriguez' },
    createdAt: '2024-01-10',
    excerpt: 'Learn to cook amazing pasta dishes with these simple recipes. Perfect for beginners.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=250&fit=crop',
    category: BLOG_CATEGORIES[3] // Food & Cooking
  }
];

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Load blogs from storage on component mount
  useEffect(() => {
    loadFromFile();
  }, []);

  const loadFromFile = () => {
    setLoading(true);
    try {
      const storedBlogs = BlogService.readBlogs();
      setBlogs(storedBlogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
      // Fallback to initial blogs if loading fails
      setBlogs(initialBlogs);
      BlogService.writeBlogs(initialBlogs);
    } finally {
      setLoading(false);
    }
  };

  const saveToFile = () => {
    try {
      BlogService.writeBlogs(blogs);
      console.log('Blogs saved successfully!');
    } catch (error) {
      console.error('Error saving blogs:', error);
    }
  };

  const addBlog = (blogData: Omit<Blog, 'id' | 'createdAt' | 'excerpt'>) => {
    try {
      const newBlog = BlogService.addBlog(blogData);
      setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
      console.log('Blog added and saved to file!');
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  const updateBlog = (id: string, blogData: Partial<Blog>) => {
    try {
      const updatedBlog = BlogService.updateBlog(id, blogData);
      if (updatedBlog) {
        setBlogs(prevBlogs => 
          prevBlogs.map(blog => blog.id === id ? updatedBlog : blog)
        );
        console.log('Blog updated and saved to file!');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const deleteBlog = (id: string) => {
    try {
      const success = BlogService.deleteBlog(id);
      if (success) {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
        console.log('Blog deleted and saved to file!');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const createBackup = () => {
    try {
      // Create a backup with timestamp
      const timestamp = new Date().toISOString();
      const backupKey = `blog_backup_${timestamp}`;
      localStorage.setItem(backupKey, JSON.stringify(blogs, null, 2));
      console.log(`Backup created: ${backupKey}`);
      alert(`Backup created successfully at ${new Date().toLocaleString()}`);
    } catch (error) {
      console.error('Error creating backup:', error);
      alert('Error creating backup');
    }
  };

  // Auto-save when blogs change
  useEffect(() => {
    if (!loading && blogs.length > 0) {
      saveToFile();
    }
  }, [blogs, loading]);

  return (
    <BlogContext.Provider value={{ 
      blogs, 
      addBlog, 
      updateBlog, 
      deleteBlog, 
      loading, 
      saveToFile, 
      loadFromFile, 
      createBackup 
    }}>
      {children}
    </BlogContext.Provider>
  );
};