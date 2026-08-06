"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// The whole effect: on entering a new route, every piece of text already on
// screen starts with its characters shuffled *within each word*, then settles
// into place. No overlay, no cover panel — the new page is simply there, and
// the letters coming to rest is the transition.
//
// Because a word only ever renders its own characters rearranged, every word
// keeps its exact final width, so nothing on the page reflows while it plays.
const DURATION_MS = 900;
// How often the glyphs re-step. Below ~45ms the letters read as flicker
// rather than movement; above ~70ms the motion turns choppy.
const TICK_MS = 55;
// Text lower on the screen starts settling slightly after text at the top,
// so the page comes to rest as a soft wave instead of one hard snap. Small
// on purpose — everything still moves on the same clock.
const STAGGER_MS = 140;

// easeInOutCubic — eases out of the scramble and into stillness, so the
// last few letters glide home instead of stopping dead.
function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function jumpToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
}

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "CODE",
  "PRE",
  "TEXTAREA",
  "svg",
]);

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Returns a fn mapping progress (0 → 1) to this token part-way home.
//
// `arrangement[slot] = index of the character currently sitting in that slot`,
// and it persists across ticks rather than being re-rolled from scratch. Each
// step only nudges it: the next slot due to settle pulls its own character
// back into place (swapping out whatever squatted there), and a couple of the
// still-loose slots trade with each other. Letters therefore *travel* to their
// positions — a full re-shuffle every tick would read as flicker instead.
function makeTokenScrambler(token: string): (progress: number) => string {
  const chars = [...token];
  const n = chars.length;
  const settleOrder = shuffleInPlace([...Array(n).keys()]);
  const arrangement = shuffleInPlace([...Array(n).keys()]);
  const settled = new Set<number>();
  let settledCount = 0;

  return (progress: number) => {
    const target = Math.round(progress * n);

    while (settledCount < target) {
      const slot = settleOrder[settledCount];
      const holder = arrangement.indexOf(slot);
      [arrangement[slot], arrangement[holder]] = [
        arrangement[holder],
        arrangement[slot],
      ];
      settled.add(slot);
      settledCount++;
    }

    const loose: number[] = [];
    for (let i = 0; i < n; i++) if (!settled.has(i)) loose.push(i);

    // Just enough churn to keep the unsettled part alive without it looking
    // like static.
    if (loose.length > 1) {
      const swaps = Math.max(1, Math.round(loose.length / 4));
      for (let s = 0; s < swaps; s++) {
        const a = loose[Math.floor(Math.random() * loose.length)];
        const b = loose[Math.floor(Math.random() * loose.length)];
        [arrangement[a], arrangement[b]] = [arrangement[b], arrangement[a]];
      }
    }

    let out = "";
    for (let i = 0; i < n; i++) out += chars[arrangement[i]];
    return out;
  };
}

// Splits on whitespace but keeps the separators, so the original spacing is
// reproduced exactly — only the non-space runs get scrambled (punctuation
// included, which is why "websites," can briefly read "web,sites").
function buildLineScrambler(text: string): (progress: number) => string {
  const parts = text.split(/(\s+)/);
  const scramblers = parts.map((part) =>
    /^\s*$/.test(part) ? () => part : makeTokenScrambler(part),
  );
  return (progress: number) => scramblers.map((fn) => fn(progress)).join("");
}

interface Target {
  node: Text;
  original: string;
  render: (progress: number) => string;
  // Fraction (0 → 1) of how far down the viewport this text sits, turned
  // into a small head start for the top of the page.
  depth: number;
}

function collectTargets(): Target[] {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const value = node.nodeValue;
      if (!value || !value.trim()) return NodeFilter.FILTER_REJECT;

      const parent = (node as Text).parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      // Never touch the transition-exempt bits (nothing today, but this is
      // the hook for opting an element out).
      if (parent.closest("[data-no-shuffle]")) return NodeFilter.FILTER_REJECT;

      // Only what the visitor can actually see right now — scrambling text
      // several screens down is invisible work, and on a long page there's a
      // lot of it.
      const rect = parent.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        return NodeFilter.FILTER_REJECT;
      }
      if (rect.width === 0 || rect.height === 0) return NodeFilter.FILTER_REJECT;

      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const targets: Target[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) {
    const node = current as Text;
    const original = node.nodeValue as string;
    const top = node.parentElement?.getBoundingClientRect().top ?? 0;
    const depth = Math.min(Math.max(top / window.innerHeight, 0), 1);
    targets.push({
      node,
      original,
      render: buildLineScrambler(original),
      depth,
    });
  }
  return targets;
}

export function RouteTextShuffle() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // The very first paint belongs to the Preloader, not to this.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // `behavior: "instant"` on purpose: globals.css sets `scroll-behavior:
    // smooth`, which turns a plain scrollTo into an animation. That would
    // both scroll the *new* page in front of the visitor and, worse, leave
    // getBoundingClientRect reporting the old offset when we measure a frame
    // later — so we'd scramble whatever text the previous page's scroll
    // position happened to line up with instead of the top of this one.
    jumpToTop();

    let targets: Target[] = [];
    let raf = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const restore = () => {
      for (const t of targets) t.node.nodeValue = t.original;
    };

    // Two frames of breathing room, not one. Arriving from a scrolled
    // position, the first frame still reports the *outgoing* page's layout
    // and scroll offset — measuring there collects whatever happened to be
    // level with the old scroll position, or nothing at all. By the second
    // frame the incoming route has laid out and the jump to the top has
    // landed, so what we measure is genuinely what the visitor is looking at.
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        jumpToTop();
        run();
      });
    });

    function run() {
      targets = collectTargets();
      if (!targets.length) return;

      const start = performance.now();
      interval = setInterval(() => {
        const elapsed = performance.now() - start;
        let allDone = true;

        for (const t of targets) {
          const raw = (elapsed - t.depth * STAGGER_MS) / DURATION_MS;
          const clamped = Math.min(Math.max(raw, 0), 1);
          if (clamped < 1) allDone = false;
          t.node.nodeValue = t.render(ease(clamped));
        }

        if (allDone && interval) {
          clearInterval(interval);
          interval = undefined;
          restore();
        }
      }, TICK_MS);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (interval) clearInterval(interval);
      restore();
    };
  }, [pathname]);

  return null;
}
