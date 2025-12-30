import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Music, ListMusic, SkipBack, SkipForward, Shuffle, Repeat, Repeat1, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'

// Danh sách bài hát mặc định
const defaultPlaylist = [
  { id: 1, name: 'Bài hát 1', src: '/audio/audio.mp3' },
  { id: 2, name: 'Bài hát 2', src: '/audio/audio2.mp3' },
  { id: 3, name: 'Bài hát 3', src: '/audio/audio3.mp3' },
  { id: 4, name: 'Bài hát 4', src: '/audio/audio4.mp3' },
  { id: 5, name: 'Bài hát 5', src: '/audio/audio5.mp3' },
]

export default function AudioPlayer({ audioSrc, playlist = defaultPlaylist, onPlayStateChange, playTrigger }) {
  // Tìm index của bài hát hiện tại trong playlist
  const getCurrentSongIndex = () => {
    const currentSrc = audioSrc || playlist[0]?.src
    return playlist.findIndex(song => song.src === currentSrc)
  }

  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [autoplayAttempted, setAutoplayAttempted] = useState(false)
  const [userInteractionHandlerAdded, setUserInteractionHandlerAdded] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(() => {
    const index = getCurrentSongIndex()
    return index >= 0 ? index : 0
  })
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState('off') // 'off', 'one', 'all'
  const [isReversed, setIsReversed] = useState(false)
  const [shuffledOrder, setShuffledOrder] = useState([])
  const [editablePlaylist, setEditablePlaylist] = useState(playlist)
  const [draggedIndex, setDraggedIndex] = useState(null)
  const audioRef = useRef(null)
  
  const currentSong = editablePlaylist[currentSongIndex] || editablePlaylist[0]
  const currentAudioSrc = currentSong?.src || audioSrc

  // Cập nhật editablePlaylist khi playlist prop thay đổi
  useEffect(() => {
    setEditablePlaylist(playlist)
  }, [playlist])

  // Thông báo cho parent component khi trạng thái phát thay đổi
  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPlaying)
    }
  }, [isPlaying, onPlayStateChange])

  // Xử lý khi có request phát nhạc từ bên ngoài
  useEffect(() => {
    if (playTrigger && audioRef.current && !isPlaying) {
      const playAudio = async () => {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
          setUserInteractionHandlerAdded(true)
        } catch (err) {
          console.error('Lỗi khi phát nhạc:', err)
        }
      }
      playAudio()
    }
  }, [playTrigger, isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  // Cập nhật currentSongIndex khi audioSrc từ props thay đổi
  useEffect(() => {
    if (audioSrc) {
      const index = editablePlaylist.findIndex(song => song.src === audioSrc)
      if (index >= 0) {
        setCurrentSongIndex(index)
      }
    }
  }, [audioSrc, editablePlaylist])

  // Cập nhật src khi chuyển bài
  useEffect(() => {
    if (audioRef.current && currentAudioSrc) {
      const wasPlaying = isPlaying
      const oldSrc = audioRef.current.src
      const newSrc = new URL(currentAudioSrc, window.location.origin).href
      
      // Chỉ cập nhật nếu src thay đổi
      if (oldSrc !== newSrc) {
        audioRef.current.src = currentAudioSrc
        audioRef.current.load()
        setCurrentTime(0)
        
        if (wasPlaying) {
          // Đợi một chút để đảm bảo file đã load
          const playPromise = audioRef.current.play()
          if (playPromise !== undefined) {
            playPromise.catch(err => {
              console.error('Error playing audio:', err)
              setIsPlaying(false)
            })
          }
        }
      }
    }
  }, [currentAudioSrc, isPlaying])

  // Cập nhật thời gian khi phát
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      if (!duration && audio.duration) {
        setDuration(audio.duration)
      }
    }

    const updateDuration = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('durationchange', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('durationchange', updateDuration)
    }
  }, [duration])

  // Tạo thứ tự xáo trộn khi bật shuffle
  useEffect(() => {
    if (isShuffle) {
      if (shuffledOrder.length !== editablePlaylist.length) {
        // Tạo lại thứ tự nếu độ dài không khớp
        const order = [...Array(editablePlaylist.length)].map((_, i) => i)
        // Fisher-Yates shuffle
        for (let i = order.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [order[i], order[j]] = [order[j], order[i]]
        }
        setShuffledOrder(order)
      }
    } else {
      setShuffledOrder([])
    }
  }, [isShuffle, editablePlaylist.length])

  // Thêm handler để tự động phát nhạc khi user tương tác lần đầu
  useEffect(() => {
    if (userInteractionHandlerAdded || isPlaying) return

    const handleUserInteraction = async () => {
      if (audioRef.current && !isPlaying) {
        try {
          setUserInteractionHandlerAdded(true)
          await audioRef.current.play()
          setIsPlaying(true)
          console.log('Nhạc đã phát sau khi user tương tác')
        } catch (err) {
          console.error('Lỗi khi phát nhạc:', err)
        }
      }
    }

    // Thêm listener cho các sự kiện user interaction
    document.addEventListener('click', handleUserInteraction, { once: true })
    document.addEventListener('touchstart', handleUserInteraction, { once: true })
    document.addEventListener('keydown', handleUserInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
    }
  }, [userInteractionHandlerAdded, isPlaying])

  // Tự động phát nhạc khi component mount
  useEffect(() => {
    if (autoplayAttempted) return

    const attemptAutoplay = async () => {
      if (!audioRef.current) return
      
      setAutoplayAttempted(true)
      
      // Đợi file nhạc load xong
      const tryPlay = async () => {
        try {
          // Thử phát với muted trước (một số browser cho phép muted autoplay)
          audioRef.current.muted = true
          audioRef.current.volume = volume / 100
          
          await audioRef.current.play()
          setIsPlaying(true)
          
          // Sau khi phát được, unmute sau 100ms
          setTimeout(() => {
            if (audioRef.current && !isMuted) {
              audioRef.current.muted = false
            }
          }, 100)
          
          console.log('Nhạc đã tự động phát')
        } catch (error) {
          console.warn('Không thể tự động phát nhạc (cần tương tác người dùng):', error)
          if (audioRef.current) {
            audioRef.current.muted = isMuted
          }
        }
      }

      if (audioRef.current.readyState >= 2) {
        // File đã sẵn sàng
        tryPlay()
      } else {
        // Đợi file load
        audioRef.current.addEventListener('canplay', tryPlay, { once: true })
      }
    }

    // Delay một chút để đảm bảo audio element đã sẵn sàng
    const timer = setTimeout(attemptAutoplay, 1000)
    return () => clearTimeout(timer)
  }, []) // Chỉ chạy một lần khi mount

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
    if (newVolume > 0) {
      setIsMuted(false)
    }
  }

  const getNextIndex = () => {
    if (isShuffle && shuffledOrder.length > 0) {
      const currentShuffledIndex = shuffledOrder.indexOf(currentSongIndex)
      const nextShuffledIndex = (currentShuffledIndex + 1) % shuffledOrder.length
      return shuffledOrder[nextShuffledIndex]
    }
    if (isReversed) {
      return currentSongIndex === 0 ? editablePlaylist.length - 1 : currentSongIndex - 1
    }
    return (currentSongIndex + 1) % editablePlaylist.length
  }

  const getPrevIndex = () => {
    if (isShuffle && shuffledOrder.length > 0) {
      const currentShuffledIndex = shuffledOrder.indexOf(currentSongIndex)
      const prevShuffledIndex = currentShuffledIndex === 0 ? shuffledOrder.length - 1 : currentShuffledIndex - 1
      return shuffledOrder[prevShuffledIndex]
    }
    if (isReversed) {
      return (currentSongIndex + 1) % editablePlaylist.length
    }
    return currentSongIndex === 0 ? editablePlaylist.length - 1 : currentSongIndex - 1
  }

  const handleAudioEnd = () => {
    if (repeatMode === 'one') {
      // Lặp lại bài hiện tại
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(err => {
          console.error('Error replaying song:', err)
          setIsPlaying(false)
        })
      }
    } else {
      // Chuyển sang bài tiếp theo
      const nextIndex = getNextIndex()
      
      // Kiểm tra xem có phải bài cuối không (khi không có repeat và không shuffle)
      const isLastSong = !isShuffle && !isReversed && 
                         currentSongIndex === editablePlaylist.length - 1 &&
                         repeatMode === 'off'
      
      if (isLastSong && repeatMode === 'off') {
        // Tắt phát khi hết bài cuối và không có repeat
        setIsPlaying(false)
      } else {
        // Chuyển sang bài tiếp theo và đảm bảo sẽ phát
        setIsPlaying(true)
        setCurrentSongIndex(nextIndex)
        
        // Đợi một chút để src được cập nhật, sau đó phát
        setTimeout(() => {
          if (audioRef.current) {
            // Đảm bảo src đã được cập nhật
            const nextSong = editablePlaylist[nextIndex]
            if (nextSong && audioRef.current.src !== nextSong.src) {
              audioRef.current.src = nextSong.src
              audioRef.current.load()
            }
            
            const playPromise = audioRef.current.play()
            if (playPromise !== undefined) {
              playPromise.catch(err => {
                console.error('Error playing next song:', err)
                setIsPlaying(false)
              })
            }
          }
        }, 150)
      }
    }
  }

  const handleNext = () => {
    const nextIndex = getNextIndex()
    setCurrentSongIndex(nextIndex)
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.error('Error playing next song:', err)
      })
    }
  }

  const handlePrevious = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      // Nếu đã phát hơn 3 giây, quay về đầu bài
      audioRef.current.currentTime = 0
    } else {
      // Nếu chưa phát 3 giây, chuyển sang bài trước
      const prevIndex = getPrevIndex()
      setCurrentSongIndex(prevIndex)
      if (isPlaying && audioRef.current) {
        audioRef.current.play().catch(err => {
          console.error('Error playing previous song:', err)
        })
      }
    }
  }

  const handleSeek = (newTime) => {
    if (audioRef.current && duration > 0) {
      const seekTime = Math.max(0, Math.min(newTime, duration))
      audioRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  // Drag and Drop handlers cho playlist
  const handleDragStart = (e, index) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.outerHTML)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      return
    }

    const newPlaylist = [...editablePlaylist]
    const draggedItem = newPlaylist[draggedIndex]
    
    // Xóa item ở vị trí cũ
    newPlaylist.splice(draggedIndex, 1)
    
    // Chèn item vào vị trí mới
    const adjustedDropIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex
    newPlaylist.splice(adjustedDropIndex, 0, draggedItem)
    
    setEditablePlaylist(newPlaylist)
    
    // Cập nhật currentSongIndex nếu cần
    if (draggedIndex === currentSongIndex) {
      setCurrentSongIndex(adjustedDropIndex)
    } else if (dropIndex === currentSongIndex) {
      setCurrentSongIndex(draggedIndex < dropIndex ? currentSongIndex - 1 : currentSongIndex + 1)
    } else if (draggedIndex < currentSongIndex && dropIndex > currentSongIndex) {
      setCurrentSongIndex(currentSongIndex - 1)
    } else if (draggedIndex > currentSongIndex && dropIndex < currentSongIndex) {
      setCurrentSongIndex(currentSongIndex + 1)
    }
    
    setDraggedIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle)
    if (!isShuffle) {
      // Tạo thứ tự mới khi bật shuffle
      const order = [...Array(editablePlaylist.length)].map((_, i) => i)
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]]
      }
      setShuffledOrder(order)
    }
  }

  const toggleRepeat = () => {
    if (repeatMode === 'off') {
      setRepeatMode('all')
    } else if (repeatMode === 'all') {
      setRepeatMode('one')
    } else {
      setRepeatMode('off')
    }
  }

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const selectSong = (index) => {
    setCurrentSongIndex(index)
    setShowPlaylist(false)
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.error('Error playing selected song:', err)
      })
    }
  }

  // Cập nhật currentSongIndex khi editablePlaylist thay đổi
  useEffect(() => {
    if (currentSongIndex >= editablePlaylist.length) {
      setCurrentSongIndex(Math.max(0, editablePlaylist.length - 1))
    }
  }, [editablePlaylist.length])

  const handleAudioError = (e) => {
    console.error('Lỗi tải file nhạc:', e)
    console.error('Đường dẫn:', currentAudioSrc)
    // Tự động chuyển sang bài tiếp theo nếu có lỗi
    const nextIndex = (currentSongIndex + 1) % editablePlaylist.length
    if (nextIndex !== currentSongIndex) {
      setCurrentSongIndex(nextIndex)
    } else {
      setIsPlaying(false)
      alert(`Không thể tải file nhạc!\nĐường dẫn: ${currentAudioSrc}\n\nVui lòng kiểm tra:\n1. File có tồn tại trong public/audio/\n2. Tên file đúng\n3. Định dạng file được hỗ trợ (MP3, OGG, WAV)`)
    }
  }

  const handleAudioLoadStart = () => {
    console.log('Đang tải file nhạc:', currentAudioSrc)
  }

  const handleAudioCanPlay = () => {
    console.log('File nhạc đã sẵn sàng phát:', currentAudioSrc)
  }

  return (
    <div className="fixed top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 z-40 max-w-[calc(100vw-1rem)] sm:max-w-sm">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl transition-all duration-300">
        {/* Minimize Button */}
        <div className="absolute -top-2 -right-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/30 text-white"
            aria-label={isMinimized ? 'Mở rộng' : 'Thu gọn'}
          >
            {isMinimized ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className={`p-2 sm:p-3 transition-all duration-300 ${isMinimized ? 'overflow-hidden' : ''}`}>
          {/* Progress Bar - Luôn hiển thị */}
          {duration > 0 && !isMinimized && (
            <div className="mb-2 sm:mb-3">
              <div 
                className="relative h-2 bg-white/20 rounded-lg cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const clickX = e.clientX - rect.left
                  const percentage = Math.max(0, Math.min(1, clickX / rect.width))
                  const newTime = percentage * duration
                  handleSeek(newTime)
                }}
              >
                {/* Progress fill */}
                <div 
                  className="absolute left-0 top-0 h-full bg-yellow-400 rounded-lg transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                {/* Thumb */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${(currentTime / duration) * 100}% - 8px)` }}
                />
                {/* Clickable input range for dragging */}
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  style={{ zIndex: 10 }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/70 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

          {/* Control Buttons - Thu gọn trên mobile khi minimized */}
          {!isMinimized && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3">
            {/* Shuffle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleShuffle}
              className={`h-8 w-8 sm:h-10 sm:w-10 text-white hover:bg-white/20 rounded-full ${
                isShuffle ? 'bg-yellow-400/30 text-yellow-400' : ''
              }`}
              aria-label="Xáo trộn"
            >
              <Shuffle className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Previous Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="h-8 w-8 sm:h-10 sm:w-10 text-white hover:bg-white/20 rounded-full"
              aria-label="Bài trước"
            >
              <SkipBack className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Play/Pause Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="h-10 w-10 sm:h-12 sm:w-12 text-white hover:bg-white/20 rounded-full"
              aria-label={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
            >
              <Music className={`h-5 w-5 sm:h-6 sm:w-6 ${isPlaying ? 'animate-pulse' : ''}`} />
            </Button>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="h-8 w-8 sm:h-10 sm:w-10 text-white hover:bg-white/20 rounded-full"
              aria-label="Bài tiếp"
            >
              <SkipForward className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Repeat Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleRepeat}
              className={`h-8 w-8 sm:h-10 sm:w-10 text-white hover:bg-white/20 rounded-full ${
                repeatMode !== 'off' ? 'bg-yellow-400/30 text-yellow-400' : ''
              }`}
              aria-label="Lặp lại"
            >
              {repeatMode === 'one' ? (
                <Repeat1 className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Repeat className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
            </div>
          )}

          {/* Song Info - Thu gọn */}
          {!isMinimized && (
            <div className="text-center mb-2 sm:mb-3">
              <p className="text-white/90 text-xs sm:text-sm font-semibold truncate">
                {currentSong?.name || 'Đang tải...'}
              </p>
            </div>
          )}

          {/* Minimized View - Chỉ hiển thị play/pause và tên bài */}
          {isMinimized && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="h-8 w-8 sm:h-10 sm:w-10 text-white hover:bg-white/20 rounded-full flex-shrink-0"
                aria-label={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
              >
                <Music className={`h-4 w-4 sm:h-5 sm:w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
              </Button>
              <div className="flex-1 min-w-0">
                <p className="text-white/90 text-xs sm:text-sm font-semibold truncate">
                  {currentSong?.name || 'Đang tải...'}
                </p>
                {duration > 0 && (
                  <div className="flex items-center gap-1 text-xs text-white/70">
                    <span>{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-8 w-8 sm:h-10 sm:w-10 text-white hover:bg-white/20 rounded-full flex-shrink-0"
                aria-label={isMuted ? 'Bật âm' : 'Tắt âm'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </Button>
            </div>
          )}

          {/* Main Button - Chỉ hiển thị khi không minimized */}
          {!isMinimized && (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Volume Control Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-10 w-10 sm:h-12 sm:w-12 text-white hover:bg-white/20 rounded-full"
                aria-label={isMuted ? 'Bật âm' : 'Tắt âm'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </Button>

              {/* Playlist Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="h-10 w-10 sm:h-12 sm:w-12 text-white hover:bg-white/20 rounded-full"
                aria-label="Danh sách bài hát"
              >
                <ListMusic className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>

              {/* Expand Controls Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowControls(!showControls)}
                className="h-10 w-10 sm:h-12 sm:w-12 text-white hover:bg-white/20 rounded-full"
                aria-label="Điều chỉnh âm lượng"
              >
                <div className="flex items-center gap-1">
                  <div className={`h-1 w-1 rounded-full bg-yellow-400 transition-all ${volume > 0 ? 'opacity-100' : 'opacity-50'}`} />
                  <div className={`h-1.5 w-1.5 rounded-full bg-yellow-400 transition-all ${volume > 25 ? 'opacity-100' : 'opacity-50'}`} />
                  <div className={`h-2 w-2 rounded-full bg-yellow-400 transition-all ${volume > 50 ? 'opacity-100' : 'opacity-50'}`} />
                  <div className={`h-1.5 w-1.5 rounded-full bg-yellow-400 transition-all ${volume > 75 ? 'opacity-100' : 'opacity-50'}`} />
                </div>
              </Button>
            </div>
          )}

          {/* Playlist Dropdown */}
          {showPlaylist && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20 animate-[fadeInUp_0.3s_ease-out] max-h-[200px] overflow-y-auto">
              {/* Reverse Playlist Button */}
              <div className="mb-2 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsReversed(!isReversed)}
                  className={`text-xs h-7 px-2 ${
                    isReversed ? 'bg-yellow-400/30 text-yellow-400' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {isReversed ? 'Thứ tự bình thường' : 'Đảo ngược danh sách'}
                </Button>
              </div>
              <div className="space-y-1">
                {(isReversed ? [...editablePlaylist].reverse() : editablePlaylist).map((song, originalIndex) => {
                  const index = isReversed ? editablePlaylist.length - 1 - originalIndex : originalIndex
                  return (
                    <div
                      key={song.id || index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`w-full px-3 py-2 rounded-lg transition-all cursor-move ${
                        draggedIndex === index ? 'opacity-50' : ''
                      } ${
                        index === currentSongIndex
                          ? 'bg-yellow-400/30 text-yellow-400 font-semibold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <button
                        onClick={() => selectSong(index)}
                        className="w-full text-left flex items-center gap-2"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-white/50 text-xs select-none">⋮⋮</span>
                          {index === currentSongIndex && isPlaying && (
                            <Music className="h-4 w-4 animate-pulse flex-shrink-0" />
                          )}
                          <span className="text-xs sm:text-sm truncate">{song.name}</span>
                        </div>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Volume Slider (Expanded) */}
          {showControls && !isMinimized && (
            <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/20 animate-[fadeInUp_0.3s_ease-out]">
              <div className="flex items-center gap-3">
                <VolumeX className="h-4 w-4 text-white/80 flex-shrink-0" />
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  className="flex-1"
                />
                <Volume2 className="h-4 w-4 text-white/80 flex-shrink-0" />
                <span className="text-white/90 text-xs sm:text-sm font-medium min-w-[35px] text-right">
                  {volume}%
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentAudioSrc}
        autoPlay
        preload="auto"
        playsInline
        onEnded={handleAudioEnd}
        onPlay={() => {
          // Chỉ set isPlaying = true khi thực sự phát được
          if (audioRef.current && !audioRef.current.paused) {
            setIsPlaying(true)
          }
        }}
        onPause={() => setIsPlaying(false)}
        onError={handleAudioError}
        onLoadStart={handleAudioLoadStart}
        onCanPlay={handleAudioCanPlay}
      />
    </div>
  )
}

