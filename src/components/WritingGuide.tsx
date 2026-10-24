import type { Lesson } from "@/content/lessons";

type WritingData = NonNullable<Lesson["writing"]>;

export function WritingGuide({ data }: { data: WritingData }) {
  return (
    <section className="writing-guide" aria-labelledby="writing-title">
      <span className="eyebrow">Tập viết</span>
      <h2 id="writing-title">{data.title}</h2>
      <p>{data.note}</p>
      <div className="writing-guide-images">
        {data.images.map((image) => (
          <figure key={image.src}>
            <img src={image.src} alt={image.alt} />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
      <ol className="writing-guide-steps">
        {data.steps.map((step) => <li key={step}>{step}</li>)}
      </ol>
    </section>
  );
}
