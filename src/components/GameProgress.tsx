import { Icon } from "@/components/Icon";

// Thanh tiến trình dùng chung cho các trò ở /bai-tap: nhãn câu, một chấm mỗi câu
// (đúng ✓ xanh, sai/bỏ qua xám, câu đang làm nổi lên) và số câu đúng.
export function GameProgress({ round, total, results, title }: { round: number; total: number; results: ("good" | "skip")[]; title: string }) {
  const score = results.filter((result) => result === "good").length;
  return (
    <header className="word-game-progress">
      <div className="word-game-progress-label">
        <strong>Câu {round + 1}/{total}</strong>
        <span>{title}</span>
      </div>
      <ol className="word-game-dots" role="progressbar" aria-label={`Tiến trình ${total} câu`} aria-valuenow={round + 1} aria-valuemin={1} aria-valuemax={total}>
        {Array.from({ length: total }, (_, index) => {
          const state = results[index] ?? (index === round ? "current" : "todo");
          return <li key={index} className={`word-game-dot word-game-dot--${state}`}>{state === "good" ? <Icon name="check" size={14} /> : index + 1}</li>;
        })}
      </ol>
      <div className="word-game-progress-score" aria-label={`${score} câu đúng`}>
        <Icon name="star" size={16} fill="currentColor" />
        <strong>{score}</strong>
      </div>
    </header>
  );
}
