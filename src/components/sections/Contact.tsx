'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { contactFormSchema, type ContactFormData, type FormSubmissionState } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { analytics } from '@/lib/analytics';
import { useScrollTracking } from '@/hooks/useScrollTracking';

const packageOptions = [
  { value: 'basic', label: 'Basic Package (₪1,900)' },
  { value: 'recommended', label: 'Recommended Package (₪3,200)' },
  { value: 'premium', label: 'Premium Package (₪5,400)' },
];

const budgetOptions = [
  { value: 'under-2000', label: 'Under ₪2,000' },
  { value: '2000-5000', label: '₪2,000 - ₪5,000' },
  { value: '5000-10000', label: '₪5,000 - ₪10,000' },
  { value: 'over-10000', label: 'Over ₪10,000' },
  { value: 'flexible', label: 'Flexible' },
];

const timelineOptions = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-week', label: 'Within 1 week' },
  { value: '2-weeks', label: 'Within 2 weeks' },
  { value: '1-month', label: 'Within 1 month' },
  { value: 'flexible', label: 'Flexible' },
];

export default function Contact() {
  const sectionRef = useScrollTracking({ sectionName: 'contact' });
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  });
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      projectPurpose: '',
      additionalInfo: '',
      preferredPackage: undefined,
      budget: '',
      timeline: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionState({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Track successful form submission
      analytics.trackFormSubmit('contact', true);
      
      // Track package selection if provided
      if (data.preferredPackage) {
        const packagePrices = {
          basic: '₪1,900',
          recommended: '₪3,200',
          premium: '₪5,400',
        };
        analytics.trackPackageSelect(data.preferredPackage, packagePrices[data.preferredPackage]);
      }

      setSubmissionState({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
      });

      // Reset form after successful submission
      reset();
    } catch (error) {
      // Track failed form submission
      analytics.trackFormSubmit('contact', false);
      
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Failed to send message. Please try again or contact us directly.',
      });
    }
  };

  const handleFormFocus = () => {
    if (!hasTrackedFormStart) {
      analytics.trackFormStart('contact');
      setHasTrackedFormStart(true);
    }
  };

  const handleWhatsAppClick = () => {
    analytics.trackContactMethod('whatsapp');
  };

  const handlePhoneClick = () => {
    analytics.trackContactMethod('phone');
  };

  const projectPurposeValue = watch('projectPurpose');
  const additionalInfoValue = watch('additionalInfo');

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's discuss your project and create a landing page that converts visitors into customers.
            Fill out the form below or contact us directly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Project Details
              </h3>

              {/* Success Message */}
              {submissionState.isSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-800">Message Sent Successfully!</h4>
                    <p className="text-green-700 text-sm mt-1">
                      Thank you for your inquiry. I'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submissionState.isError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800">Failed to Send Message</h4>
                    <p className="text-red-700 text-sm mt-1">
                      {submissionState.errorMessage}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" onFocus={handleFormFocus}>
                {/* Name and Contact Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    placeholder="Your full name"
                    error={errors.fullName?.message}
                    {...register('fullName')}
                  />
                  <Input
                    label="Email *"
                    type="email"
                    placeholder="your.email@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>

                <Input
                  label="Phone Number (Optional)"
                  type="tel"
                  placeholder="+972-XX-XXX-XXXX"
                  helperText="We'll use this for WhatsApp or calls if needed"
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                {/* Project Purpose */}
                <Textarea
                  label="Project Purpose *"
                  placeholder="Tell me about your business, target audience, and what you want to achieve with your landing page..."
                  rows={4}
                  helperText={`${projectPurposeValue?.length || 0}/1000 characters`}
                  error={errors.projectPurpose?.message}
                  {...register('projectPurpose')}
                />

                {/* Package Preference */}
                <Select
                  label="Preferred Package (Optional)"
                  placeholder="Select a package if you have a preference"
                  options={packageOptions}
                  error={errors.preferredPackage?.message}
                  {...register('preferredPackage')}
                />

                {/* Budget and Timeline */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    label="Budget Range (Optional)"
                    placeholder="Select your budget range"
                    options={budgetOptions}
                    error={errors.budget?.message}
                    {...register('budget')}
                  />
                  <Select
                    label="Timeline (Optional)"
                    placeholder="When do you need this completed?"
                    options={timelineOptions}
                    error={errors.timeline?.message}
                    {...register('timeline')}
                  />
                </div>

                {/* Additional Information */}
                <Textarea
                  label="Additional Information (Optional)"
                  placeholder="Any specific requirements, design preferences, or questions you have..."
                  rows={3}
                  helperText={`${additionalInfoValue?.length || 0}/2000 characters`}
                  error={errors.additionalInfo?.message}
                  {...register('additionalInfo')}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={submissionState.isSubmitting}
                  className="w-full"
                >
                  {submissionState.isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending Message...
                    </>
                  ) : (
                    'Send Project Details'
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Alternative Contact Methods */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Prefer Direct Contact?
              </h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/972XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border border-green-200 bg-green-50",
                    "hover:bg-green-100 transition-colors group"
                  )}
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">WhatsApp</div>
                    <div className="text-sm text-green-600">Quick response</div>
                  </div>
                </a>

                <a
                  href="tel:+972XXXXXXXXX"
                  onClick={handlePhoneClick}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border border-blue-200 bg-blue-50",
                    "hover:bg-blue-100 transition-colors group"
                  )}
                >
                  <PhoneIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-800">Phone Call</div>
                    <div className="text-sm text-blue-600">+972-XX-XXX-XXXX</div>
                  </div>
                </a>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What Happens Next?
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mt-0.5">
                    1
                  </div>
                  <p>I'll review your project details within 24 hours</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mt-0.5">
                    2
                  </div>
                  <p>We'll schedule a brief call to discuss your needs</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mt-0.5">
                    3
                  </div>
                  <p>You'll receive a detailed proposal and timeline</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}