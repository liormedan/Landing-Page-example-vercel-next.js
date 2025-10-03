import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\u0590-\u05FF\s]+$/, 'Name can only contain letters and spaces'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  
  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // Optional field
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return phoneRegex.test(val.replace(/[\s\-\(\)]/g, ''));
    }, 'Please enter a valid phone number'),
  
  projectPurpose: z
    .string()
    .min(10, 'Please provide at least 10 characters describing your project')
    .max(1000, 'Description must be less than 1000 characters'),
  
  additionalInfo: z
    .string()
    .max(2000, 'Additional information must be less than 2000 characters')
    .optional(),
  
  preferredPackage: z
    .enum(['basic', 'recommended', 'premium'])
    .optional(),
  
  budget: z
    .string()
    .optional(),
  
  timeline: z
    .string()
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Form submission states
export interface FormSubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}