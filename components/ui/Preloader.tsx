"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ScrambleText } from "@/components/ui/TextScrambler";

import type { Dictionary } from "@/lib/dictionaries";

interface PreloaderProps {
  dict?: Dictionary["preloader"];
}

export function Preloader({ dict }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [activeItems, setActiveItems] = useState<number[]>([]);

  const floatingItems = React.useMemo(
    () => [
      {
        id: 1,
        line1: dict?.based_in || "BASED IN",
        line2: dict?.location || "IPIALES, COLOMBIA",
        className:
          "top-[15%] left-[5%] md:top-[20%] md:left-[10%] items-start text-left",
        start: 100,
        end: 800,
      },
      {
        id: 2,
        line1: dict?.system || "SYSTEM",
        line2: dict?.ready || "READY",
        className:
          "top-[10%] right-[5%] md:top-[15%] md:right-[15%] items-end text-right",
        start: 400,
        end: 1000,
      },
      {
        id: 3,
        line1: dict?.based_in || "BASED IN",
        line2: dict?.location || "IPIALES, COLOMBIA",
        className:
          "top-[50%] left-[5%] md:left-[10%] -translate-y-1/2 items-start text-left",
        start: 900,
        end: 1500,
      },
      {
        id: 4,
        line1: dict?.digital || "DIGITAL",
        line2: dict?.experience || "EXPERIENCE",
        className:
          "bottom-[25%] right-[5%] md:bottom-[30%] md:right-[10%] items-end text-right",
        start: 500,
        end: 1100,
      },
      {
        id: 5,
        line1: dict?.based_in || "BASED IN",
        line2: dict?.location || "IPIALES, COLOMBIA",
        className:
          "top-[50%] right-[5%] md:right-[10%] -translate-y-1/2 items-end text-right",
        start: 1100,
        end: 1700,
      },
      {
        id: 6,
        line1: dict?.based_in || "BASED IN",
        line2: dict?.location || "IPIALES, COLOMBIA",
        className:
          "bottom-[10%] left-1/2 -translate-x-1/2 items-center text-center",
        start: 700,
        end: 1300,
      },
    ],
    [dict],
  );

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("buildroot_visited");

    if (!hasVisited) {
      setTimeout(() => {
        setIsFirstVisit(true);
        setShowPreloader(true);
      }, 0);
      sessionStorage.setItem("buildroot_visited", "true");

      const timers = floatingItems.flatMap((item) => [
        setTimeout(
          () => setActiveItems((prev) => [...prev, item.id]),
          item.start,
        ),
        setTimeout(
          () => setActiveItems((prev) => prev.filter((id) => id !== item.id)),
          item.end,
        ),
      ]);

      timers.push(setTimeout(() => setIsLoading(false), 1800));

      return () => timers.forEach(clearTimeout);
    } else if (
      window.location.pathname === "/" ||
      window.location.pathname === "/es"
    ) {
      setTimeout(() => {
        setIsFirstVisit(false);
        setShowPreloader(true);
      }, 0);

      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setShowPreloader(false);
        setIsLoading(false);
      }, 0);
    }
  }, [floatingItems]);

  if (!showPreloader) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <m.div
          key="preloader"
          // Opts the whole intro out of RouteTextShuffle — it runs its own
          // ScrambleText animation, and the two rewriting the same text
          // nodes would leave each other's half-scrambled output behind.
          data-no-shuffle
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--text-primary)] text-[var(--bg-primary)] overflow-hidden"
        >
          {/* Main Logo Center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="overflow-hidden">
              <m.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="font-mono text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tighter flex items-center"
              >
                <ScrambleText text="buildroot" speed={60} trigger="mount" />
                <m.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                  }}
                  className="inline-block scale-y-75 origin-bottom ml-1"
                >
                  _
                </m.span>
              </m.div>
            </div>
          </div>

          {/* Floating Texts - ONLY SHOW ON VERY FIRST VISIT */}
          {isFirstVisit && (
            <div className="absolute inset-0 pointer-events-none">
              <AnimatePresence>
                {floatingItems.map(
                  (item) =>
                    activeItems.includes(item.id) && (
                      <m.div
                        key={`loc-${item.id}`}
                        className={`absolute flex flex-col font-mono text-[10px] md:text-xs font-light uppercase tracking-[0.2em] opacity-70 ${item.className}`}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>
                          <ScrambleText
                            text={item.line1}
                            speed={25}
                            trigger="mount"
                          />
                        </span>
                        <span>
                          <ScrambleText
                            text={item.line2}
                            speed={25}
                            trigger="mount"
                          />
                        </span>
                      </m.div>
                    ),
                )}
              </AnimatePresence>
            </div>
          )}
        </m.div>
      )}
    </AnimatePresence>
  );
}
