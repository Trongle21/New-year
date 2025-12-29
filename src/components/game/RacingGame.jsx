import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Trophy, Car } from 'lucide-react'

export default function RacingGame() {
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('racingHighScore') || '0')
  })
  const [carPosition, setCarPosition] = useState(50) // 0-100 (trái-phải)
  const [obstacles, setObstacles] = useState([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameSpeed, setGameSpeed] = useState(1)
  const gameAreaRef = useRef(null)
  const timerRef = useRef(null)
  const gameLoopRef = useRef(null)
  const obstacleTimerRef = useRef(null)

  // Lưu high score vào localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('racingHighScore', score.toString())
    }
  }, [score, highScore])

  // Di chuyển xe bằng phím mũi tên hoặc touch
  useEffect(() => {
    if (!isPlaying) return

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault()
        setCarPosition(prev => Math.max(10, prev - 5))
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        setCarPosition(prev => Math.min(90, prev + 5))
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying])

  // Touch controls cho mobile
  const handleTouchMove = (e) => {
    if (!isPlaying) return
    e.preventDefault()
    e.stopPropagation()
    
    const touch = e.touches[0]
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect()
      const touchX = touch.clientX - rect.left
      const percentage = (touchX / rect.width) * 100
      setCarPosition(Math.max(10, Math.min(90, percentage)))
    }
  }

  // Nút điều khiển cho mobile
  const handleLeftPress = () => {
    if (isPlaying) {
      setCarPosition(prev => Math.max(10, prev - 8))
    }
  }

  const handleRightPress = () => {
    if (isPlaying) {
      setCarPosition(prev => Math.min(90, prev + 8))
    }
  }

  // Tạo chướng ngại vật
  useEffect(() => {
    if (!isPlaying) return

    const createObstacle = () => {
      const newObstacle = {
        id: Date.now(),
        x: Math.random() * 60 + 20, // 20-80%
        y: -10,
        type: Math.random() > 0.7 ? 'coin' : 'obstacle'
      }
      setObstacles(prev => [...prev, newObstacle])
    }

    obstacleTimerRef.current = setInterval(createObstacle, 1500 - gameSpeed * 100)
    return () => {
      if (obstacleTimerRef.current) {
        clearInterval(obstacleTimerRef.current)
      }
    }
  }, [isPlaying, gameSpeed])

  // Game loop - di chuyển chướng ngại vật
  useEffect(() => {
    if (!isPlaying) return

    gameLoopRef.current = setInterval(() => {
      setObstacles(prev => {
        const updated = prev.map(obs => ({
          ...obs,
          y: obs.y + 2 + gameSpeed
        })).filter(obs => {
          // Kiểm tra va chạm khi obstacle gần xe (bottom 10% = y > 70)
          if (obs.y > 70 && obs.y < 90) {
            const carLeft = carPosition - 5
            const carRight = carPosition + 5
            const obsLeft = obs.x - 3
            const obsRight = obs.x + 3

            if (obsLeft < carRight && obsRight > carLeft) {
              // Va chạm!
              if (obs.type === 'coin') {
                setScore(s => s + 10)
                return false // Xóa coin sau khi thu thập
              } else {
                // Game over - va chạm với chướng ngại vật
                setTimeout(() => setIsPlaying(false), 100)
                return false
              }
            }
          }
          return obs.y < 110
        })

        // Tăng điểm khi tránh được chướng ngại vật (không phải coin)
        prev.forEach(obs => {
          if (obs.y > 90 && obs.y < 95 && obs.type === 'obstacle') {
            setScore(s => s + 1)
          }
        })

        return updated
      })
    }, 50)

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [isPlaying, carPosition, gameSpeed])

  // Tăng tốc độ theo thời gian
  useEffect(() => {
    if (!isPlaying) return

    const speedTimer = setInterval(() => {
      setGameSpeed(prev => Math.min(prev + 0.1, 3))
    }, 5000)

    return () => clearInterval(speedTimer)
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

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameSpeed(1)
    setCarPosition(50)
    setObstacles([])
    setIsPlaying(true)
  }

  const resetGame = () => {
    setIsPlaying(false)
    setScore(0)
    setTimeLeft(30)
    setGameSpeed(1)
    setCarPosition(50)
    setObstacles([])
    if (timerRef.current) clearInterval(timerRef.current)
    if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    if (obstacleTimerRef.current) clearInterval(obstacleTimerRef.current)
  }

  return (
    <div className="w-full">
      <div className="text-center mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400 mb-2 flex items-center justify-center gap-2">
          <Car className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="hidden sm:inline">Game Đua Xe</span>
          <span className="sm:hidden">Đua Xe</span>
        </h3>

        {/* Score và Timer - Responsive */}
        <div className="flex justify-between items-center mb-3 sm:mb-4 text-white px-2">
          <div className="text-left">
            <div className="text-xs sm:text-sm opacity-80">Điểm</div>
            <div className="text-xl sm:text-2xl font-bold text-yellow-400">{score}</div>
          </div>
          <div className="text-center">
            {isPlaying && (
              <>
                <div className="text-base sm:text-lg font-bold text-red-400 animate-pulse">
                  {timeLeft}s
                </div>
                <div className="text-xs text-yellow-400 mt-0.5 sm:mt-1">
                  {gameSpeed.toFixed(1)}x
                </div>
              </>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs sm:text-sm opacity-80">Kỷ lục</div>
            <div className="text-lg sm:text-xl font-bold text-yellow-400 flex items-center gap-1 justify-end">
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
              {highScore}
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div
          ref={gameAreaRef}
          className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 rounded-lg overflow-hidden border-2 border-yellow-400/30"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onTouchMove={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (isPlaying) {
              handleTouchMove(e)
            }
          }}
          onTouchStart={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (isPlaying) {
              handleTouchMove(e)
            }
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          style={{ touchAction: 'none' }}
        >
          {/* Road lines */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-full bg-yellow-400/50 left-1/2 -translate-x-1/2"
                style={{
                  animation: `roadLine ${1 / gameSpeed}s linear infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>

          {!isPlaying ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/50">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">🏎️</div>
              <p className="text-base sm:text-lg mb-2 font-semibold">Bắt đầu đua xe!</p>
              <p className="text-xs sm:text-sm mb-3 sm:mb-4 opacity-80 px-4 text-center">
                <span className="hidden sm:inline">Dùng ← → hoặc A D để điều khiển</span>
                <span className="sm:hidden">Dùng nút ← → để điều khiển</span>
              </p>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  startGame()
                }}
                onTouchStart={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  startGame()
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base touch-manipulation"
                style={{ touchAction: 'manipulation' }}
              >
                Bắt đầu
              </Button>
            </div>
          ) : timeLeft <= 0 || !isPlaying ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/70">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🏁</div>
              <p className="text-xl sm:text-2xl font-bold mb-2">Kết thúc!</p>
              <p className="text-lg sm:text-xl mb-3 sm:mb-4">Điểm số: <span className="text-yellow-400">{score}</span></p>
              <div className="flex gap-2 flex-col sm:flex-row w-full max-w-[200px] sm:max-w-none px-4">
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    startGame()
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    startGame()
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm sm:text-base py-2.5 sm:py-2 touch-manipulation"
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
                    resetGame()
                  }}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-sm sm:text-base py-2.5 sm:py-2 touch-manipulation"
                  style={{ touchAction: 'manipulation' }}
                >
                  Đóng
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Player Car - Quay lên trên */}
              <div
                className="absolute text-4xl sm:text-5xl md:text-6xl transition-all duration-100"
                style={{
                  left: `${carPosition}%`,
                  bottom: '8%',
                  transform: 'translateX(-50%) rotate(90deg)',
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))'
                }}
              >
                🚗
              </div>

              {/* Obstacles */}
              {obstacles.map(obs => (
                <div
                  key={obs.id}
                  className={`absolute text-3xl sm:text-4xl md:text-5xl transition-none ${
                    obs.type === 'coin' ? 'animate-spin' : ''
                  }`}
                  style={{
                    left: `${obs.x}%`,
                    top: `${obs.y}%`,
                    transform: 'translateX(-50%)',
                    filter: obs.type === 'coin' ? 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.8))' : 'drop-shadow(0 0 4px rgba(255, 0, 0, 0.6))'
                  }}
                >
                  {obs.type === 'coin' ? '🪙' : '🚧'}
                </div>
              ))}


              {/* Instructions - Ẩn trên mobile khi có nút điều khiển */}
              <div className="absolute bottom-12 sm:bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-xs sm:text-sm text-center px-4 hidden sm:block">
                <p>← → hoặc A D để điều khiển</p>
                <p className="text-xs mt-1">Tránh 🚧, thu thập 🪙</p>
              </div>
              
              {/* Instructions cho mobile */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white/90 text-xs text-center px-4 sm:hidden">
                <p>Dùng nút ← → để điều khiển</p>
              </div>
            </>
          )}
        </div>

        {/* Mobile Control Buttons - Đặt bên ngoài game area */}
        {isPlaying && (
          <div className="flex justify-center gap-3 items-center mt-3 sm:hidden">
            <Button
              onTouchStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleLeftPress()
              }}
              onTouchEnd={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleLeftPress()
              }}
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-2xl font-bold active:scale-90 touch-manipulation"
              style={{ touchAction: 'manipulation' }}
            >
              ←
            </Button>
            <Button
              onTouchStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleRightPress()
              }}
              onTouchEnd={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleRightPress()
              }}
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-2xl font-bold active:scale-90 touch-manipulation"
              style={{ touchAction: 'manipulation' }}
            >
              →
            </Button>
          </div>
        )}

        {/* Game Info */}
        {isPlaying && (
          <div className="mt-3 sm:mt-4 text-center text-white/80 text-xs sm:text-sm px-2">
            <p className="hidden sm:block">Tránh chướng ngại vật và thu thập xu để kiếm điểm!</p>
            <p className="sm:hidden">Tránh 🚧, thu thập 🪙 để kiếm điểm!</p>
          </div>
        )}
      </div>

    </div>
  )
}

