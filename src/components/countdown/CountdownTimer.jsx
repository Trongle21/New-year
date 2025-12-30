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
    const targetTime = new Date(Date.now() + 10 * 1000) // 10 giây từ bây giờ
    
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
          <Card className="bg-slate-800/60 backdrop-blur-md border-amber-400/30 shadow-xl min-w-[70px] sm:min-w-[90px] md:min-w-[120px] p-4 sm:p-6 md:p-8 hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation"
            style={{ animationDelay: `${index * 0.5}s` }}>
            <CardContent className="p-0 text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-300 mb-1 sm:mb-2 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)] font-mono">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-amber-200/90 font-medium uppercase tracking-wider">
                {item.label}
              </div>
            </CardContent>
          </Card>
          {index < countdownItems.length - 1 && (
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-300/80 font-bold hidden sm:inline">:</span>
          )}
        </div>
      ))}
    </div>
  )
}

