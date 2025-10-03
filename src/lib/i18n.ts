/**
 * Internationalization utilities for Hebrew/English support
 */

export type Locale = 'en' | 'he';

export const locales: Locale[] = ['en', 'he'];

export const defaultLocale: Locale = 'he';

// Language names in their native script
export const languageNames: Record<Locale, string> = {
  en: 'English',
  he: 'עברית'
};

// RTL languages
export const rtlLocales: Locale[] = ['he'];

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

// Translation keys and content
export interface Translations {
  // Navigation
  nav: {
    home: string;
    benefits: string;
    pricing: string;
    portfolio: string;
    about: string;
    contact: string;
    getQuote: string;
  };

  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    description: string;
    benefits: {
      delivery: string;
      mobile: string;
      seo: string;
    };
    cta: {
      getQuote: string;
      viewPortfolio: string;
    };
    trustIndicator: string;
    badges: {
      sslSecured: string;
      fastDelivery: string;
      globalCdn: string;
    };
  };

  // Benefits Section
  benefits: {
    title: string;
    subtitle: string;
    items: {
      performance: {
        title: string;
        description: string;
      };
      responsive: {
        title: string;
        description: string;
      };
      seo: {
        title: string;
        description: string;
      };
      rtl: {
        title: string;
        description: string;
      };
      analytics: {
        title: string;
        description: string;
      };
      support: {
        title: string;
        description: string;
      };
    };
  };

  // Pricing Section
  pricing: {
    title: string;
    plans: {
      basic: {
        name: string;
        price: string;
        features: string[];
      };
      recommended: {
        name: string;
        price: string;
        features: string[];
        popular: string;
      };
      premium: {
        name: string;
        price: string;
        features: string[];
      };
    };
    choosePlan: string;
  };

  // Portfolio Section
  portfolio: {
    title: string;
    projectTitle: string;
    projectDescription: string;
    viewDetails: string;
    technologies: string;
  };

  // Contact Section
  contact: {
    title: string;
    subtitle: string;
    form: {
      projectDetails: string;
      fullName: string;
      email: string;
      phone: string;
      phoneHelper: string;
      projectPurpose: string;
      projectPurposePlaceholder: string;
      preferredPackage: string;
      budgetRange: string;
      timeline: string;
      additionalInfo: string;
      additionalInfoPlaceholder: string;
      submit: string;
      submitting: string;
    };
    directContact: {
      title: string;
      whatsapp: string;
      whatsappDesc: string;
      phone: string;
    };
    nextSteps: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
    };
    success: {
      title: string;
      message: string;
    };
    error: {
      title: string;
      message: string;
    };
  };

  // Process Section
  process: {
    title: string;
    subtitle: string;
    steps: {
      consultation: {
        title: string;
        description: string;
      };
      design: {
        title: string;
        description: string;
      };
      development: {
        title: string;
        description: string;
      };
      launch: {
        title: string;
        description: string;
      };
    };
  };

  // About Section
  about: {
    title: string;
    description: string;
    stats: {
      projects: string;
      clients: string;
      experience: string;
      satisfaction: string;
    };
  };

  // Add-ons Section
  addons: {
    title: string;
    subtitle: string;
    items: {
      abTesting: {
        title: string;
        description: string;
        features: string[];
      };
      crmIntegration: {
        title: string;
        description: string;
        features: string[];
        popular?: boolean;
      };
      copywriting: {
        title: string;
        description: string;
        features: string[];
      };
      animations: {
        title: string;
        description: string;
        features: string[];
      };
      premiumImages: {
        title: string;
        description: string;
        features: string[];
      };
      monthlySupport: {
        title: string;
        description: string;
        features: string[];
      };
    };
    getQuote: string;
    popular: string;
  };

  // Footer
  footer: {
    description: string;
    quickLinks: string;
    services: string;
    contact: string;
    rights: string;
  };

  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    required: string;
    optional: string;
    learnMore: string;
    getStarted: string;
    contactUs: string;
  };

  // Accessibility
  a11y: {
    skipToContent: string;
    skipToNavigation: string;
    skipToContact: string;
    openMenu: string;
    closeMenu: string;
    languageSelector: string;
    currentLanguage: string;
    themeSelector: string;
    currentTheme: string;
    lightMode: string;
    darkMode: string;
    systemMode: string;
  };
}

