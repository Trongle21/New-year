import { Zap, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'

const games = [
  {
    id: 'pikachu',
    name: 'Game Pikachu',
    icon: Zap,
    description: 'Click vào Pikachu để kiếm điểm!'
  },
  {
    id: 'racing',
    name: 'Game Đua Xe',
    icon: Car,
    description: 'Tránh chướng ngại vật và thu thập xu!'
  }
]

export default function GameMenu({ selectedGame, onSelectGame, onClose }) {
  return (
    <div 
      className="p-4 sm:p-6"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onTouchStart={(e) => {
        e.stopPropagation()
      }}
    >
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">Chọn Game</h3>
        <p className="text-sm text-black/70">Chọn game bạn muốn chơi</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {games.map(game => {
          const Icon = game.icon
          const isSelected = selectedGame === game.id
          
          return (
            <Button
              key={game.id}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onSelectGame(game.id)
              }}
              onTouchStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onSelectGame(game.id)
              }}
              className={`h-auto p-4 sm:p-6 flex flex-col items-center gap-3 transition-all ${
                isSelected
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-black border-2 border-black'
                  : 'bg-white/20 hover:bg-white/30 text-black border-2 border-black/20'
              }`}
            >
              <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${isSelected ? 'animate-pulse' : ''}`} />
              <div className="text-center">
                <div className="font-bold text-sm sm:text-base">{game.name}</div>
                <div className="text-xs opacity-80 mt-1">{game.description}</div>
              </div>
              {isSelected && (
                <div className="text-xs font-semibold bg-black/20 px-2 py-1 rounded">
                  Đang chơi
                </div>
              )}
            </Button>
          )
        })}
      </div>

      {onClose && (
        <Button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }}
          onTouchStart={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }}
          variant="outline"
          className="w-full mt-4 border-black/30 text-black hover:bg-black/10"
        >
          Đóng menu
        </Button>
      )}
    </div>
  )
}

