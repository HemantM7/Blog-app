export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  excerpt: string;
  image?: string;
  category: BlogCategory;
}

export interface BlogCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export type ViewMode = 'card' | 'list';

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: 'technology',
    name: 'Technology',
    color: '#00f5ff',
    icon: '💻',
    description: 'Tech news, programming, and digital innovations'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    color: '#ff6b9d',
    icon: '🌟',
    description: 'Life tips, wellness, and personal development'
  },
  {
    id: 'travel',
    name: 'Travel',
    color: '#c471f5',
    icon: '✈️',
    description: 'Travel guides, destinations, and adventures'
  },
  {
    id: 'food',
    name: 'Food & Cooking',
    color: '#4ade80',
    icon: '🍳',
    description: 'Recipes, cooking tips, and culinary experiences'
  },
  {
    id: 'business',
    name: 'Business',
    color: '#f59e0b',
    icon: '💼',
    description: 'Business insights, entrepreneurship, and finance'
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    color: '#ef4444',
    icon: '💪',
    description: 'Health tips, fitness routines, and wellness advice'
  },
  {
    id: 'education',
    name: 'Education',
    color: '#8b5cf6',
    icon: '📚',
    description: 'Learning resources, tutorials, and educational content'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    color: '#06b6d4',
    icon: '🎬',
    description: 'Movies, music, games, and pop culture'
  }
];