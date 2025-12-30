import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import SlideItem from './SlideItem'
import { slidesData } from '@/data/slides'
import RedEnvelope from '@/components/redenvelope/RedEnvelope'
import WallpaperGame from './WallpaperGame'

const PASSWORD = '30073007'
const PASSWORD_REQUIRED_SLIDE_INDEX = 3 // Slide thứ 4 (index 3) trở đi cần mật khẩu
const AUTH_STORAGE_KEY = 'slideshow_authenticated'

export default function Slideshow({ onClose }) {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Kiểm tra localStorage khi component mount
    const saved = localStorage.getItem(AUTH_STORAGE_KEY)
    return saved === 'true'
  })
  const [passwordError, setPasswordError] = useState('')
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [pendingSlideIndex, setPendingSlideIndex] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showWallpaperGame, setShowWallpaperGame] = useState(false)
  const [showRedEnvelope, setShowRedEnvelope] = useState(false)

  const totalSlides = slidesData.length
  const isLastSlide = currentSlide === totalSlides - 1

  const checkPasswordAndNavigate = (targetIndex) => {
    // Nếu slide cần mật khẩu (index >= 3) và chưa authenticated
    if (targetIndex >= PASSWORD_REQUIRED_SLIDE_INDEX && !isAuthenticated) {
      setPendingSlideIndex(targetIndex)
      setShowPasswordModal(true)
      return false
    }
    return true
  }

  const nextSlide = () => {
    if (isTransitioning) return
    
    if (isLastSlide) {
      setShowWallpaperGame(true)
      return
    }
    
    const nextIndex = (currentSlide + 1) % totalSlides
    if (!checkPasswordAndNavigate(nextIndex)) {
      return
    }
    
    setIsTransitioning(true)
    setCurrentSlide(nextIndex)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides
    // Cho phép quay lại slide trước mà không cần mật khẩu
    setIsTransitioning(true)
    setCurrentSlide(prevIndex)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToSlide = (index) => {
    if (isTransitioning) return
    
    if (!checkPasswordAndNavigate(index)) {
      return
    }
    
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === PASSWORD) {
      setIsAuthenticated(true)
      // Lưu vào localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, 'true')
      setPasswordError('')
      setShowPasswordModal(false)
      
      // Chuyển đến slide đã chọn trước đó
      if (pendingSlideIndex !== null) {
        setIsTransitioning(true)
        setCurrentSlide(pendingSlideIndex)
        setTimeout(() => setIsTransitioning(false), 500)
        setPendingSlideIndex(null)
      }
      setPassword('')
    } else {
      setPasswordError('Mật khẩu không đúng! Vui lòng thử lại.')
      setPassword('')
    }
  }

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false)
    setPendingSlideIndex(null)
    setPassword('')
    setPasswordError('')
  }


  useEffect(() => {
    if (showRedEnvelope || showWallpaperGame) return
    
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'Escape') onClose?.()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, isTransitioning, showRedEnvelope, showWallpaperGame])

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[103] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8">
          <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <div className="text-center space-y-6">
                {/* Lock Icon */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full p-4">
                    <Lock className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg">
                  Phòng ngừa bị leak ra ngoài và Chóa nhìn trộm =))
                </h2>
                {/* Password Form */}
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <Input
                    type="text"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError('')
                    }}
                    placeholder="Nhập mật khẩu..."
                    className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg sm:text-xl py-6 sm:py-7 focus:ring-2 focus:ring-purple-500"
                    autoFocus
                  />
                  
                  {passwordError && (
                    <p className="text-red-400 text-sm sm:text-base animate-pulse">
                      {passwordError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg sm:text-xl py-6 sm:py-7 font-bold rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Xác Nhận
                  </Button>
                </form>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClosePasswordModal}
                  className="text-white hover:bg-white/20"
                  aria-label="Đóng"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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

      {/* Wallpaper Game Screen - Hiển thị trước Red Envelope */}
      {showWallpaperGame && (
        <WallpaperGame 
          onAccept={() => {
            setShowWallpaperGame(false)
            setShowRedEnvelope(true)
          }}
          onClose={onClose}
        />
      )}

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

