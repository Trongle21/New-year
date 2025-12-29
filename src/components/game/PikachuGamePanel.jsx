import { useState } from 'react'
import { X, Gamepad2, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PikachuGame from './PikachuGame'
import RacingGame from './RacingGame'
import GameMenu from './GameMenu'

export default function PikachuGamePanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState('pikachu')
  const [showMenu, setShowMenu] = useState(true) // Mặc định hiển thị menu

  const togglePanel = () => {
    const newState = !isOpen
    setIsOpen(newState)
    
    // Khi mở panel, hiển thị menu chọn game
    if (newState) {
      setShowMenu(true)
      // Ngăn scroll body trên mobile
      if (window.innerWidth < 768) {
        document.body.classList.add('game-panel-open')
      }
    } else {
      // Cho phép scroll lại
      if (window.innerWidth < 768) {
        document.body.classList.remove('game-panel-open')
      }
    }
  }

  return (
    <>
      {/* Toggle Button - Góc phải dưới, trên AudioPlayer */}
      <Button
        onClick={togglePanel}
        className={`fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-40 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? 'opacity-0 pointer-events-none translate-x-full' : 'opacity-100 translate-x-0'
        }`}
        aria-label="Mở game Pikachu"
      >
        <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {/* Slide Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] md:w-[500px] bg-gradient-to-br from-yellow-400/95 via-orange-400/95 to-red-400/95 backdrop-blur-lg shadow-2xl z-[100] transition-transform duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onTouchStart={(e) => {
          e.stopPropagation()
        }}
        onTouchMove={(e) => {
          e.stopPropagation()
        }}
        style={{ 
          touchAction: 'pan-y',
          pointerEvents: 'auto'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 sm:p-6 border-b border-black/10 bg-white/10 relative z-10"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowMenu(true)
              }}
              onTouchEnd={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowMenu(true)
              }}
              className="h-10 w-10 rounded-full hover:bg-black/20 text-black active:scale-95 transition-transform z-20 relative"
              style={{ touchAction: 'manipulation' }}
              aria-label="Menu game"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">
                {selectedGame === 'pikachu' ? '⚡' : '🏎️'}
              </span>
              <span className="hidden sm:inline">
                {selectedGame === 'pikachu' ? 'Game Pikachu' : 'Game Đua Xe'}
              </span>
              <span className="sm:hidden">
                {selectedGame === 'pikachu' ? 'Pikachu' : 'Đua Xe'}
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              togglePanel()
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
            }}
            onTouchEnd={(e) => {
              e.stopPropagation()
              e.preventDefault()
              togglePanel()
            }}
            className="h-10 w-10 rounded-full hover:bg-black/20 text-black active:scale-95 transition-transform touch-manipulation z-10 relative flex items-center justify-center"
            style={{ touchAction: 'manipulation' }}
            aria-label="Đóng game"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Game Content */}
        <div 
          className="h-[calc(100%-80px)] sm:h-[calc(100%-96px)] overflow-y-auto p-3 sm:p-4 md:p-6 scrollbar-thin scrollbar-thumb-yellow-400/50 scrollbar-track-transparent"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onTouchStart={(e) => {
            e.stopPropagation()
          }}
          onTouchMove={(e) => {
            e.stopPropagation()
          }}
          onTouchEnd={(e) => {
            e.stopPropagation()
          }}
          style={{ 
            touchAction: 'pan-y',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {showMenu ? (
            <GameMenu
              selectedGame={selectedGame}
              onSelectGame={(gameId) => {
                setSelectedGame(gameId)
                setShowMenu(false)
              }}
              onClose={() => setShowMenu(false)}
            />
          ) : (
            <>
              {selectedGame === 'pikachu' ? (
                <PikachuGame />
              ) : (
                <RacingGame />
              )}
            </>
          )}
        </div>

      </div>

      {/* Overlay khi mở trên mobile - Đặt bên ngoài panel */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99] sm:hidden transition-opacity duration-500"
          onClick={(e) => {
            // Chỉ đóng khi click vào overlay, không phải panel
            if (e.target === e.currentTarget) {
              togglePanel()
            }
          }}
          onTouchEnd={(e) => {
            // Chỉ đóng khi touch vào overlay, không phải panel
            if (e.target === e.currentTarget) {
              togglePanel()
            }
          }}
          aria-hidden="true"
        />
      )}
    </>
  )
}