// English translations
export const en: Translations = {
  nav: {
    home: 'Home',
    benefits: 'Benefits',
    pricing: 'Pricing',
    portfolio: 'Portfolio',
    about: 'About',
    contact: 'Contact',
    getQuote: 'Get Quote'
  },

  hero: {
    title: 'Professional Landing Pages Built for Results',
    subtitle: 'Professional Landing Pages',
    description: 'Get a high-converting landing page built with React, Next.js, and deployed on Vercel. Fast delivery, RTL support, and performance optimization included.',
    benefits: {
      delivery: '5-day delivery',
      mobile: 'Mobile optimized',
      seo: 'SEO ready'
    },
    cta: {
      getQuote: 'Get Instant Quote',
      viewPortfolio: 'View Portfolio'
    },
    trustIndicator: '✨ Trusted by 50+ businesses • No setup fees • 30-day support included',
    badges: {
      sslSecured: 'SSL Secured',
      fastDelivery: 'Fast Delivery',
      globalCdn: 'Global CDN'
    }
  },

  benefits: {
    title: 'Why Choose Our Landing Page Service?',
    subtitle: 'Built with modern technology and best practices',
    items: {
      performance: {
        title: 'Lightning Fast Performance',
        description: 'Optimized for speed with Next.js and Vercel deployment'
      },
      responsive: {
        title: 'Mobile-First Design',
        description: 'Perfectly responsive across all devices and screen sizes'
      },
      seo: {
        title: 'SEO Optimized',
        description: 'Built-in SEO best practices for better search rankings'
      },
      rtl: {
        title: 'RTL Support',
        description: 'Full Hebrew and Arabic language support with RTL layout'
      },
      analytics: {
        title: 'Analytics Ready',
        description: 'Google Analytics integration for tracking performance'
      },
      support: {
        title: '30-Day Support',
        description: 'Free support and maintenance for the first month'
      }
    }
  },

  pricing: {
    title: 'Simple, Transparent Pricing',
    plans: {
      basic: {
        name: 'Basic',
        price: '₪1,900',
        features: ['Landing Page', 'Mobile Responsive', 'Basic SEO']
      },
      recommended: {
        name: 'Recommended',
        price: '₪3,200',
        features: ['Everything in Basic', 'Contact Forms', 'Analytics', 'RTL Support'],
        popular: 'Most Popular'
      },
      premium: {
        name: 'Premium',
        price: '₪5,400',
        features: ['Everything in Recommended', 'A/B Testing', 'CRM Integration', 'Premium Support']
      }
    },
    choosePlan: 'Choose Plan'
  },

  portfolio: {
    title: 'Our Work',
    projectTitle: 'Project',
    projectDescription: 'Professional landing page with modern design and optimized performance.',
    viewDetails: 'View Details →',
    technologies: 'Next.js • Vercel'
  },

  contact: {
    title: 'Ready to Get Started?',
    subtitle: "Let's discuss your project and create a landing page that converts visitors into customers. Fill out the form below or contact us directly.",
    form: {
      projectDetails: 'Project Details',
      fullName: 'Full Name *',
      email: 'Email *',
      phone: 'Phone Number (Optional)',
      phoneHelper: "We'll use this for WhatsApp or calls if needed",
      projectPurpose: 'Project Purpose *',
      projectPurposePlaceholder: 'Tell me about your business, target audience, and what you want to achieve with your landing page...',
      preferredPackage: 'Preferred Package (Optional)',
      budgetRange: 'Budget Range (Optional)',
      timeline: 'Timeline (Optional)',
      additionalInfo: 'Additional Information (Optional)',
      additionalInfoPlaceholder: 'Any specific requirements, design preferences, or questions you have...',
      submit: 'Send Project Details',
      submitting: 'Sending Message...'
    },
    directContact: {
      title: 'Prefer Direct Contact?',
      whatsapp: 'WhatsApp',
      whatsappDesc: 'Quick response',
      phone: 'Phone Call'
    },
    nextSteps: {
      title: 'What Happens Next?',
      step1: "I'll review your project details within 24 hours",
      step2: "We'll schedule a brief call to discuss your needs",
      step3: "You'll receive a detailed proposal and timeline"
    },
    success: {
      title: 'Message Sent Successfully!',
      message: "Thank you for your inquiry. I'll get back to you within 24 hours."
    },
    error: {
      title: 'Failed to Send Message',
      message: 'Failed to send message. Please try again or contact us directly.'
    }
  },

  process: {
    title: 'Our Process',
    subtitle: 'From concept to launch in 5 working days',
    steps: {
      consultation: {
        title: 'Consultation',
        description: 'We discuss your goals, target audience, and requirements'
      },
      design: {
        title: 'Design',
        description: 'Create wireframes and design mockups for your approval'
      },
      development: {
        title: 'Development',
        description: 'Build your landing page with modern technology'
      },
      launch: {
        title: 'Launch',
        description: 'Deploy to production and provide ongoing support'
      }
    }
  },

  about: {
    title: 'About Us',
    description: 'We specialize in creating high-converting landing pages using modern web technologies. Our focus is on performance, accessibility, and results.',
    stats: {
      projects: 'Projects Completed',
      clients: 'Happy Clients',
      experience: 'Years Experience',
      satisfaction: 'Client Satisfaction'
    }
  },

  // Add-ons Section
  addons: {
    title: 'Enhance Your Landing Page',
    subtitle: 'Take your landing page to the next level with our professional add-on services. Each service is designed to maximize your conversion potential.',
    items: {
      abTesting: {
        title: 'A/B Testing Setup',
        description: 'Optimize your conversion rates with professional A/B testing implementation and analytics tracking.',
        features: [
          'Multiple page variants',
          'Conversion tracking setup',
          'Statistical analysis tools',
          'Performance reporting'
        ]
      },
      crmIntegration: {
        title: 'CRM Integration',
        description: 'Seamlessly connect your landing page with your existing CRM system for automated lead management.',
        features: [
          'Popular CRM connections',
          'Automated lead capture',
          'Custom field mapping',
          'Real-time synchronization'
        ],
        popular: true
      },
      copywriting: {
        title: 'Advanced Copywriting',
        description: 'Professional copywriting services to craft compelling, conversion-focused content for your landing page.',
        features: [
          'Conversion-optimized copy',
          'Brand voice alignment',
          'Multiple revision rounds',
          'A/B testing variations'
        ]
      },
      animations: {
        title: 'Custom Animations',
        description: 'Enhance user experience with smooth, professional animations and micro-interactions.',
        features: [
          'Scroll-triggered animations',
          'Hover effects',
          'Loading transitions',
          'Mobile-optimized performance'
        ]
      },
      premiumImages: {
        title: 'Premium Images & Graphics',
        description: 'High-quality stock photos, custom graphics, and professional visual assets for your landing page.',
        features: [
          'Premium stock photo license',
          'Custom graphic design',
          'Brand-consistent visuals',
          'Optimized for web performance'
        ]
      },
      monthlySupport: {
        title: 'Monthly Support Package',
        description: 'Ongoing maintenance, updates, and optimization services to keep your landing page performing at its best.',
        features: [
          'Regular performance monitoring',
          'Content updates',
          'Security maintenance',
          'Priority support access'
        ]
      }
    },
    getQuote: 'Get Quote',
    popular: 'Popular'
  },

  footer: {
    description: 'Professional landing page development service using React, Next.js, and Vercel.',
    quickLinks: 'Quick Links',
    services: 'Services',
    contact: 'Contact',
    rights: 'All rights reserved.'
  },

  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    required: 'Required',
    optional: 'Optional',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    contactUs: 'Contact Us'
  },

  a11y: {
    skipToContent: 'Skip to main content',
    skipToNavigation: 'Skip to navigation',
    skipToContact: 'Skip to contact form',
    openMenu: 'Open main menu',
    closeMenu: 'Close main menu',
    languageSelector: 'Language selector',
    currentLanguage: 'Current language',
    themeSelector: 'Theme selector',
    currentTheme: 'Current theme',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    systemMode: 'System mode'
  }
};

