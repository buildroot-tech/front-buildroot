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

    img.onload = () => {
      // Use the image's raw high-resolution dimensions for the canvas internal buffer
      // This prevents the canvas from capturing a tiny width while the CSS animation is opening it
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const width = canvas.width;
      const height = canvas.height;

      if (instant) {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, 0, 0, width, height);
        return;
      }

      // Start with very large blocks relative to the image size (e.g. 10 blocks across)
      const initialPixelSize = Math.max(40, Math.floor(width / 10));

      const draw = (pixelSize: number) => {
        ctx.clearRect(0, 0, width, height);

        // When pixelSize is 1 or less, draw the crisp high-res image
        if (pixelSize <= 1.05) {
          ctx.imageSmoothingEnabled = true; // Enable smoothing for the crisp final photo
          ctx.drawImage(img, 0, 0, width, height);
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
          offCtx.drawImage(img, 0, 0, scaledW, scaledH);

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
        ctx.drawImage(img, 0, 0, width, height);

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
    };

    return () => {
      if (animationRef) animationRef.stop();
    };
  }, [src, instant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}
