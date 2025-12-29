import * as React from "react"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(
  ({ className, value, onValueChange, ...props }, ref) => {
    const handleChange = (e) => {
      const newValue = parseFloat(e.target.value)
      onValueChange?.(newValue)
    }

    return (
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={value || 0}
        onChange={handleChange}
        className={cn(
          "w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer",
          "accent-yellow-400",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:cursor-pointer",
          "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-yellow-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Slider.displayName = "Slider"

export { Slider }

