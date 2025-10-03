# Contact API Endpoint

This API endpoint handles contact form submissions for the landing page service website.

## Endpoint

- **URL**: `/api/contact`
- **Methods**: `GET`, `POST`

## Features

### Security & Spam Protection
- **Rate Limiting**: 5 requests per 15 minutes per IP address
- **Spam Detection**: Multiple layers of spam protection:
  - Keyword filtering (casino, bitcoin, etc.)
  - Excessive links detection (>2 links)
  - Excessive caps detection (>30% uppercase)
  - Repeated character detection (5+ consecutive characters)

### Email Notifications
- Sends notification to business owner
- Sends auto-reply confirmation to customer
- Uses Resend email service
- Graceful fallback if email service is unavailable

### Data Validation
- Server-side validation using Zod schema
- Hebrew character support in names
- Phone number format validation
- Character limits enforcement
- Required field validation

## Request Format

### POST `/api/contact`

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+972501234567", // Optional
  "projectPurpose": "I need a landing page for my business",
  "additionalInfo": "Some additional details", // Optional
  "preferredPackage": "recommended", // Optional: "basic" | "recommended" | "premium"
  "budget": "2000-5000", // Optional
  "timeline": "2-weeks" // Optional
}
```

## Response Format

### Success Response (200)
```json
{
  "message": "Form submitted successfully",
  "id": "contact_1234567890"
}
```

### Validation Error (400)
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    }
  ]
}
```

### Rate Limit Error (429)
```json
{
  "error": "Too many requests. Please try again later."
}
```

### Spam Detection Error (400)
```json
{
  "error": "Message flagged as spam."
}
```

### Server Error (500)
```json
{
  "error": "Internal server error"
}
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Required for email functionality
RESEND_API_KEY=your_resend_api_key_here
BUSINESS_EMAIL=your-business-email@example.com
FROM_EMAIL=noreply@yourdomain.com
```

## Testing

Run the test suite:

```bash
npm run test:run -- src/app/api/contact/__tests__/route.test.ts
```

The test suite covers:
- Form validation (all fields)
- Rate limiting functionality
- Spam detection (multiple types)
- Email sending (success and error cases)
- Error handling
- Hebrew character support
- Environment variable handling

## Rate Limiting

The endpoint implements a simple in-memory rate limiting system:
- **Window**: 15 minutes
- **Limit**: 5 requests per IP address
- **Storage**: In-memory Map (use Redis in production)

## Spam Protection

Multiple layers of spam detection:

1. **Keyword filtering**: Common spam terms
2. **Link detection**: More than 2 HTTP links
3. **Caps detection**: More than 30% uppercase characters
4. **Repeated characters**: 5+ consecutive identical characters

## Email Templates

The endpoint generates HTML email templates for:
- Business notification (new inquiry details)
- Customer auto-reply (confirmation and next steps)

## Production Considerations

1. **Rate Limiting**: Replace in-memory store with Redis
2. **Database**: Save submissions to database for tracking
3. **Monitoring**: Add error tracking (Sentry, etc.)
4. **Logging**: Implement structured logging
5. **Security**: Add CSRF protection if needed
6. **Backup**: Queue email sending for retry on failure