import { useState } from "react";
import { MESSAGE_IDEAS, type MessageIdea } from "../../lib/gifting";

export interface GiftingMessageIdeasProps {
    onSelectMessage?: (text: string) => void;
}

export function GiftingMessageIdeas({ onSelectMessage }: GiftingMessageIdeasProps) {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (idea: MessageIdea, e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard?.writeText(idea.text);
        setCopiedId(idea.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleUseInBook = (idea: MessageIdea) => {
        if (onSelectMessage) {
            onSelectMessage(idea.text);
        }
        const el = document.getElementById("build-your-gift");
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section
            className="kissa-gifting-section"
            id="message-ideas"
            aria-label="What to Write in a Perfume Gift Message"
        >
            <div className="section-header" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto" }}>
                <span className="section-label">THE HANDWRITTEN WORD</span>
                <h2 className="section-title">What to Write in a Perfume Gift Message</h2>
                <p className="section-desc" style={{ maxWidth: 680, margin: "0 auto" }}>
                    Stuck on what to write? Keep it short and honest. Here are a few lines to start from:
                </p>
            </div>

            <div className="kissa-message-cards-grid">
                {MESSAGE_IDEAS.map((idea) => {
                    const isCopied = copiedId === idea.id;

                    return (
                        <div
                            key={idea.id}
                            className="kissa-message-idea-card"
                            onClick={() => handleUseInBook(idea)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleUseInBook(idea);
                                }
                            }}
                            title="Click to write this in your gift book"
                        >
                            <div className="kissa-msg-card-top">
                                <span className="kissa-msg-context-badge">{idea.context}</span>
                                <button
                                    type="button"
                                    className="kissa-msg-copy-btn"
                                    onClick={(e) => handleCopy(idea, e)}
                                    aria-label="Copy message text"
                                >
                                    {isCopied ? "Copied ✓" : "Copy"}
                                </button>
                            </div>

                            <p className="kissa-msg-quote">“{idea.text}”</p>

                            <div className="kissa-msg-action">
                                <span className="kissa-msg-use-link">
                                    <span>Write in book</span>
                                    <span>→</span>
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="kissa-message-ideas-hint">
                <p>
                    Tip: Click any message to write it directly into the{" "}
                    <span>“To your next chapter...”</span> page below.
                </p>
            </div>
        </section>
    );
}
