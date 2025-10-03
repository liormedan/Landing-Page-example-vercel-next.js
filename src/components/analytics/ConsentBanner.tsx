'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { consentManager, initGA } from '@/lib/analytics';

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show banner if consent hasn't been set
    const consent = localStorage.getItem('analytics_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    consentManager.grantConsent();
    initGA(); // Initialize GA after consent is granted
    setShowBanner(false);
  };

  const handleDecline = () => {
    consentManager.denyConsent();
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              We use cookies and analytics to improve your experience on our website. 
              This helps us understand how visitors interact with our site and improve our services.
              <a 
                href="/privacy-policy" 
                className="text-blue-600 hover:text-blue-800 underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more about our privacy policy
              </a>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="whitespace-nowrap"
            >
              Decline
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleAccept}
              className="whitespace-nowrap"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}