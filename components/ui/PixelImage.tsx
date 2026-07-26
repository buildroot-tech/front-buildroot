"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export function PixelImage({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationRef: number;

    const img = new window.Image();
    img.src = src;

    img.onload = () => {
      // Use the image's raw high-resolution dimensions for the canvas internal buffer
      // This prevents the canvas from capturing a tiny width while the CSS animation is opening it
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const width = canvas.width;
      const height = canvas.height;

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

        // Use offscreen canvas to create the pixel data
        const offscreen = document.createElement("canvas");
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
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}
