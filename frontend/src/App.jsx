
import { useState } from "react";
import "./App.css";


const suggestions = [
  {
    title: "My projects",
    description: "Software I've designed and built.",
    question: "Tell me about Abby's software projects.",
  },
  {
    title: "AI research",
    description: "Research, models, and experiments.",
    question: "Tell me about Abby's machine learning research.",
  },
  {
    title: "Technical skills",
    description: "Tools, technologies, and expertise.",
    question: "What are Abby's technical skills?",
  },
  {
    title: "My experience",
    description: "Professional work and community impact.",
    question: "Summarize Abby's professional experience.",
  },
];


const projects = [
  {
    number: "01",
    type: "AI RESEARCH",
    name: "Dam Overflow Risk Prediction",
    description:
      "A comparative study of machine learning models for predicting dam overflow and structural risks in Ethiopia, focusing on the Grand Ethiopian Renaissance Dam.",
    stack: "Python · SVM · ANN · RNN-LSTM",
    link: "https://zenodo.org/records/18951345",
    linkLabel: "Read Research",
  },
  {
    number: "02",
    type: "GENERATIVE AI · RAG",
    name: "Abby AI",
    description:
      "An AI-powered portfolio assistant that retrieves information from my professional background and answers questions conversationally in English and Amharic.",
    stack: "FastAPI · Gemini · ChromaDB · React",
    link: "https://github.com/Abby966",
    linkLabel: "Explore GitHub",
  },
  {
    number: "03",
    type: "FULL-STACK DEVELOPMENT",
    name: "FundMate",
    description:
      "A platform connecting entrepreneurs, investors, and mentors to support startup discovery, mentorship, and collaboration.",
    stack: "React · Node.js · Express · PostgreSQL · Socket.IO",
    link: "https://github.com/Abby966/Fundmate2",
    linkLabel: "View Repository",
  },
  {
    number: "04",
    type: "WEB DEVELOPMENT · TOURISM",
    name: "Discover Dire Dawa",
    description:
      "A website showcasing Dire Dawa's attractions, culture, markets, accommodation, and visitor information.",
    stack: "Web Development · Responsive Design",
    link: "https://discoverdire.netlify.app/",
    linkLabel: "Live Website",
    live: true,
  },
  {
    number: "05",
    type: "WEB DEVELOPMENT · SOCIAL IMPACT",
    name: "Aged Care & Dignity Center",
    description:
      "A website presenting elder-care services and community initiatives, helping visitors learn about the center and ways to support its work.",
    stack: "Web Development · Responsive Design",
    link: "https://frabjous-macaron-786d14.netlify.app/",
    linkLabel: "Live Website",
    live: true,
  },
  {
    number: "06",
    type: "SECURITY · SYSTEM MONITORING",
    name: "Laptop Sentinel",
    description:
      "A laptop monitoring and security project focused on tracking, intrusion detection, and smart alerts.",
    stack: "Software Development · Security",
    link: "https://github.com/Abby966/Laptopsentinel",
    linkLabel: "View Repository",
  },
  {
    number: "07",
    type: "GENERATIVE AI · KNOWLEDGE RETRIEVAL",
    name: "RecallX",
    description:
      "A retrieval-augmented generation chatbot that helps users retrieve answers from a knowledge source.",
    stack: "Python · Streamlit · RAG",
    link: "https://myrecallx.streamlit.app/",
    linkLabel: "Live App",
    live: true,
  },
  {
    number: "08",
    type: "COMPUTER VISION · AGRICULTURE",
    name: "PlantPulse",
    description:
      "A plant disease classification project exploring how image-based AI can identify plant health conditions and support agricultural decision-making.",
    stack: "Python · TensorFlow · Image Classification",
    link: "https://github.com/Abby966",
    linkLabel: "Explore GitHub",
  },
  {
    number: "09",
    type: "RESEARCH · HUMAN-COMPUTER INTERACTION",
    name: "An Experimental Study on Consent Behavior",
    description:
      "A study of digital consent behavior, exploring how users interact with terms and conditions and the factors that influence privacy decisions.",
    stack: "Research · User Behavior · Digital Privacy",
    link: "https://github.com/Abby966",
    linkLabel: "Explore GitHub",
  },
  {
    number: "10",
    type: "WEB DEVELOPMENT · COMMUNITY",
    name: "Social Media API",
    description:
      "A backend development project focused on API-based social media functionality and data exchange.",
    stack: "Backend Development · REST API",
    link: "https://github.com/Abby966",
    linkLabel: "Explore GitHub",
  },
  {
    number: "11",
    type: "WEB DEVELOPMENT · EDUCATION",
    name: "Online Entrance Exam Preparation System",
    description:
      "An education-focused system intended to help students prepare for entrance examinations through online learning resources.",
    stack: "Web Development · Education Technology",
    link: "https://github.com/Abby966",
    linkLabel: "Explore GitHub",
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

      if (data.error) throw new Error(data.error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: (data.answer || "I couldn't generate an answer.")
            .replace(/\*\*/g, "")
            .replace(/\*/g, ""),
        },
      ]);
    } catch (err) {
      setError(
        "I couldn't connect to Abby AI. Check that the backend is running and try again."
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
    <main>
      <nav className="navbar">
        <a className="wordmark" href="#home">
          abby<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Selected work</a>
          <a href="#research">Research</a>
        </div>

        <a className="nav-contact" href="https://github.com/Abby966">
          GitHub <span>↗</span>
        </a>
      </nav>

      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="availability-dot" />
            COMPUTER SCIENCE GRADUATE · AI & SOFTWARE
          </div>

          <h1>
            Building technology
            <br />
            with <span>purpose.</span>
          </h1>

          <p className="hero-description">
            I'm Abby Chanyalew — a developer and aspiring AI engineer
            interested in intelligent systems, meaningful software, and
            technology that solves real-world problems.
          </p>

          <div className="hero-actions">
            <a className="button-dark" href="#work">
              Explore my work <span>↗</span>
            </a>
            <a className="button-text" href="#ask-abby">
              Get to know Abby <span>↓</span>
            </a>
          </div>
        </div>

        <div className="hero-index">
          <div className="index-rule" />
          <span>INDEPENDENT THINKING.</span>
          <span>THOUGHTFUL ENGINEERING.</span>
          <span>REAL-WORLD IMPACT.</span>
          <div className="index-number">AA / 001</div>
        </div>

        <div className="hero-bottom">
          <span>BASED IN ETHIOPIA</span>
          <a href="#work">SCROLL TO EXPLORE ↓</a>
        </div>
      </section>

      <section className="intro-section section-wrap" id="about">
        <div className="section-label">
          <span>01</span> / A LITTLE ABOUT ME
        </div>

        <div className="intro-content">
          <h2>
            Curious about how things work.
            <br />
            Driven by what they can change.
          </h2>

          <div className="intro-detail">
            <p>
              My interests sit at the intersection of software engineering
              and artificial intelligence. I enjoy turning ideas into
              working systems, exploring research questions, and thinking
              about how technology can be useful in the communities that
              need it.
            </p>
            <p>
              Beyond code, I care about STEM education, mentoring, and
              helping more young women see a place for themselves in
              technology.
            </p>
            <a className="text-link" href="#ask-abby">
              There's more to my story <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="work-section section-wrap" id="work">
        <div className="section-heading">
          <div>
            <div className="section-label">
              <span>02</span> / SELECTED WORK
            </div>
            <h2>Ideas, made tangible.</h2>
          </div>
          <a
            className="text-link"
            href="https://github.com/Abby966"
            target="_blank"
            rel="noreferrer"
          >
            All projects on GitHub ↗
          </a>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className="project-row" key={project.number}>
              <span className="project-number">{project.number}</span>

              <div className="project-main">
                <span className="project-type">{project.type}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <span className="project-stack">{project.stack}</span>
              </div>

             
<div className="project-actions">
  <a
    className="project-link"
    href={project.link}
    target="_blank"
    rel="noreferrer"
    aria-label={`${project.linkLabel}: ${project.name}`}
    title={project.linkLabel}
  >
    {project.live ? "Live ↗" : "↗"}
  </a>
</div>

            </article>
          ))}
        </div>
      </section>

      <section className="research-section section-wrap" id="research">
        <div className="section-label">
          <span>03</span> / RESEARCH & INTERESTS
        </div>

        <div className="research-content">
          <h2>
            AI should be useful
            <br />
            <span>beyond the lab.</span>
          </h2>
          <div>
            <p>
              I'm interested in building intelligent systems that respond
              to real constraints — including language, connectivity,
              accessibility, and local context.
            </p>
            <p>
              My long-term goal is to deepen my expertise in AI and machine
              learning, through research and engineering that connect
              technical ideas to practical needs.
            </p>
            <a
              className="text-link"
              href="https://zenodo.org/records/18951345"
              target="_blank"
              rel="noreferrer"
            >
              Read my published research ↗
            </a>
          </div>
        </div>
      </section>

      <section className="assistant-section section-wrap" id="ask-abby">
        <div className="assistant-heading">
          <div className="section-label">
            <span>04</span> / THE INTERACTIVE PORTFOLIO
          </div>
          <h2>
            Get to know <span>Abby.</span>
          </h2>
          <p>
            Skip the usual portfolio scroll. Ask questions about my work,
            research, skills, and experience.
          </p>
        </div>

        <div className="assistant-card">
          <div className="assistant-top">
            <div className="assistant-identity">
              <div className="assistant-mark">a.</div>
              <div>
                <strong>Abby AI</strong>
                <span>
                  <i /> Portfolio assistant
                </span>
              </div>
            </div>
            <span className="assistant-badge">AI-POWERED</span>
          </div>

          {messages.length === 0 ? (
            <div className="assistant-welcome">
              <h3>What would you like to know?</h3>
              <p>
                Choose a starting point, or ask me something of your own.
              </p>

              <div className="prompt-list">
                {suggestions.map((item, index) => (
                  <button
                    className="prompt-item"
                    key={item.title}
                    onClick={() => sendQuestion(item.question)}
                    disabled={loading}
                  >
                    <span className="prompt-index">
                      0{index + 1}
                    </span>
                    <span className="prompt-copy">
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                    <span className="prompt-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="chat-messages" aria-live="polite">
              {messages.map((message, index) => (
                <div
                  className={`chat-message ${message.role}`}
                  key={`${index}-${message.role}`}
                >
                  <span className="chat-author">
                    {message.role === "user" ? "YOU" : "ABBY AI"}
                  </span>
                  <p>{message.content}</p>
                </div>
              ))}

              {loading && (
                <div className="chat-message assistant">
                  <span className="chat-author">ABBY AI</span>
                  <p className="thinking">Thinking...</p>
                </div>
              )}

              {error && (
                <div className="chat-error">
                  {error}
                  <button
                    onClick={() =>
                      sendQuestion(messages.at(-1)?.content)
                    }
                    disabled={loading}
                  >
                    Try again ↗
                  </button>
                </div>
              )}

              <button
                className="reset-chat"
                onClick={startNewChat}
                disabled={loading}
              >
                Start a new conversation ↺
              </button>
            </div>
          )}

          <form className="assistant-composer" onSubmit={handleSubmit}>
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask me about my work..."
              aria-label="Ask Abby a question"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!question.trim() || loading}
              aria-label="Send question"
            >
              {loading ? "…" : "↑"}
            </button>
          </form>

          <p className="assistant-footnote">
            Responses are generated using Abby's portfolio knowledge base.
            AI-generated answers may contain errors.
          </p>
        </div>
      </section>

      <footer className="footer section-wrap">
        <a className="wordmark" href="#home">
          abby<span>.</span>
        </a>
        <p>Thoughtfully built. Always learning.</p>
        <div className="footer-links">
          <a href="https://github.com/Abby966" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a href="#home">Back to top ↑</a>
        </div>
        <span className="copyright">© 2026 ABBY CHANYALEW</span>
      </footer>
    </main>
  );
}

