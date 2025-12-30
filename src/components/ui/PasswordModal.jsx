import { useState } from 'react'
import { Card, CardContent } from './card'
import { Button } from './button'
import { Input } from './input'
import { Lock, X } from 'lucide-react'

const SLIDESHOW_PASSWORD = 'chiuchiu'

function PasswordModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === SLIDESHOW_PASSWORD) {
      onSuccess()
      setPassword('')
      setPasswordError('')
      onClose()
    } else {
      setPasswordError('Bạn còn N lần thử, cố lên')
      setPassword('')
    }
  }

  const handleClose = () => {
    setPassword('')
    setPasswordError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl relative">
        {/* Close Button - Góc trên bên phải */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute top-2 right-2 text-white hover:bg-white/20 z-10"
          aria-label="Đóng"
        >
          <X className="h-6 w-6" />
        </Button>

        <CardContent className="p-6 sm:p-8 md:p-10">
          <div className="text-center space-y-6">
            {/* Lock Icon */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full p-4">
                <Lock className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg">
              Đoán được mới tài
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              Đúng cho hết countdown luôn
            </p>

            {/* Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError('')
                }}
                placeholder="Nhập mật khẩu..."
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg sm:text-xl py-6 sm:py-7 focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              
              {passwordError && (
                <p className="text-red-400 text-sm sm:text-base animate-pulse">
                  {passwordError}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg sm:text-xl py-6 sm:py-7 font-bold rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Xác Nhận
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PasswordModal

