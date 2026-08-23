"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PixelImage } from "@/components/ui/PixelImage";
import { projectImageSrc } from "@/lib/projects";
import type { ProjectGalleryImage } from "@/types";

interface ProjectGalleryProps {
  images: readonly ProjectGalleryImage[];
  label: string;
}

/**
 * A horizontal, snap-scrolling strip of extra views beyond a case study's
 * hero — for the projects with real material to show beyond one image.
 * Natural scroll (drag, trackpad, arrow keys) rather than the paginated
 * arrow/ScrambleText slider used elsewhere (Services' engagement models):
 * that pattern shows one item at a time, this one deliberately peeks the
 * next card as its own scroll affordance, which is a different job.
 */
export function ProjectGallery({ images, label }: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Only two images today, which already fit without scrolling on a wide
  // desktop viewport — arrows that click and visibly do nothing read as
  // broken, so they only render once the track actually has somewhere to
  // go. Re-checked on resize, since a viewport change can flip this either
  // way (a wide window narrowing, or more images added later).
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const checkOverflow = () => {
      setCanScroll(track.scrollWidth > track.clientWidth + 1);
    };

    checkOverflow();
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(track);
    return () => resizeObserver.disconnect();
  }, [images.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-gallery-item]");
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="w-full py-16 md:py-24">
      <div className="flex items-baseline justify-between px-6 md:px-12">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
          {label}
        </p>
        {canScroll && (
          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Anterior"
              className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Siguiente"
              className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 px-6 pb-2 md:scroll-px-12 md:px-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((item, i) => (
          <figure
            key={item.image}
            data-gallery-item
            className="relative w-[280px] shrink-0 snap-start sm:w-[360px] md:w-[420px]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-[var(--border)]">
              <PixelImage src={projectImageSrc(item.image)} />
            </div>
            <figcaption className="mt-3 flex items-baseline gap-3">
              <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-sm leading-snug text-[var(--text-primary)] opacity-75">
                {item.caption}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
