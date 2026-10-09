
import { useState } from "react";
import "./App.css";

const suggestions = [
  {
    icon: "⌘",
    title: "Projects",
    description: "What has Abby built?",
    question: "Tell me about Abby's software projects.",
  },
  {
    icon: "✳",
    title: "AI research",
    description: "Explore her research.",
    question: "Tell me about Abby's machine learning research.",
  },
  {
    icon: "⌘",
    title: "Technical skills",
    description: "What technologies does she know?",
    question: "What are Abby's technical skills?",
  },
  {
    icon: "↗",
    title: "Experience",
    description: "Discover her background.",
    question: "Summarize Abby's professional experience.",
  },
];

function App() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendQuestion(text = question) {
    const trimmedQuestion = text.trim();

    if (!trimmedQuestion || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", content: trimmedQuestion },
    ]);
    setQuestion("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmedQuestion }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.answer || "I couldn't generate an answer.",
        },
      ]);
    } catch (err) {
      setError(
        "I couldn't reach Abby AI. Check that your Python backend is running, then try again."
      );
      console.error("Chat request failed:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendQuestion();
  }

  function startNewChat() {
    setMessages([]);
    setQuestion("");
    setError("");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={startNewChat}>
          <span className="brand-mark">a.</span>
          <span>abby<span className="brand-light">ai</span></span>
        </a>

        <button className="new-chat" onClick={startNewChat}>
          <span>＋</span> New conversation
        </button>

        <div className="sidebar-section">
          <p className="sidebar-label">YOUR ASSISTANT</p>
          <div className="sidebar-item active">
            <span className="sidebar-dot" />
            Portfolio assistant
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="profile-avatar">AC</div>
          <div className="profile-info">
            <strong>Abegail Chanyalew</strong>
            <span>Computer Science · AI</span>
          </div>
          <span className="profile-menu">···</span>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div className="topbar-title">
            <span className="status-dot" />
            <span>Portfolio assistant</span>
          </div>
          <span className="topbar-tag">POWERED BY RAG</span>
        </header>

        <div className="chat-area">
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="welcome-eyebrow">
                <span className="eyebrow-line" />
                GET TO KNOW ABBY
              </div>

              <h1>
                Curiosity starts
                <br />
                <span>with a question.</span>
              </h1>

              <p className="welcome-description">
                I'm Abby's AI portfolio assistant. Ask me about her
                projects, research, technical skills, and experience.
              </p>

              <div className="suggestions-heading">
                <span>NOT SURE WHERE TO START?</span>
                <span className="suggestions-count">04 PROMPTS</span>
              </div>

              <div className="suggestions-grid">
                {suggestions.map((item) => (
                  <button
                    className="suggestion-card"
                    key={item.title}
                    onClick={() => sendQuestion(item.question)}
                    disabled={loading}
                  >
                    <span className="suggestion-icon">{item.icon}</span>
                    <span className="suggestion-title">{item.title}</span>
                    <span className="suggestion-description">
                      {item.description}
                    </span>
                    <span className="suggestion-arrow">↗</span>
                  </button>
                ))}
              </div>

              <div className="privacy-note">
                <span>✳</span>
                Answers are generated from Abby's portfolio knowledge base.
              </div>
            </div>
          ) : (
            <div className="messages">
              {messages.map((message, index) => (
                <div
                  className={`message-row ${message.role}`}
                  key={`${index}-${message.role}`}
                >
                  {message.role === "assistant" && (
                    <div className="message-avatar">a.</div>
                  )}
                  <div className="message-content">
                    <span className="message-author">
                      {message.role === "user" ? "YOU" : "ABBY AI"}
                    </span>
                    <div className="message-bubble">{message.content}</div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message-row assistant">
                  <div className="message-avatar">a.</div>
                  <div className="message-content">
                    <span className="message-author">ABBY AI</span>
                    <div className="message-bubble typing">
                      <span />
                      <span />
                      <span />
                      <small>Thinking through your question...</small>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="error-message">
                  <span>{error}</span>
                  <button onClick={() => sendQuestion(messages.at(-1)?.content)}>
                    Try again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="composer-wrap">
          <form className="composer" onSubmit={handleSubmit}>
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask something about Abby..."
              aria-label="Your question"
              disabled={loading}
            />
            <span className="input-hint">↵</span>
            <button
              className="send-button"
              type="submit"
              disabled={!question.trim() || loading}
              aria-label="Send question"
            >
              {loading ? "…" : "↑"}
            </button>
          </form>
          <p className="composer-footnote">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
