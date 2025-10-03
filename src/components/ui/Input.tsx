import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, required, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;
    
    // Build aria-describedby attribute
    const describedByIds = [];
    if (error) describedByIds.push(errorId);
    if (helperText && !error) describedByIds.push(helperTextId);
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className={cn(
              "block text-sm font-medium text-foreground mb-1",
              required && "after:content-['*'] after:ml-1 after:text-destructive"
            )}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
          aria-required={required}
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
Input.displayName = "Input"

export { Input }