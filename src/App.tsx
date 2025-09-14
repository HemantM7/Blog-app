import { Routes, Route } from 'react-router-dom';
import { CustomThemeProvider } from './context/ThemeContext';
import { BlogProvider } from './context/BlogContext';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';

function App() {
  return (
    <CustomThemeProvider>
      <BlogProvider>
        <Routes>
          <Route path="/" element={<BlogListPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/create" element={<CreateBlogPage />} />
          <Route path="/edit/:id" element={<EditBlogPage />} />
        </Routes>
      </BlogProvider>
    </CustomThemeProvider>
  );
}

export default App;