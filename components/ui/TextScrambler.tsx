"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface TextScramblerProps {
  text: string;
  className?: string;
  speed?: number;
  iterations?: number;
  trigger?: "hover" | "mount" | "manual";
  active?: boolean;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const chars = "abcdefghijklmnopqrstuvwxyz";

function ScrambleText({
  text,
  className,
  speed = 30,
  iterations = 6,
  trigger = "hover",
  active = true,
  as: Tag = "span",
  style,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: TextScramblerProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    if (!active || isScrambling) return;

    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = iterations;

    // Get unique letters from the original word
    const wordLetters = [...new Set(text.split(""))];

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / (maxIterations / text.length)) {
              return text[i];
            }
            // Use only letters from the original word
            return wordLetters[Math.floor(Math.random() * wordLetters.length)];
          })
          .join("")
      );

      iteration++;

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);

        // Small delay before allowing re-trigger
        timeoutRef.current = setTimeout(() => {
          setIsScrambling(false);
        }, 100);
      }
    }, speed);
  }, [text, speed, iterations, active, isScrambling]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
      {displayText}
    </Tag>
  );
}

export { ScrambleText };
export type { TextScramblerProps };
