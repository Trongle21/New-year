import { Music } from 'lucide-react'

export default function AudioPromptIcon({ onClick, isVisible }) {
  if (!isVisible) return null

  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-[50] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-full transition-all duration-300"
      aria-label="Click để phát nhạc"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg animate-ping" style={{ animationDuration: '2s' }} />
        
        {/* Icon container */}
        <div className="relative bg-gradient-to-br from-purple-600/90 to-indigo-600/90 backdrop-blur-xl border-2 border-yellow-400/50 rounded-full p-3 sm:p-4 shadow-2xl transform transition-all duration-300 hover:scale-110 active:scale-95 group-hover:border-yellow-400">
          <Music className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 animate-[bounce_1s_ease-in-out_infinite,rotate_3s_linear_infinite]" />
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full border-2 border-yellow-400/40 animate-ping" style={{ animationDuration: '1.5s' }} />
      </div>
      
      {/* Tooltip */}
      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <div className="bg-slate-900/90 backdrop-blur-sm text-white text-xs sm:text-sm px-3 py-2 rounded-lg shadow-xl border border-yellow-400/30">
          🎵 Click để phát nhạc
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/90" />
        </div>
      </div>
    </button>
  )
}

