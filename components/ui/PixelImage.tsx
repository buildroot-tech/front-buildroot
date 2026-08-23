"use client";

import { useEffect, useRef } from "react";
import { animate, AnimationPlaybackControls } from "framer-motion";

interface PixelImageProps {
  src: string;
  // Skip the pixelation reveal and draw the crisp image immediately.
  // Used when the same image already resolved elsewhere on screen and is
  // just relocating (e.g. the hover preview docking into the drawer) —
  // replaying the reveal there would read as an unwanted re-pixelation.
  instant?: boolean;
}

export function PixelImage({ src, instant = false }: PixelImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationRef: AnimationPlaybackControls;
    // One offscreen canvas for the whole reveal, reused every frame — draw()
    // used to call document.createElement("canvas") on each tick of the
    // 0.8s animation (~48 DOM node allocations per reveal, times however
    // many PixelImage instances are mounted at once on /work).
    const offscreen = document.createElement("canvas");

    const img = new window.Image();
    img.src = src;

    // Buffer + draw geometry, computed once the image and the box it sits
    // in are both known, and recomputed on resize. Sized to the box this
    // canvas is actually rendered into × devicePixelRatio, not the source
    // file's own resolution — a 1024px-wide source shown 1400px wide on a
    // 2x screen needs a ~2800px buffer, or it visibly blurs. Because the
    // buffer no longer matches the source's aspect ratio, cover-fit (scale
    // to fill, centre-crop the overflow) has to be done by hand here;
    // that's what dx/dy/drawW/drawH below are for.
    let width = 0;
    let height = 0;
    let dx = 0;
    let dy = 0;
    let drawW = 0;
    let drawH = 0;

    const measure = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;

      const scale = Math.max(
        width / img.naturalWidth,
        height / img.naturalHeight,
      );
      drawW = img.naturalWidth * scale;
      drawH = img.naturalHeight * scale;
      dx = (width - drawW) / 2;
      dy = (height - drawH) / 2;
    };

    const drawCrisp = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, dx, dy, drawW, drawH);
    };

    // Re-measures and redraws crisp on resize (a viewport rotation, a
    // breakpoint change) — without this the buffer stays sized for
    // whatever box existed on load, so it can go stale and blur again.
    // Only wired up once the image has actually loaded; skips replaying
    // the pixelation animation, since a resize isn't a fresh reveal.
    let resizeObserver: ResizeObserver | undefined;

    img.onload = () => {
      measure();

      if (instant) {
        drawCrisp();
      } else {
        // Start with very large blocks relative to the image size (e.g. 10 blocks across)
        const initialPixelSize = Math.max(40, Math.floor(width / 10));

        const draw = (pixelSize: number) => {
          ctx.clearRect(0, 0, width, height);

          // When pixelSize is 1 or less, draw the crisp high-res image
          if (pixelSize <= 1.05) {
            drawCrisp();
            return;
          }

          // Calculate downscaled dimensions (how many logical blocks)
          const scaledW = Math.max(1, Math.floor(width / pixelSize));
          const scaledH = Math.max(1, Math.floor(height / pixelSize));

          // Resize the shared offscreen canvas to this frame's block grid —
          // cheap, and clears its contents, which draw() needs anyway.
          offscreen.width = scaledW;
          offscreen.height = scaledH;
          const offCtx = offscreen.getContext("2d");

          if (offCtx) {
            // Same cover-fit framing as the crisp draw, scaled down to this
            // frame's block grid so the crop doesn't shift as it resolves.
            const previewScale = scaledW / width;
            offCtx.drawImage(
              img,
              dx * previewScale,
              dy * previewScale,
              drawW * previewScale,
              drawH * previewScale,
            );

            // Draw the pixelated blocks
            ctx.imageSmoothingEnabled = false;
            ctx.globalAlpha = 1;
            ctx.drawImage(offscreen, 0, 0, width, height);
          }

          // SMOOTHING MAGIC: Crossfade the perfectly sharp image on top
          // This hides the 'mechanical' jitter of the resizing blocks and makes it melt
          const progress = 1 - (pixelSize - 1) / (initialPixelSize - 1);

          // Exponential fade-in for buttery smoothness
          ctx.globalAlpha = progress * progress * progress;
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(img, dx, dy, drawW, drawH);

          // Reset alpha for next frame
          ctx.globalAlpha = 1;
        };

        // Animate block size down to 1px (sharp)
        animationRef = animate(initialPixelSize, 1, {
          duration: 0.8,
          ease: "easeOut",
          onUpdate: (latest) => draw(latest),
          onComplete: () => draw(1), // Guarantee it finishes perfectly clear
        });
      }

      resizeObserver = new ResizeObserver(() => {
        measure();
        drawCrisp();
      });
      resizeObserver.observe(canvas);
    };

    return () => {
      if (animationRef) animationRef.stop();
      resizeObserver?.disconnect();
    };
  }, [src, instant]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
