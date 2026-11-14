import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  ariaLabel?: string;
}

type ButtonVariant = BaseProps & {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

type AnchorVariant = BaseProps & {
  as: 'a';
  href: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export type MagneticButtonProps = ButtonVariant | AnchorVariant;

export function MagneticButton(props: MagneticButtonProps) {
  const { children, className = '', strength = 0.24, ariaLabel } = props;
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.4 });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setIsFinePointer(window.matchMedia('(pointer: fine)').matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !isFinePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
    rawX.set(offsetX);
    rawY.set(offsetY);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const baseClass =
    'inline-flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#F5C518] focus-visible:outline-offset-3 cursor-pointer';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block"
    >
      {props.as === 'a' ? (
        <a
          href={props.href}
          target={props.target}
          rel={props.rel}
          onClick={props.onClick}
          aria-label={ariaLabel}
          className={`${baseClass} ${className}`}
        >
          {children}
        </a>
      ) : (
        <button
          type={props.type ?? 'button'}
          onClick={props.onClick}
          disabled={props.disabled}
          aria-label={ariaLabel}
          className={`${baseClass} ${className}`}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
