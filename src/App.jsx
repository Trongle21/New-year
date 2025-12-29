import { useState } from 'react'
import StarsBackground from './components/background/StarsBackground'
import FireworksEffect from './components/effects/Fireworks'
import Confetti from './components/effects/Confetti'
import CountdownTimer from './components/countdown/CountdownTimer'
import MessageDisplay from './components/message/MessageDisplay'
import Lanterns from './components/decorations/Lanterns'
import NewYearTitle from './components/title/NewYearTitle'
import Slideshow from './components/slideshow/Slideshow'
import AudioPlayer from './components/audio/AudioPlayer'
import PikachuGamePanel from './components/game/PikachuGamePanel'
import { Card } from './components/ui/card'

function App() {
  const [showSlideshow, setShowSlideshow] = useState(false)

  const handleCountdownEnd = () => {
    // Delay một chút để có hiệu ứng mượt mà
    setTimeout(() => {
      setShowSlideshow(true)
    }, 1000)
  }

  return (
    <>
      <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 via-pink-500 via-blue-500 to-cyan-400 bg-[length:400%_400%] animate-[gradient-shift_15s_ease_infinite] flex items-center justify-center py-4 sm:py-6 md:py-8">
        <StarsBackground />
        <FireworksEffect />
        <Confetti />
        <Lanterns />

        <div className="relative z-[2] text-center px-4 sm:px-6 md:px-8 w-full max-w-6xl">
          <Card className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border-white/18 animate-[fadeInUp_1s_ease-out]">
            <NewYearTitle />
            <CountdownTimer onCountdownEnd={handleCountdownEnd} />
            <MessageDisplay />
          </Card>
        </div>

        {/* Audio Player ở góc phải */}
        <AudioPlayer audioSrc="/audio/audio.mp3" />
        
        {/* Pikachu Game Panel - Slide từ bên phải */}
        <PikachuGamePanel />
      </div>

      {/* Slideshow hiển thị khi countdown kết thúc */}
      {showSlideshow && (
        <Slideshow onClose={() => setShowSlideshow(false)} />
      )}
    </>
  )
}

export default App
