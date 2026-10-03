import { storyFullText, type Lesson } from "@/content/lessons";
import { SpeakButton } from "@/components/SpeakButton";

type StoryData = NonNullable<Lesson["story"]>;

export function StoryBoard({ data }: { data: StoryData }) {
  return (
    <section className="story-board" aria-labelledby="story-title">
      <div className="story-head">
        <div>
          <span className="eyebrow">📖 Truyện tranh</span>
          <h2 id="story-title">{data.title}</h2>
          <p>{data.note}</p>
        </div>
        <SpeakButton text={storyFullText(data)} label="▶ Nghe cả truyện" />
      </div>
      <ol className="story-frames">
        {data.frames.map((frame, index) => (
          <li className={`story-frame story-frame--${index % 4}`} key={frame.text}>
            <span className="story-frame-number">{index + 1}</span>
            <div className="story-scene" aria-hidden="true">{frame.scene}</div>
            <p className="story-text">{frame.text}</p>
            <SpeakButton text={frame.text} label="🔊 Nghe" />
          </li>
        ))}
      </ol>
      <div className="story-retell">
        <strong>💬 Em kể lại nhé</strong>
        <ul>{data.retell.map((question) => <li key={question}>{question}</li>)}</ul>
      </div>
    </section>
  );
}
