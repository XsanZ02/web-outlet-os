'use client';

import React, { useState, useEffect } from 'react';

interface AnimatedViewProps {
  children: React.ReactNode;
  show: boolean;
  className?: string;
  duration?: number;
}

export function AnimatedView({ children, show, className, duration = 300 }: AnimatedViewProps) {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={`transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none ${ show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-[0.99]' } ${className || ''}`} >
      {children}
    </div>
  );
}