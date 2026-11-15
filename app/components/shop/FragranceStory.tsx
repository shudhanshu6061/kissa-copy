import type { StoryChapter } from "../../lib/products";

export function FragranceStory({ chapters }: { chapters: StoryChapter[] }) {
    if (!chapters || chapters.length === 0) return null;

    return (
        <section className="kissa-story-section" id="story" aria-label="The Fragrance Narrative">
            <div className="section-header">
                <span className="section-label">THE OLFACTORY NARRATIVE</span>
                <h2 className="section-title">The Story of NAYA PANNA</h2>
                <p className="section-desc">
                    An emotional journey through misty cardamom hills, equatorial downpours, and ancient temple heartwood sanctuaries. [EDIT]
                </p>
            </div>

            <div className="kissa-story-chapters">
                {chapters.map((chapter, idx) => {
                    const isEven = idx % 2 === 1;
                    return (
                        <article
                            key={chapter.chapterNumber}
                            className={`kissa-story-row ${isEven ? "kissa-story-reverse" : ""}`}
                        >
                            {/* Media Visual Column */}
                            <div className="kissa-story-media-col">
                                <div className="kissa-story-media-frame">
                                    <img
                                        src={chapter.imageUrl}
                                        alt={chapter.imageAlt || chapter.title}
                                        loading="lazy"
                                        className="kissa-story-img"
                                    />
                                    <div className="kissa-story-media-vignette" />
                                </div>
                            </div>

                            {/* Narrative Content Column */}
                            <div className="kissa-story-text-col">
                                <span className="kissa-story-kicker">
                                    {chapter.chapterNumber}
                                </span>
                                <h3 className="kissa-story-title">{chapter.title}</h3>

                                {chapter.quote && (
                                    <blockquote className="kissa-story-quote">
                                        {chapter.quote}
                                    </blockquote>
                                )}

                                <div className="kissa-story-paragraphs">
                                    {chapter.text.map((paragraph, pIdx) => (
                                        <p key={pIdx} className="kissa-story-body">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

