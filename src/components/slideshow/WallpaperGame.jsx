import { useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function WallpaperGame({ onAccept, onClose }) {
  const [noButtonPosition, setNoButtonPosition] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [showThanksPopup, setShowThanksPopup] = useState(false)
  const cardRef = useRef(null)
  const noButtonRef = useRef(null)

  const moveNoButton = () => {
    if (!cardRef.current || !noButtonRef.current) return
    
    const card = cardRef.current
    const button = noButtonRef.current
    const cardRect = card.getBoundingClientRect()
    const buttonRect = button.getBoundingClientRect()
    
    // Tính toán vị trí ngẫu nhiên trong toàn bộ Card (bao gồm cả phần ảnh)
    // Trừ đi padding và kích thước nút để không bị ra ngoài
    const padding = 20
    const maxX = cardRect.width - buttonRect.width - padding
    const maxY = cardRect.height - buttonRect.height - padding
    
    // Nếu nút chưa nhảy lần nào, tính vị trí so với Card
    // Nếu đã nhảy rồi, buttonRect đã là vị trí absolute
    let newX, newY
    
    if (!noButtonPosition) {
      // Lần đầu nhảy: tính vị trí của button so với Card
      const buttonX = buttonRect.left - cardRect.left
      const buttonY = buttonRect.top - cardRect.top
      // Nhảy ra vị trí ngẫu nhiên
      newX = Math.max(padding, Math.random() * maxX)
      newY = Math.max(padding, Math.random() * maxY)
    } else {
      // Đã nhảy rồi: tiếp tục nhảy ngẫu nhiên
      newX = Math.max(padding, Math.random() * maxX)
      newY = Math.max(padding, Math.random() * maxY)
    }
    
    setNoButtonPosition({ x: newX, y: newY })
    setAttempts(prev => prev + 1)
  }

  const handleYes = () => {
    setShowThanksPopup(true)
  }

  const handlePopupClick = () => {
    setShowThanksPopup(false)
    onAccept()
  }

  const handleNoHover = () => {
    moveNoButton()
  }

  const handleNoClick = (e) => {
    e.preventDefault()
    moveNoButton()
  }

  return (
    <div className="fixed inset-0 z-[101] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Thanks Popup */}
      {showThanksPopup && (
        <div 
          className="fixed inset-0 z-[102] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
          onClick={handlePopupClick}
        >
          <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl transform animate-in zoom-in-95 duration-500 scale-100 hover:scale-105 transition-transform duration-300">
            <div className="text-center space-y-6">
              <div className="text-6xl sm:text-7xl md:text-8xl animate-bounce">
                💖
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white drop-shadow-lg">
                Thanks!
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-semibold">
                Hupsss Hupsss Hupsss! 
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/70 font-medium mt-4">
               Lì xì Thoai!!
              </p>
            </div>
          </div>
        </div>
      )}

      <Card ref={cardRef} className="relative w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl overflow-visible">
        {/* Image Container */}
        <div className="relative w-full min-h-[40vh] max-h-[60vh] bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
          <img
            src="https://i.postimg.cc/CLKyQ8f4/pic12.jpg"
            alt="Wallpaper"
            className="max-w-full max-h-[60vh] w-auto h-auto object-contain"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12 bg-gradient-to-b from-white/5 to-transparent">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg leading-tight">
              Xinh quóa. Cho phép làm hình nền điện thoại nha
            </h2>

            {/* Buttons Container */}
            <div className="relative flex items-center justify-center gap-4 sm:gap-6 min-h-[80px] sm:min-h-[100px]">
              {/* Yes Button */}
              <Button
                onClick={handleYes}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 rounded-xl shadow-xl font-bold transform hover:scale-105 transition-all duration-300 z-10"
              >
                Có
              </Button>

              {/* No Button - Ban đầu ngang hàng với nút Có, sau đó nhảy ra */}
              {!noButtonPosition && (
                <Button
                  ref={noButtonRef}
                  onMouseEnter={handleNoHover}
                  onClick={handleNoClick}
                  className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 rounded-xl shadow-xl font-bold transform hover:scale-105 transition-all duration-300 z-10"
                >
                  Éo cho
                </Button>
              )}
            </div>

            {/* Hint text */}
            {attempts > 0 && (
              <p className="text-white/60 text-sm sm:text-base animate-pulse">
                Có lì xì đằng sau nha 🤭🤭🤭
              </p>
            )}
          </div>
        </CardContent>

        {noButtonPosition && (
          <Button
            ref={noButtonRef}
            onMouseEnter={handleNoHover}
            onClick={handleNoClick}
            style={{
              position: 'absolute',
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              transition: 'all 0.3s ease-out',
              zIndex: 50,
            }}
            className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 rounded-xl shadow-xl font-bold transform hover:scale-105 transition-all duration-300"
          >
            Éo cho
          </Button>
        )}
      </Card>
    </div>
  )
}

