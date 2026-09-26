export const lessonGrades = [1, 2, 3, 4, 5] as const;
export type LessonGrade = (typeof lessonGrades)[number];

export type Lesson = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  icon: string;
  tone: "blue" | "purple" | "pink" | "orange" | "green" | "yellow";
  category: string;
  /** Lớp 1–5 mà bài dành cho. Bỏ trống thì bài chỉ hiện ở tab "Tất cả" của trang Bài học. */
  grade?: LessonGrade;
  intro: string;
  points: { title: string; body: string; example: string }[];
  check: { question: string; options: string[]; answer: number; explanation: string };
};

// Lộ trình bổ trợ theo các kĩ năng đọc, viết, nói, nghe của môn Tiếng Việt tiểu học.
// Thứ tự bài học do Cô Tú biên soạn; không thay thế thứ tự của một bộ sách giáo khoa.
// `grade` là phân lớp ĐỀ XUẤT theo mức độ của Chương trình GDPT 2018 môn Tiếng Việt (chữ cái, vần,
// dấu thanh → lớp 1; chính tả, từ vựng, câu → lớp 2; đọc hiểu, câu hỏi → lớp 3; từ loại → lớp 4;
// miêu tả người → lớp 5). Cô Tú điều chỉnh lại cho phù hợp lớp mình dạy.
export const lessons: Lesson[] = [
  {
    slug: "nguyen-am-phu-am", number: 1, title: "Nguyên âm và phụ âm là gì?",
    summary: "Làm quen với chữ cái và cách ghép chúng thành tiếng.",
    icon: "🔤", tone: "blue", category: "Làm quen chữ cái", grade: 1,
    intro: "Bảng chữ cái tiếng Việt có 29 chữ. Ta sẽ nhận ra chữ ghi nguyên âm và chữ ghi phụ âm để tập đọc tiếng.",
    points: [
      { title: "Chữ ghi nguyên âm", body: "Khi phát âm, luồng hơi đi ra khá tự do. Một số nguyên âm có thêm dấu mũ hoặc dấu móc.", example: "a · ă · â · e · ê · i · o · ô · ơ · u · ư · y" },
      { title: "Chữ ghi phụ âm", body: "Nhiều chữ ghi phụ âm đứng trước nguyên âm để tạo thành tiếng.", example: "b trong ba · m trong me" },
      { title: "Ghép để đọc", body: "Nhìn chữ đầu, đọc phần vần rồi đọc liền mạch cả tiếng.", example: "b + a = ba · m + e = me" },
    ],
    check: { question: "Chữ nào là chữ ghi nguyên âm?", options: ["b", "a", "m"], answer: 1, explanation: "Chữ a ghi một nguyên âm." },
  },
  {
    slug: "nhom-a", number: 2, title: "Nhóm A — A, Ă, Â",
    summary: "Nhận ra a, ă, â và đọc các tiếng quen thuộc.",
    icon: "🌙", tone: "purple", category: "Nhóm nguyên âm", grade: 1,
    intro: "Ba chữ a, ă, â có hình gần giống nhau. Hãy nhìn dấu trên đầu và nghe cách đọc từng chữ.",
    points: [
      { title: "Chữ a", body: "Chữ a không có dấu trên đầu; mở miệng khi đọc.", example: "ba · ca · lá" },
      { title: "Chữ ă", body: "Chữ ă có dấu râu cong nhỏ ở trên.", example: "ăn · khăn · trăng" },
      { title: "Chữ â", body: "Chữ â có dấu mũ ở trên.", example: "ân · sân · cân" },
    ],
    check: { question: "Tiếng nào có chữ ă?", options: ["cá", "trăng", "sân"], answer: 1, explanation: "Tiếng trăng có chữ ă." },
  },
  {
    slug: "nhom-e", number: 3, title: "Nhóm E — E, Ê",
    summary: "Đọc e và ê qua những tiếng gần gũi.",
    icon: "🚲", tone: "pink", category: "Nhóm nguyên âm", grade: 1,
    intro: "Chữ ê có thêm dấu mũ so với chữ e. Quan sát và đọc thành tiếng để phân biệt nhé.",
    points: [
      { title: "Chữ e", body: "Chữ e không có dấu mũ.", example: "em · xe · me" },
      { title: "Chữ ê", body: "Chữ ê có dấu mũ. Khi đọc, miệng khép hơn âm e.", example: "ê · ghế · lê" },
      { title: "So sánh", body: "Nhìn dấu mũ trước khi đọc hoặc viết.", example: "e trong xe · ê trong ghế" },
    ],
    check: { question: "Tiếng nào có chữ ê?", options: ["xe", "em", "ghế"], answer: 2, explanation: "Tiếng ghế có chữ ê." },
  },
  {
    slug: "nhom-o", number: 4, title: "Nhóm O — O, Ô, Ơ",
    summary: "Phân biệt ba chữ o, ô, ơ bằng hình chữ và tiếng mẫu.",
    icon: "🐄", tone: "orange", category: "Nhóm nguyên âm", grade: 1,
    intro: "O, ô, ơ là ba chữ ghi ba nguyên âm khác nhau. Dấu mũ và dấu móc giúp em nhận ra chúng.",
    points: [
      { title: "Chữ o", body: "Chữ o không có dấu trên đầu. Môi tròn khi đọc.", example: "o · bò · con" },
      { title: "Chữ ô", body: "Chữ ô có dấu mũ. Môi vẫn tròn, cách đọc khác o.", example: "ô · cô · bố" },
      { title: "Chữ ơ", body: "Chữ ơ có dấu móc ở bên phải. Hãy nghe và đọc riêng âm này.", example: "ơ · mơ · cờ" },
    ],
    check: { question: "Tiếng nào có chữ ơ?", options: ["cô", "mơ", "con"], answer: 1, explanation: "Tiếng mơ có chữ ơ với dấu móc." },
  },
  {
    slug: "nhom-u", number: 5, title: "Nhóm U — U, Ư",
    summary: "Nhận biết u và ư qua dấu móc và ví dụ.",
    icon: "🧢", tone: "green", category: "Nhóm nguyên âm", grade: 1,
    intro: "U và ư nhìn rất gần nhau. Dấu móc ở bên phải sẽ giúp em tìm chữ ư.",
    points: [
      { title: "Chữ u", body: "Chữ u không có dấu móc; môi tròn khi đọc.", example: "u · thu · mũ" },
      { title: "Chữ ư", body: "Chữ ư có dấu móc; đọc khác u, môi ít tròn hơn.", example: "ư · thư · sư" },
      { title: "Luyện phân biệt", body: "Quan sát chữ, nghe mẫu rồi đọc lại.", example: "u trong thu · ư trong thư" },
    ],
    check: { question: "Tiếng nào có chữ ư?", options: ["thu", "thư", "mũ"], answer: 1, explanation: "Tiếng thư có chữ ư." },
  },
  {
    slug: "nhom-i-y", number: 6, title: "Nhóm I — I, Y",
    summary: "Nhận ra i và y trong những tiếng thường gặp.",
    icon: "🩺", tone: "yellow", category: "Nhóm nguyên âm", grade: 1,
    intro: "I và y đều có thể ghi âm /i/ trong một số tiếng. Cách viết từng từ cần được ghi nhớ khi đọc và viết.",
    points: [
      { title: "Chữ i", body: "Chữ i xuất hiện trong nhiều tiếng quen thuộc.", example: "bi · đi · im" },
      { title: "Chữ y", body: "Chữ y có trong một số từ; không tự ý đổi y thành i khi viết.", example: "y tá · yêu · uy" },
      { title: "Nhìn cả từ", body: "Đọc và chép đúng chữ xuất hiện trong từ mẫu.", example: "y tá · đi học" },
    ],
    check: { question: "Từ nào viết bằng chữ y?", options: ["đi", "y tá", "bi"], answer: 1, explanation: "Từ y tá bắt đầu bằng chữ y." },
  },
  {
    slug: "phu-am-dau", number: 7, title: "Phụ âm đầu",
    summary: "Làm quen 17 chữ cái phụ âm và cách chúng đứng đầu tiếng.",
    icon: "🍎", tone: "blue", category: "Phụ âm", grade: 1,
    intro: "Ta cùng nhận diện 17 chữ cái thuộc nhóm phụ âm: b, c, d, đ, g, h, k, l, m, n, p, q, r, s, t, v, x. Một số chữ thường đi cùng chữ khác khi ghi âm đầu.",
    points: [
      { title: "Những chữ quen thuộc", body: "Nhiều chữ đứng đầu tiếng rồi ghép với vần.", example: "b + a = ba · m + e = me" },
      { title: "Nhìn chữ đầu", body: "Đọc từ trái sang phải để tìm phần đầu của tiếng.", example: "c trong cá · t trong táo" },
      { title: "Có chữ đi thành cặp", body: "P thường đi với h; q thường đi với u trong các tiếng thông dụng.", example: "phở · quả" },
    ],
    check: { question: "Chữ đầu của tiếng mèo là gì?", options: ["m", "e", "o"], answer: 0, explanation: "Tiếng mèo bắt đầu bằng chữ m." },
  },
  {
    slug: "phu-am-b-c-d-d", number: 8, title: "Phụ âm B · C · D · Đ",
    summary: "Nghe, đọc và ghép tiếng với b, c, d, đ.",
    icon: "🐐", tone: "purple", category: "Phụ âm", grade: 1,
    intro: "Bốn chữ b, c, d, đ có hình và cách đọc khác nhau. Bấm từng ví dụ để nghe, rồi đọc theo.",
    points: [
      { title: "B và C", body: "Ghép chữ đầu với vần để tạo tiếng.", example: "b + a = ba · c + a = ca" },
      { title: "D và Đ", body: "D không có gạch ngang; đ có gạch ngang. Đọc để phân biệt.", example: "dê · đê · da · đa" },
      { title: "Đọc từ quen", body: "Tìm chữ đầu và đọc cả từ.", example: "bé · cá · dê · đèn" },
    ],
    check: { question: "Tiếng nào bắt đầu bằng chữ đ?", options: ["dê", "đèn", "cá"], answer: 1, explanation: "Đèn bắt đầu bằng chữ đ có gạch ngang." },
  },
  {
    slug: "phu-am-g-h-k-l", number: 9, title: "Phụ âm G · H · K · L",
    summary: "Tập đọc các tiếng mở đầu bằng g, h, k, l.",
    icon: "🐔", tone: "pink", category: "Phụ âm", grade: 1,
    intro: "Cùng nghe bốn chữ đầu g, h, k, l trong những từ quen thuộc. Chữ k thường đứng trước e, ê, i.",
    points: [
      { title: "G và H", body: "Nhìn chữ đứng đầu rồi đọc tiếng.", example: "gà · gỗ · hoa · hổ" },
      { title: "K và L", body: "K thường gặp trước e, ê, i; l có trong nhiều từ quen.", example: "kê · kì · lá · lê" },
      { title: "Nghe và chỉ", body: "Bấm nghe, sau đó chỉ đúng chữ đầu.", example: "gà — g · hoa — h · kẹo — k · lá — l" },
    ],
    check: { question: "Tiếng kẹo bắt đầu bằng chữ nào?", options: ["c", "k", "l"], answer: 1, explanation: "Kẹo bắt đầu bằng chữ k." },
  },
  {
    slug: "phu-am-m-n-p-q", number: 10, title: "Phụ âm M · N · P · Q",
    summary: "Học m, n và các cặp chữ thường gặp ph, qu.",
    icon: "🍜", tone: "orange", category: "Phụ âm", grade: 1,
    intro: "M và n thường đứng riêng ở đầu tiếng. Trong từ thông dụng, p hay đi với h, q hay đi với u.",
    points: [
      { title: "M và N", body: "Đọc hai chữ đầu qua từ gần gũi.", example: "mẹ · mèo · na · nón" },
      { title: "P đi với H", body: "Cặp ph ghi âm đầu của nhiều tiếng.", example: "phở · phố · phim" },
      { title: "Q đi với U", body: "Cặp qu thường xuất hiện ở đầu tiếng.", example: "quả · quê · quạt" },
    ],
    check: { question: "Tiếng quả bắt đầu bằng cặp chữ nào?", options: ["ph", "qu", "ng"], answer: 1, explanation: "Quả bắt đầu bằng qu." },
  },
  {
    slug: "phu-am-r-s-t-v-x", number: 11, title: "Phụ âm R · S · T · V · X",
    summary: "Hoàn thành nhóm chữ phụ âm qua năm chữ cuối.",
    icon: "🐘", tone: "green", category: "Phụ âm", grade: 1,
    intro: "Cùng đọc r, s, t, v, x qua các tiếng quen. Em hãy nghe mẫu rồi đọc lại thật rõ.",
    points: [
      { title: "R và S", body: "Tìm chữ đầu trong từ.", example: "rổ · rau · sao · sách" },
      { title: "T và V", body: "Đọc chậm từng tiếng, rồi đọc liền từ.", example: "tay · táo · voi · vở" },
      { title: "Chữ X", body: "Chữ x xuất hiện trong nhiều từ em gặp ở trường.", example: "xe · xanh · xinh" },
    ],
    check: { question: "Từ nào bắt đầu bằng x?", options: ["sách", "xe", "rau"], answer: 1, explanation: "Xe bắt đầu bằng chữ x." },
  },
  {
    slug: "phu-am-ghep", number: 12, title: "Phụ âm ghép",
    summary: "Đọc các tổ hợp chữ đầu như ch, nh, ph, th và qu.",
    icon: "🐇", tone: "yellow", category: "Phụ âm", grade: 1,
    intro: "Một số tiếng bắt đầu bằng hai hoặc ba chữ viết liền. Hãy nhìn cả nhóm chữ trước khi đọc.",
    points: [
      { title: "Nhóm quen thuộc", body: "Đọc cả nhóm chữ đầu, không tách từng chữ khi đọc tiếng.", example: "chó · khăn · nhà · phở · thỏ · tre" },
      { title: "Nhóm có g và ng", body: "Gh, ngh thường đứng trước e, ê, i; ng đứng trước các nguyên âm khác.", example: "ghế · nghe · nghi · ngô" },
      { title: "Cặp qu", body: "Qu là tổ hợp chữ thường gặp ở đầu tiếng; đọc trọn tiếng để nhớ.", example: "quả · quê · quạt" },
    ],
    check: { question: "Từ nào bắt đầu bằng nh?", options: ["nhà", "chó", "thỏ"], answer: 0, explanation: "Nhà bắt đầu bằng nh." },
  },
  {
    slug: "dau-thanh-la-gi", number: 13, title: "Dấu thanh là gì?",
    summary: "Khám phá vì sao đổi thanh có thể làm đổi nghĩa của tiếng.",
    icon: "🎼", tone: "blue", category: "Dấu thanh", grade: 1,
    intro: "Tiếng Việt có sáu thanh. Thanh ngang không có dấu viết; năm thanh còn lại có dấu thanh.",
    points: [
      { title: "Nghe giọng cao thấp", body: "Cùng một phần chữ, thay đổi thanh thì cách đọc thay đổi.", example: "ma · má · mà" },
      { title: "Đổi thanh, đổi nghĩa", body: "Hãy nghe và xem mỗi tiếng chỉ điều gì.", example: "ba (bố) · bà (người thân)" },
      { title: "Nhìn dấu khi đọc", body: "Quan sát dấu trên hoặc dưới chữ để đọc đúng.", example: "cá · cả · cạ" },
    ],
    check: { question: "Tiếng nào có dấu sắc?", options: ["ma", "má", "mà"], answer: 1, explanation: "Má mang dấu sắc." },
  },
  {
    slug: "sau-dau-thanh", number: 14, title: "6 Dấu thanh",
    summary: "Học sáu thanh: ngang, huyền, sắc, hỏi, ngã, nặng.",
    icon: "🎵", tone: "purple", category: "Dấu thanh", grade: 1,
    intro: "Có sáu thanh nhưng chỉ năm dấu thanh được viết: huyền, sắc, hỏi, ngã, nặng. Thanh ngang không ghi dấu.",
    points: [
      { title: "Ngang, huyền, sắc", body: "Ngang không ghi dấu; huyền có nét nghiêng xuống; sắc có nét nghiêng lên.", example: "ma · mà · má" },
      { title: "Hỏi và ngã", body: "Dấu hỏi cong; dấu ngã lượn sóng. Nghe và đọc để phân biệt.", example: "mả · mã" },
      { title: "Dấu nặng", body: "Dấu nặng là chấm đặt bên dưới chữ ghi nguyên âm.", example: "mạ · mẹ · nụ" },
    ],
    check: { question: "Tiếng nào mang dấu nặng?", options: ["má", "mạ", "mã"], answer: 1, explanation: "Mạ có dấu nặng ở dưới." },
  },
  {
    slug: "quy-tac-chinh-ta", number: 15, title: "Quy tắc chính tả c/k, g/gh, ng/ngh",
    summary: "Nhớ cách viết k, gh, ngh trước e, ê, i.",
    icon: "✍️", tone: "pink", category: "Chính tả", grade: 2,
    intro: "Trước e, ê, i, ta thường dùng k, gh, ngh để ghi những âm đầu tương ứng. Hãy học qua từ mẫu.",
    points: [
      { title: "C và K", body: "Viết k trước e, ê, i; viết c trước nhiều nguyên âm khác.", example: "kẻ · kê · kim · cá · cô" },
      { title: "G và GH", body: "Viết gh trước e, ê, i; viết g trước các nguyên âm khác.", example: "ghe · ghế · ghi · gà · gỗ" },
      { title: "NG và NGH", body: "Viết ngh trước e, ê, i; viết ng trước các nguyên âm khác.", example: "nghe · nghề · nghỉ · nga · ngủ" },
    ],
    check: { question: "Cách viết nào đúng?", options: ["nge", "nghe", "ngê"], answer: 1, explanation: "Trước e, ta viết ngh: nghe." },
  },
  {
    slug: "ghep-van", number: 16, title: "Ghép vần",
    summary: "Ghép âm đầu với vần và dấu thanh để đọc tiếng.",
    icon: "🧩", tone: "orange", category: "Luyện đọc", grade: 1,
    intro: "Khi đã biết chữ và dấu, em hãy ghép âm đầu với vần rồi đọc trọn tiếng.",
    points: [
      { title: "Tìm âm đầu", body: "Âm đầu đứng trước phần vần của nhiều tiếng.", example: "b trong ba · c trong cam" },
      { title: "Đọc phần vần", body: "Nhìn phần phía sau âm đầu rồi nối hai phần lại.", example: "b + a = ba · c + am = cam" },
      { title: "Thêm thanh", body: "Đọc lại cả tiếng sau khi thêm dấu thanh.", example: "b + an + huyền = bàn" },
    ],
    check: { question: "Ghép c + am được tiếng nào?", options: ["cam", "căm", "câm"], answer: 0, explanation: "C cộng vần am tạo tiếng cam." },
  },
  {
    slug: "van-thuong-gap", number: 17, title: "Vần thường gặp",
    summary: "Luyện đọc an, ăn, ân, on, ơn, ang, ong và nhiều vần khác.",
    icon: "🎈", tone: "green", category: "Luyện đọc", grade: 1,
    intro: "Nhận ra vần giúp em đọc nhanh hơn. Cùng nghe, đọc và tìm vần giống nhau trong các tiếng.",
    points: [
      { title: "Vần kết thúc bằng n", body: "Nhìn nguyên âm đứng trước n để phân biệt vần.", example: "an: bàn · ăn: khăn · ân: sân · on: con" },
      { title: "Vần kết thúc bằng ng", body: "Đọc cả vần rồi ghép với âm đầu.", example: "ang: vàng · ăng: trăng · ong: bóng" },
      { title: "Tìm vần giống nhau", body: "Hai tiếng có thể cùng một vần dù âm đầu khác nhau.", example: "ban – lan cùng vần an" },
    ],
    check: { question: "Tiếng nào có vần an?", options: ["lan", "lên", "lơn"], answer: 0, explanation: "Lan có vần an." },
  },
  {
    slug: "doc-hieu", number: 18, title: "Đọc hiểu",
    summary: "Đọc đoạn ngắn và trả lời câu hỏi về nội dung.",
    icon: "📖", tone: "yellow", category: "Đọc hiểu", grade: 3,
    intro: "Đọc không chỉ là phát âm đúng. Em còn cần hiểu ai, việc gì và điều gì xảy ra trong đoạn văn.",
    points: [
      { title: "Đọc chậm, rõ", body: "Đọc từng câu và dừng ở dấu chấm. Đoạn mẫu: “Lan có một chú mèo. Mèo tên là Miu. Mỗi chiều, Lan cho Miu ăn.”", example: "Lan có một chú mèo. Mèo tên là Miu." },
      { title: "Tìm thông tin", body: "Hỏi: Ai có mèo? Mèo tên gì? Em hãy tìm câu chứa câu trả lời.", example: "Lan có mèo. Mèo tên là Miu." },
      { title: "Nói bằng lời của em", body: "Dựa vào đoạn đọc để trả lời bằng một câu trọn ý.", example: "Mỗi chiều, Lan cho Miu ăn." },
    ],
    check: { question: "Trong đoạn đọc, chú mèo tên là gì?", options: ["Lan", "Miu", "Bông"], answer: 1, explanation: "Đoạn văn nói: Mèo tên là Miu." },
  },
  {
    slug: "tu-vung-theo-chu-de", number: 19, title: "Từ vựng theo chủ đề",
    summary: "Gọi tên con vật, màu sắc và đồ ăn quanh em.",
    icon: "🖼️", tone: "blue", category: "Từ vựng", grade: 2,
    intro: "Nhóm các từ theo chủ đề giúp em nhớ và dùng từ khi nói, đọc, viết.",
    points: [
      { title: "Con vật", body: "Đọc tên và nói một đặc điểm của từng con vật.", example: "mèo 🐱 · chó 🐶 · cá 🐟" },
      { title: "Màu sắc", body: "Nhìn đồ vật thật quanh em rồi gọi tên màu.", example: "đỏ 🔴 · xanh 🔵 · vàng 🟡" },
      { title: "Đồ ăn", body: "Nói tên món ăn em biết, rồi đặt câu ngắn.", example: "cơm · bánh · chuối · Em thích ăn chuối." },
    ],
    check: { question: "Từ nào gọi tên con vật?", options: ["xanh", "mèo", "bánh"], answer: 1, explanation: "Mèo là tên một con vật." },
  },
  {
    slug: "tu-vung-gia-dinh", number: 20, title: "Từ vựng gia đình",
    summary: "Gọi tên người thân và nói một câu về gia đình.",
    icon: "👨‍👩‍👧‍👦", tone: "purple", category: "Từ vựng", grade: 2,
    intro: "Mỗi gia đình có thể khác nhau. Hãy học cách gọi những người thân quen của em.",
    points: [
      { title: "Ông bà", body: "Tập gọi tên người lớn tuổi trong gia đình.", example: "ông · bà · ông nội · bà ngoại" },
      { title: "Bố mẹ và anh chị em", body: "Đọc tên các vai trò trong gia đình.", example: "bố · mẹ · anh · chị · em" },
      { title: "Đặt câu", body: "Nói một câu đúng với gia đình của em; em có thể chọn người thân mình muốn kể.", example: "Em cùng bà tưới cây." },
    ],
    check: { question: "Từ nào gọi tên người trong gia đình?", options: ["chị", "bàn", "xanh"], answer: 0, explanation: "Chị là cách gọi một người trong gia đình." },
  },
  {
    slug: "tu-vung-co-the", number: 21, title: "Từ vựng cơ thể",
    summary: "Nhận biết và gọi tên các bộ phận cơ thể.",
    icon: "🧍", tone: "pink", category: "Từ vựng", grade: 2,
    intro: "Em hãy chỉ vào bộ phận trên cơ thể mình hoặc tranh minh họa và đọc tên bộ phận đó.",
    points: [
      { title: "Trên đầu", body: "Gọi tên các bộ phận giúp em nhìn, nghe, ngửi và nói.", example: "đầu · mắt · tai · mũi · miệng" },
      { title: "Tay và chân", body: "Dùng từ đúng khi kể về hoạt động hằng ngày.", example: "tay cầm bút · chân bước đi" },
      { title: "Giữ gìn cơ thể", body: "Đặt câu về một thói quen tốt.", example: "Em rửa tay trước khi ăn." },
    ],
    check: { question: "Em dùng bộ phận nào để nghe?", options: ["tai", "chân", "tay"], answer: 0, explanation: "Tai giúp em nghe." },
  },
  {
    slug: "tu-vung-truong-hoc", number: 22, title: "Từ vựng trường học",
    summary: "Đọc tên đồ dùng học tập và đặt câu ngắn.",
    icon: "🎒", tone: "orange", category: "Từ vựng", grade: 2,
    intro: "Lớp học có nhiều đồ vật quen thuộc. Hãy tìm chúng quanh em rồi gọi tên.",
    points: [
      { title: "Đồ dùng của em", body: "Chỉ và đọc tên những vật em mang theo.", example: "cặp · sách · vở · bút" },
      { title: "Trong lớp học", body: "Gọi tên đồ vật chung của lớp.", example: "bảng · bàn · ghế · cửa sổ" },
      { title: "Nói thành câu", body: "Dùng một từ vừa học trong câu đủ ý.", example: "Em cất bút vào cặp." },
    ],
    check: { question: "Vật nào dùng để viết?", options: ["bút", "cửa", "ghế"], answer: 0, explanation: "Bút là đồ dùng để viết." },
  },
  {
    slug: "tu-vung-nghe-nghiep", number: 23, title: "Từ vựng nghề nghiệp",
    summary: "Gọi tên một số nghề và công việc của họ.",
    icon: "👷", tone: "green", category: "Từ vựng", grade: 2,
    intro: "Mỗi nghề đều có công việc có ích. Cùng tập nói về những người em gặp trong cuộc sống.",
    points: [
      { title: "Nghề chăm sóc, dạy học", body: "Nói tên nghề và việc họ làm.", example: "bác sĩ khám bệnh · giáo viên dạy học" },
      { title: "Nghề làm ra sản phẩm", body: "Tìm hiểu một công việc quen thuộc.", example: "nông dân trồng lúa · thợ may may áo" },
      { title: "Ước mơ của em", body: "Nói một câu về nghề em muốn tìm hiểu.", example: "Em muốn tìm hiểu nghề phi công." },
    ],
    check: { question: "Ai thường khám bệnh cho người bệnh?", options: ["bác sĩ", "phi công", "thợ may"], answer: 0, explanation: "Bác sĩ khám bệnh và chăm sóc sức khỏe." },
  },
  {
    slug: "thoi-tiet-mua", number: 24, title: "Thời tiết & mùa",
    summary: "Nói về nắng, mưa, gió và tên các mùa.",
    icon: "🌦️", tone: "yellow", category: "Từ vựng", grade: 2,
    intro: "Quan sát bầu trời hôm nay rồi dùng từ phù hợp để kể về thời tiết. Các vùng ở Việt Nam có đặc điểm mùa khác nhau.",
    points: [
      { title: "Thời tiết hôm nay", body: "Chọn từ mô tả điều em thấy hoặc cảm nhận.", example: "nắng · mưa · gió · nóng · lạnh" },
      { title: "Tên bốn mùa", body: "Đọc tên các mùa thường gặp trong sách và câu chuyện.", example: "xuân · hạ · thu · đông" },
      { title: "Nói về nơi em ở", body: "Dùng một câu kể đúng thời tiết ở địa phương em.", example: "Hôm nay trời mưa." },
    ],
    check: { question: "Từ nào nói về thời tiết?", options: ["mưa", "quyển vở", "bác sĩ"], answer: 0, explanation: "Mưa là một hiện tượng thời tiết." },
  },
  {
    slug: "so-dem-1-20", number: 25, title: "Số đếm 1–20",
    summary: "Đọc và viết bằng chữ các số từ một đến hai mươi.",
    icon: "🔢", tone: "blue", category: "Giao tiếp", grade: 2,
    intro: "Em hãy vừa đếm đồ vật, vừa đọc tên số bằng tiếng Việt.",
    points: [
      { title: "Từ 1 đến 10", body: "Đếm lần lượt từ một đến mười.", example: "một, hai, ba, bốn, năm, sáu, bảy, tám, chín, mười" },
      { title: "Từ 11 đến 20", body: "Tập đọc tiếp, chú ý cách gọi mười lăm.", example: "mười một, mười hai, mười ba, mười bốn, mười lăm, mười sáu, mười bảy, mười tám, mười chín, hai mươi" },
      { title: "Đếm đồ vật", body: "Nhìn quanh và nói số lượng bằng một câu.", example: "Em có ba quyển vở." },
    ],
    check: { question: "Số 15 đọc là gì?", options: ["mười năm", "mười lăm", "năm mươi"], answer: 1, explanation: "15 đọc là mười lăm." },
  },
  {
    slug: "ngay-thang", number: 26, title: "Ngày tháng",
    summary: "Đọc thứ trong tuần và tháng trong năm.",
    icon: "📅", tone: "purple", category: "Giao tiếp", grade: 2,
    intro: "Biết đọc thứ và ngày tháng giúp em theo dõi lịch học, ngày sinh nhật và các hoạt động gia đình.",
    points: [
      { title: "Các thứ trong tuần", body: "Một tuần có bảy ngày. Đọc lần lượt từ thứ Hai đến Chủ nhật.", example: "thứ Hai · thứ Ba · thứ Tư · thứ Năm · thứ Sáu · thứ Bảy · Chủ nhật" },
      { title: "Các tháng", body: "Một năm có mười hai tháng; có thể gọi tháng bằng số.", example: "tháng Một · tháng Hai · tháng Ba · … · tháng Mười Hai" },
      { title: "Nói về lịch của em", body: "Đặt câu có tên thứ hoặc tháng.", example: "Thứ Hai em đi học." },
    ],
    check: { question: "Ngày nào đứng sau thứ Hai?", options: ["thứ Ba", "thứ Sáu", "Chủ nhật"], answer: 0, explanation: "Sau thứ Hai là thứ Ba." },
  },
  {
    slug: "mo-ta-nguoi", number: 27, title: "Mô tả người",
    summary: "Chọn từ chỉ đặc điểm và nói câu lịch sự về một người.",
    icon: "👤", tone: "pink", category: "Nói và viết", grade: 5,
    intro: "Khi tả người, em có thể nói về dáng vẻ, mái tóc hoặc việc làm của họ bằng lời thân thiện.",
    points: [
      { title: "Dáng vẻ", body: "Chọn từ phù hợp, tránh chê bai người khác.", example: "cao · thấp · tóc dài · tóc ngắn" },
      { title: "Tính cách, việc làm", body: "Kể điều em quan sát được một cách cụ thể.", example: "vui vẻ · chăm chỉ · hay giúp bạn" },
      { title: "Tả bằng câu", body: "Ghép đặc điểm với tên người để thành câu trọn ý.", example: "Bạn Lan có mái tóc ngắn và rất vui vẻ." },
    ],
    check: { question: "Từ nào chỉ đặc điểm mái tóc?", options: ["tóc dài", "chạy", "quyển sách"], answer: 0, explanation: "Tóc dài là một đặc điểm có thể dùng khi tả người." },
  },
  {
    slug: "danh-tu-dong-tu-tinh-tu", number: 28, title: "Danh từ – Động từ – Tính từ",
    summary: "Phân biệt từ gọi tên, từ chỉ hoạt động và từ chỉ đặc điểm.",
    icon: "🧱", tone: "orange", category: "Kiến thức tiếng Việt", grade: 4,
    intro: "Ba nhóm từ này giúp em hiểu câu và chọn từ phù hợp khi viết. Trước tiên hãy nhìn ý nghĩa của từ.",
    points: [
      { title: "Danh từ", body: "Thường gọi tên người, vật hoặc sự vật.", example: "học sinh · cây · quyển sách" },
      { title: "Động từ", body: "Thường chỉ hoạt động hoặc trạng thái.", example: "đọc · chạy · ngủ" },
      { title: "Tính từ", body: "Thường chỉ đặc điểm, tính chất.", example: "đẹp · cao · xanh" },
    ],
    check: { question: "Từ nào chỉ hoạt động?", options: ["bút", "đọc", "xanh"], answer: 1, explanation: "Đọc là một hoạt động." },
  },
  {
    slug: "dat-cau-hoi", number: 29, title: "Đặt câu hỏi",
    summary: "Tập hỏi bằng ai, gì, ở đâu, khi nào, vì sao, thế nào.",
    icon: "❓", tone: "green", category: "Nói và viết", grade: 3,
    intro: "Khi muốn biết thêm điều gì, em hãy chọn từ hỏi đúng và kết thúc câu bằng dấu hỏi.",
    points: [
      { title: "Hỏi người và vật", body: "Dùng ai cho người, cái gì cho sự vật.", example: "Ai đang đọc sách? · Đây là cái gì?" },
      { title: "Hỏi nơi chốn, thời gian", body: "Dùng ở đâu và khi nào để biết địa điểm, thời điểm.", example: "Em học ở đâu? · Khi nào em đi học?" },
      { title: "Hỏi nguyên nhân, cách thức", body: "Dùng vì sao và thế nào khi muốn hiểu thêm.", example: "Vì sao cây cần nước? · Em làm bài thế nào?" },
    ],
    check: { question: "Muốn hỏi địa điểm, em dùng từ nào?", options: ["ai", "ở đâu", "vì sao"], answer: 1, explanation: "Ở đâu dùng để hỏi về địa điểm." },
  },
  {
    slug: "hoi-thoai-co-ban", number: 30, title: "Hội thoại cơ bản",
    summary: "Chào hỏi, giới thiệu và lắng nghe người đối thoại.",
    icon: "💬", tone: "yellow", category: "Nói và nghe", grade: 2,
    intro: "Một cuộc trò chuyện vui bắt đầu bằng lời chào, câu giới thiệu rõ ràng và sự lắng nghe.",
    points: [
      { title: "Chào hỏi", body: "Chọn lời chào phù hợp với người em gặp.", example: "Em chào cô ạ. · Chào bạn!" },
      { title: "Giới thiệu bản thân", body: "Nói tên và một điều em thích bằng câu ngắn.", example: "Mình tên là An. Mình thích đọc sách." },
      { title: "Đáp lời", body: "Nghe người kia nói hết rồi mới trả lời; có thể hỏi thêm một câu.", example: "Rất vui được gặp bạn. Bạn thích đọc sách gì?" },
    ],
    check: { question: "Câu nào là lời giới thiệu bản thân?", options: ["Mình tên là An.", "Quyển sách ở đâu?", "Trời đang mưa."], answer: 0, explanation: "Mình tên là An là câu tự giới thiệu." },
  },
  {
    slug: "viet-doan-van-ngan", number: 31, title: "Viết đoạn văn ngắn",
    summary: "Viết khoảng năm câu giới thiệu bản thân và đọc lại để sửa.",
    icon: "📝", tone: "blue", category: "Luyện viết", grade: 3,
    intro: "Em sẽ viết một đoạn ngắn bằng những câu của chính mình. Có thể viết tên, lớp, sở thích và điều em muốn chia sẻ.",
    points: [
      { title: "Lập ý", body: "Nghĩ trước: em tên gì, học lớp nào, thích gì, làm gì cùng người thân hoặc bạn bè?", example: "Tên: An · Lớp: 2A · Sở thích: đọc sách" },
      { title: "Viết năm câu", body: "Mỗi câu nói một ý. Viết hoa chữ đầu câu và dùng dấu chấm cuối câu.", example: "Em tên là An. Em học lớp 2A. Em thích đọc sách. Mỗi tối, em đọc truyện cùng mẹ. Em rất vui khi tìm được một câu chuyện hay." },
      { title: "Đọc và sửa", body: "Đọc lại để kiểm tra chữ viết, dấu thanh và câu có đủ ý.", example: "Em thích đọc sách." },
    ],
    check: { question: "Khi viết xong đoạn văn, em nên làm gì?", options: ["Đọc lại và sửa lỗi", "Bỏ dấu chấm", "Viết liền không ngắt câu"], answer: 0, explanation: "Đọc lại giúp em phát hiện và sửa lỗi." },
  },
];

/** Chuỗi Cô Tú đọc ở đầu bài; chỉ thêm dấu chấm khi tiêu đề chưa có dấu kết câu. */
export function lessonIntroSpeech(lesson: Pick<Lesson, "title" | "intro">) {
  return `${lesson.title}${/[.?!]$/.test(lesson.title) ? "" : "."} ${lesson.intro}`;
}
