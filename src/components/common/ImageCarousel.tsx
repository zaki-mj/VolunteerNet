import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  Maximize2,
  X,
} from 'lucide-react';

export const resolveEventImageUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

interface ImageCarouselProps {
  images: string[];
  captions?: string[];
  eventTitle?: string;
  locationLabel?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  captions = [],
  eventTitle = 'فعالية دار الشباب سبدو',
  locationLabel = 'سبدو • ولاية تلمسان',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const total = images.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        // In Arabic RTL, ArrowRight usually means previous in sequence or next depending on reading direction
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isFullscreen]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const currentCaption =
    captions[currentIndex] ||
    (currentIndex === 0
      ? 'شخصية سكراتش التفاعلية (Scratch Mascot) - برمجة ألعاب للأطفال'
      : currentIndex === 1
      ? 'أطفال يبرمجون بقاعة الإعلام الآلي - دار الشباب سبدو • تلمسان'
      : 'شعار ورشة سكراتش الرسمية للأطفال');

  return (
    <div className="space-y-3">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[var(--color-border)] bg-slate-950 shadow-md group select-none">
        {/* Main Slide Viewer */}
        <div className="relative h-72 sm:h-96 md:h-[420px] flex items-center justify-center bg-slate-950/90 overflow-hidden">
          {/* Subtle blurred backdrop of current image for ambient glow */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-25 scale-110 pointer-events-none transition-all duration-700"
            style={{ backgroundImage: `url(${resolveEventImageUrl(currentImage)})` }}
          />

          {/* Active Image */}
          <img
            key={currentIndex}
            src={resolveEventImageUrl(currentImage)}
            alt={`${eventTitle} - صورة ${currentIndex + 1}`}
            className="relative z-10 max-h-full max-w-full object-contain transition-all duration-500 ease-out animate-in fade-in zoom-in-95"
            onError={(e) => {
              const filename = currentImage.split('/').pop();
              e.currentTarget.src = `events/${filename}`;
            }}
          />

          {/* Top Indicators Bar */}
          <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between text-xs font-bold text-white pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-xs pointer-events-auto">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>صورة {currentIndex + 1} من {total}</span>
            </span>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setIsFullscreen(true)}
                title="عرض بحجم كامل"
                className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all backdrop-blur-md hover:scale-105"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Left Arrow Button */}
          {total > 1 && (
            <button
              onClick={prevSlide}
              aria-label="الصورة السابقة"
              title="السابق"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/30 flex items-center justify-center transition-all shadow-lg backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow Button */}
          {total > 1 && (
            <button
              onClick={nextSlide}
              aria-label="الصورة التالية"
              title="التالي"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/30 flex items-center justify-center transition-all shadow-lg backdrop-blur-md hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Bottom Caption Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-5 text-white flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 pointer-events-none">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                {locationLabel}
              </span>
              <p className="text-xs sm:text-sm font-bold leading-relaxed line-clamp-2 drop-shadow-xs">
                {currentCaption}
              </p>
            </div>

            {/* Pagination Dots (Inside Overlay) */}
            {total > 1 && (
              <div className="flex items-center gap-1.5 pointer-events-auto self-center sm:self-auto shrink-0">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`الانتقال إلى صورة ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex
                        ? 'w-6 bg-amber-400 shadow-xs'
                        : 'w-2 bg-white/40 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnails Navigation Row */}
      {total > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-20 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-slate-100 dark:bg-slate-900 flex items-center justify-center relative cursor-pointer group ${
                idx === currentIndex
                  ? 'border-amber-500 ring-2 ring-amber-500/30 scale-102 shadow-xs'
                  : 'border-[var(--color-border)] opacity-70 hover:opacity-100 hover:border-[var(--color-primary)]'
              }`}
            >
              <img
                src={resolveEventImageUrl(img)}
                alt={`معاينة مصغرة ${idx + 1}`}
                className="w-full h-full object-contain rounded-xl"
                onError={(e) => {
                  const filename = img.split('/').pop();
                  e.currentTarget.src = `events/${filename}`;
                }}
              />
              {idx === currentIndex && (
                <div className="absolute inset-0 bg-amber-500/10 pointer-events-none rounded-xl" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Top Modal Controls */}
          <div
            className="w-full flex items-center justify-between text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-sm">
                معرض صور {eventTitle} ({currentIndex + 1} / {total})
              </span>
            </div>

            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Main Image & Controls */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {total > 1 && (
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
            )}

            <img
              src={resolveEventImageUrl(currentImage)}
              alt={eventTitle}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
              onError={(e) => {
                const filename = currentImage.split('/').pop();
                e.currentTarget.src = `events/${filename}`;
              }}
            />

            {total > 1 && (
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            )}
          </div>

          {/* Caption in Fullscreen */}
          <div
            className="text-center text-white text-xs sm:text-sm font-semibold max-w-2xl px-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-slate-200">{currentCaption}</p>
            <span className="text-amber-400 text-xs block mt-1">{locationLabel}</span>
          </div>
        </div>
      )}
    </div>
  );
};
