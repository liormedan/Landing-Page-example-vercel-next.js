import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, required, maxLength, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const helperTextId = `${textareaId}-helper`;
    
    // Build aria-describedby attribute
    const describedByIds = [];
    if (error) describedByIds.push(errorId);
    if (helperText && !error) describedByIds.push(helperTextId);
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={textareaId} 
            className={cn(
              "block text-sm font-medium text-foreground mb-1",
              required && "after:content-['*'] after:ml-1 after:text-destructive"
            )}
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
          aria-required={required}
          maxLength={maxLength}
          ref={ref}
          required={required}
          {...props}
        />
        {error && (
          <p 
            id={errorId}
            className="mt-1 text-sm text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p 
            id={helperTextId}
            className="mt-1 text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }