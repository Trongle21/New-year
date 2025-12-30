

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
    title: 'Game bắn cung nè',
    description: 'Có tiềm năng thành xạ thủ đấy',
    year: '2025'
  },
  {
    id: 3,
    image: 'https://i.postimg.cc/mZQyMpXX/pic3.jpg', 
    title: 'Coffee trên tầng thượng',
    description: 'Haizz ngồi nghe nhạc mà suy đét, nghĩ về cuộc đời trong 1h =)). Nhạc hay vl luôn, + 1 điểm đến yêu thích',
    year: '2025'
  },
    {
    id: 4,
    image: 'https://i.postimg.cc/RCd5ddqn/pic4.jpg', 
    title: 'Lần đầu ăn phòng con gái',
    description: 'Phòng éo gì thơm thế, đồ ăn ngon. Ko cho phụ bếp là 1 điểm trừ. (999/1000)',
    year: '2025'
  },  {
    id: 5,
    image: 'https://i.postimg.cc/h4sWsshf/pic5.png', 
    title: 'T đi khám mắt, còn m bị gãy chân, chịu :((',
    description: 'Còn sống là may!!',
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
    description: 'Chân què đi bắt đi nhà ma, đc mống Huy 2 siêu nhát mà, nhưng mà hài dón điên',
    year: '2025'
  },  {
    id: 8,
    image: 'https://i.postimg.cc/gcsFssrq/pic8.jpg', 
    title: 'Zootopia 2',
    description: 'Câu chuyện kể về 3 thằng đi xem phim, 2 thằng quên nội dung, 1 đữa xem review. Vào xem 2 con cáo và thỏ phát cơm CHÓA',
    year: '2025'
  },  {
    id: 9,
    image: 'https://i.postimg.cc/FFp5pp1p/pic9.jpg', 
    title: 'Itadakimasuuu',
    description: 'Oay, đồ ăn công nhận ngon. Mà siêu ồn, giọng thì khàn, ko nói được to. Bao nhiêu tâm sự còn đang dang dở,... Ashiba ',
    year: '2025'
  },  {
    id: 10,
    image: 'https://i.postimg.cc/J7xVxxt6/pic10.jpg', 
    title: 'Nhà thờ lớn đó',
    description: 'Nếu như không biết thì đây là nhà thờ lớn đóooooooo!',
    year: '2025'
  },  {
    id:11,
    image: 'https://i.postimg.cc/qBwVwwgZ/pic11.jpg', 
    title: '👍👍',
    description: '👍👍👍👍👍👍',
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

