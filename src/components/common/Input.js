import React from 'react';

const Input = ({ 
  label, 
  error, 
  className = '', 
  required = false,
  'data-testid': testId,
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label 
          className="block text-sm font-semibold text-gray-700 mb-2"
          htmlFor={props.id}
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}
      <input
        className={
          `w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 
          focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 
          ${error ? 'border-red-500' : 'border-gray-300'} 
          ${className}`
        }
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        data-testid={testId}
        {...props}
      />
      {error && (
        <p 
          id={`${props.id}-error`}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