// Hebrew translations
export const he: Translations = {
  nav: {
    home: 'בית',
    benefits: 'יתרונות',
    pricing: 'מחירים',
    portfolio: 'תיק עבודות',
    about: 'אודות',
    contact: 'צור קשר',
    getQuote: 'קבל הצעת מחיר'
  },

  hero: {
    title: 'דפי נחיתה מקצועיים שבנויים לתוצאות',
    subtitle: 'דפי נחיתה מקצועיים',
    description: 'קבלו דף נחיתה עם שיעור המרה גבוה שנבנה עם React, Next.js ונפרס על Vercel. משלוח מהיר, תמיכה מלאה בעברית ואופטימיזציה לביצועים כלולים.',
    benefits: {
      delivery: 'משלוח תוך 5 ימים',
      mobile: 'מותאם לנייד',
      seo: 'מוכן לקידום'
    },
    cta: {
      getQuote: 'קבל הצעת מחיר מיידית',
      viewPortfolio: 'צפה בתיק העבודות'
    },
    trustIndicator: '✨ מהימן על ידי 50+ עסקים • ללא עלויות התקנה • תמיכה למשך 30 יום כלולה',
    badges: {
      sslSecured: 'מאובטח SSL',
      fastDelivery: 'משלוח מהיר',
      globalCdn: 'CDN גלובלי'
    }
  },

  benefits: {
    title: 'למה לבחור בשירות דפי הנחיתה שלנו?',
    subtitle: 'נבנה עם טכנולוגיה מודרנית ושיטות עבודה מתקדמות המותאמות לשוק הישראלי',
    items: {
      performance: {
        title: 'ביצועים מהירים כברק',
        description: 'דפי נחיתה מהירים במיוחד עם Next.js ופריסה על Vercel - זמן טעינה מתחת ל-2.5 שניות'
      },
      responsive: {
        title: 'עיצוב רספונסיבי מושלם',
        description: 'נראה מושלם בכל המכשירים - מובייל, טאבלט ומחשב, עם התאמה מיוחדת לשוק הישראלי'
      },
      seo: {
        title: 'קידום אתרים מתקדם',
        description: 'אופטימיזציה מלאה למנועי חיפוש עם מטא תגים בעברית, Schema markup ותוכן מותאם'
      },
      rtl: {
        title: 'תמיכה מלאה בעברית',
        description: 'פריסת RTL מושלמת, גופנים עבריים מותאמים ותמיכה בכל הפונקציות בעברית'
      },
      analytics: {
        title: 'מעקב ואנליטיקס מתקדם',
        description: 'אינטגרציה מלאה עם Google Analytics, Facebook Pixel ומערכות מעקב נוספות'
      },
      support: {
        title: 'תמיכה אישית למשך 30 יום',
        description: 'תמיכה טכנית מלאה, עדכונים ותחזוקה חינם לחודש הראשון + הדרכה אישית'
      }
    }
  },

  pricing: {
    title: 'תמחור פשוט ושקוף',
    plans: {
      basic: {
        name: 'בסיסי',
        price: '₪1,900',
        features: ['דף נחיתה', 'רספונסיבי לנייד', 'קידום בסיסי']
      },
      recommended: {
        name: 'מומלץ',
        price: '₪3,200',
        features: ['הכל מהבסיסי', 'טפסי יצירת קשר', 'אנליטיקס', 'תמיכה ב-RTL'],
        popular: 'הכי פופולרי'
      },
      premium: {
        name: 'פרימיום',
        price: '₪5,400',
        features: ['הכל מהמומלץ', 'בדיקות A/B', 'אינטגרציה עם CRM', 'תמיכה פרימיום']
      }
    },
    choosePlan: 'בחר תוכנית'
  },

  portfolio: {
    title: 'העבודות שלנו',
    projectTitle: 'פרויקט',
    projectDescription: 'דף נחיתה מקצועי עם עיצוב מודרני וביצועים מותאמים.',
    viewDetails: 'צפה בפרטים ←',
    technologies: 'Next.js • Vercel'
  },

  contact: {
    title: 'מוכנים להתחיל?',
    subtitle: 'בואו נדבר על הפרויקט שלכם וניצור דף נחיתה שהופך מבקרים ללקוחות. מלאו את הטופס למטה או צרו קשר ישירות.',
    form: {
      projectDetails: 'פרטי הפרויקט',
      fullName: 'שם מלא *',
      email: 'אימייל *',
      phone: 'מספר טלפון (אופציונלי)',
      phoneHelper: 'נשתמש בזה לוואטסאפ או שיחות במידת הצורך',
      projectPurpose: 'מטרת הפרויקט *',
      projectPurposePlaceholder: 'ספרו לי על העסק שלכם, קהל היעד, ומה אתם רוצים להשיג עם דף הנחיתה...',
      preferredPackage: 'חבילה מועדפת (אופציונלי)',
      budgetRange: 'טווח תקציב (אופציונלי)',
      timeline: 'לוח זמנים (אופציונלי)',
      additionalInfo: 'מידע נוסף (אופציונלי)',
      additionalInfoPlaceholder: 'דרישות ספציפיות, העדפות עיצוב או שאלות שיש לכם...',
      submit: 'שלח פרטי פרויקט',
      submitting: 'שולח הודעה...'
    },
    directContact: {
      title: 'מעדיפים יצירת קשר ישירה?',
      whatsapp: 'וואטסאפ',
      whatsappDesc: 'מענה מהיר',
      phone: 'שיחת טלפון'
    },
    nextSteps: {
      title: 'מה קורה הלאה?',
      step1: 'אסקור את פרטי הפרויקט שלכם תוך 24 שעות',
      step2: 'נקבע שיחה קצרה כדי לדבר על הצרכים שלכם',
      step3: 'תקבלו הצעה מפורטת ולוח זמנים'
    },
    success: {
      title: 'ההודעה נשלחה בהצלחה!',
      message: 'תודה על הפנייה. אחזור אליכם תוך 24 שעות.'
    },
    error: {
      title: 'שליחת ההודעה נכשלה',
      message: 'שליחת ההודעה נכשלה. אנא נסו שוב או צרו קשר ישירות.'
    }
  },

  process: {
    title: 'התהליך שלנו',
    subtitle: 'מרעיון להשקה תוך 5 ימי עבודה - תהליך מהיר ויעיל',
    steps: {
      consultation: {
        title: 'ייעוץ ותכנון',
        description: 'פגישת ייעוץ מעמיקה להבנת המטרות, קהל היעד, המסרים והדרישות הטכניות'
      },
      design: {
        title: 'עיצוב ו-UX',
        description: 'יצירת wireframes, עיצוב ויזואלי ו-UX מותאם לקהל הישראלי עם דגש על המרות'
      },
      development: {
        title: 'פיתוח וקידוד',
        description: 'פיתוח הדף עם React ו-Next.js, אינטגרציה של כל המערכות ובדיקות איכות'
      },
      launch: {
        title: 'השקה ותמיכה',
        description: 'פריסה לפרודקשן, הגדרת אנליטיקס, הדרכה ותמיכה טכנית מתמשכת'
      }
    }
  },

  about: {
    title: 'אודותינו - מומחים בדפי נחיתה',
    description: 'אנחנו מתמחים ביצירת דפי נחיתה עם שיעור המרה גבוה במיוחד עבור עסקים ישראליים. משלבים טכנולוגיות מתקדמות עם הבנה עמוקה של השוק המקומי, תרבות ושפה עברית. כל פרויקט מותאם אישית למטרות העסק ולקהל היעד.',
    stats: {
      projects: 'פרויקטים הושלמו בהצלחה',
      clients: 'לקוחות מרוצים וחוזרים',
      experience: 'שנות ניסיון בפיתוח',
      satisfaction: 'שביעות רצון ממוצעת'
    }
  },

  // Add-ons Section
  addons: {
    title: 'שדרגו את דף הנחיתה שלכם',
    subtitle: 'קחו את דף הנחיתה שלכם לרמה הבאה עם השירותים המקצועיים שלנו. כל שירות מיועד למקסם את פוטנציאל ההמרות שלכם.',
    items: {
      abTesting: {
        title: 'הגדרת בדיקות A/B',
        description: 'אופטימיזציה של שיעורי ההמרה עם יישום מקצועי של בדיקות A/B ומעקב אנליטיקס.',
        features: [
          'גרסאות מרובות של הדף',
          'הגדרת מעקב המרות',
          'כלי ניתוח סטטיסטי',
          'דוחות ביצועים'
        ]
      },
      crmIntegration: {
        title: 'אינטגרציה עם CRM',
        description: 'חיבור חלק של דף הנחיתה למערכת ה-CRM הקיימת שלכם לניהול לידים אוטומטי.',
        features: [
          'חיבור ל-CRM פופולריים',
          'לכידת לידים אוטומטית',
          'מיפוי שדות מותאם',
          'סנכרון בזמן אמת'
        ],
        popular: true
      },
      copywriting: {
        title: 'כתיבה שיווקית מתקדמת',
        description: 'שירותי כתיבה מקצועיים ליצירת תוכן משכנע וממוקד המרות עבור דף הנחיתה שלכם.',
        features: [
          'טקסט מותאם להמרות',
          'התאמה לקול המותג',
          'מספר סיבובי עריכה',
          'גרסאות לבדיקות A/B'
        ]
      },
      animations: {
        title: 'אנימציות מותאמות',
        description: 'שיפור חוויית המשתמש עם אנימציות חלקות ומקצועיות ואינטראקציות מיקרו.',
        features: [
          'אנימציות מופעלות בגלילה',
          'אפקטי hover',
          'מעברי טעינה',
          'ביצועים מותאמים למובייל'
        ]
      },
      premiumImages: {
        title: 'תמונות וגרפיקה פרימיום',
        description: 'תמונות איכותיות, גרפיקה מותאמת ונכסים ויזואליים מקצועיים עבור דף הנחיתה שלכם.',
        features: [
          'רישיון תמונות פרימיום',
          'עיצוב גרפי מותאם',
          'ויזואלים עקביים למותג',
          'מותאם לביצועי אינטרנט'
        ]
      },
      monthlySupport: {
        title: 'חבילת תמיכה חודשית',
        description: 'תחזוקה שוטפת, עדכונים ושירותי אופטימיזציה כדי לשמור על דף הנחיתה שלכם בביצועים מיטביים.',
        features: [
          'מעקב ביצועים קבוע',
          'עדכוני תוכן',
          'תחזוקת אבטחה',
          'גישה לתמיכה עדיפה'
        ]
      }
    },
    getQuote: 'קבל הצעת מחיר',
    popular: 'פופולרי'
  },

  footer: {
    description: 'שירות פיתוח דפי נחיתה מקצועי באמצעות React, Next.js ו-Vercel.',
    quickLinks: 'קישורים מהירים',
    services: 'שירותים',
    contact: 'צור קשר',
    rights: 'כל הזכויות שמורות.'
  },

  common: {
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה',
    required: 'חובה',
    optional: 'אופציונלי',
    learnMore: 'למד עוד',
    getStarted: 'התחל',
    contactUs: 'צור קשר'
  },

  a11y: {
    skipToContent: 'דלג לתוכן הראשי',
    skipToNavigation: 'דלג לניווט',
    skipToContact: 'דלג לטופס יצירת קשר',
    openMenu: 'פתח תפריט ראשי',
    closeMenu: 'סגור תפריט ראשי',
    languageSelector: 'בורר שפה',
    currentLanguage: 'שפה נוכחית',
    themeSelector: 'בורר מצב תצוגה',
    currentTheme: 'מצב תצוגה נוכחי',
    lightMode: 'מצב בהיר',
    darkMode: 'מצב כהה',
    systemMode: 'מצב אוטומטי'
  }
};

// All translations
export const translations: Record<Locale, Translations> = {
  en,
  he
};

// Get translation by key
export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

// Get translations object for locale
export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations[defaultLocale];
}