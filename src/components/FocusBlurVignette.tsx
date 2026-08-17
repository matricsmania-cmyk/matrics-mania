import React from 'react';

/**
 * FocusBlurVignette creates a smooth progressive blur at the top and bottom 65px
 * of the viewport, gracefully shifting reading focus to the center of the screen.
 */
export const FocusBlurVignette: React.FC = () => {
  return (
    <>
      {/* Top Focus Blur (65px height with progressive gradient mask) */}
      <div
        id="top-focus-blur"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[65px] pointer-events-none z-40 backdrop-blur-[12px] will-change-[backdrop-filter]"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Bottom Focus Blur (65px height with progressive gradient mask) */}
      <div
        id="bottom-focus-blur"
        aria-hidden="true"
        className="fixed bottom-0 left-0 right-0 h-[65px] pointer-events-none z-40 backdrop-blur-[12px] will-change-[backdrop-filter]"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)',
        }}
      />
    </>
  );
};
