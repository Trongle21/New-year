import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Trophy, Zap } from 'lucide-react'

export default function PikachuGame() {
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('pikachuHighScore') || '0')
  })
  const [pikachuPosition, setPikachuPosition] = useState({ x: 50, y: 50 })
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState(30) // 30 giây
  const [isPlaying, setIsPlaying] = useState(false)
  const [combo, setCombo] = useState(0)
  const [showBonus, setShowBonus] = useState(false)
  const gameAreaRef = useRef(null)
  const timerRef = useRef(null)
  const positionTimerRef = useRef(null)

  // Lưu high score vào localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('pikachuHighScore', score.toString())
    }
  }, [score, highScore])

  // Di chuyển Pikachu ngẫu nhiên
  useEffect(() => {
    if (!isPlaying) return

    const movePikachu = () => {
      if (gameAreaRef.current) {
        const maxX = 85 // Giới hạn để không ra ngoài màn hình
        const maxY = 80
        const minX = 5
        const minY = 10

        setPikachuPosition({
          x: Math.random() * (maxX - minX) + minX,
          y: Math.random() * (maxY - minY) + minY
        })
        setIsVisible(true)
      }
    }

    // Di chuyển mỗi 1-2 giây
    positionTimerRef.current = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        movePikachu()
      }, 300)
    }, Math.random() * 1000 + 1000)

    return () => {
      if (positionTimerRef.current) {
        clearInterval(positionTimerRef.current)
      }
    }
  }, [isPlaying])

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, timeLeft])

  const handlePikachuClick = () => {
    if (!isPlaying || !isVisible) return

    const points = combo >= 5 ? 10 : combo >= 3 ? 5 : 2
    setScore(prev => prev + points)
    setCombo(prev => prev + 1)
    
    // Hiển thị bonus text
    if (combo >= 3) {
      setShowBonus(true)
      setTimeout(() => setShowBonus(false), 1000)
    }

    // Ẩn và di chuyển Pikachu
    setIsVisible(false)
    setTimeout(() => {
      if (gameAreaRef.current) {
        const maxX = 85
        const maxY = 80
        const minX = 5
        const minY = 10
        setPikachuPosition({
          x: Math.random() * (maxX - minX) + minX,
          y: Math.random() * (maxY - minY) + minY
        })
        setIsVisible(true)
      }
    }, 200)
  }

  const startGame = () => {
    setScore(0)
    setCombo(0)
    setTimeLeft(30)
    setIsPlaying(true)
    setPikachuPosition({ x: 50, y: 50 })
    setIsVisible(true)
  }

  const resetGame = () => {
    setIsPlaying(false)
    setScore(0)
    setCombo(0)
    setTimeLeft(30)
    if (timerRef.current) clearInterval(timerRef.current)
    if (positionTimerRef.current) clearInterval(positionTimerRef.current)
  }

  return (
    <div className="w-full select-none">
        <div className="text-center mb-4 select-none">
          <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2 flex items-center justify-center gap-2">
            <Zap className="h-6 w-6" />
            Game Pikachu
          </h3>
          
          {/* Score và Timer */}
          <div className="flex justify-between items-center mb-4 text-white">
            <div className="text-left">
              <div className="text-sm opacity-80">Điểm số</div>
              <div className="text-2xl font-bold text-yellow-400">{score}</div>
            </div>
            <div className="text-center">
              {isPlaying && (
                <div className="text-lg font-bold text-red-400 animate-pulse">
                  {timeLeft}s
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Kỷ lục</div>
              <div className="text-xl font-bold text-yellow-400 flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                {highScore}
              </div>
            </div>
          </div>

          {/* Combo */}
          {combo > 0 && (
            <div className="mb-2">
              <span className="text-yellow-400 font-bold">
                Combo x{combo}!
              </span>
            </div>
          )}

          {/* Game Area */}
          <div
            ref={gameAreaRef}
            className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-lg overflow-hidden border-2 border-yellow-400/30 select-none"
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
              touchAction: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            {!isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="text-6xl mb-4 animate-bounce">⚡</div>
                <p className="text-lg mb-4">Bắt đầu game Pikachu!</p>
                <Button
                  onClick={startGame}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3"
                >
                  Bắt đầu
                </Button>
              </div>
            ) : timeLeft <= 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/50 select-none">
                <div className="text-6xl mb-4 pointer-events-none">🎉</div>
                <p className="text-2xl font-bold mb-2 pointer-events-none">Hết giờ!</p>
                <p className="text-xl mb-4 pointer-events-none">Điểm số: <span className="text-yellow-400">{score}</span></p>
                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      startGame()
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold touch-manipulation"
                    style={{ touchAction: 'manipulation' }}
                  >
                    Chơi lại
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      resetGame()
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 touch-manipulation"
                    style={{ touchAction: 'manipulation' }}
                  >
                    Đóng
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Pikachu */}
                <div
                  onClick={handlePikachuClick}
                  onTouchStart={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handlePikachuClick()
                  }}
                  className={`absolute cursor-pointer transition-all duration-300 touch-manipulation select-none ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  } ${isVisible ? 'hover:scale-110 active:scale-95' : ''}`}
                  style={{
                    left: `${pikachuPosition.x}%`,
                    top: `${pikachuPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                    touchAction: 'manipulation',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  <div 
                    className="text-6xl sm:text-8xl animate-bounce filter drop-shadow-lg pointer-events-none select-none"
                    style={{ userSelect: 'none' }}
                  >
                    ⚡
                  </div>
                  <div 
                    className="text-4xl sm:text-6xl -mt-4 animate-pulse pointer-events-none select-none"
                    style={{ userSelect: 'none' }}
                  >
                    🐭
                  </div>
                </div>

                {/* Bonus Text */}
                {showBonus && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="text-4xl font-bold text-yellow-400 animate-ping">
                      +{combo >= 5 ? 10 : 5}!
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm text-center px-4 pointer-events-none select-none">
                  Click vào Pikachu để kiếm điểm! ⚡
                </div>
              </>
            )}
          </div>

          {/* Game Info */}
          {isPlaying && (
            <div className="mt-4 text-center text-white/80 text-sm">
              <p>Combo x{combo} = {combo >= 5 ? 10 : combo >= 3 ? 5 : 2} điểm mỗi lần!</p>
            </div>
          )}
        </div>
    </div>
  )
}

