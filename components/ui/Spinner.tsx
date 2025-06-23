import React from 'react';

export function Spinner({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block w-5 h-5 border-2 border-t-transparent border-brand-orange rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
} 