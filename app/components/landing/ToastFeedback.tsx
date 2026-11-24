interface ToastFeedbackProps {
  message: string | null;
}

export function ToastFeedback({ message }: ToastFeedbackProps) {
  return (
    <div
      className={`toast-feedback ${message ? "show" : ""}`}
      id="toastMsg"
      role="status"
      aria-live="polite"
    >
      <span className="toast-icon">✦</span>
      <span className="toast-text" id="toastText">
        {message || ""}
      </span>
    </div>
  );
}
