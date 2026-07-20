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
  speed = 60,
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

  const shuffleWord = useCallback((word: string): string => {
    const arr = word.split("");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
  }, []);

  const scramble = useCallback(() => {
    clearAll();
    const words = text.split(" ");
    const wordLengths = words.map((w) => w.length);
    const maxLen = Math.max(...wordLengths);

    // Generate frames: multiple shuffles per word, then settle
    const totalFrames = maxLen * 3 + 1;

    for (let frame = 0; frame < totalFrames; frame++) {
      const t = setTimeout(() => {
        const isLastFrame = frame === totalFrames - 1;

        if (isLastFrame) {
          setDisplay(text);
          return;
        }

        const result = words.map((word, wIdx) => {
          const wordLen = word.length;
          // How many letters are "locked" (correct position)
          const lockedCount = Math.floor((frame / totalFrames) * wordLen);

          if (lockedCount >= wordLen) return word;

          // Take correct letters + shuffle the rest
          const correct = word.slice(0, lockedCount);
          const remaining = word.slice(lockedCount);
          const shuffled = shuffleWord(remaining);

          return correct + shuffled;
        });

        setDisplay(result.join(" "));
      }, frame * speed);
      timersRef.current.push(t);
    }
  }, [text, speed, clearAll, shuffleWord]);

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
