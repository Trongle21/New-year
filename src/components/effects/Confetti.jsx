import { useState, useEffect } from 'react'

export default function Confetti() {
  const [isMobile, setIsMobile] = useState(false)
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181']

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Giảm số lượng confetti trên mobile để tối ưu performance
  const confettiCount = isMobile ? 25 : 50

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[1]">
      {[...Array(confettiCount)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 sm:w-2.5 h-2 sm:h-2.5 top-[-10px] animate-confetti-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)]
          }}
        />
      ))}
    </div>
  )
}

