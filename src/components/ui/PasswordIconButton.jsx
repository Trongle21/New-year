import { Button } from './button'
import { Lock } from 'lucide-react'

function PasswordIconButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-24 right-[74px] sm:bottom-28 sm:right-[90px] z-40 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Nhập mật khẩu xem ảnh"
    >
      <Lock className="h-5 w-5 sm:h-6 sm:w-6" />
    </Button>
  )
}

export default PasswordIconButton

