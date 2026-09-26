# Quy trình sửa lỗi

Khi sửa hoặc thêm tính năng cho dự án này:

1. Cập nhật `main` từ `origin/main` và tạo branch mới `codex/<ten-cong-viec>`.
2. Chỉ sửa trên branch đó. Chạy `pnpm run build` trước khi đưa thay đổi lên GitHub.
3. Commit, đẩy branch lên `origin`, tạo pull request vào `main` và kiểm tra phần thay đổi.
4. Merge pull request khi kiểm tra đạt. Xác nhận commit đã nằm trên `main`, rồi xóa branch trên GitHub và branch local.
5. Không force push `main`; nếu có xung đột hoặc kiểm tra lỗi, xử lý trên branch trước khi merge.

Yêu cầu cụ thể của người dùng trong từng lần làm việc được ưu tiên hơn quy trình này.
