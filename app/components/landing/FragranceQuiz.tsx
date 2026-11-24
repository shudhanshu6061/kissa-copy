import { useState } from "react";
import { PERFUMES, formatPrice, type CurrencyCode, type Perfume } from "../../lib/landing-data";

interface FragranceQuizProps {
  currency: CurrencyCode;
  onAddToCart: (perfumeId: string, size?: string) => void;
}

export function FragranceQuiz({ currency, onAddToCart }: FragranceQuizProps) {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<{ 1?: string; 2?: string; 3?: string }>({});
  const [result, setResult] = useState<Perfume | null>(null);

  const handleSelect = (stepNum: 1 | 2 | 3, value: string) => {
    const nextAnswers = { ...answers, [stepNum]: value };
    setAnswers(nextAnswers);

    if (stepNum === 1) {
      setStep(2);
    } else if (stepNum === 2) {
      setStep(3);
    } else if (stepNum === 3) {
      // Calculate
      let match: Perfume = PERFUMES[0];
      if (nextAnswers[1] === "rainforest" || nextAnswers[2] === "tea") {
        match = PERFUMES[0]; // Naya Panna
      } else if (nextAnswers[1] === "harbor" || nextAnswers[2] === "woods") {
        match = PERFUMES[1]; // Blue Amber
      } else {
        match = PERFUMES[2]; // Midnight Guava
      }
      setResult(match);
      setStep(4); // Result step
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({});
    setResult(null);
  };

  return (
    <>
      <section id="quiz" className="quiz-section">
        <div className="section-header">
          <span className="section-label">Private Consultation</span>
          <h2 className="section-title">The Scent Diagnosis</h2>
          <p className="section-desc">
            Answer three intuitive questions to unveil the KISSA formula aligned with your spirit and aura.
          </p>
        </div>

        <div className="quiz-card" id="quizCard">
          <div className="quiz-steps-tracker">
            <span className={`quiz-step-dot ${step >= 1 ? "active" : ""}`} id="dot1" />
            <span className={`quiz-step-dot ${step >= 2 ? "active" : ""}`} id="dot2" />
            <span className={`quiz-step-dot ${step >= 3 ? "active" : ""}`} id="dot3" />
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="quiz-step-view" id="quizStep1">
              <h3 className="quiz-question-title">Which atmospheric landscape beckons you?</h3>
              <p className="quiz-question-sub">Select the space where your mind wanders most freely.</p>
              <div className="quiz-options-grid">
                <button
                  type="button"
                  className="quiz-option"
                  onClick={() => handleSelect(1, "rainforest")}
                >
                  <span className="quiz-opt-icon">🌿</span>
                  <h4 className="quiz-opt-title">Equatorial Rainforest</h4>
                  <p className="quiz-opt-desc">Petrichor, crushed ferns, damp green moss, and misty air.</p>
                </button>
                <button
                  type="button"
                  className="quiz-option"
                  onClick={() => handleSelect(1, "harbor")}
                >
                  <span className="quiz-opt-icon">🌊</span>
                  <h4 className="quiz-opt-title">Salt-Air Harbor</h4>
                  <p className="quiz-opt-desc">Driftwood, morning ocean spray, brisk mint, and cedar timbers.</p>
                </button>
                <button
                  type="button"
                  className="quiz-option"
                  onClick={() => handleSelect(1, "orchard")}
                >
                  <span className="quiz-opt-icon">🌑</span>
                  <h4 className="quiz-opt-title">Midnight Orchard</h4>
                  <p className="quiz-opt-desc">Ripe exotic fruits, smoky incense resin, and warm midnight spices.</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="quiz-step-view" id="quizStep2">
              <h3 className="quiz-question-title">Which olfactive character defines your presence?</h3>
              <p className="quiz-question-sub">How would you like to be remembered when you leave the room?</p>
              <div className="quiz-options-grid">
                <button
                  type="button"
                  className="quiz-option"
                  onClick={() => handleSelect(2, "tea")}
                >
                  <span className="quiz-opt-icon">🍵</span>
                  <h4 className="quiz-opt-title">Airy White Tea &amp; Green Cardamom</h4>
                  <p className="quiz-opt-desc">Crisp, mindful, grounded, effortlessly elegant.</p>
                </button>
                <button
                  type="button"
                  className="quiz-option"
                  onClick={() => handleSelect(2, "woods")}
                >
                  <span className="quiz-opt-icon">🪵</span>
                  <h4 className="quiz-opt-title">Smoked Woods &amp; Resins</h4>
                  <p className="quiz-opt-desc">Warm cedarwood, white amber, cool aquatic undertones.</p>
                </button>
                <button
                  type="button"
                  className="quiz-option"
                  onClick={() => handleSelect(2, "spices")}
                >
                  <span className="quiz-opt-icon">✨</span>
                  <h4 className="quiz-opt-title">Warm Exotic Spices &amp; Amber</h4>
                  <p className="quiz-opt-desc">Rich oud, tropical guava sweetness, magnetic patchouli.</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="quiz-step-view" id="quizStep3">
              <h3 className="quiz-question-title">What sillage trail do you leave behind?</h3>
              <p className="quiz-question-sub">The intimacy and projection of your personal scent.</p>
              <div className="quiz-options-grid">
                <button
                  type="button"
                  className="quiz-option"
                  onClick={() => handleSelect(3, "radiant")}
                >
                  <span className="quiz-opt-icon">🕊️</span>
                  <h4 className="quiz-opt-title">Radiant &amp; Memorable</h4>
                  <p className="quiz-opt-desc">Noticeable to those nearby, lasting through day and twilight.</p>
                </button>
                <button
                  type="button"
                  className="quiz-option"
                  onClick={() => handleSelect(3, "intimate")}
                >
                  <span className="quiz-opt-icon">🕯️</span>
                  <h4 className="quiz-opt-title">Intimate Skin Accord</h4>
                  <p className="quiz-opt-desc">Reserved for those invited into your closest embrace.</p>
                </button>
                <button
                  type="button"
                  className="quiz-option"
                  onClick={() => handleSelect(3, "powerful")}
                >
                  <span className="quiz-opt-icon">🔮</span>
                  <h4 className="quiz-opt-title">Deep Room-Filling Presence</h4>
                  <p className="quiz-opt-desc">Unapologetic, magnetic sillage that lingers after midnight.</p>
                </button>
              </div>
            </div>
          )}

          {/* Result Box */}
          {step === 4 && result && (
            <div className="quiz-result-box" id="quizResultBox" style={{ display: "block" }}>
              <span className="quiz-result-kicker">✦ Your Recommended Olfactive Match</span>
              <h3 className="quiz-result-title" id="quizMatchTitle">
                {result.title}
              </h3>
              <p className="quiz-result-desc" id="quizMatchDesc">
                {result.description}
              </p>
              <div className="quiz-result-actions">
                <button
                  type="button"
                  className="coffret-btn"
                  id="quizAddBtn"
                  onClick={() => onAddToCart(result.id, "50ml")}
                >
                  Acquire This Formula ({formatPrice(result.price, currency)})
                </button>
                <button
                  type="button"
                  className="quiz-retake-btn"
                  onClick={handleReset}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--ink-soft, rgba(78,52,46,0.65))",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "13px",
                    marginTop: "12px",
                  }}
                >
                  Retake Consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="rule short" aria-hidden="true" />
    </>
  );
}
