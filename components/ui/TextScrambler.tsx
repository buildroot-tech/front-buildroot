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
  speed = 50,
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

  const clearAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const travelFrame = useCallback((word: string, step: number): string => {
    const letters = word.split("");
    // Shuffle the remaining letters (from step onwards)
    const remaining = letters.slice(step).sort(() => Math.random() - 0.5);
    return [...letters.slice(0, step), ...remaining].join("");
  }, []);

  const scramble = useCallback(() => {
    clearAll();
    const words = text.split(" ");
    const maxLen = Math.max(...words.map((w) => w.length));

    for (let step = 1; step <= maxLen; step++) {
      const t = setTimeout(() => {
        if (step >= maxLen) {
          setDisplay(text);
        } else {
          const result = words
            .map((word) => travelFrame(word, Math.min(step, word.length - 1)))
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
