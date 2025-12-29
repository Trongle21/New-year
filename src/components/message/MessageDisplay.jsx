import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

const messages = [
  "Chúc bạn năm mới an khang thịnh vượng!",
  "Vạn sự như ý, vạn sự thành công!",
  "Sức khỏe dồi dào, hạnh phúc tràn đầy!",
  "Tài lộc đầy nhà, may mắn quanh năm!",
  "Thành công rực rỡ, phát tài phát lộc!"
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
      <Card className="bg-white/10 backdrop-blur-sm border-white/18 w-full max-w-4xl">
        <CardContent className="p-4 sm:p-5 md:p-6">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-semibold drop-shadow-lg animate-fade-in-out text-center leading-relaxed">
            {messages[currentMessage]}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

