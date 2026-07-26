"use client";

import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?/";

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
}

export function ScrambleText({ text, isHovered }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayText(text);
      return;
    }

    let iteration = 0;

    // Execute at high frequency (20ms) for a very fast effect
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index]; // Reveal original char
            }
            // Maintain spaces
            if (text[index] === " ") return " ";

            // Render random char
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      // Extremely fast reveal speed
      iteration += 1;

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text); // Ensure perfect final state
      }
    }, 15);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span>{displayText}</span>;
}