const experience = [
  {
    period: "CURRENT ROLE",
    name: "BeOnline ICT Solutions PLC",
    role: "Technical Solutions Engineer — Microsoft Cloud & Collaboration",
    detail:
      "Support customer-facing technical solutions involving Microsoft 365, Azure, Microsoft Entra ID, Teams, Exchange Online, SharePoint, OneDrive, endpoint management, cloud security, and licensing. Also engage with security solutions including Kaspersky and CyberArk.",
  },
  {
    period: "DEVELOPMENT EXPERIENCE",
    name: "Afronex Tech Hub",
    role: "Developer · Full-Stack Development Intern",
    detail:
      "Contributed to web application development using React and Node.js, gaining practical experience in frontend interfaces, backend functionality, and full-stack development.",
  },
  {
    period: "TEACHING EXPERIENCE",
    name: "Yenetta Code",
    role: "Coding Instructor",
    detail:
      "Support learners as they develop programming knowledge and practical coding skills through instruction and learning activities.",
  },
  {
    period: "COMMUNITY LEADERSHIP",
    name: "WAAW Foundation",
    role: "Chapter Leadership · STEM Outreach",
    detail:
      "Promoted STEM education and technology engagement for girls through outreach activities, presentations, and practical learning opportunities.",
  },
  {
    period: "TUTORING & EDUCATION",
    name: "Kelem Tutors and Other Learning Initiatives",
    role: "Tutor · Volunteer Educator",
    detail:
      "Supported learners through tutoring and educational activities, helping students strengthen their understanding of academic and technical subjects.",
  },
  {
    period: "INTERNSHIP",
    name: "Commercial Bank of Ethiopia",
    role: "Semester Intern",
    detail:
      "Gained workplace experience through a semester internship at the Commercial Bank of Ethiopia.",
  },
  {
    period: "COMMUNITY ENGAGEMENT",
    name: "STEM Outreach in Dire Dawa",
    role: "Technology Outreach and Mentoring",
    detail:
      "Participated in activities introducing students to technology, web development, and opportunities in STEM, with a focus on encouraging girls to explore technology.",
  },
];

export default App;
