# Production-Ready Application Setup Skill

**Description**: Rapidly set up production-ready React/Vite applications with best practices, security, and comprehensive utilities

**Created**: May 7, 2026  
**Version**: 1.0.0  
**Status**: Active

## Overview

This skill automates the creation of production-ready applications with:
- Professional error handling and logging
- Security utilities and validations
- Common UI components
- Reusable hooks and services
- Complete documentation
- Database integration support
- Environment configuration
- API client with interceptors

## When to Use This Skill

Use this skill when:
- Creating a new React/Vite project
- Enhancing an existing project with production features
- Setting up error handling and logging
- Adding security features
- Creating admin dashboards
- Setting up database integration
- Documenting complex systems
- Preparing for production deployment

## Do NOT Use This Skill

- For simple, one-off scripts
- For non-React/JavaScript projects
- For minor bug fixes
- For single file edits

## Execution Steps

### 1. Project Analysis (5 min)
```
Tool: file_search, list_dir, read_file
Purpose: Understand current project structure
Output: Gap analysis, missing files list
```

### 2. Directory Setup (2 min)
```
Tool: create_directory
Purpose: Create organized folder structure
Create:
  - /src/components/common
  - /src/hooks
  - /src/middleware
  - /src/utils/constants
  - /PROJECT_DATA
```

### 3. Core Utilities (15 min)
```
Tool: create_file
Create:
  - Error handling: ErrorBoundary.jsx
  - Logging: logger.js
  - API: apiClient.js
  - Validation: formValidation.js
  - Security: securityUtils.js
  - Storage: storageUtils.js
  - Helpers: helpers.js
  - Config: appConfig.js, constants
```

### 4. UI Components (10 min)
```
Tool: create_file
Create:
  - LoadingSpinner.jsx
  - Modal.jsx
  - Toast.jsx
```

### 5. Hooks & Middleware (5 min)
```
Tool: create_file
Create:
  - useAsync.js
  - useFetch.js
  - authMiddleware.js
```

### 6. Configuration Files (5 min)
```
Tool: create_file
Create:
  - .env.example
  - .env.production
```

### 7. Documentation (20 min)
```
Tool: create_file
Create:
  - ARCHITECTURE.md
  - API_DOCUMENTATION.md
  - DEPLOYMENT_GUIDE.md
  - DEVELOPMENT_GUIDE.md
  - PRODUCTION_CHECKLIST.md
  - PROGRESS_REPORT.md
```

### 8. Integration (10 min)
```
Tool: replace_string_in_file
Actions:
  - Import ErrorBoundary in App.jsx
  - Import and wrap with ErrorBoundary
  - Import custom hooks in components
  - Update environment config
```

### 9. Verification (5 min)
```
Tool: get_errors
Purpose: Verify no compilation errors
Tool: run_in_terminal
Purpose: Test build and dev server
```

## File Templates

### Core Files to Create

1. **ErrorBoundary.jsx**
   - Global error handling
   - User feedback UI
   - Development error details

2. **logger.js**
   - Structured logging
   - Log levels (ERROR, WARN, INFO, DEBUG)
   - Integration points for tracking services

3. **apiClient.js**
   - Axios configuration
   - Request/response interceptors
   - Error handling
   - Token management

4. **formValidation.js**
   - Email, password, phone validators
   - Custom validators
   - Form validation utility

5. **securityUtils.js**
   - XSS protection
   - CSRF tokens
   - Rate limiting
   - Safe URL validation

6. **storageUtils.js**
   - Safe localStorage wrapper
   - User, cart, theme storage
   - Error handling

7. **UI Components**
   - LoadingSpinner (sizes: sm, md, lg, xl)
   - Modal (types: default, danger, success)
   - Toast (types: success, error, warning, info)

8. **Hooks**
   - useAsync: Async operations management
   - useFetch: Data fetching with caching

## Documentation Files

### Essential Docs

1. **ARCHITECTURE.md** (2000+ words)
   - Project structure diagram
   - Data flow architecture
   - Technology stack
   - Design patterns
   - Database schema
   - Monitoring setup

2. **API_DOCUMENTATION.md** (1500+ words)
   - Base URL and auth
   - Response formats
   - All endpoints documented
   - Error codes
   - Rate limiting
   - Examples

3. **DEPLOYMENT_GUIDE.md** (1200+ words)
   - Environment setup
   - Development server
   - Build process
   - Deployment options (CloudFlare, Vercel, Docker)
   - Database setup
   - Security hardening
   - Monitoring

4. **DEVELOPMENT_GUIDE.md** (1000+ words)
   - Quick start
   - Code style guide
   - Development workflow
   - Common tasks
   - Git workflow
   - Debugging tips

5. **PRODUCTION_CHECKLIST.md**
   - Security checklist
   - Performance checklist
   - Testing checklist
   - Deployment checklist
   - Monitoring checklist
   - Post-launch checklist

6. **PROGRESS_REPORT.md**
   - Summary of work done
   - All files created
   - Features implemented
   - Metrics and status
   - Next steps

