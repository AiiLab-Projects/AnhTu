type TeacherAvatarProps = {
  className?: string;
  title?: string;
};

// Avatar chân dung Cô Tú (chest-up, kính tím, tay vẫy, sách sao vàng).
// Dùng chung cho Header, Quiz teacher feedback, WordGame tip bubble.
// Khung tròn + viền lavender đã nằm sẵn trong PNG; các container ngoài không
// cần dựng thêm khung — nhưng khi có (vd .brand-avatar, .quiz-teacher-avatar)
// sẽ chồng frame mỏng, chấp nhận được ở kích thước nhỏ 40–60px.
export function TeacherAvatar({
  className = "",
  title = "Minh họa Cô Tú",
}: TeacherAvatarProps) {
  return (
    <img
      className={className}
      src="/img/09-co-tu-avatar-v2.webp"
      alt={title}
      width={300}
      height={300}
      style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
      loading="eager"
      decoding="async"
    />
  );
}
