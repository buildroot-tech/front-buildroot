"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

interface TextScramblerProps {
  text: string;
  className?: string;
  speed?: number;
  trigger?: "hover" | "manual" | "mount";
  active?: boolean;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

interface ScrambleTextHandle {
  scramble: () => void;
  reset: () => void;
}

const ScrambleText = forwardRef<ScrambleTextHandle, TextScramblerProps>(
  function ScrambleText(
    {
      text,
      className,
      speed = 80,
      trigger = "hover",
      active = true,
      style,
      onMouseEnter,
      onMouseLeave,
      onClick,
    },
    ref,
  ) {
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

      // Step 1: Reverse the word — synchronous so it fires instantly
      setDisplay([...letters].reverse().join(""));

      // Normalize duration: assume speed was tuned for an 8-letter word.
      // Now all words take exactly (speed * 8) milliseconds, regardless of length.
      const totalDuration = speed * 8;
      const stepDuration = len > 0 ? totalDuration / len : 0;

      // Step 2: Rotate letters one by one from the end back to original
      for (let i = 1; i < len; i++) {
        const t = setTimeout(() => {
          const rotated = [
            ...letters.slice(len - i),
            ...letters.slice(0, len - i),
          ].join("");
          setDisplay(rotated);
        }, i * stepDuration);
        timersRef.current.push(t);
      }

      // Final: back to original
      const tFinal = setTimeout(() => {
        setDisplay(text);
      }, totalDuration);
      timersRef.current.push(tFinal);
    }, [text, speed, clearAll]);

    const reset = useCallback(() => {
      clearAll();
      setDisplay(text);
    }, [clearAll, text]);

    // Expose scramble/reset imperatively so parent elements can trigger from
    // a wider hover area (e.g. the full <Link> rather than just the inner span)
    useImperativeHandle(ref, () => ({ scramble, reset }), [scramble, reset]);

    useEffect(() => {
      return () => clearAll();
    }, [clearAll]);

    useEffect(() => {
      if (trigger === "mount") {
        if (active) scramble();
        else reset();
      }
    }, [trigger, active, scramble, reset]);

    const prevTextRef = useRef(text);
    useEffect(() => {
      if (prevTextRef.current !== text) {
        prevTextRef.current = text;
        scramble(); // Automatically scramble when text prop changes
      }
    }, [text, scramble]);

    const handleMouseEnter = () => {
      if (trigger === "hover") scramble();
      onMouseEnter?.();
    };

    const handleMouseLeave = () => {
      if (trigger === "hover") reset();
      onMouseLeave?.();
    };

    return (
      <span
        className={className}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {display}
      </span>
    );
  },
);

ScrambleText.displayName = "ScrambleText";

export { ScrambleText };
export type { ScrambleTextHandle };
