import { Blog } from '../types/blog';

// This would be used in a Node.js environment
// For demonstration purposes, showing how it would work with fs module

/*
// Node.js file system implementation (for server-side use)
import fs from 'fs';
import path from 'path';

const BLOGS_FILE_PATH = path.join(process.cwd(), 'data', 'blogs.json');
const DATA_DIR = path.join(process.cwd(), 'data');

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

export class NodeFileService {
  // Ensure data directory exists
  private static ensureDataDirectory(): void {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  // Read blogs from JSON file
  static async readBlogs(): Promise<Blog[]> {
    try {
      this.ensureDataDirectory();
      
      if (!fs.existsSync(BLOGS_FILE_PATH)) {
        // If file doesn't exist, create it with initial data
        await this.writeBlogs(initialBlogs);
        return initialBlogs;
      }
      
      const data = await fs.promises.readFile(BLOGS_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading blogs from file:', error);
      return initialBlogs;
    }
  }

  // Write blogs to JSON file
  static async writeBlogs(blogs: Blog[]): Promise<void> {
    try {
      this.ensureDataDirectory();
      await fs.promises.writeFile(BLOGS_FILE_PATH, JSON.stringify(blogs, null, 2), 'utf-8');
      console.log(`Successfully wrote ${blogs.length} blogs to ${BLOGS_FILE_PATH}`);
    } catch (error) {
      console.error('Error writing blogs to file:', error);
      throw error;
    }
  }

  // Add a new blog
  static async addBlog(blogData: Omit<Blog, 'id' | 'createdAt' | 'excerpt'>): Promise<Blog> {
    const blogs = await this.readBlogs();
    
    const newBlog: Blog = {
      ...blogData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      excerpt: blogData.content.substring(0, 150) + (blogData.content.length > 150 ? '...' : ''),
      image: blogData.image || defaultImages[Math.floor(Math.random() * defaultImages.length)]
    };
    
    const updatedBlogs = [newBlog, ...blogs];
    await this.writeBlogs(updatedBlogs);
    return newBlog;
  }

  // Update an existing blog
  static async updateBlog(id: string, blogData: Partial<Blog>): Promise<Blog | null> {
    const blogs = await this.readBlogs();
    const blogIndex = blogs.findIndex(blog => blog.id === id);
    
    if (blogIndex === -1) {
      return null;
    }
    
    const updatedBlog = { ...blogs[blogIndex], ...blogData };
    blogs[blogIndex] = updatedBlog;
    await this.writeBlogs(blogs);
    return updatedBlog;
  }

  // Delete a blog
  static async deleteBlog(id: string): Promise<boolean> {
    const blogs = await this.readBlogs();
    const filteredBlogs = blogs.filter(blog => blog.id !== id);
    
    if (filteredBlogs.length === blogs.length) {
      return false; // Blog not found
    }
    
    await this.writeBlogs(filteredBlogs);
    return true;
  }

  // Get a single blog by ID
  static async getBlogById(id: string): Promise<Blog | null> {
    const blogs = await this.readBlogs();
    return blogs.find(blog => blog.id === id) || null;
  }

  // Backup blogs to a timestamped file
  static async backupBlogs(): Promise<string> {
    const blogs = await this.readBlogs();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(DATA_DIR, `blogs-backup-${timestamp}.json`);
    
    await fs.promises.writeFile(backupPath, JSON.stringify(blogs, null, 2), 'utf-8');
    console.log(`Backup created at: ${backupPath}`);
    return backupPath;
  }

  // Get file stats
  static async getFileStats(): Promise<{ size: number; lastModified: Date; blogCount: number }> {
    try {
      const stats = await fs.promises.stat(BLOGS_FILE_PATH);
      const blogs = await this.readBlogs();
      
      return {
        size: stats.size,
        lastModified: stats.mtime,
        blogCount: blogs.length
      };
    } catch (error) {
      console.error('Error getting file stats:', error);
      return { size: 0, lastModified: new Date(), blogCount: 0 };
    }
  }
}
*/

// Browser-compatible version using localStorage
export class NodeFileService {
  private static readonly STORAGE_KEY = 'blog_data_json';
  private static readonly BACKUP_KEY = 'blog_data_backup';

  // Simulate file reading with localStorage
  static async readBlogs(): Promise<Blog[]> {
    return new Promise((resolve) => {
      try {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) {
          resolve(JSON.parse(data));
        } else {
          // Initialize with empty array if no data
          resolve([]);
        }
      } catch (error) {
        console.error('Error reading blogs:', error);
        resolve([]);
      }
    });
  }

  // Simulate file writing with localStorage
  static async writeBlogs(blogs: Blog[]): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(blogs, null, 2));
        console.log(`Successfully saved ${blogs.length} blogs to storage`);
        resolve();
      } catch (error) {
        console.error('Error writing blogs:', error);
        reject(error);
      }
    });
  }

  // Create backup
  static async backupBlogs(): Promise<string> {
    const blogs = await this.readBlogs();
    const timestamp = new Date().toISOString();
    const backupData = {
      timestamp,
      blogs,
      count: blogs.length
    };
    
    localStorage.setItem(this.BACKUP_KEY, JSON.stringify(backupData, null, 2));
    console.log(`Backup created at: ${timestamp}`);
    return timestamp;
  }

  // Get storage stats
  static async getStorageStats(): Promise<{ size: number; lastModified: string; blogCount: number }> {
    const blogs = await this.readBlogs();
    const data = localStorage.getItem(this.STORAGE_KEY);
    
    return {
      size: data ? new Blob([data]).size : 0,
      lastModified: new Date().toISOString(),
      blogCount: blogs.length
    };
  }
}