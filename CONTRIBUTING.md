# Contributing to Simple Blog UI

Thank you for your interest in contributing to Simple Blog UI! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/simple-blog-ui.git
   cd simple-blog-ui/Blog-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and formatting
- Run `npm run format` before committing
- Ensure `npm run lint` passes without errors
- Run `npm run type-check` to verify TypeScript compliance

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
feat: add dark mode toggle functionality
fix: resolve blog card hover animation issue
docs: update installation instructions
```

### Branch Naming

- `feature/description` for new features
- `fix/description` for bug fixes
- `docs/description` for documentation updates
- `refactor/description` for code refactoring

## 🧪 Testing

Currently, the project doesn't have automated tests, but we encourage:

1. **Manual testing** of all functionality
2. **Cross-browser testing** (Chrome, Firefox, Safari, Edge)
3. **Responsive testing** on different screen sizes
4. **Accessibility testing** with screen readers

## 📋 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow existing patterns and conventions
   - Test your changes thoroughly

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

### Pull Request Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review of the code has been performed
- [ ] Code is properly commented, particularly in hard-to-understand areas
- [ ] Changes have been tested locally
- [ ] No new warnings or errors are introduced
- [ ] Documentation has been updated if necessary

## 🐛 Bug Reports

When filing a bug report, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Screenshots** if applicable
5. **Environment details** (browser, OS, device)
6. **Console errors** if any

Use the bug report template:

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. Windows 10, macOS Big Sur]
- Browser: [e.g. Chrome 91, Firefox 89]
- Device: [e.g. Desktop, iPhone 12]

**Additional context**
Add any other context about the problem here.
```

## 💡 Feature Requests

For feature requests, please:

1. **Check existing issues** to avoid duplicates
2. **Provide clear use case** and rationale
3. **Include mockups** or examples if helpful
4. **Consider implementation complexity**

## 🎨 Design Guidelines

### Color Palette
- Primary: Gradient from cyan (#00f5ff) to pink (#ff6b9d) to purple (#c471f5)
- Background: Dark navy gradients for dark mode, light gray for light mode
- Text: High contrast ratios for accessibility

### Typography
- Use Material-UI typography variants
- Maintain consistent font weights and sizes
- Ensure readability across all devices

### Animations
- Smooth transitions (0.3s cubic-bezier)
- Hover effects for interactive elements
- Loading animations for better UX

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [Vite Documentation](https://vitejs.dev/guide)

## 🤝 Community

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Provide constructive feedback

## 📞 Questions?

If you have questions about contributing, feel free to:
- Open an issue with the "question" label
- Start a discussion in the repository
- Reach out to the maintainers

Thank you for contributing to Simple Blog UI! 🎉