import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { ApiErrors, ApiSuccess, validateRequestBody, safeJsonParse, logApiRequest } from '@/lib/api-utils';
import { Resend } from 'resend';

// Initialize Resend (will be undefined if API key not provided)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded ? (forwarded.split(',')[0] || 'unknown') : realIp || 'unknown';
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per 15 minutes

  const current = rateLimitStore.get(key);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ip = getRateLimitKey(request);
  
  try {
    // Log incoming request
    logApiRequest('POST', '/api/contact', ip, request.headers.get('user-agent') || undefined);

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return ApiErrors.RateLimited();
    }

    // Parse and validate request body
    const jsonResult = await safeJsonParse(request);
    if (!jsonResult.success) {
      return jsonResult.error;
    }

    const validationResult = validateRequestBody(jsonResult.data, contactFormSchema);
    if (!validationResult.success) {
      return validationResult.error;
    }

    const validatedData = validationResult.data;

    // Enhanced spam detection
    const spamKeywords = [
      'viagra', 'casino', 'lottery', 'bitcoin', 'crypto', 'investment',
      'loan', 'credit', 'debt', 'money', 'profit', 'earn', 'rich',
      'free money', 'click here', 'limited time', 'act now'
    ];
    const content = `${validatedData.projectPurpose} ${validatedData.additionalInfo || ''}`.toLowerCase();
    const hasSpam = spamKeywords.some(keyword => content.includes(keyword));
    
    // Additional spam checks
    const hasExcessiveLinks = (content.match(/https?:\/\//g) || []).length > 2;
    const hasExcessiveCaps = content.replace(/[^A-Z]/g, '').length > content.length * 0.3;
    const hasRepeatedChars = /(.)\1{4,}/.test(content);
    
    if (hasSpam || hasExcessiveLinks || hasExcessiveCaps || hasRepeatedChars) {
      return ApiErrors.SpamDetected();
    }

    // Log the submission (in production, save to database)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      name: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      package: validatedData.preferredPackage,
      budget: validatedData.budget,
      timeline: validatedData.timeline,
      projectPurpose: validatedData.projectPurpose.substring(0, 100) + '...',
    });

    // Send email notifications
    try {
      await sendEmailNotifications(validatedData);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue with success response even if email fails
      // In production, you might want to queue this for retry
    }

    const contactId = `contact_${Date.now()}`;
    return ApiSuccess.FormSubmitted(contactId);

  } catch (error) {
    console.error('Contact form error:', error);
    return ApiErrors.InternalError();
  }
}

async function sendEmailNotifications(data: ContactFormData) {
  if (!resend) {
    console.log('Resend not configured, skipping email sending');
    return;
  }

  const businessEmail = process.env.BUSINESS_EMAIL || 'your-email@example.com';
  const fromEmail = process.env.FROM_EMAIL || 'noreply@yourdomain.com';

  try {
    // Send notification to business owner
    await resend.emails.send({
      from: fromEmail,
      to: businessEmail,
      subject: `New Landing Page Inquiry from ${data.fullName}`,
      html: generateBusinessNotificationEmail(data),
    });

    // Send auto-reply to customer
    await resend.emails.send({
      from: fromEmail,
      to: data.email,
      subject: 'Thank you for your landing page inquiry',
      html: generateCustomerAutoReplyEmail(data),
    });

    console.log('Email notifications sent successfully');
  } catch (error) {
    console.error('Failed to send email notifications:', error);
    throw error;
  }
}

// Helper functions for email templates
function generateBusinessNotificationEmail(data: ContactFormData): string {
  return `
    <h2>New Landing Page Inquiry</h2>
    <p><strong>Name:</strong> ${data.fullName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    <p><strong>Preferred Package:</strong> ${data.preferredPackage || 'Not specified'}</p>
    <p><strong>Budget:</strong> ${data.budget || 'Not specified'}</p>
    <p><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</p>
    <p><strong>Project Purpose:</strong></p>
    <p>${data.projectPurpose}</p>
    ${data.additionalInfo ? `<p><strong>Additional Info:</strong></p><p>${data.additionalInfo}</p>` : ''}
  `;
}

function generateCustomerAutoReplyEmail(data: ContactFormData): string {
  return `
    <h2>Thank you for your inquiry, ${data.fullName}!</h2>
    <p>I've received your landing page project details and will review them carefully.</p>
    <p>You can expect to hear back from me within 24 hours with:</p>
    <ul>
      <li>Initial thoughts on your project</li>
      <li>Clarifying questions if needed</li>
      <li>Next steps for moving forward</li>
    </ul>
    <p>If you have any urgent questions, feel free to contact me directly via WhatsApp or phone.</p>
    <p>Best regards,<br>Your Landing Page Developer</p>
  `;
}

export async function GET() {
  return ApiSuccess.HealthCheck('Contact API endpoint is working');
}