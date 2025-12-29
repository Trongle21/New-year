import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

export default function CountdownTimer({ onCountdownEnd }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [hasEnded, setHasEnded] = useState(false)

  useEffect(() => {
    // Set thời gian đếm ngược còn 10 giây (để test)
    const targetTime = new Date(Date.now() + 10 * 100000) // 10 giây từ bây giờ
    
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetTime - now

      if (difference > 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: Math.floor((difference / 1000) % 60)
        })
        setHasEnded(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        if (!hasEnded) {
          setHasEnded(true)
          onCountdownEnd?.()
        }
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [hasEnded, onCountdownEnd])

  // Chỉ hiển thị giây khi đếm ngược 10 giây
  const countdownItems = [
    { value: timeLeft.seconds, label: 'Giây' }
  ]

  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 mb-8 md:mb-12 flex-wrap px-2">
      {countdownItems.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <Card className="bg-white/20 backdrop-blur-md border-white/18 shadow-lg min-w-[70px] sm:min-w-[90px] md:min-w-[120px] p-4 sm:p-6 md:p-8 hover:scale-110 active:scale-95 transition-transform duration-300 animate-float touch-manipulation"
            style={{ animationDelay: `${index * 0.5}s` }}>
            <CardContent className="p-0 text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-yellow-400 mb-1 sm:mb-2 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] font-mono">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-white/90 font-semibold uppercase tracking-wider">
                {item.label}
              </div>
            </CardContent>
          </Card>
          {index < countdownItems.length - 1 && (
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-yellow-400 font-bold animate-pulse hidden sm:inline">:</span>
          )}
        </div>
      ))}
    </div>
  )
}

