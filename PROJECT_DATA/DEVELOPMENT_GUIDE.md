# Development Guide

## Quick Start

### 1. Clone and Setup
```bash
git clone <repo>
cd rapid-stores-platform
npm install
cp .env.example .env.local
```

### 2. Configure Environment
Edit `.env.local`:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Start Development Server
```bash
npm run dev
```

## Project Structure

See ARCHITECTURE.md for detailed project structure

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/feature-name
```

### 2. Make Changes
- Follow code style guidelines
- Add comments for complex logic
- Create unit tests for utilities

### 3. Test Changes
```bash
npm run dev      # Test in browser
npm run build    # Test production build
npm run lint     # Check code quality
```

### 4. Commit and Push
```bash
git add .
git commit -m "feat: add feature description"
git push origin feature/feature-name
```

### 5. Create Pull Request
- Link related issues
- Add description
- Request review

## Code Style Guide

### Naming Conventions
- **Components**: PascalCase (e.g., `ProductCard.jsx`)
- **Functions**: camelCase (e.g., `fetchProducts()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_ITEMS`)
- **Files**: PascalCase for components, camelCase for utilities

### React Best Practices
```javascript
// ✓ Good
const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
  };

  return (
    <div className="product-card">
      {/* Component JSX */}
    </div>
  );
};

// ✗ Avoid
function Product(props) {
  // Props not destructured
  // No clear naming
}
```

### Imports Organization
```javascript
// 1. React imports
import React, { useState } from 'react';

// 2. Third-party imports
import axios from 'axios';

// 3. Local imports
import { supabase } from '../services/supabase';
import { logger } from '../utils/logger';

// 4. Styles
import './Component.css';
```

## Common Tasks

### Adding a New Page
1. Create file in `src/pages/YourPage.jsx`
2. Create component
3. Add route in `App.jsx`
4. Add navigation link in `Header.jsx`

### Adding a New Service
1. Create file in `src/services/yourService.js`
2. Export functions for API calls
3. Use `apiClient` for HTTP requests
4. Add error handling with `logger`

### Adding a New Hook
1. Create file in `src/hooks/useYourHook.js`
2. Export custom hook function
3. Add JSDoc comments
4. Test with multiple components

### Adding Global State
1. Create context in `src/context/YourContext.jsx`
2. Create provider component
3. Wrap App with provider in `main.jsx`
4. Use `useContext` hook in components

### Adding Utility Function
1. Create file in `src/utils/` or update existing
2. Add JSDoc comments
3. Export function
4. Add unit tests (TODO)

## Debugging Tips

### Using React DevTools
1. Install React DevTools browser extension
2. Inspect component tree
3. Check props and state
4. Profile performance

### Using Supabase Dashboard
1. Go to Supabase dashboard
2. View database in real-time
3. Check auth logs
4. Monitor API usage

### Using Logger
```javascript
import { logger } from '../utils/logger';

// In your code
logger.info('User logged in', { userId: user.id });
logger.error('Payment failed', { error: err });
logger.debug('Debug information', { data });
```

### Using Console in Browser
```javascript
// Check localStorage
console.log(localStorage.getItem('rapid_cart'));

// Check API responses
window.__LOG_SERVICE__ // Check if monitoring is enabled
```

## Performance Profiling

### Lighthouse
1. Open DevTools → Lighthouse
2. Run audit
3. Review suggestions
4. Implement improvements

### React Profiler
1. Open React DevTools
2. Go to Profiler tab
3. Record interactions
4. Analyze performance

## Testing (To Be Implemented)

### Unit Tests
```bash
npm run test -- src/utils/helpers.test.js
```

### E2E Tests
```bash
npm run test:e2e -- tests/flows.e2e.js
```

## Common Issues & Solutions

### Port Already in Use
```bash
# Find process using port 5176
lsof -i :5176

# Kill process
kill -9 <PID>
```

### Supabase Connection Error
1. Verify URL and key in .env.local
2. Check internet connection
3. Try in incognito mode
4. Clear browser cache

### Build Errors
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear build cache: `rm -rf dist`
3. Check Node version: `node --version`

### Hot Reload Not Working
1. Check if file saved
2. Check browser console for errors
3. Restart dev server

## Git Workflow

### Branch Naming
- Feature: `feature/short-description`
- Bug: `bug/short-description`
- Hotfix: `hotfix/short-description`
- Release: `release/version-number`

### Commit Messages
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: improve code structure
test: add tests
perf: improve performance
chore: update dependencies
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test the changes

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design checked
```

## Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com/docs)
- [Vite](https://vitejs.dev)

## Contact & Support

- Slack: #development
- Email: dev@rapidstores.com
- GitHub: Submit issues
