# Architecture Documentation

## Project Structure

```
rapid-stores-platform/
├── PROJECT_DATA/              # Project documentation and reference
│   ├── PRODUCTION_CHECKLIST.md
│   ├── ARCHITECTURE.md
│   ├── API_DOCUMENTATION.md
│   └── DEPLOYMENT_GUIDE.md
├── src/
│   ├── components/            # Reusable React components
│   │   ├── common/           # Common UI components
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Toast.jsx
│   │   ├── ErrorBoundary.jsx # Global error handler
│   │   ├── Header.jsx
│   │   └── ProductCard.jsx
│   ├── pages/                # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── Profile.jsx
│   │   └── admin-dashboard/
│   ├── services/             # API and service layer
│   │   ├── supabase.js
│   │   ├── payment.js
│   │   └── whatsapp.js
│   ├── hooks/                # Custom React hooks
│   │   ├── useAsync.js
│   │   └── useFetch.js
│   ├── middleware/           # Middleware functions
│   │   └── authMiddleware.js
│   ├── context/              # React Context
│   │   └── CartContext.jsx
│   ├── utils/                # Utility functions
│   │   ├── constants/        # App constants
│   │   ├── logger.js         # Logging utility
│   │   ├── apiClient.js      # API client with interceptors
│   │   ├── formValidation.js # Form validation
│   │   ├── securityUtils.js  # Security functions
│   │   ├── storageUtils.js   # Local storage helpers
│   │   ├── helpers.js        # Common helpers
│   │   ├── testSupabase.js
│   │   └── verifySupabase.js
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   ├── index.css             # Global styles
│   └── config.js             # Configuration
├── public/                   # Static assets
├── .env.example              # Environment variables template
├── .env.production           # Production environment
├── tailwind.config.js        # Tailwind CSS config
├── vite.config.js            # Vite config
├── package.json              # Dependencies
└── README.md                 # Project overview
```

## Data Flow Architecture

### Frontend Flow
```
User Interaction
    ↓
Component/Hook
    ↓
Context/State Management
    ↓
Service Layer (supabase.js, payment.js)
    ↓
API Client (apiClient.js with interceptors)
    ↓
Supabase/External APIs
    ↓
Response Handling (Toast, Logger)
    ↓
UI Update
```

### Error Handling Flow
```
Error Occurs
    ↓
Try-Catch Block
    ↓
Logger.error()
    ↓
Error Boundary (if React error)
    ↓
User Feedback (Toast notification)
    ↓
Error Tracking (Sentry, LogRocket)
```

## Technology Stack

### Frontend
- **React 19.2.5** - UI library
- **React Router 7.15.0** - Routing
- **Vite 8.0.10** - Build tool
- **Tailwind CSS 3.4.19** - Styling

### Backend/Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Supabase Storage** - File storage

### External Services
- **Supabase Auth** - Authentication
- **Mobile Money APIs** - Payment processing
- **WhatsApp Business API** - Communication

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Babel** - JavaScript compiler
- **Wrangler** - Cloudflare deployment

## Component Hierarchy

```
App
├── ErrorBoundary
│   ├── Header
│   └── Routes
│       ├── Home
│       │   └── ProductCard (Featured)
│       ├── Products
│       │   └── ProductCard (Grid)
│       ├── Cart
│       ├── Profile
│       ├── AdminDashboard
│       ├── Manufacturing
│       └── ...
└── Global Context
    └── CartProvider
```

## State Management

### Local State
- Component-level state using `useState`
- Form state in individual components

### Global State
- **Cart State** - CartContext for cart items
- **User State** - Auth state (to be implemented)

### Server State
- **Database State** - Supabase (products, users, orders, etc.)

## Authentication Flow (To Be Implemented)

```
1. User visits /login
2. User enters credentials
3. Request to Supabase Auth
4. JWT token received
5. Token stored in secure storage
6. Token sent in Authorization header for API calls
7. Token refresh on expiry
8. Logout clears token
```

## Key Design Patterns

### 1. Custom Hooks
- `useAsync` - Handle async operations
- `useFetch` - Fetch data from API

### 2. HOC (Higher Order Components)
- `withAuth` - Protect routes (to be implemented)
- `withErrorBoundary` - Wrap components with error handling

### 3. Render Props
- Used in complex component logic

### 4. Context API
- Manage global state (Cart, Auth)

### 5. Service Layer
- Centralize API calls
- Handle business logic
- Provide reusable services

## Performance Optimization

### Code Splitting
```javascript
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
```

### Lazy Loading
- Images with `loading="lazy"`
- Components with React.lazy()

### Caching
- HTTP cache headers
- Browser cache
- Service workers (to be implemented)

### Bundle Size
- Tree-shaking unused code
- Dynamic imports
- Asset optimization

## Security Best Practices

1. **Input Validation** - All user inputs validated
2. **XSS Protection** - Sanitization of HTML
3. **CSRF Protection** - Token-based protection
4. **CORS** - Properly configured
5. **HTTPS** - All connections encrypted
6. **Environment Variables** - Sensitive data in .env
7. **Rate Limiting** - Prevent abuse
8. **RLS Policies** - Database-level access control
9. **Error Handling** - Don't expose sensitive info
10. **Logging** - Audit trail of actions

## API Documentation

### Base URL
```
Production: https://api.rapidstores.com/api
Development: http://localhost:3000/api
```

### Authentication
```
Header: Authorization: Bearer <JWT_TOKEN>
```

### Common Endpoints
- `GET /products` - List products
- `GET /categories` - List categories
- `GET /users/:id` - Get user profile
- `POST /orders` - Create order
- `GET /orders/:id` - Get order details

## Database Schema

### Key Tables
1. **users** - User profiles
2. **products** - Product catalog
3. **categories** - Product categories
4. **orders** - Customer orders
5. **order_items** - Items in orders
6. **payments** - Payment records
7. **vouchers** - Discount codes
8. **manufacturing_orders** - Custom orders

## Deployment Architecture

```
GitHub Repository
    ↓
CI/CD Pipeline (GitHub Actions / CloudFlare)
    ↓
Build & Test
    ↓
Deploy to Staging
    ↓
Run Tests
    ↓
Deploy to Production
    ↓
Monitor Performance
```

## Monitoring & Observability

### Logging
- Application logs via logger.js
- API request/response logs
- Error tracking (Sentry)

### Metrics
- Page load time
- API response time
- Error rate
- User engagement

### Alerts
- Critical error notifications
- Performance degradation alerts
- Uptime monitoring
