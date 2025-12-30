import { Card, CardContent } from './card'
import { Button } from './button'
import { X } from 'lucide-react'

function NewYearMessageModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-yellow-50 to-amber-50 backdrop-blur-lg border-4 border-yellow-400 shadow-2xl relative">
        {/* Close Button - Góc trên bên phải */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 text-amber-800 hover:bg-amber-200/50 z-10"
          aria-label="Đóng"
        >
          <X className="h-6 w-6" />
        </Button>

        <CardContent className="p-6 sm:p-8 md:p-10">
          <div className="text-center space-y-6">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-red-600 drop-shadow-lg mb-6">
              🎉 Chúc Mừng Năm Mới 🎉
            </h2>

            {/* Message Content */}
            <div className="bg-white/80 rounded-xl p-6 sm:p-8 md:p-10 shadow-lg border-2 border-amber-300">
              <div className="text-lg sm:text-xl md:text-2xl text-amber-900 leading-relaxed whitespace-pre-line">
                Nhạc chill chưa. Chúc m năm mới 2026 vui vẻ và thành công! Ngủ sớm đi, giữ sức khỏe và làm những việc mình yêu thích.
              </div>
            </div>

            <Button
              onClick={onClose}
              className="mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-xl shadow-xl font-bold transform hover:scale-105 transition-all duration-300"
            >
              Đóng
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NewYearMessageModal

