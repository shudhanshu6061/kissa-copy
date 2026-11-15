import { Link } from "react-router";

export function AddedToast({
    visible,
    onClose,
    title,
    size,
}: {
    visible: boolean;
    onClose: () => void;
    title: string;
    size: string;
}) {
    if (!visible) return null;

    return (
        <aside
            className="kissa-added-toast"
            role="status"
            aria-live="polite"
            aria-label="Added to Bag confirmation"
        >
            <div className="kissa-toast-inner">
                <div className="kissa-toast-icon">✦</div>
                <div className="kissa-toast-message">
                    <strong>{title} ({size})</strong> added to your bespoke bag.
                </div>
                <div className="kissa-toast-actions">
                    <Link to="/shop" className="kissa-toast-link">
                        View Bag →
                    </Link>
                    <button
                        type="button"
                        className="kissa-toast-close"
                        onClick={onClose}
                        aria-label="Close notification"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </aside>
    );
}

