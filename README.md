# 🎉 Chúc Mừng Năm Mới 2026

Dự án React đẹp mắt và ý nghĩa để chúc mừng năm mới 2026 với Tailwind CSS và shadcn/ui!

## ✨ Tính năng

- ⏰ Đếm ngược thời gian đến năm mới 2026
- 🎆 Hiệu ứng pháo hoa động
- ✨ Nền sao lấp lánh
- 🎊 Confetti rơi
- 🏮 Trang trí đèn lồng
- 💬 Thông điệp chúc mừng tự động thay đổi
- 📸 **Slideshow kỷ niệm** - Trình chiếu những điều đã làm trong năm qua khi countdown kết thúc
- 🎯 Điều hướng slideshow với nút Next/Previous và keyboard
- 📱 Responsive design cho PC và Mobile

## 🏗️ Cấu trúc dự án

```
src/
├── components/
│   ├── background/
│   │   └── StarsBackground.jsx    # Nền sao lấp lánh
│   ├── countdown/
│   │   └── CountdownTimer.jsx     # Đếm ngược thời gian
│   ├── decorations/
│   │   └── Lanterns.jsx           # Đèn lồng trang trí
│   ├── effects/
│   │   ├── Fireworks.jsx          # Hiệu ứng pháo hoa
│   │   └── Confetti.jsx           # Confetti rơi
│   ├── message/
│   │   └── MessageDisplay.jsx     # Hiển thị thông điệp
│   ├── slideshow/
│   │   ├── Slideshow.jsx          # Component slideshow chính
│   │   └── SlideItem.jsx          # Component cho mỗi slide
│   ├── title/
│   │   └── NewYearTitle.jsx       # Tiêu đề chúc mừng
│   └── ui/
│       ├── card.jsx               # Component Card từ shadcn/ui
│       └── button.jsx             # Component Button từ shadcn/ui
├── data/
│   └── slides.js                  # Dữ liệu slides (ảnh, text)
├── lib/
│   └── utils.js                   # Utility functions
├── App.jsx                        # Component chính
├── main.jsx                       # Entry point
└── index.css                      # Global styles với Tailwind
public/
└── images/                        # Thư mục chứa ảnh slideshow
    └── README.md                  # Hướng dẫn thêm ảnh
```

## 🚀 Cài đặt và chạy

1. Cài đặt dependencies:
```bash
npm install
```

2. **Thêm ảnh vào slideshow:**
   - Đặt 5 ảnh của bạn vào thư mục `public/images/`
   - Đặt tên: `slide1.jpg`, `slide2.jpg`, `slide3.jpg`, `slide4.jpg`, `slide5.jpg`
   - Hoặc chỉnh sửa đường dẫn trong `src/data/slides.js`

3. **Tùy chỉnh nội dung slides:**
   - Mở file `src/data/slides.js`
   - Chỉnh sửa `title` và `description` cho từng slide
   - Cập nhật đường dẫn `image` nếu cần

4. Chạy development server:
```bash
npm run dev
```

5. Build cho production:
```bash
npm run build
```

6. Preview build:
```bash
npm run preview
```

## 🎨 Công nghệ sử dụng

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **CSS3 Animations** - Hiệu ứng động

## 📦 Dependencies chính

- `react` & `react-dom` - React core
- `tailwindcss` - CSS framework
- `class-variance-authority` - Utility cho variants
- `clsx` & `tailwind-merge` - Class name utilities
- `lucide-react` - Icons (sẵn sàng sử dụng)

## 📝 License

MIT

Chúc bạn năm mới 2026 vui vẻ và thành công! 🎊
