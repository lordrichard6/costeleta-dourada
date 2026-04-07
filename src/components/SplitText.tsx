'use client';

import { useRef } from 'react';
import type { JSX } from 'react';
import { motion, useInView } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export default function SplitText({
  text,
  className,
  delay = 0.05,
  once = true,
  as: Tag = 'span',
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '0px 0px -60px 0px' });

  const words = text.split(' ');

  return (
    <span ref={ref} className={className} aria-label={text} style={{ display: 'block' }}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: index * delay,
          }}
          style={{
            display: 'inline-block',
            marginRight: '0.25em',
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
