# Thư mục nhạc nền

Đặt file nhạc nền của bạn vào thư mục này.

## Hướng dẫn:

1. Đặt file nhạc của bạn vào thư mục `public/audio/`
2. Đặt tên file: `background-music.mp3`
3. Hoặc bạn có thể đổi tên và cập nhật đường dẫn trong file `src/App.jsx`:
   ```jsx
   <AudioPlayer audioSrc="/audio/ten-file-cua-ban.mp3" />
   ```

## Định dạng nhạc được hỗ trợ:
- MP3 (khuyến nghị)
- OGG
- WAV
- M4A

## Lưu ý:
- File nhạc sẽ tự động lặp lại (loop)
- Nhạc sẽ phát khi người dùng click nút play
- Có thể điều chỉnh âm lượng từ 0% đến 100%
- Có thể tắt/bật âm thanh bằng nút mute

## Gợi ý:
- Sử dụng file MP3 với bitrate 128-192 kbps để tối ưu kích thước file
- File nhạc nên có độ dài từ 2-5 phút để phù hợp với slideshow

