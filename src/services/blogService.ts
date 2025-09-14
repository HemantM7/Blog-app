import { Blog } from '../types/blog';

// Since we're in a browser environment, we'll use localStorage as a fallback
// In a real Node.js environment, you would use fs module
const BLOGS_STORAGE_KEY = 'blog_data';

// Default blog images
const defaultImages = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop'
];

// Initial mock data
const initialBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    content: 'Learn how to set up a React project with TypeScript and best practices for development. React and TypeScript make a powerful combination for building robust web applications.',
    author: { name: 'John Doe' },
    createdAt: '2024-01-15',
    excerpt: 'Learn how to set up a React project with TypeScript and best practices for development.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
  },
  {
    id: '2',
    title: 'Material UI Design System',
    content: 'Explore the comprehensive design system provided by Material UI for React applications. Material UI provides a robust set of components and theming capabilities.',
    author: { name: 'Jane Smith' },
    createdAt: '2024-01-14',
    excerpt: 'Explore the comprehensive design system provided by Material UI for React applications.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop'
  },
  {
    id: '3',
    title: 'Building Responsive Layouts',
    content: 'Master the art of creating responsive layouts that work across all device sizes. Learn about grid systems, breakpoints, and mobile-first design.',
    author: { name: 'Mike Johnson' },
    createdAt: '2024-01-13',
    excerpt: 'Master the art of creating responsive layouts that work across all device sizes.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop'
  }
];

export class BlogService {
  // Read blogs from localStorage (simulating file system)
  static readBlogs(): Blog[] {
    try {
      const storedBlogs = localStorage.getItem(BLOGS_STORAGE_KEY);
      if (storedBlogs) {
        return JSON.parse(storedBlogs);
      }
      // If no stored data, initialize with default blogs
      this.writeBlogs(initialBlogs);
      return initialBlogs;
    } catch (error) {
      console.error('Error reading blogs:', error);
      return initialBlogs;
    }
  }

  // Write blogs to localStorage (simulating file system)
  static writeBlogs(blogs: Blog[]): void {
    try {
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs, null, 2));
    } catch (error) {
      console.error('Error writing blogs:', error);
    }
  }

  // Add a new blog
  static addBlog(blogData: Omit<Blog, 'id' | 'createdAt' | 'excerpt'>): Blog {
    const blogs = this.readBlogs();
    
    const newBlog: Blog = {
      ...blogData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      excerpt: blogData.content.substring(0, 150) + (blogData.content.length > 150 ? '...' : ''),
      image: blogData.image || defaultImages[Math.floor(Math.random() * defaultImages.length)]
    };
    
    const updatedBlogs = [newBlog, ...blogs];
    this.writeBlogs(updatedBlogs);
    return newBlog;
  }

  // Update an existing blog
  static updateBlog(id: string, blogData: Partial<Blog>): Blog | null {
    const blogs = this.readBlogs();
    const blogIndex = blogs.findIndex(blog => blog.id === id);
    
    if (blogIndex === -1) {
      return null;
    }
    
    const updatedBlog = { ...blogs[blogIndex], ...blogData };
    blogs[blogIndex] = updatedBlog;
    this.writeBlogs(blogs);
    return updatedBlog;
  }

  // Delete a blog
  static deleteBlog(id: string): boolean {
    const blogs = this.readBlogs();
    const filteredBlogs = blogs.filter(blog => blog.id !== id);
    
    if (filteredBlogs.length === blogs.length) {
      return false; // Blog not found
    }
    
    this.writeBlogs(filteredBlogs);
    return true;
  }

  // Get a single blog by ID
  static getBlogById(id: string): Blog | null {
    const blogs = this.readBlogs();
    return blogs.find(blog => blog.id === id) || null;
  }

  // Clear all blogs (for testing purposes)
  static clearAllBlogs(): void {
    localStorage.removeItem(BLOGS_STORAGE_KEY);
  }
}