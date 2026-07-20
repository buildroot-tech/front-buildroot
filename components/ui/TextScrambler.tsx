"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface TextScramblerProps {
  text: string;
  className?: string;
  speed?: number;
  trigger?: "hover" | "mount" | "manual";
  active?: boolean;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

function ScrambleText({
  text,
  className,
  speed = 40,
  trigger = "hover",
  active = true,
  as: Tag = "span",
  style,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: TextScramblerProps) {
  const [display, setDisplay] = useState(text);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const isAnimatingRef = useRef(false);

  const clearAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const travelFrame = useCallback((word: string, step: number): string => {
    const letters = word.split("");
    if (step >= letters.length) return word;

    // Keep first `step` letters fixed, shuffle the rest
    const fixed = letters.slice(0, step);
    const remaining = letters.slice(step);

    // Fisher-Yates shuffle for smoother transitions
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }

    return [...fixed, ...remaining].join("");
  }, []);

  const scramble = useCallback(() => {
    if (isAnimatingRef.current) return;

    clearAll();
    isAnimatingRef.current = true;
    setDisplay(text);

    const words = text.split(" ");
    const maxLen = Math.max(...words.map((w) => w.length));

    for (let step = 0; step <= maxLen; step++) {
      const t = setTimeout(() => {
        if (step >= maxLen) {
          setDisplay(text);
          isAnimatingRef.current = false;
        } else {
          const result = words
            .map((word) => travelFrame(word, Math.min(step, word.length)))
            .join(" ");
          setDisplay(result);
        }
      }, step * speed);
      timersRef.current.push(t);
    }
  }, [text, speed, clearAll, travelFrame]);

  useEffect(() => {
    return () => clearAll();
  }, [clearAll]);

  useEffect(() => {
    if (trigger === "mount" && active) {
      scramble();
    }
  }, [trigger, active, scramble]);

  const handleMouseEnter = () => {
    if (trigger === "hover") scramble();
    onMouseEnter?.();
  };

  return (
    <Tag
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {display}
    </Tag>
  );
}

export { ScrambleText };
export type { TextScramblerProps };
