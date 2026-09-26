# Quy trình sửa lỗi

Khi sửa hoặc thêm tính năng cho dự án này:

1. Cập nhật `main` từ `origin/main` nếu có thể. Branch riêng là tùy chọn, không bắt buộc cho mỗi lần sửa.
2. Chạy `pnpm run build` trước khi đưa thay đổi lên GitHub.
3. Nếu làm trên branch riêng, tạo pull request, merge vào `main` và xóa branch sau khi xác nhận merge xong.
4. Nếu sửa trực tiếp trên `main`, tạo commit rồi đẩy lên `origin/main`.
5. Không force push `main`; nếu có xung đột hoặc kiểm tra lỗi, xử lý trước khi đưa thay đổi lên GitHub.

Yêu cầu cụ thể của người dùng trong từng lần làm việc được ưu tiên hơn quy trình này.
