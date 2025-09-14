# Contributing to Simple Blog UI

Thank you for your interest in contributing to Simple Blog UI! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/simple-blog-ui.git
   cd simple-blog-ui/blog-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow React best practices and hooks patterns
- Use Material-UI components when possible
- Maintain consistent naming conventions (camelCase for variables, PascalCase for components)

### Component Structure
```typescript
// Component template
import React from 'react';
import { ComponentProps } from '@mui/material';

interface MyComponentProps {
  // Define props here
}

const MyComponent: React.FC<MyComponentProps> = ({ ...props }) => {
  // Component logic here
  
  return (
    // JSX here
  );
};

export default MyComponent;
```

### Commit Messages
Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example:
```
feat: add dark mode toggle to header
fix: resolve blog card hover animation issue
docs: update installation instructions
```

## 🐛 Bug Reports

When filing a bug report, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**: Browser, OS, Node.js version
6. **Screenshots**: If applicable

## ✨ Feature Requests

For feature requests, please include:

1. **Problem Statement**: What problem does this solve?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: Any alternative solutions considered?
4. **Additional Context**: Screenshots, mockups, etc.

## 🔧 Pull Request Process

1. **Create a branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines above

3. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** with:
   - Clear title and description
   - Reference any related issues
   - Screenshots of UI changes
   - Test instructions

## 📁 Project Areas

### High Priority
- Performance optimizations
- Accessibility improvements
- Mobile responsiveness
- Test coverage

### Medium Priority
- New blog features (tags, categories, search)
- Enhanced editor functionality
- Export/import improvements
- Theme customization

### Low Priority
- Additional animations
- New color schemes
- Advanced filtering
- Social sharing features

## 🧪 Testing

- Write unit tests for new components
- Test across different browsers
- Verify mobile responsiveness
- Check accessibility with screen readers

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)

## ❓ Questions?

Feel free to:
- Open an issue for questions
- Join our discussions
- Reach out to maintainers

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Simple Blog UI! 🚀