

export const slidesData = [
  {
    id: 1,
    image: 'https://i.postimg.cc/8cBdSsfQ/pic1.jpg',
    title: 'Xem thủy cung nè',
    description: 'Con mẹ nó chứ, đi mục tiêu t là ngắm cá mập + bạch tuộc + cá heo các kiểu. Bạch tuộc, cá heo thì ko thấy đâu, cá mập bằng cái nắm đấm. Lừa, nhưng không seo, vui vl =))',
    year: '2025'
  },
  {
    id: 2,
    image: 'https://i.postimg.cc/v8Wt92q1/pic2.jpg', 
    title: 'Bắn cung nè',
    description: 'Có tiềm năng thành xạ thủ đấy, trọng chính bắn gà điên',
    year: '2025'
  },
  {
    id: 3,
    image: 'https://i.postimg.cc/mZQyMpXX/pic3.jpg', 
    title: 'Coffee trên tầng thượng',
    description: 'Haizz ngồi nghe nhạc mà suy đét, nghĩ về cuộc đời mà mang nhiều tâm tư quá =)). Nhạc hay vl luôn, + 1 điểm đến yêu thích',
    year: '2025'
  },
    {
    id: 4,
    image: 'https://i.postimg.cc/RCd5ddqn/pic4.jpg', 
    title: 'Lần đầu ăn phòng con gái',
    description: 'Phòng thơm, đẹp, đồ ăn ngon. Ước được ăn thêm!!! Hẹn bữa lẩu nhé',
    year: '2025'
  },  {
    id: 5,
    image: 'https://i.postimg.cc/h4sWsshf/pic5.png', 
    title: 'On this day,T đi khám mắt, còn m bị gãy chân, đúng đen :((',
    description: 'Nhưng Còn sống là may, còn thở là còn gỡ',
    year: '2025'
  },  {
    id: 6,
    image: 'https://i.postimg.cc/05nRnnrw/pic6.jpg', 
    title: 'Team building bất ổn',
    description: 'Tưởng xe bị rơi cmn xuống suối rồi chứ, may vẫn sống hê hê',
    year: '2025'
  },  {
    id: 7,
    image: 'https://i.postimg.cc/KcfSff4t/pic7.jpg', 
    title: 'A long day',
    description: 'Chân què đi bắt đi nhà ma, đc mống Huy 2 siêu nhát, nhưng mà hài dón điên. Secret là thằng Tuyền chó ạ, đủ wow đấy',
    year: '2025'
  },  {
    id: 8,
    image: 'https://i.postimg.cc/gcsFssrq/pic8.jpg', 
    title: 'Zootopia 2',
    description: 'Câu chuyện kể về 3 thằng đi xem phim, 2 đứa quên nội dung, 1 đứa xem review. Vào xem 2 con cáo và thỏ phát cơm CHÓA. Nghĩ lại tiếc tiếc lúc m rủ đi xem đêm =))',
    year: '2025'
  },  {
    id: 9,
    image: 'https://i.postimg.cc/FFp5pp1p/pic9.jpg', 
    title: 'Itadakimasuuu',
    description: 'Oay, đồ ăn công nhận ngon. Mà siêu ồn, giọng thì khàn, ko nói được to.Hơi tiếc khi chưa tâm sự được nhiều, toàn đớp =)),... Ashiba ',
    year: '2025'
  },  {
    id: 10,
    image: 'https://i.postimg.cc/J7xVxxt6/pic10.jpg', 
    title: 'Nhà thờ lớn đó',
    description: 'T đi buổi sáng thấy ko đẹp lắm, muốn thử đi buổi tối xem như thế nào',
    year: '2025'
  },  {
    id:11,
    image: 'https://i.postimg.cc/qBwVwwgZ/pic11.jpg', 
    title: '👍👍',
    description: '👍👍👍👍👍👍',
    year: '2025'
  },
     {
    id:12,
    image: 'https://i.postimg.cc/XvHWDzGb/z7385574397598-6ea565f4201110f1a52dd5442699ea2e.jpg', 
    title: '=))',
    description: 'Thôi thì cảm ơn vì đã đồng hành trong năm qua, giúp cho những tháng cuối năm 2025 của t bớt nhàm chán, cảm nhận cảm xúc của tuổi trẻ, bớt cô đơn và trống trải.Mong trong năm 2026 có thể trải nghiệm nhiều thứ cùng nhau hơn. Đi chơi với Huy đực rựa nhiều quá r.',
    year: '2025'
  },
]


export const getImageUrl = (imagePath) => {

  if (typeof imagePath === 'string' && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
    return imagePath
  }

  if (typeof imagePath === 'string' && imagePath.startsWith('/')) {
    return imagePath
  }

  return imagePath
}

