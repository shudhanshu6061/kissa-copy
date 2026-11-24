import { useState, useEffect } from "react";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export function AccountModal({ isOpen, onClose, onShowToast }: AccountModalProps) {
  const [email, setEmail] = useState("connoisseur@parfums.com");
  const [passcode, setPasscode] = useState("••••••••••••");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast("Welcome to the Atelier VIP Circle.");
    onClose();
  };

  return (
    <div
      className="account-backdrop open"
      id="accountBackdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="account-modal">
        <div className="account-header">
          <div className="account-brand">
            <img
              src="/landing-pages/meng-to-sketchbook/kissa-logo.png"
              alt="KISSA"
              style={{ height: "26px" }}
            />
            <span className="account-subtitle">Atelier VIP Circle · High Perfumery</span>
          </div>
          <button
            type="button"
            className="account-close"
            id="accountCloseBtn"
            aria-label="Close"
            onClick={onClose}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="account-body">
          <div className="account-welcome">
            <h3>Private Salon &amp; Member Concierge</h3>
            <p>
              Welcome to the KISSA ख़ूबसूरत botanical atelier. Members receive private sampling allocations, bespoke olfactive consultations, and invitations to new edition uncorkings.
            </p>
          </div>
          <form className="account-form" onSubmit={handleSubmit}>
            <div className="account-field">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="connoisseur@parfums.com"
                required
              />
            </div>
            <div className="account-field">
              <label>VIP Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="account-submit-btn">
              Access Private Atelier
            </button>
          </form>
          <div className="account-perks">
            <div className="perk-item">
              <span className="perk-bullet">✦</span>
              <span>Complimentary botanical calligraphy engraving on 100ml Extraits</span>
            </div>
            <div className="perk-item">
              <span className="perk-bullet">✦</span>
              <span>Access to private botanical archive &amp; vintage macerations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
