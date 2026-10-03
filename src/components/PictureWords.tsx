import type { Lesson } from "@/content/lessons";
import { SpeakButton } from "@/components/SpeakButton";

type PictureWordsData = NonNullable<Lesson["pictureWords"]>;

export function PictureWords({ data }: { data: PictureWordsData }) {
  const focus = data.focus.map((char) => char.normalize("NFC"));
  return (
    <section className="picture-words" aria-labelledby="picture-words-title">
      <div className="picture-words-head">
        <span className="eyebrow">🖼️ Thẻ tranh</span>
        <h2 id="picture-words-title">{data.title}</h2>
        <p>{data.note}</p>
      </div>
      <div className="picture-word-grid">
        {data.words.map((item, index) => (
          <figure className={`picture-word picture-word--${index % 4}`} key={item.word}>
            <div className={`picture-word-emoji${[...item.emoji].length > 2 ? " picture-word-emoji--duo" : ""}`} aria-hidden="true">{item.emoji}</div>
            <figcaption>
              <span className="picture-word-text">
                {[...item.word.normalize("NFC")].map((char, i) => <span key={i} className={focus.includes(char.toLowerCase()) ? "pw-focus" : undefined}>{char}</span>)}
              </span>
              <SpeakButton text={item.word} label="🔊 Nghe" />
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
