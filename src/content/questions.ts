export type QuizQuestion = {
  question: string;
  sentence?: string;
  options: [string, string, string, string];
  answer: number;
  difficulty: 1 | 2 | 3;
  skill: "Chữ cái" | "Dấu thanh" | "Từ vựng" | "Chính tả" | "Điền từ" | "Đọc hiểu" | "Ngữ pháp";
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  // Mức 1 sao: nhận biết chữ, dấu và từ quen thuộc.
  { question: "Chọn từ thích hợp điền vào chỗ trống!", sentence: "Đàn cá bơi tung tăng dưới ___.", options: ["cây", "nước", "đất", "trời"], answer: 1, difficulty: 1, skill: "Điền từ", explanation: "Cá bơi dưới nước." },
  { question: "Chữ nào là nguyên âm?", options: ["B", "A", "D", "M"], answer: 1, difficulty: 1, skill: "Chữ cái", explanation: "A là nguyên âm." },
  { question: "Bảng chữ cái tiếng Việt có bao nhiêu chữ?", options: ["26", "28", "29", "30"], answer: 2, difficulty: 1, skill: "Chữ cái", explanation: "Bảng chữ cái tiếng Việt có 29 chữ." },
  { question: "Chữ nào có dấu mũ?", options: ["Ă", "Â", "A", "Ư"], answer: 1, difficulty: 1, skill: "Chữ cái", explanation: "Â có dấu mũ ở phía trên." },
  { question: "Chữ nào thuộc nhóm E?", options: ["Ê", "Ô", "Ư", "Ă"], answer: 0, difficulty: 1, skill: "Chữ cái", explanation: "E và Ê cùng nhóm." },
  { question: "Chữ nào là phụ âm?", options: ["O", "E", "M", "U"], answer: 2, difficulty: 1, skill: "Chữ cái", explanation: "M là phụ âm." },
  { question: "Tiếng nào mang dấu sắc?", options: ["ma", "má", "mà", "mạ"], answer: 1, difficulty: 1, skill: "Dấu thanh", explanation: "Má mang dấu sắc." },
  { question: "Tiếng nào mang dấu huyền?", options: ["bà", "bá", "bạ", "bả"], answer: 0, difficulty: 1, skill: "Dấu thanh", explanation: "Bà mang dấu huyền." },
  { question: "Dấu nặng nằm ở đâu?", options: ["Trên chữ", "Dưới chữ", "Bên cạnh chữ", "Cuối tiếng"], answer: 1, difficulty: 1, skill: "Dấu thanh", explanation: "Dấu nặng là chấm nhỏ bên dưới chữ." },
  { question: "Tiếng nào mang dấu hỏi?", options: ["mã", "mả", "mạ", "má"], answer: 1, difficulty: 1, skill: "Dấu thanh", explanation: "Mả có dấu hỏi." },
  { question: "Tiếng nào không ghi dấu thanh?", options: ["cá", "ca", "cà", "cả"], answer: 1, difficulty: 1, skill: "Dấu thanh", explanation: "Ca là thanh ngang, không ghi dấu." },
  { question: "Con vật nào kêu “meo meo”?", options: ["Con mèo", "Con chó", "Con cá", "Con gà"], answer: 0, difficulty: 1, skill: "Từ vựng", explanation: "Con mèo kêu meo meo." },
  { question: "Từ nào chỉ một loại quả?", options: ["Bàn", "Cam", "Sách", "Ghế"], answer: 1, difficulty: 1, skill: "Từ vựng", explanation: "Cam là một loại quả." },
  { question: "Từ nào chỉ đồ dùng để đọc?", options: ["Sách", "Bóng", "Bút", "Mũ"], answer: 0, difficulty: 1, skill: "Từ vựng", explanation: "Sách dùng để đọc." },
  { question: "Từ nào chỉ thời tiết?", options: ["Nắng", "Ghế", "Áo", "Bút"], answer: 0, difficulty: 1, skill: "Từ vựng", explanation: "Nắng chỉ trạng thái thời tiết." },
  { question: "Từ nào trái nghĩa với “cao”?", options: ["Dài", "Thấp", "Rộng", "Nặng"], answer: 1, difficulty: 1, skill: "Từ vựng", explanation: "Cao và thấp là hai từ trái nghĩa." },
  { question: "Cách viết nào đúng?", options: ["ngỉ ngơi", "nghỉ ngơi", "nghĩ ngơi", "nghĩ ngỉ"], answer: 1, difficulty: 1, skill: "Chính tả", explanation: "Viết đúng là “nghỉ ngơi”." },
  { question: "Câu kể nào có dấu cuối câu đúng?", options: ["Em tên là Tú.", "Em tên là Tú?", "Em tên là Tú!?", "Em tên là Tú,"], answer: 0, difficulty: 1, skill: "Chính tả", explanation: "Câu kể kết thúc bằng dấu chấm." },
  { question: "Từ nào viết đúng tên đồ dùng để đọc?", options: ["sách", "sác", "xách", "sắch"], answer: 0, difficulty: 1, skill: "Chính tả", explanation: "Viết đúng là “sách”." },
  { question: "Câu nào có chữ đầu viết hoa đúng?", options: ["em đi học.", "Em đi học.", "EM đi học.", "eM đi học."], answer: 1, difficulty: 1, skill: "Chính tả", explanation: "Đầu câu viết hoa chữ cái đầu tiên." },

  // Mức 2 sao: vận dụng từ ngữ và quy tắc viết trong câu ngắn.
  { question: "Chọn từ thích hợp điền vào chỗ trống!", sentence: "Buổi sáng, mặt trời ___ ở phía đông.", options: ["lặn", "mọc", "ngủ", "rơi"], answer: 1, difficulty: 2, skill: "Điền từ", explanation: "Mặt trời mọc ở phía đông." },
  { question: "Chọn từ thích hợp điền vào chỗ trống!", sentence: "Em dùng ___ để viết bài vào vở.", options: ["thước", "bút", "kéo", "cặp"], answer: 1, difficulty: 2, skill: "Điền từ", explanation: "Bút dùng để viết bài." },
  { question: "Từ nào cùng nghĩa với “chăm chỉ”?", options: ["Siêng năng", "Lười biếng", "Vội vàng", "Ồn ào"], answer: 0, difficulty: 2, skill: "Từ vựng", explanation: "Chăm chỉ và siêng năng gần nghĩa nhau." },
  { question: "Từ nào trái nghĩa với “rộng rãi”?", options: ["Thoáng mát", "Chật hẹp", "Sạch sẽ", "Sáng sủa"], answer: 1, difficulty: 2, skill: "Từ vựng", explanation: "Rộng rãi trái nghĩa với chật hẹp." },
  { question: "Nhóm nào chỉ toàn đồ dùng học tập?", options: ["Bút, vở, thước", "Bút, cá, thước", "Vở, nắng, sách", "Ghế, mưa, bút"], answer: 0, difficulty: 2, skill: "Từ vựng", explanation: "Bút, vở và thước đều là đồ dùng học tập." },
  { question: "Tiếng nào có vần “ươn”?", options: ["vườn", "vuông", "vững", "vương"], answer: 0, difficulty: 2, skill: "Chữ cái", explanation: "Tiếng “vườn” có vần ươn." },
  { question: "Tiếng nào có âm đầu “ngh”?", options: ["nghe", "ngồi", "nga", "ngủ"], answer: 0, difficulty: 2, skill: "Chính tả", explanation: "Tiếng “nghe” bắt đầu bằng ngh." },
  { question: "Điền tiếng nào vào câu?", sentence: "Mẹ ___ cơm trong bếp.", options: ["nấu", "náu", "lấu", "nậu"], answer: 0, difficulty: 2, skill: "Chính tả", explanation: "Viết đúng là “nấu cơm”." },
  { question: "Câu nào là câu hỏi?", options: ["Bạn tên là gì?", "Em đang đọc sách.", "Trời hôm nay đẹp quá!", "Bé đi học."], answer: 0, difficulty: 2, skill: "Ngữ pháp", explanation: "Câu hỏi “Bạn tên là gì?” kết thúc bằng dấu hỏi." },
  { question: "Dấu nào đặt cuối câu cảm thán?", options: ["Dấu chấm", "Dấu phẩy", "Dấu hỏi", "Dấu chấm than"], answer: 3, difficulty: 2, skill: "Ngữ pháp", explanation: "Câu cảm thán thường kết thúc bằng dấu chấm than." },
  { question: "Trong câu “Bé Lan hát hay”, ai hát hay?", options: ["Bé Lan", "Bố", "Mẹ", "Cô giáo"], answer: 0, difficulty: 2, skill: "Đọc hiểu", explanation: "Câu cho biết bé Lan hát hay." },
  { question: "Trong câu “Chú mèo nằm trên ghế”, chú mèo ở đâu?", options: ["Dưới bàn", "Trên ghế", "Ngoài sân", "Trong hộp"], answer: 1, difficulty: 2, skill: "Đọc hiểu", explanation: "Chú mèo nằm trên ghế." },
  { question: "Câu nào dùng dấu phẩy đúng?", options: ["Em có bút, vở và thước.", "Em, có bút vở và thước.", "Em có bút vở, và thước.", "Em có, bút vở và thước."], answer: 0, difficulty: 2, skill: "Chính tả", explanation: "Dấu phẩy ngăn cách các đồ vật trong phép liệt kê." },
  { question: "Từ nào chỉ hoạt động?", options: ["Chạy", "Đỏ", "Bàn", "Cao"], answer: 0, difficulty: 2, skill: "Từ vựng", explanation: "Chạy là một hoạt động." },
  { question: "Từ nào chỉ đặc điểm?", options: ["Bơi", "Xinh đẹp", "Cái bàn", "Học bài"], answer: 1, difficulty: 2, skill: "Từ vựng", explanation: "Xinh đẹp chỉ đặc điểm." },
  { question: "Chọn từ thích hợp điền vào chỗ trống!", sentence: "Sau cơn mưa, bầu trời trở nên ___.", options: ["ẩm ướt", "trong xanh", "ồn ào", "chật chội"], answer: 1, difficulty: 2, skill: "Điền từ", explanation: "Bầu trời sau mưa thường trong xanh." },
  { question: "Tiếng “nghĩ” mang dấu thanh nào?", options: ["Dấu hỏi", "Dấu ngã", "Dấu sắc", "Dấu nặng"], answer: 1, difficulty: 2, skill: "Dấu thanh", explanation: "“Nghĩ” mang dấu ngã." },
  { question: "Câu nào được viết đúng chính tả?", options: ["Em nge cô giảng bài.", "Em nghe cô giảng bài.", "Em nge cô dảng bài.", "Em nghe cô dảng bài."], answer: 1, difficulty: 2, skill: "Chính tả", explanation: "Viết đúng là “nghe” và “giảng”." },
  { question: "Từ nào ghép được với “học” thành tên đồ dùng?", options: ["sinh", "đường", "bàn", "chăm"], answer: 2, difficulty: 2, skill: "Từ vựng", explanation: "Bàn học là đồ dùng để học." },
  { question: "Chọn từ thích hợp điền vào chỗ trống!", sentence: "Chim én bay lượn trên ___.", options: ["bầu trời", "dòng sông", "mặt đất", "trang vở"], answer: 0, difficulty: 2, skill: "Điền từ", explanation: "Chim én bay lượn trên bầu trời." },

  // Mức 3 sao: đọc hiểu, suy luận và chọn cách diễn đạt phù hợp.
  { question: "Đọc và chọn ý đúng!", sentence: "Lan mang ô vì trời sắp mưa. Lan mang ô để ___.", options: ["che nắng", "tránh bị ướt", "làm đồ chơi", "đựng sách"], answer: 1, difficulty: 3, skill: "Đọc hiểu", explanation: "Lan mang ô để tránh bị ướt khi trời mưa." },
  { question: "Đọc và chọn ý đúng!", sentence: "Nam tưới cây mỗi chiều. Nhờ vậy, cây trong vườn ___.", options: ["héo khô", "lớn xanh tốt", "mất lá ngay", "không cần đất"], answer: 1, difficulty: 3, skill: "Đọc hiểu", explanation: "Được tưới đều, cây có thể lớn xanh tốt." },
  { question: "Đọc và chọn ý đúng!", sentence: "Bé nhặt giấy bỏ vào thùng rác. Bé đang giữ gìn ___.", options: ["vệ sinh", "đồ chơi", "thời tiết", "bài hát"], answer: 0, difficulty: 3, skill: "Đọc hiểu", explanation: "Bỏ rác đúng nơi giúp giữ gìn vệ sinh." },
  { question: "Chọn câu trả lời lịch sự nhất khi được giúp đỡ!", options: ["Đưa đây!", "Cảm ơn bạn nhé!", "Đi chỗ khác!", "Tôi biết rồi!"], answer: 1, difficulty: 3, skill: "Ngữ pháp", explanation: "Khi được giúp đỡ, em nên nói lời cảm ơn." },
  { question: "Câu nào miêu tả đúng trình tự thời gian?", options: ["Ăn sáng rồi đánh răng khi ngủ.", "Thức dậy, đánh răng rồi ăn sáng.", "Đi ngủ rồi thức dậy hôm qua.", "Ăn tối trước khi trời sáng."], answer: 1, difficulty: 3, skill: "Đọc hiểu", explanation: "Thức dậy, đánh răng và ăn sáng là trình tự hợp lí." },
  { question: "Chọn từ thích hợp điền vào chỗ trống!", sentence: "Dù bài toán khó, các bạn vẫn ___ tìm lời giải.", options: ["bỏ cuộc", "kiên trì", "ngủ quên", "trốn học"], answer: 1, difficulty: 3, skill: "Điền từ", explanation: "“Kiên trì” thể hiện việc tiếp tục cố gắng dù gặp khó khăn." },
  { question: "Câu nào có dấu câu phù hợp nhất?", options: ["Ôi, bông hoa đẹp quá!", "Ôi bông hoa đẹp quá?", "Ôi, bông hoa đẹp quá,", "Ôi bông hoa đẹp quá."], answer: 0, difficulty: 3, skill: "Chính tả", explanation: "Câu cảm thán dùng dấu phẩy sau “Ôi” và dấu chấm than ở cuối." },
  { question: "Chọn cách viết tên riêng đúng!", options: ["hà nội", "Hà nội", "Hà Nội", "HÀ nội"], answer: 2, difficulty: 3, skill: "Chính tả", explanation: "Tên địa danh Hà Nội viết hoa chữ đầu của mỗi tiếng." },
  { question: "Từ nào điền vào câu để chỉ nguyên nhân?", sentence: "Em đến muộn ___ xe đạp bị hỏng.", options: ["vì", "nhưng", "và", "hoặc"], answer: 0, difficulty: 3, skill: "Ngữ pháp", explanation: "“Vì” nối với nguyên nhân xe đạp bị hỏng." },
  { question: "Từ nào điền vào câu để chỉ sự trái ngược?", sentence: "Trời mưa ___ chúng em vẫn đến lớp.", options: ["vì", "nên", "nhưng", "và"], answer: 2, difficulty: 3, skill: "Ngữ pháp", explanation: "“Nhưng” nối hai ý trái ngược." },
  { question: "Trong câu “Cây phượng nở hoa đỏ rực”, từ nào chỉ đặc điểm?", options: ["Cây phượng", "Nở", "Đỏ rực", "Hoa"], answer: 2, difficulty: 3, skill: "Ngữ pháp", explanation: "“Đỏ rực” chỉ đặc điểm màu sắc của hoa." },
  { question: "Trong câu “Bà kể chuyện cho em nghe”, ai là người kể chuyện?", options: ["Bà", "Em", "Mẹ", "Bạn"], answer: 0, difficulty: 3, skill: "Đọc hiểu", explanation: "Bà là người kể chuyện cho em." },
  { question: "Chọn câu kết phù hợp cho đoạn văn!", sentence: "Cả lớp cùng trồng cây. Các bạn thay nhau tưới nước. ___", options: ["Cây lớn lên xanh tốt.", "Bạn Lan làm mất bút.", "Trời tối qua có trăng.", "Em ăn một quả cam."], answer: 0, difficulty: 3, skill: "Đọc hiểu", explanation: "Câu kết nói về kết quả chăm sóc cây." },
  { question: "Chọn từ gần nghĩa với “dũng cảm”!", options: ["Can đảm", "Lo lắng", "Chậm chạp", "Mệt mỏi"], answer: 0, difficulty: 3, skill: "Từ vựng", explanation: "Dũng cảm và can đảm gần nghĩa nhau." },
  { question: "Chọn câu hỏi phù hợp với câu trả lời “Em học ở thư viện.”", options: ["Em học ở đâu?", "Em học với ai?", "Em học lúc nào?", "Em học môn gì?"], answer: 0, difficulty: 3, skill: "Đọc hiểu", explanation: "“Ở thư viện” trả lời cho câu hỏi về địa điểm." },
  { question: "Chọn từ thích hợp điền vào chỗ trống!", sentence: "Bạn nhỏ ___ sách nhẹ nhàng để không làm rách trang.", options: ["lật", "xé", "ném", "vò"], answer: 0, difficulty: 3, skill: "Điền từ", explanation: "Lật sách nhẹ nhàng giúp giữ trang sách không bị rách." },
  { question: "Câu nào dùng từ “lung linh” phù hợp?", options: ["Những vì sao lung linh trên trời.", "Chiếc bàn lung linh rất nặng.", "Em lung linh chạy về nhà.", "Bát cơm lung linh rất nóng."], answer: 0, difficulty: 3, skill: "Từ vựng", explanation: "“Lung linh” gợi ánh sáng lấp lánh của những vì sao." },
  { question: "Đọc và chọn ý đúng!", sentence: "Minh nhường ghế cho bà trên xe buýt. Minh là người ___.", options: ["lễ phép", "ích kỉ", "lười biếng", "bất cẩn"], answer: 0, difficulty: 3, skill: "Đọc hiểu", explanation: "Nhường ghế cho người lớn tuổi là hành động lễ phép." },
  { question: "Chọn câu có ý nghĩa rõ ràng nhất!", options: ["Buổi sáng, em cùng mẹ đi chợ.", "Buổi sáng đi cùng chợ mẹ em.", "Em mẹ buổi sáng cùng chợ đi.", "Chợ em đi mẹ cùng sáng buổi."], answer: 0, difficulty: 3, skill: "Ngữ pháp", explanation: "Câu đầu sắp xếp từ đúng và diễn đạt rõ ý." },
  { question: "Từ nào điền vào câu để chỉ kết quả?", sentence: "Em chăm đọc sách, ___ vốn từ ngày càng phong phú.", options: ["nhưng", "nên", "vì", "hoặc"], answer: 1, difficulty: 3, skill: "Ngữ pháp", explanation: "“Nên” nối việc chăm đọc sách với kết quả vốn từ phong phú." },
];

