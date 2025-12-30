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
import PasswordModal from './components/ui/PasswordModal'
import ViewImagesButton from './components/ui/ViewImagesButton'
import PasswordIconButton from './components/ui/PasswordIconButton'

function App() {
  const [showSlideshow, setShowSlideshow] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [countdownEnded, setCountdownEnded] = useState(() => {
    // Kiểm tra ngay khi component mount xem thời gian đã qua chưa
    try {
      const targetTime = new Date('2026-01-01T00:05:00')
      const now = new Date()
      // Nếu thời gian đã qua hoặc không hợp lệ, tự động hiển thị nút
      return isNaN(targetTime.getTime()) || targetTime <= now
    } catch (error) {
      console.error('Lỗi kiểm tra thời gian:', error)
      // Nếu có lỗi, tự động hiển thị nút
      return true
    }
  })
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [showAudioPrompt, setShowAudioPrompt] = useState(true)
  const [playTrigger, setPlayTrigger] = useState(0)

  const handleCountdownEnd = () => {
    // Không tự động mở slideshow nữa
  }

  const handleCountdownEndStateChange = (ended) => {
    setCountdownEnded(ended)
  }

  const handleViewImages = () => {
    setShowSlideshow(true)
  }

  const handlePasswordIconClick = () => {
    setShowPasswordModal(true)
  }

  const handlePasswordSuccess = () => {
    setShowSlideshow(true)
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
            {!countdownEnded ? (
              <CountdownTimer 
                onCountdownEnd={handleCountdownEnd} 
                onCountdownEndStateChange={handleCountdownEndStateChange}
              />
            ) : (
              <ViewImagesButton onClick={handleViewImages} />
            )}
            <MessageDisplay />
          </Card>
        </div>

        <AudioPlayer audioSrc="/audio/audio.mp3" onPlayStateChange={handleAudioPlayStateChange} playTrigger={playTrigger} />
        
        <PikachuGamePanel />

        <PasswordIconButton onClick={handlePasswordIconClick} />
      </div>

      <PasswordModal 
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handlePasswordSuccess}
      />

      {showSlideshow && (
        <Slideshow onClose={() => setShowSlideshow(false)} />
      )}
    </>
  )
}

export default App
