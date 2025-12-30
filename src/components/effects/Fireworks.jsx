import { useRef, useEffect, useState } from 'react'
import { Fireworks } from '@fireworks-js/react'

export default function FireworksEffect({ intensity = null, delay = null, zIndex = 10 }) {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Tính toán cường độ và delay dựa trên prop hoặc giá trị mặc định
  const fireworksIntensity = intensity !== null ? intensity : (isMobile ? 20 : 30)
  const fireworksDelay = delay !== null ? delay : { min: 15, max: isMobile ? 60 : 30 }

  return (
    <Fireworks
      ref={ref}
      options={{
        // Màu sắc pháo hoa
        hue: { min: 0, max: 360 },
        // Khoảng thời gian giữa các lần bắn (ms)
        delay: fireworksDelay,
        // Số lượng hạt pháo hoa
        rocketsPoint: { min: 50, max: isMobile ? 80 : 100 },
        // Cường độ pháo hoa
        intensity: fireworksIntensity,
        // Tốc độ
        speed: { min: 2, max: 3 },
        // Độ phân tán
        particles: 50,
        // Màu sắc đa dạng
        traceLength: 3,
        traceSpeed: 10,
        // Hiệu ứng nổ
        explosion: 5,
        // Màu sắc ngẫu nhiên
        friction: 0.95,
        gravity: 1.5,
        // Độ sáng
        brightness: { min: 50, max: 80 },
        // Độ mờ
        opacity: 0.5,
        // Hiệu ứng đặc biệt
        decay: { min: 0.015, max: 0.03 },
        // Số lượng pháo hoa đồng thời
        lineWidth: { explosion: { min: 1, max: 3 }, trace: { min: 1, max: 2 } },
        // Hiệu ứng sóng
        sound: {
          enabled: false, // Tắt âm thanh (có thể bật nếu muốn)
          files: [],
          volume: { min: 4, max: 8 }
        }
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: zIndex,
        pointerEvents: 'none' // Cho phép click xuyên qua
      }}
    />
  )
}
