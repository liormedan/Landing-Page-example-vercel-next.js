// Contact Form Data Types
export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  projectPurpose: string;
  additionalInfo?: string;
  preferredPackage?: 'basic' | 'recommended' | 'premium';
  budget?: string;
  timeline?: string;
}

// Portfolio Item Types
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  results?: {
    metric: string;
    improvement: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  liveUrl?: string;
}

// FAQ Item Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// UI Component Props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

// Deliverables Types
export interface DeliverableItem {
  id: string;
  title: string;
  description: string;
  category: 'design' | 'development' | 'deployment' | 'optimization' | 'premium';
  included: boolean;
  icon: string;
  details?: string[];
  expandable?: boolean;
}

export interface DeliverableCategory {
  id: string;
  title: string;
  items: DeliverableItem[];
}
