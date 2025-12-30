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
import AudioPromptIcon from './components/audio/AudioPromptIcon'
import PikachuGamePanel from './components/game/PikachuGamePanel'
import { Card } from './components/ui/card'

function App() {
  const [showSlideshow, setShowSlideshow] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [showAudioPrompt, setShowAudioPrompt] = useState(true)
  const [playTrigger, setPlayTrigger] = useState(0)

  const handleCountdownEnd = () => {
    setTimeout(() => {
      setShowSlideshow(true)
    }, 0)
  }

  const handleAudioPlayStateChange = (isPlaying) => {
    setIsAudioPlaying(isPlaying)
    // Chỉ ẩn icon khi nhạc thực sự đang phát (thêm delay để tránh ẩn quá sớm)
    if (isPlaying) {
      // Delay một chút để đảm bảo nhạc thực sự đang phát
      setTimeout(() => {
        setShowAudioPrompt(false)
      }, 500)
    }
  }

  const handlePromptClick = () => {
    setShowAudioPrompt(false)
    // Trigger phát nhạc
    setPlayTrigger(prev => prev + 1)
  }

  return (
    <>
      <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 via-indigo-900 to-slate-800 bg-[length:400%_400%] animate-[gradient-shift_20s_ease_infinite] flex items-center justify-center py-4 sm:py-6 md:py-8">
        <StarsBackground />
        <FireworksEffect />
        <Confetti />
        <Lanterns />

        {/* Icon nhạc nhỏ góc trái trên */}
        <AudioPromptIcon 
          onClick={handlePromptClick}
          isVisible={showAudioPrompt}
        />

        <div className="relative z-[2] text-center px-4 sm:px-6 md:px-8 w-full max-w-6xl">
          <Card className="bg-slate-900/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border-purple-500/20 animate-[fadeInUp_1s_ease-out]">
            <NewYearTitle />
            <CountdownTimer onCountdownEnd={handleCountdownEnd} />
            <MessageDisplay />
          </Card>
        </div>

        <AudioPlayer audioSrc="/audio/audio.mp3" onPlayStateChange={handleAudioPlayStateChange} playTrigger={playTrigger} />
        
        <PikachuGamePanel />
      </div>

      {showSlideshow && (
        <Slideshow onClose={() => setShowSlideshow(false)} />
      )}
    </>
  )
}

export default App
