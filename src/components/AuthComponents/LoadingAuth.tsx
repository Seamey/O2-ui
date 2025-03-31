import React from 'react';

type LoadingSpinnerProps ={
  size?: number; // Size of the spinner (default is 10)
  color?: string; // Color of the spinner border (default is blue)
  borderWidth?: number; // Width of the spinner border (default is 4)
  className?: string; // Additional custom styles
}

function LoadingSpinner({
  size = 10,
  color = "blue-500",
  borderWidth = 4,
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`w-${size} h-${size} border-${borderWidth} border-t-${color} border-gray-300 rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    ></div>
  );
}

export default LoadingSpinner;
