'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the animation starts, for staggering siblings. */
  delay?: number;
  variant?: 'up' | 'fade' | 'grow-x';
};

const HIDDEN = {
  up: 'translate-y-3 opacity-0',
  fade: 'opacity-0',
  'grow-x': 'origin-left scale-x-0',
};
const SHOWN = {
  up: 'translate-y-0 opacity-100',
  fade: 'opacity-100',
  'grow-x': 'origin-left scale-x-100',
};

/** Fades or slides its children in the first time they scroll into view. */
export const Reveal = ({ children, className = '', delay = 0, variant = 'up' }: RevealProps) => {
  const { ref, visible } = useInView();
  const style: CSSProperties = { transitionDelay: `${delay}s` };
  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all duration-500 ease-out motion-reduce:transition-none ${
        visible ? SHOWN[variant] : HIDDEN[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
};

type CountUpProps = {
  value: number;
  suffix?: string;
  /** Format with thousands separators, e.g. 10,400. */
  separators?: boolean;
  className?: string;
};

/** Counts from 0 to `value` once, when scrolled into view. */
export const CountUp = ({ value, suffix = '', separators = false, className }: CountUpProps) => {
  const { ref, visible } = useInView(0.4);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setShown(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, value]);

  return (
    <div ref={ref} className={className}>
      {separators ? shown.toLocaleString('en-US') : shown}
      {suffix}
    </div>
  );
};
