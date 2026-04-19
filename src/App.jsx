import React, { useEffect, useMemo, useState } from "react";

const RATINGS = [1, 2, 3, 4, 5];
const LOCK_DURATION_MS = 3000;

function RatingChips({ selectedRating, onSelect, disabled }) {
  return (
    <div className="rating-group" aria-label="Rating selection">
      {RATINGS.map((rating) => (
        <button
          key={rating}
          type="button"
          className={`chip ${selectedRating === rating ? "active" : ""}`}
          onClick={() => onSelect(rating)}
          disabled={disabled}
          aria-pressed={selectedRating === rating}
        >
          {rating}
        </button>
      ))}
    </div>
  );
}

function CommentBox({ value, onChange, disabled }) {
  return (
    <div className="field">
      <label htmlFor="comment" className="label">
        Comment
      </label>
      <textarea
        id="comment"
        className="textarea"
        rows="4"
        placeholder="Tell us what you think..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      />
    </div>
  );
}

function SubmitButton({ disabled }) {
  return (
    <button type="submit" className="submit-button" disabled={disabled}>
      Submit feedback
    </button>
  );
}

function SummaryPanel({ submissions }) {
  const totalSubmissions = submissions.length;
  const averageRating = totalSubmissions
    ? (
        submissions.reduce((sum, item) => sum + item.rating, 0) /
        totalSubmissions
      ).toFixed(1)
    : "0.0";

  const recentComments = submissions
    .filter((item) => item.comment.trim())
    .slice(-3)
    .reverse();

  return (
    <section className="summary-card">
      <h2>Summary</h2>
      <div className="summary-metrics">
        <div className="metric">
          <span className="metric-label">Total submissions</span>
          <strong>{totalSubmissions}</strong>
        </div>
        <div className="metric">
          <span className="metric-label">Average rating</span>
          <strong>{averageRating}</strong>
        </div>
      </div>

      <div className="recent-comments">
        <h3>Three most recent comments (Lastest at the top)</h3>
        {recentComments.length > 0 ? (
          <ul>
            {recentComments.map((item) => (
              <li key={item.id}>
                <span className="comment-rating">Rating: {item.rating}</span>
                <p>{item.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No comments submitted yet.</p>
        )}
      </div>
    </section>
  );
}

export default function App() {
  const [theme, setTheme] = useState("theme-light");
  const [selectedRating, setSelectedRating] = useState(null);
  const [comment, setComment] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((current) =>
      current === "theme-light" ? "theme-dark" : "theme-light"
    );
  }
  
  useEffect(() => {
    if (!isLocked) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsLocked(false);
    }, LOCK_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isLocked]);

  const isSubmitDisabled = useMemo(
    () => isLocked || selectedRating === null,
    [isLocked, selectedRating]
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (selectedRating === null) {
      setError("Please select a rating before submitting.");
      setConfirmation("");
      return;
    }

    const nextSubmission = {
      id: crypto.randomUUID(),
      rating: selectedRating,
      comment: comment.trim(),
      createdAt: new Date().toISOString()
    };

    setSubmissions((current) => [...current, nextSubmission]);
    setConfirmation("Thank you for your feedback.");
    setError("");
    setSelectedRating(null);
    setComment("");
    setIsLocked(true);
  }

  return (
    <main className="page-shell">
      <section className="widget-card">
        <div className="header">
            <div className="header-top">
                <div>
                    <h1>Mini Sentiment Widget</h1>
                    <p className="intro">
                        Select a rating, leave a comment, and submit your feedback.
                    </p>
                </div>

                <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
            >
              {theme === "theme-light" ? "Dark mode" : "Light mode"}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="field">
            <span className="label">Rating</span>
            <RatingChips
              selectedRating={selectedRating}
              onSelect={(rating) => {
                setSelectedRating(rating);
                setError("");
              }}
              disabled={isLocked}
            />
          </div>

          <CommentBox
            value={comment}
            onChange={setComment}
            disabled={isLocked}
          />

          {error ? <p className="message error">{error}</p> : null}
          {confirmation ? (
            <p className="message success">{confirmation}</p>
          ) : null}
          {isLocked ? (
            <p className="message muted">
              Submissions are temporarily locked for 3 seconds.
            </p>
          ) : null}

          <SubmitButton disabled={isSubmitDisabled} />
        </form>
      </section>

      <SummaryPanel submissions={submissions} />
    </main>
  );
}