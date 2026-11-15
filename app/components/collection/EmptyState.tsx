export function EmptyState({ onReset }: { onReset: () => void }) {
    return (
        <div
            style={{
                textAlign: "center",
                padding: "80px 20px",
                maxWidth: 600,
                margin: "0 auto",
                background: "var(--paper-card)",
                borderRadius: 16,
                border: "1px solid var(--hairline)",
            }}
        >
            <img
                src="/kissa-logo-transparent.png"
                alt="KISSA"
                style={{ height: 32, marginBottom: 18, opacity: 0.8 }}
            />
            <h2
                style={{
                    fontFamily: "var(--display)",
                    fontSize: 32,
                    fontWeight: 400,
                    margin: "0 0 10px",
                }}
            >
                No Fragrances Found
            </h2>
            <p
                style={{
                    fontFamily: "var(--font)",
                    fontSize: 16,
                    color: "var(--ink-soft)",
                    margin: "0 0 24px",
                }}
            >
                No editions currently match the selected criteria. Try resetting your
                filter to explore the full collection.
            </p>
            <button type="button" className="kissa-add-btn" onClick={onReset}>
                Reset All Filters
            </button>
        </div>
    );
}
