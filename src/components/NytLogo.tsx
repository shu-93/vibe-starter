import React from 'react';

interface NytLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 't-mark';
}

export const NytLogo: React.FC<NytLogoProps> = ({ className = 'h-10 text-ink-black', variant = 'full' }) => {
  if (variant === 't-mark') {
    return (
      <svg
        viewBox="0 0 40 48"
        className={className}
        fill="currentColor"
        aria-label="The New York Times"
      >
        <path d="M20.2 0C10.2 0 6.5 7.6 6.5 12.8c0 4.1 2.5 6.4 5.9 6.4 3.7 0 5.6-2.8 5.6-5.8 0-4.3-3.7-5.5-4.9-5.5-.3 0-.6 0-.7.1C14 4.1 17.5 2 21.2 2c6.9 0 10.3 5 10.3 11.2 0 2.8-.8 5.8-2.2 9.2H20.8l-1.3 2.9h8.2C24.5 33.1 20 40.5 13.5 45.1c-2.3 1.6-4.9 2.7-7.6 2.7-.4 0-.8 0-1.2-.1v-3.2c1.7.3 3.4.1 4.9-.7 3.5-1.9 6.4-5.8 8.4-11.4l.7-2H9.2v-2.9h10.4c2.2-5.4 3.9-10.9 3.9-15.6C23.5 5.5 28.5 0 20.2 0z" />
      </svg>
    );
  }

  return (
    <div className={`font-masthead-gothic select-none tracking-normal ${className}`} style={{ fontFeatureSettings: '"kern" 1' }}>
      The New York Times
    </div>
  );
};
