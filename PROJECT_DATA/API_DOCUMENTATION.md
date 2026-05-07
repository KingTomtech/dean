# API Documentation

## Base Configuration

```
Production URL: https://api.rapidstores.com/api
Development URL: http://localhost:3000/api
API Version: v1
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>",
  "Content-Type": "application/json"
}
```

## Response Format

All API responses follow this format:

### Success Response (200-201)
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### Error Response (4xx-5xx)
```json
{
  "success": false,
  "error": "Error code",
  "message": "Human-readable error message",
  "details": { /* additional error info */ }
}
```

## Endpoints

### Products

#### List All Products
```
GET /products
Query Parameters:
  - category: string (filter by category)
  - page: number (default: 1)
  - limit: number (default: 20)
  - sort: string (price_asc, price_desc, newest)

Response: {
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "price_zmw": number,
      "stock_qty": number,
      "category": "string",
      "image_url": "string",
      "created_at": "timestamp"
    }
  ],
  "total": number,
  "page": number,
  "limit": number
}
```

#### Get Product Details
```
GET /products/:id

Response: {
  "id": "uuid",
  "name": "string",
  "description": "string",
  "price_zmw": number,
  "stock_qty": number,
  "category": "string",
  "image_url": "string",
  "specifications": "object",
  "reviews": [array],
  "created_at": "timestamp"
}
```

#### Create Product (Admin)
```
POST /products
Headers: {
  "Authorization": "Bearer <ADMIN_TOKEN>"
}
Body: {
  "name": "string",
  "description": "string",
  "price_zmw": number,
  "category_id": "uuid",
  "stock_qty": number,
  "specifications": "object"
}

Response: {
  "id": "uuid",
  "name": "string",
  ...created product data
}
```

#### Update Product (Admin)
```
PUT /products/:id
Headers: {
  "Authorization": "Bearer <ADMIN_TOKEN>"
}
Body: {
  "name": "string",
  "description": "string",
  "price_zmw": number,
  "stock_qty": number
}

Response: {...updated product data}
```

#### Delete Product (Admin)
```
DELETE /products/:id
Headers: {
  "Authorization": "Bearer <ADMIN_TOKEN>"
}

Response: {
  "success": true,
  "message": "Product deleted"
}
```

### Categories

#### List Categories
```
GET /categories

Response: {
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "product_count": number,
      "icon_url": "string"
    }
  ]
}
```

### Orders

#### Create Order
```
POST /orders
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>"
}
Body: {
  "items": [
    {
      "product_id": "uuid",
      "quantity": number,
      "price": number
    }
  ],
  "shipping_address": {
    "street": "string",
    "city": "string",
    "postal_code": "string"
  },
  "payment_method": "string"
}

Response: {
  "id": "uuid",
  "order_number": "ORD-xxx",
  "status": "pending",
  "total": number,
  "created_at": "timestamp"
}
```

#### Get Order Details
```
GET /orders/:id
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>"
}

Response: {
  "id": "uuid",
  "order_number": "string",
  "status": "string",
  "items": [array],
  "total": number,
  "created_at": "timestamp"
}
```

#### List User Orders
```
GET /orders?user_id=uuid
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>"
}

Response: {
  "data": [array of orders],
  "total": number
}
```

#### Update Order Status (Admin)
```
PUT /orders/:id/status
Headers: {
  "Authorization": "Bearer <ADMIN_TOKEN>"
}
Body: {
  "status": "processing|shipped|delivered|cancelled"
}

Response: {...updated order data}
```

### Users

#### Get User Profile
```
GET /users/:id
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>"
}

Response: {
  "id": "uuid",
  "full_name": "string",
  "phone": "string",
  "email": "string",
  "role": "customer|admin",
  "created_at": "timestamp"
}
```

#### Update User Profile
```
PUT /users/:id
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>"
}
Body: {
  "full_name": "string",
  "email": "string",
  "phone": "string"
}

Response: {...updated user data}
```

#### List Users (Admin)
```
GET /users
Headers: {
  "Authorization": "Bearer <ADMIN_TOKEN>"
}
Query Parameters:
  - role: customer|admin
  - page: number
  - limit: number

Response: {
  "data": [array of users],
  "total": number
}
```

### Payments

#### Create Payment
```
POST /payments
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>"
}
Body: {
  "order_id": "uuid",
  "amount": number,
  "method": "mtn_momo|airtel_money|etc"
}

Response: {
  "id": "uuid",
  "reference": "string",
  "status": "pending",
  "amount": number
}
```

#### Check Payment Status
```
GET /payments/:id
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>"
}

Response: {
  "id": "uuid",
  "status": "completed|failed|pending",
  "amount": number,
  "reference": "string"
}
```

### Uploads

#### Upload File
```
POST /uploads
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>",
  "Content-Type": "multipart/form-data"
}
Body: FormData with file

Response: {
  "id": "uuid",
  "url": "string",
  "size": number,
  "type": "string"
}
```

## Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| `AUTH_REQUIRED` | 401 | Authentication required |
| `INVALID_TOKEN` | 401 | Invalid or expired token |
| `INSUFFICIENT_PERMISSIONS` | 403 | User doesn't have required permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Rate Limiting

```
Rate Limit: 100 requests per minute per user
Headers:
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1620000000

When exceeded: HTTP 429
```

## Pagination

All list endpoints support pagination:

```
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20, max: 100)

Response:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "pages": 25
  }
}
```

## Filtering & Sorting

### Filtering
```
GET /products?category=mattresses&price_min=100&price_max=1000
GET /orders?status=pending&user_id=uuid
```

### Sorting
```
GET /products?sort=price_asc
GET /orders?sort=created_at_desc
```

## Search

```
GET /products/search?q=foam mattress

Response: [array of matching products]
```

## WebHooks

Webhook events are sent to your registered endpoint:

```
POST https://your-domain.com/webhooks/events

Events:
- order.created
- order.status_changed
- payment.completed
- payment.failed
- product.updated
```

## SDKs & Client Libraries

### JavaScript
```javascript
import { RapidStoresAPI } from '@rapid-stores/sdk-js';

const client = new RapidStoresAPI({
  apiKey: 'your-api-key'
});

const products = await client.products.list();
```

## Testing

Use these test credentials for development:

```
Test Product ID: test-product-123
Test User ID: test-user-456
Test Payment Method: test-momo
```