// Số từ mỗi lượt bài tập — WordGame random `EXERCISE_ROUND_LENGTH` câu từ bank.
// Dùng ở HomeMissions, Classroom để hiển thị tử số/mẫu số đúng.
export const EXERCISE_ROUND_LENGTH = 10;

// Ngân hàng từ cho /bai-tap — mỗi lượt WordGame random 10 từ không trùng.
// Mỗi item: emoji + hint (câu gợi ý) + answer (chuỗi NFC) + letters (ký tự
// composed, đã shuffle sẵn — ghép đúng thứ tự = answer).
export const wordExercises = [
  // Động vật
  { emoji: "🐶", hint: "Con vật giữ nhà", answer: "chó", letters: ["ó", "c", "h"] },
  { emoji: "🐱", hint: "Con vật kêu meo meo", answer: "mèo", letters: ["o", "m", "è"] },
  { emoji: "🐟", hint: "Con vật sống dưới nước", answer: "cá", letters: ["á", "c"] },
  { emoji: "🐔", hint: "Con vật thường gáy báo sáng", answer: "gà", letters: ["à", "g"] },
  { emoji: "🐷", hint: "Con vật tai to, mũi tẹt", answer: "heo", letters: ["e", "h", "o"] },
  { emoji: "🐄", hint: "Con vật cho sữa", answer: "bò", letters: ["ò", "b"] },
  { emoji: "🐘", hint: "Con vật có mũi dài", answer: "voi", letters: ["o", "v", "i"] },
  { emoji: "🐵", hint: "Con vật leo cây giỏi, thích ăn chuối", answer: "khỉ", letters: ["ỉ", "k", "h"] },
  { emoji: "🦋", hint: "Côn trùng có đôi cánh xinh đẹp", answer: "bướm", letters: ["m", "b", "ướ"] },
  { emoji: "🐝", hint: "Con vật nhỏ chăm làm, cho ta mật", answer: "ong", letters: ["g", "o", "n"] },

  // Trái cây
  { emoji: "🍊", hint: "Loại quả màu cam", answer: "cam", letters: ["m", "c", "a"] },
  { emoji: "🍌", hint: "Loại quả cong, màu vàng", answer: "chuối", letters: ["i", "c", "ố", "h", "u"] },
  { emoji: "🍎", hint: "Loại quả đỏ, ăn giòn", answer: "táo", letters: ["t", "á", "o"] },
  { emoji: "🍉", hint: "Loại quả xanh ruột đỏ, nhiều nước", answer: "dưa", letters: ["ư", "d", "a"] },
  { emoji: "🍇", hint: "Loại quả nhỏ, thường thành chùm", answer: "nho", letters: ["o", "n", "h"] },
  { emoji: "🍓", hint: "Loại quả đỏ, nhỏ nhỏ, có hạt bên ngoài", answer: "dâu", letters: ["â", "d", "u"] },
  { emoji: "🥥", hint: "Loại quả có nước ngọt bên trong", answer: "dừa", letters: ["ừ", "d", "a"] },

  // Đồ dùng & phương tiện
  { emoji: "📚", hint: "Đồ dùng để đọc", answer: "sách", letters: ["h", "á", "s", "c"] },
  { emoji: "✏️", hint: "Dụng cụ để viết", answer: "bút", letters: ["ú", "b", "t"] },
  { emoji: "🎒", hint: "Em đeo đến trường mỗi ngày", answer: "cặp", letters: ["ặ", "c", "p"] },
  { emoji: "🚗", hint: "Phương tiện có bốn bánh", answer: "xe", letters: ["e", "x"] },
  { emoji: "⛵", hint: "Phương tiện di chuyển trên nước", answer: "thuyền", letters: ["t", "ề", "h", "u", "n", "y"] },

  // Tự nhiên
  { emoji: "🌸", hint: "Bông ... xinh", answer: "hoa", letters: ["a", "h", "o"] },
  { emoji: "☀️", hint: "Ánh sáng của mặt trời", answer: "nắng", letters: ["g", "n", "ắ", "n"] },
  { emoji: "🌙", hint: "Tỏa sáng vào ban đêm", answer: "trăng", letters: ["g", "t", "n", "r", "ă"] },
  { emoji: "🌧️", hint: "Nước rơi từ bầu trời", answer: "mưa", letters: ["m", "ư", "a"] },
  { emoji: "🌊", hint: "Vùng nước mặn rộng mênh mông", answer: "biển", letters: ["b", "ể", "i", "n"] },
  { emoji: "⛰️", hint: "Nơi rất cao, cao hơn mặt đất nhiều", answer: "núi", letters: ["n", "ú", "i"] },

  // Gia đình
  { emoji: "👩", hint: "Người sinh ra em", answer: "mẹ", letters: ["m", "ẹ"] },
  { emoji: "👨", hint: "Bố của em, còn gọi là ...", answer: "ba", letters: ["b", "a"] },
  { emoji: "👵", hint: "Mẹ của ba hoặc mẹ", answer: "bà", letters: ["à", "b"] },
  { emoji: "👴", hint: "Ba của ba hoặc mẹ", answer: "ông", letters: ["g", "ô", "n"] },

  // Cơ thể
  { emoji: "👁️", hint: "Em dùng để nhìn", answer: "mắt", letters: ["ắ", "m", "t"] },
  { emoji: "👂", hint: "Em dùng để nghe", answer: "tai", letters: ["t", "a", "i"] },
  { emoji: "🦵", hint: "Em dùng để đi và chạy", answer: "chân", letters: ["c", "h", "â", "n"] },
  { emoji: "👄", hint: "Em dùng để nói và cười", answer: "miệng", letters: ["m", "i", "ệ", "n", "g"] },
] as const;
