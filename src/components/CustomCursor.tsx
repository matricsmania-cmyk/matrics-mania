import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { theme } = useTheme();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('.cursor-pointer') ||
          target.closest('[tabindex="0"]') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT';

        setIsHovered(Boolean(isClickable));
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  // Ball color for modern dark theme
  const ballColor = '#FFFFFF';

  // Dimensions:
  // Default: larger round ball (18px)
  // Hover on button/link: turns small (5px)
  // Clicked: compact (4px)
  const size = isClicked ? 4 : isHovered ? 5 : 18;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
      style={{
        display: isVisible ? 'block' : 'none',
      }}
    >
      <div
        className="rounded-full transition-all duration-150 ease-out flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: ballColor,
          boxShadow: isHovered
            ? '0 0 10px rgba(59, 130, 246, 0.9), 0 0 20px rgba(139, 92, 246, 0.5)'
            : '0 2px 8px rgba(0,0,0,0.8), 0 0 4px rgba(37, 99, 235, 0.3)',
        }}
      />
    </div>
  );
};