## Configuration Files

### .env.example
```
VITE_APP_NAME=Your App
VITE_APP_ENV=development
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_API_BASE_URL=
VITE_API_TIMEOUT=30000
```

### appConstants.js
```javascript
APP_NAME, APP_VERSION
API_ENDPOINTS
ROUTES
USER_ROLES
ORDER_STATUS
PAYMENT_STATUS
STORAGE_KEYS
HTTP_STATUS
TOAST_DURATION
```

### appConfig.js
```javascript
Environment-specific configuration
Supabase settings
API settings
Feature flags
Storage settings
```

## Utility Functions

### Logger Utility
- error(), warn(), info(), debug()
- Structured logging
- Ready for Sentry/LogRocket integration

### Form Validators
- email, phone, password
- required, minLength, maxLength
- url validation
- Custom validators

### Helper Functions
- formatCurrency, formatDate
- truncateText, debounce, throttle
- deepClone, isEmpty, groupBy
- sortBy, filterBy, selectKeys
- calculateTotal, generateId
- retryAsync with exponential backoff

### Security Utils
- sanitizeInput, sanitizeHTML
- isSafeURL, generateCSRFToken
- validateCSRFToken, createRateLimiter

### Storage Utils
- Safe localStorage wrapper
- User storage helpers
- Cart storage helpers
- Theme storage helpers

## Integration Checklist

After skill execution:

- [ ] Verify no console errors
- [ ] Test error boundary with intentional error
- [ ] Verify logger output
- [ ] Test API client with test request
- [ ] Run form validators on test data
- [ ] Test localStorage functions
- [ ] Verify build completes
- [ ] Review all documentation
- [ ] Update package.json if needed
- [ ] Test in production build

## Common Customizations

### Add Custom Logger Integration
```javascript
// In logger.js, add:
if (window.__LOG_SERVICE__) {
  window.__LOG_SERVICE__.captureException(error)
}
```

### Add Custom Validators
```javascript
// In formValidation.js, add:
export const validators = {
  customRule: (value) => { ... }
}
```

### Add Custom Hooks
```javascript
// Create src/hooks/useYourHook.js
// Follow useAsync and useFetch patterns
```

### Add Custom Components
```javascript
// Create src/components/common/YourComponent.jsx
// Use Tailwind for styling
// Add prop documentation
```

## Troubleshooting

### Import Errors
```
Check file paths are relative from component location
Verify file extensions (.js, .jsx)
Check for typos in import names
```

### Build Errors
```
Clear node_modules and rebuild
Verify all required dependencies installed
Check for syntax errors in new files
Review error boundary doesn't wrap itself
```

### Runtime Errors
```
Check ErrorBoundary wraps App
Verify logger calls in try-catch
Check API client interceptors
Review component prop types
```

## Estimated Execution Time

- **Quick Setup**: 30 minutes (basic utilities only)
- **Standard Setup**: 60 minutes (all utilities + docs)
- **Full Setup**: 90 minutes (everything + integration + testing)

## Expected Outcomes

After this skill execution, you'll have:

✅ Professional error handling  
✅ Structured logging system  
✅ API client with interceptors  
✅ Form validation utilities  
✅ Security utilities  
✅ Reusable UI components  
✅ Custom hooks  
✅ Comprehensive documentation  
✅ Configuration management  
✅ Production-ready code  

## Tools Used

- `create_file`: Create utility files
- `create_directory`: Create folder structure
- `read_file`: Analyze existing code
- `file_search`: Find files
- `replace_string_in_file`: Update imports
- `get_errors`: Verify code quality
- `run_in_terminal`: Test execution
- `list_dir`: Explore structure

## Success Criteria

✅ Zero compilation errors  
✅ No console warnings  
✅ All imports resolve  
✅ Documentation complete  
✅ ErrorBoundary functional  
✅ Logger working  
✅ API client operational  
✅ Components renderable  
✅ Build succeeds  
✅ Dev server runs  

## Version History

### v1.0.0 (May 7, 2026)
- Initial skill creation
- 17 core files
- 6 documentation files
- 100% coverage for production features
- Ready for production deployment

## Related Skills

- `agent-customization` - For creating .instructions.md files
- `fix-customization-evaluation-diagnostics` - For fixing diagnostics

## References

- ARCHITECTURE.md - System design
- API_DOCUMENTATION.md - API details
- DEPLOYMENT_GUIDE.md - Deploy instructions
- DEVELOPMENT_GUIDE.md - Dev workflow
- PRODUCTION_CHECKLIST.md - Launch items

## Contact & Support

For questions about this skill:
- Review ARCHITECTURE.md for system design
- Check DEVELOPMENT_GUIDE.md for code patterns
- See PRODUCTION_CHECKLIST.md for completeness
- Refer to examples in skill execution

---

**Last Updated**: May 7, 2026  
**Skill Maturity**: Production Ready  
**Maintenance Status**: Active
