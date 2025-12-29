import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

export default function SlideItem({ slide, isActive }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Fallback image nếu ảnh không tải được
  const fallbackImage = 'https://via.placeholder.com/800x600/667eea/ffffff?text=Hình+ảnh+kỷ+niệm'

  return (
    <div
      className={`w-full h-full flex items-center justify-center transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Card className="w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl overflow-hidden">
        <div className="relative w-full aspect-video sm:aspect-[16/10] md:aspect-[16/9] bg-gradient-to-br from-purple-500/20 to-pink-500/20">
          {/* Image Container */}
          {!imageError ? (
            <img
              src={slide.image}
              alt={slide.title}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true)
                setImageLoaded(true)
              }}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
              <div className="text-center text-white p-8">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-xl font-semibold">Không thể tải ảnh</p>
                <p className="text-sm mt-2 opacity-80">Vui lòng kiểm tra đường dẫn ảnh</p>
              </div>
            </div>
          )}

          {/* Loading Spinner */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12 bg-gradient-to-b from-white/5 to-transparent">
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Year Badge */}
            <div className="inline-block px-4 py-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full">
              <span className="text-yellow-400 font-bold text-sm sm:text-base md:text-lg">
                {slide.year}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-lg leading-tight">
              {slide.title}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light">
              {slide.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

