import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { getImageUrl } from '@/data/slides'

export default function SlideItem({ slide, isActive }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageSrc, setImageSrc] = useState(getImageUrl(slide.image))
  const [attemptedPaths, setAttemptedPaths] = useState([getImageUrl(slide.image)])

  // Reset state khi slide thay đổi
  useEffect(() => {
    const newSrc = getImageUrl(slide.image)
    setImageSrc(newSrc)
    setAttemptedPaths([newSrc])
    setImageLoaded(false)
    setImageError(false)
  }, [slide.id, slide.image])

  // Tạo danh sách các biến thể đường dẫn để thử (chỉ cho cùng một file)
  const getAlternativePaths = (originalPath) => {
    // Nếu là URL tuyệt đối, không thử biến thể
    if (originalPath.startsWith('http://') || originalPath.startsWith('https://')) {
      return [originalPath]
    }
    
    const alternatives = [originalPath]
    const pathParts = originalPath.split('/')
    const fileName = pathParts[pathParts.length - 1]
    const dirPath = pathParts.slice(0, -1).join('/')
    
    // Thử các biến thể case của tên file
    if (fileName.includes('.')) {
      const [name, ext] = fileName.split('.')
      alternatives.push(`${dirPath}/${name.toLowerCase()}.${ext.toLowerCase()}`)
      alternatives.push(`${dirPath}/${name.toUpperCase()}.${ext.toUpperCase()}`)
      alternatives.push(`${dirPath}/${name}.${ext.toLowerCase()}`)
      alternatives.push(`${dirPath}/${name}.${ext.toUpperCase()}`)
    }
    
    // Loại bỏ trùng lặp
    return [...new Set(alternatives)]
  }

  return (
    <div
      className={`w-full h-full flex items-center justify-center transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Card className="w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl overflow-hidden">
        <div className="relative w-full min-h-[40vh] max-h-[70vh] bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
          {/* Image Container */}
          {!imageError ? (
            <img
              src={imageSrc}
              alt={slide.title}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                console.error('Lỗi tải ảnh:', imageSrc, 'cho slide:', slide.title)
                
                // Lấy tất cả các biến thể đường dẫn có thể thử
                const allAlternatives = getAlternativePaths(slide.image)
                
                // Tìm đường dẫn tiếp theo chưa thử
                const nextPath = allAlternatives.find(path => !attemptedPaths.includes(path))
                
                if (nextPath) {
                  // Thử đường dẫn tiếp theo
                  console.log('Thử đường dẫn thay thế:', nextPath)
                  setAttemptedPaths(prev => [...prev, nextPath])
                  setImageSrc(nextPath)
                  setImageLoaded(false)
                } else {
                  // Đã thử hết tất cả biến thể, báo lỗi
                  console.error('Đã thử tất cả biến thể nhưng không thành công cho slide:', slide.title)
                  setImageError(true)
                  setImageLoaded(true)
                }
              }}
              className={`max-w-full max-h-[70vh] w-auto h-auto object-contain transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              key={`${slide.id}-${imageSrc}`}
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
            {/* Title - chỉ hiển thị nếu có title */}
            {slide.title && (
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-lg leading-tight">
                {slide.title}
              </h2>
            )}

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

