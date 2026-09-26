# Cô Tú — Anime Kids

Website Next.js 15, React, TypeScript và Tailwind CSS gồm: Trang chủ, Bài học, Bài tập, Kiểm tra, Liên hệ và Lớp học.

## Mở website local bằng một cú nhấp

Nhấp đúp vào `C:\anhTu\Mo-website-Co-Tu.cmd`. Trình duyệt tự mở ở `http://localhost:3000`. Sau khi chỉnh sửa và lưu tệp, nhấn F5 để xem bản mới. Đóng cửa sổ chạy website để dừng.

## Chỉnh sửa nội dung

- Tên Cô Tú, menu, chữ ở trang chủ và thông tin liên hệ: `src/content/site.ts`
- Nội dung sáu bài học: `src/content/lessons.ts`
- Câu hỏi kiểm tra và từ ghép chữ: `src/content/questions.ts`
- Màu sắc, bố cục và hiệu ứng: `src/app/globals.css`
- Minh họa Cô Tú dạng SVG: `src/components/TeacherAvatar.tsx`

Thông tin liên hệ đang để trống theo yêu cầu. Khi có email thật, điền vào `src/content/site.ts`; mẫu lời nhắn sẽ mở ứng dụng email để phụ huynh tự gửi.

Kết quả học tập được lưu trên trình duyệt của thiết bị hiện tại. Giọng đọc dùng tính năng có sẵn của trình duyệt và phụ thuộc vào các giọng tiếng Việt đã cài trên máy.
