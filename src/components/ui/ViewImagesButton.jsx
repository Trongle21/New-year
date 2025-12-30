import { Button } from './button'
import { Image } from 'lucide-react'

function ViewImagesButton({ onClick }) {
  return (
    <div className="mb-8 md:mb-12">
      <Button
        onClick={onClick}
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:from-purple-600 hover:via-pink-600 hover:to-amber-600 text-white text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 rounded-xl shadow-xl font-bold transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
      >
        <Image className="h-6 w-6 sm:h-8 sm:w-8" />
        Xem Ảnh
      </Button>
    </div>
  )
}

export default ViewImagesButton

