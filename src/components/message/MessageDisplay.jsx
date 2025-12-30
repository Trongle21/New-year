import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

const messages = [
  "Chúc m năm mới an khang thịnh vượng!",
  "Vạn sự như ý, vạn sự thành công!",
  "Thành công rực rỡ, phát tài phát lộc!",
  "Happy New Year!"
]

export default function MessageDisplay() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length)
    }, 3000)
    return () => clearInterval(messageInterval)
  }, [])

  return (
    <div className="mt-4 sm:mt-6 md:mt-8 min-h-[60px] sm:min-h-[70px] md:min-h-[80px] flex items-center justify-center px-2">
      <Card className="bg-slate-800/50 backdrop-blur-md border-amber-400/20 w-full max-w-4xl">
        <CardContent className="p-4 sm:p-5 md:p-6">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-amber-50 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-fade-in-out text-center leading-relaxed">
            {messages[currentMessage]}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

