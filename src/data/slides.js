// Có thể sử dụng:
// 1. Đường dẫn tương đối từ public folder: '/images/pic1.JPG'
// 2. URL tuyệt đối từ CDN/server: 'https://example.com/image.jpg'
// 3. Import ảnh trực tiếp (nếu đặt trong src/assets): import pic1 from '@/assets/pic1.JPG'

export const slidesData = [
  {
    id: 1,
    // Thay đổi đường dẫn ở đây - có thể dùng URL tuyệt đối
    image: '/images/pic1.JPG', // hoặc 'https://your-cdn.com/images/pic1.JPG'
    title: 'Xem thủy cung nè',
    description: 'Con mẹ nó chứ, đi mục tiêu t là ngắm cá mập + bạch tuộc + cá heo các kiểu. Bạch tuộc, cá heo thì ko thấy đâu, cá mập bằng cái nắm đấm. Lừa, nhưng không seo, vui vl =))',
    year: '2025'
  },
  {
    id: 2,
    image: '/images/pic2.jpg', // hoặc 'https://your-cdn.com/images/pic2.jpg'
    title: 'Game bắn cung nè',
    description: 'Có tiềm năng thành xạ thủ đấy',
    year: '2025'
  },
  {
    id: 3,
    image: '/images/pic3.JPG', // hoặc 'https://your-cdn.com/images/pic3.JPG'
    title: 'Coffe trên tầng thượng',
    description: 'Haizz ngồi nghe nhạc mà suy đét, nghĩ về cuộc đời trong 1h =)). Nhạc hay vl luôn, + 1 điểm đến yêu thích',
    year: '2025'
  },
]

// Hàm helper để xử lý URL (tự động thêm base URL nếu cần)
export const getImageUrl = (imagePath) => {
  // Nếu là URL tuyệt đối (http:// hoặc https://), trả về nguyên vẹn
  if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
    return imagePath
  }
  // Nếu là đường dẫn tương đối, trả về nguyên vẹn (Vite sẽ xử lý)
  if (typeof imagePath === 'string' && imagePath.startsWith('/')) {
    return imagePath
  }
  // Trả về giá trị mặc định
  return imagePath
}

