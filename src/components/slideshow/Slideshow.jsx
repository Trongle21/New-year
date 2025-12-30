import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SlideItem from './SlideItem'
import { slidesData } from '@/data/slides'
import RedEnvelope from '@/components/redenvelope/RedEnvelope'

export default function Slideshow({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showRedEnvelope, setShowRedEnvelope] = useState(false)

  const totalSlides = slidesData.length
  const isLastSlide = currentSlide === totalSlides - 1

  const nextSlide = () => {
    if (isTransitioning) return
    
    // Nếu đang ở slide cuối, chuyển sang màn chọn lì xì
    if (isLastSlide) {
      setShowRedEnvelope(true)
      return
    }
    
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToSlide = (index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // Keyboard navigation
  useEffect(() => {
    if (showRedEnvelope) return
    
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'Escape') onClose?.()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, isTransitioning, showRedEnvelope])

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:bg-white/20 z-10"
        aria-label="Đóng slideshow"
      >
        <X className="h-6 w-6 sm:h-8 sm:w-8" />
      </Button>

      {/* Main Slide Container */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] flex items-center justify-center">
        {/* Previous Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-2 sm:left-4 md:left-6 z-10 text-white hover:bg-white/20 disabled:opacity-50 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
          aria-label="Slide trước"
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
        </Button>

        {/* Slide Content */}
        <div className="w-full h-full flex items-center justify-center">
          <SlideItem
            slide={slidesData[currentSlide]}
            isActive={!isTransitioning}
          />
        </div>

        {/* Next Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-2 sm:right-4 md:right-6 z-10 text-white hover:bg-white/20 disabled:opacity-50 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
          aria-label={isLastSlide ? "Chọn lì xì" : "Slide tiếp theo"}
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 sm:w-10 md:w-12 bg-yellow-400'
                : 'w-2 sm:w-2.5 md:w-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Đi đến slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 text-white/80 text-sm sm:text-base md:text-lg font-medium z-10">
        {currentSlide + 1} / {totalSlides}
      </div>

      {/* Red Envelope Screen - Hiển thị trên cùng */}
      {showRedEnvelope && (
        <div className="fixed inset-0 z-[101]">
          <RedEnvelope onClose={() => {
            setShowRedEnvelope(false)
            onClose?.()
          }} />
        </div>
      )}
    </div>
  )
}

