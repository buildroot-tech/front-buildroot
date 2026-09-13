"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, X } from "@/components/ui/Icons";
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
 *
 * Each thumbnail opens a full-screen lightbox on click — the strip's own
 * cards are deliberately small (to keep several peeking on screen at
 * once), so reading fine detail in one needs a bigger stage.
 */
export function ProjectGallery({ images, label }: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  // Only two images today, which already fit without scrolling on a wide
  // desktop viewport — arrows that click and visibly do nothing read as
  // broken, so they only render once the track actually has somewhere to
  // go. Re-checked on resize, since a viewport change can flip this either
  // way (a wide window narrowing, or more images added later).
  const [canScroll, setCanScroll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const closeLightbox = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  // Body scroll lock + keyboard nav while the lightbox is open — same
  // pattern as the mobile menu overlay in Header.tsx.
  useEffect(() => {
    if (openIndex === null) return;

    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [openIndex, closeLightbox, showPrev, showNext]);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (openIndex !== null) closeButtonRef.current?.focus();
  }, [openIndex]);

  const active = openIndex !== null ? images[openIndex] : null;

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
              aria-label={isEn ? "Previous" : "Anterior"}
              className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label={isEn ? "Next" : "Siguiente"}
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
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${isEn ? "Enlarge" : "Ampliar"}: ${item.caption}`}
              className="group relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden border border-[var(--border)]"
            >
              <div className="relative h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                <PixelImage src={projectImageSrc(item.image)} />
              </div>
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/25 group-hover:opacity-100">
                <Expand className="h-6 w-6 text-white" />
              </span>
            </button>
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

      {/* Lightbox — click a thumbnail (or its Expand affordance on hover)
          to open, arrows/keyboard to browse the rest of the gallery, Esc
          or a backdrop click to leave. `instant` on the PixelImage skips
          the pixelation reveal, since this is the same source image the
          thumbnail already resolved a moment ago — replaying it here
          would read as the image loading twice. */}
      <AnimatePresence>
        {active && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={isEn ? "Image preview" : "Vista ampliada de la imagen"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-black/95 p-4 md:p-8"
            onClick={closeLightbox}
          >
            <div className="flex items-center justify-between text-white">
              <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-70">
                {String((openIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                aria-label={isEn ? "Close" : "Cerrar"}
                className="-m-2 p-2 transition-colors hover:text-[var(--accent)]"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div
              className="relative flex flex-1 items-center justify-center py-4"
              onClick={(e) => e.stopPropagation()}
            >
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label={isEn ? "Previous" : "Anterior"}
                  className="absolute left-0 z-10 p-3 text-white transition-colors hover:text-[var(--accent)] md:left-4"
                >
                  <ArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
                </button>
              )}

              <div className="relative aspect-[16/9] w-full max-w-5xl overflow-hidden">
                <PixelImage src={projectImageSrc(active.image)} instant />
              </div>

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={showNext}
                  aria-label={isEn ? "Next" : "Siguiente"}
                  className="absolute right-0 z-10 p-3 text-white transition-colors hover:text-[var(--accent)] md:right-4"
                >
                  <ArrowRight className="h-6 w-6 md:h-8 md:w-8" />
                </button>
              )}
            </div>

            <p
              className="text-center font-display text-sm text-white opacity-75"
              onClick={(e) => e.stopPropagation()}
            >
              {active.caption}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
