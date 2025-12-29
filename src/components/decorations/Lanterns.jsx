export default function Lanterns() {
  return (
    <div className="fixed top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-[1] hidden sm:block">
      <div className="absolute left-[2%] sm:left-[5%] text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-swing drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
        🏮
      </div>
      <div className="absolute right-[2%] sm:right-[5%] text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-swing drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
        style={{ animationDelay: '1.5s' }}>
        🏮
      </div>
    </div>
  )
}

