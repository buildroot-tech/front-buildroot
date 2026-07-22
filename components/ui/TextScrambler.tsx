"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface TextScramblerProps {
  text: string;
  className?: string;
  speed?: number;
  trigger?: "hover" | "mount" | "both" | "manual";
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
  speed = 80,
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

  const scramble = useCallback(() => {
    clearAll();

    const letters = text.split("");
    const len = letters.length;

    // Step 1: Reverse the word — synchronous so it fires instantly on hover
    setDisplay([...letters].reverse().join(""));

    // Step 2: Rotate letters one by one from the end back to original
    for (let i = 1; i < len; i++) {
      const t = setTimeout(() => {
        // Take last i letters and move them to front
        const rotated = [
          ...letters.slice(len - i),
          ...letters.slice(0, len - i),
        ].join("");
        setDisplay(rotated);
      }, i * speed);
      timersRef.current.push(t);
    }

    // Final: back to original
    const tFinal = setTimeout(() => {
      setDisplay(text);
    }, len * speed);
    timersRef.current.push(tFinal);
  }, [text, speed, clearAll]);

  useEffect(() => {
    return () => clearAll();
  }, [clearAll]);

  useEffect(() => {
    if ((trigger === "mount" || trigger === "both") && active) {
      scramble();
    }
  }, [trigger, active, scramble]);

  const handleMouseEnter = () => {
    if (trigger === "hover" || trigger === "both") scramble();
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    if (trigger === "hover" || trigger === "both") {
      clearAll();
      setDisplay(text);
    }
    onMouseLeave?.();
  };

  return (
    <Tag
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {display}
    </Tag>
  );
}

export { ScrambleText };
export type { TextScramblerProps };
