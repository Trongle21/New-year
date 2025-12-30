import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import FireworksEffect from '../effects/Fireworks'

const amounts = [
  { value: 10000, label: '10.000₫', image: '/images/10k.jpg' },
  { value: 20000, label: '20.000₫', image: '/images/20k.jpg' },
  { value: 50000, label: '50.000₫', image: '/images/50k.jpg' },
  { value: 100000, label: '100.000₫', image: '/images/100k.jpg' },
]

const STORAGE_KEY = 'redEnvelopeSelected'

export default function RedEnvelope({ onClose }) {
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [isOpened, setIsOpened] = useState(false)
  const [selectedEnvelopeIndex, setSelectedEnvelopeIndex] = useState(null)
  const [moneySliding, setMoneySliding] = useState(false)
  const [hasSelected, setHasSelected] = useState(false)

  // Kiểm tra localStorage khi component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        const savedAmount = amounts.find(a => a.value === parsed.amountValue)
        if (savedAmount) {
          setSelectedAmount(savedAmount)
          setSelectedEnvelopeIndex(parsed.envelopeIndex)
          setIsOpened(true)
          setHasSelected(true)
          // Tự động bật animation sau một chút
          setTimeout(() => {
            setMoneySliding(true)
          }, 300)
        }
      } catch (error) {
        console.error('Lỗi khi đọc dữ liệu từ localStorage:', error)
      }
    }
  }, [])

  // Lưu vào localStorage khi chọn
  const saveToLocalStorage = (amount, envelopeIndex) => {
    const dataToSave = {
      amountValue: amount.value,
      envelopeIndex: envelopeIndex,
      timestamp: Date.now()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  }

  const handleSelectEnvelope = (envelopeIndex) => {
    if (isOpened || hasSelected) return
    
    setSelectedEnvelopeIndex(envelopeIndex)
    
    // Chọn ngẫu nhiên số tiền
    const randomIndex = Math.floor(Math.random() * amounts.length)
    const randomAmount = amounts[randomIndex]
    
    setTimeout(() => {
      setSelectedAmount(randomAmount)
      setIsOpened(true)
      setHasSelected(true)
      
      // Lưu vào localStorage
      saveToLocalStorage(randomAmount, envelopeIndex)
      
      // Bắt đầu animation trượt tiền sau 500ms
      setTimeout(() => {
        setMoneySliding(true)
      }, 500)
    }, 300)
  }

  const handleClose = () => {
    setIsOpened(false)
    setSelectedAmount(null)
    setSelectedEnvelopeIndex(null)
    setMoneySliding(false)
    setTimeout(() => {
      onClose?.()
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-red-900 via-red-800 to-amber-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Pháo hoa ngập trời khi tiền được chọn xong */}
      {moneySliding && (
        <FireworksEffect 
          intensity={80} 
          delay={{ min: 5, max: 15 }} 
          zIndex={101}
        />
      )}
      
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:bg-white/20 z-10"
        aria-label="Đóng"
      >
        <X className="h-6 w-6 sm:h-8 sm:w-8" />
      </Button>

      <div className="relative w-full max-w-4xl flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-300 mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] text-center">
          Chọn Lì Xì 🧧
        </h2>

        {!isOpened ? (
          <>
            {/* 8 Phong bì để chọn */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-6xl mb-8">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                <button
                  key={index}
                  onClick={() => handleSelectEnvelope(index)}
                  disabled={selectedEnvelopeIndex !== null || hasSelected}
                  className="group relative transform transition-all duration-500 hover:-translate-y-6 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <img
                    src="/images/lixi.png"
                    alt={`Bao lì xì ${index + 1}`}
                    className={`w-full h-auto max-w-full drop-shadow-2xl transition-all duration-500 ${
                      selectedEnvelopeIndex === index
                        ? 'scale-110 drop-shadow-[0_20px_40px_rgba(255,0,0,0.5)]'
                        : 'group-hover:drop-shadow-[0_15px_30px_rgba(255,0,0,0.4)]'
                    }`}
                  />
                  {selectedEnvelopeIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl sm:text-5xl md:text-6xl animate-spin">🎁</div>
                    </div>
                  )}
                  {selectedEnvelopeIndex === null && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-yellow-400/90 text-red-800 px-3 py-2 sm:px-4 sm:py-2 rounded-full font-bold text-sm sm:text-base shadow-xl">
                        Chọn! 🎁
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <p className="text-xl sm:text-2xl md:text-3xl text-yellow-200 font-semibold text-center mb-4 animate-pulse">
              {hasSelected ? 'Chọn rồi thì thoai nhé =))' : 'Chọn một bao lì xì để nhận may mắn! 🍀'}
            </p>
          </>
        ) : (
          /* Màn hình sau khi chọn - Tờ tiền trượt ra */
          <div className="relative w-full max-w-5xl">
            {/* Bao lì xì vẫn hiển thị */}
            <div className="flex justify-center mb-8">
              <img
                src="/images/lixi.png"
                alt="Bao lì xì"
                className="w-48 h-auto sm:w-64 md:w-80 opacity-70"
              />
            </div>

            {/* Tờ tiền trượt ra - Nhỏ hơn */}
            <div className="relative flex justify-center items-center min-h-[200px] sm:min-h-[250px]">
              {selectedAmount && (
                <div
                  className={`relative transition-all duration-1000 ease-out ${
                    moneySliding
                      ? 'translate-x-0 translate-y-0 opacity-100 scale-100'
                      : 'translate-x-[-200%] translate-y-[-100%] opacity-0 scale-50'
                  }`}
                >
                  <img
                    src={selectedAmount.image}
                    alt={`Tờ tiền ${selectedAmount.label}`}
                    className="w-32 h-auto sm:w-40 md:w-48 max-w-full shadow-2xl rounded-lg border-2 border-yellow-400"
                  />
                </div>
              )}
            </div>

            {/* Thông báo số tiền */}
            <div
              className={`text-center mt-8 transition-all duration-1000 delay-700 ${
                moneySliding ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 sm:p-8 md:p-12 shadow-2xl border-4 border-yellow-400 inline-block">
                <div className="mb-6">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-red-600 mb-4 sm:mb-6 drop-shadow-lg">
                    {selectedAmount?.label}
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-800 mb-2">
                    Chúc Mừng, Chúc mừng, hehe
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl text-amber-700">
                  Nhắn qua facebook t để húp NẾU CẦN nhé!!
                  </p>
                </div>

                <Button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 rounded-xl shadow-xl font-bold transform hover:scale-105 transition-all duration-300"
                >
                  Đóng
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

