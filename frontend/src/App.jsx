import { useEffect, useRef, useState } from "react";

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

// Research first, then projects. `kind` decides which group an entry sits in.
const works = [
  {
    kind: "Research",
    field: "AI research",
    name: "Dam Overflow Risk Prediction",
    description:
      "A comparative study of machine learning models for predicting dam overflow and structural risks in Ethiopia, focusing on the Grand Ethiopian Renaissance Dam.",
    stack: "Python, SVM, ANN, RNN-LSTM",
    link: "https://zenodo.org/records/18951345",
    linkLabel: "Read the research",
  },
  {
    kind: "Research",
    field: "Research, human-computer interaction",
    name: "An Experimental Study on Consent Behavior",
    description:
      "A study of digital consent behavior, exploring how users interact with terms and conditions and the factors that influence privacy decisions.",
    stack: "Research, user behavior, digital privacy",
    link: "https://github.com/Abby966",
    linkLabel: "Explore on GitHub",
  },
  {
    kind: "Project",
    field: "Generative AI, RAG",
    name: "AskAbby",
    description:
      "An AI-powered portfolio assistant that retrieves information from my professional background and answers questions conversationally in English and Amharic.",
    stack: "FastAPI, Gemini, ChromaDB, React",
    link: "https://github.com/Abby966",
    linkLabel: "Explore on GitHub",
  },
  {
    kind: "Project",
    field: "Full-stack development",
    name: "FundMate",
    description:
      "A platform connecting entrepreneurs, investors, and mentors to support startup discovery, mentorship, and collaboration.",
    stack: "React, Node.js, Express, PostgreSQL, Socket.IO",
    link: "https://github.com/Abby966/Fundmate2",
    linkLabel: "View the repository",
  },
  {
    kind: "Project",
    field: "Web development, tourism",
    name: "Discover Dire Dawa",
    description:
      "A website showcasing Dire Dawa's attractions, culture, markets, accommodation, and visitor information.",
    stack: "Web development, responsive design",
    link: "https://discoverdire.netlify.app/",
    linkLabel: "Visit the website",
  },
  {
    kind: "Project",
    field: "Web development, social impact",
    name: "Aged Care & Dignity Center",
    description:
      "A website presenting elder-care services and community initiatives, helping visitors learn about the center and ways to support its work.",
    stack: "Web development, responsive design",
    link: "https://frabjous-macaron-786d14.netlify.app/",
    linkLabel: "Visit the website",
  },
  {
    kind: "Project",
    field: "Security, system monitoring",
    name: "Laptop Sentinel",
    description:
      "A laptop monitoring and security project focused on tracking, intrusion detection, and smart alerts.",
    stack: "Software development, security",
    link: "https://github.com/Abby966/Laptopsentinel",
    linkLabel: "View the repository",
  },
  {
    kind: "Project",
    field: "Generative AI, knowledge retrieval",
    name: "RecallX",
    description:
      "A retrieval-augmented generation chatbot that helps users retrieve answers from a knowledge source.",
    stack: "Python, Streamlit, RAG",
    link: "https://myrecallx.streamlit.app/",
    linkLabel: "Open the app",
  },
  {
    kind: "Project",
    field: "Computer vision, agriculture",
    name: "PlantPulse",
    description:
      "A plant disease classification project exploring how image-based AI can identify plant health conditions and support agricultural decision-making.",
    stack: "Python, TensorFlow, image classification",
    link: "https://github.com/Abby966",
    linkLabel: "Explore on GitHub",
  },
  {
    kind: "Project",
    field: "Web development, community",
    name: "Social Media API",
    description:
      "A backend development project focused on API-based social media functionality and data exchange.",
    stack: "Backend development, REST API",
    link: "https://github.com/Abby966",
    linkLabel: "Explore on GitHub",
  },
  {
    kind: "Project",
    field: "Web development, education",
    name: "Online Entrance Exam Preparation System",
    description:
      "An education-focused system intended to help students prepare for entrance examinations through online learning resources.",
    stack: "Web development, education technology",
    link: "https://github.com/Abby966",
    linkLabel: "Explore on GitHub",
  },
];

const experience = [
  {
    kind: "Current role",
    name: "BeOnline ICT Solutions PLC",
    role: "Technical Solutions Engineer, Microsoft Cloud & Collaboration",
    detail:
      "Support customer-facing technical solutions involving Microsoft 365, Azure, Microsoft Entra ID, Teams, Exchange Online, SharePoint, OneDrive, endpoint management, cloud security, and licensing. Also engage with security solutions including Kaspersky and CyberArk.",
  },
  {
    kind: "Development",
    name: "Afronex Tech Hub",
    role: "Developer, Full-Stack Development Intern",
    detail:
      "Contributed to web application development using React and Node.js, gaining practical experience in frontend interfaces, backend functionality, and full-stack development.",
  },
  {
    kind: "Teaching",
    name: "Yenetta Code",
    role: "Coding Instructor",
    detail:
      "Support learners as they develop programming knowledge and practical coding skills through instruction and learning activities.",
  },
  {
    kind: "Community leadership",
    name: "WAAW Foundation",
    role: "Chapter Leadership, STEM Outreach",
    detail:
      "Promoted STEM education and technology engagement for girls through outreach activities, presentations, and practical learning opportunities.",
  },
  {
    kind: "Tutoring and education",
    name: "Kelem Tutors and Other Learning Initiatives",
    role: "Tutor, Volunteer Educator",
    detail:
      "Supported learners through tutoring and educational activities, helping students strengthen their understanding of academic and technical subjects.",
  },
  {
    kind: "Internship",
    name: "Commercial Bank of Ethiopia",
    role: "Semester Intern",
    detail:
      "Gained workplace experience through a semester internship at the Commercial Bank of Ethiopia.",
  },
  {
    kind: "Community engagement",
    name: "STEM Outreach in Dire Dawa",
    role: "Technology Outreach and Mentoring",
    detail:
      "Participated in activities introducing students to technology, web development, and opportunities in STEM, with a focus on encouraging girls to explore technology.",
  },
];

const contents = [
  { href: "#ask-abby", label: "Ask Abby" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#work", label: "Projects and research" },
  { href: "#experience", label: "Experience" },
];

const skills = [
  "Python", "React", "Node.js", "Next.js", "FastAPI",
  "Machine Learning", "TensorFlow", "RAG", "PostgreSQL", "SQL",
  "Java", "C++", "TypeScript", "Django", "Git",
  "Microsoft 365", "Azure", "Cybersecurity", "Teamwork", "Leadership",
];

function Words({ text }) {
  return text.split(" ").map((word, i) => (
    <span className="w" style={{ "--i": i }} key={i}>
      {word}&nbsp;
    </span>
  ));
}

function Sheet({ id, title, note, children }) {
  return (
    <section className="sheet" id={id} data-reveal>
      <div className="sheet-title">
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </div>
      <div className="sheet-body">{children}</div>
    </section>
  );
}

function App() {
  const [messages, setMessages] = useState([]);
  const [activeWork, setActiveWork] = useState(0);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const detailRef = useRef(null);

  // Reveal sheets as they enter the viewport, and track scroll progress.
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 }
    );
    items.forEach((el) => io.observe(el));

    const root = document.documentElement;
    const onScroll = () => {
      const max = root.scrollHeight - root.clientHeight || 1;
      root.style.setProperty("--p", String(root.scrollTop / max));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
        "I couldn't connect to AskAbby. Check that the backend is running and try again."
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

  function selectWork(index) {
    setActiveWork(index);
    // On narrow screens the detail sits below the list, so bring it into view.
    if (window.matchMedia("(max-width: 960px)").matches) {
      detailRef.current?.scrollIntoView({ block: "start" });
    }
  }

  const current = works[activeWork];

  return (
    <main className="page">
      <div className="progress" aria-hidden="true" />
      <header className="masthead" id="home">
        <h1 aria-label="Abegail Chanyalew">
          <span className="line" aria-hidden="true"><span>Abegail</span></span>
          <span className="line" aria-hidden="true"><span>Chanyalew</span></span>
        </h1>
        <p className="masthead-role">
          Computer science graduate building AI and software that solve
          real-world problems.
        </p>
        <div className="masthead-bar">
          <nav className="contents" aria-label="Portfolio contents">
            {contents.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="masthead-links">
            <a href="https://github.com/Abby966" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abigael-chanyalew-1a8b66378"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...skills, ...skills].map((skill, i) => (
            <span key={i}>{skill}</span>
          ))}
        </div>
      </div>

      {/* 1. AskAbby chatbot */}
      <Sheet
        id="ask-abby"
        title="Ask Abby"
        note="Ask about my work, research, skills, and experience."
      >
        <div className="assistant">
          <div className="assistant-top">
            <strong>AskAbby</strong>
            <span>AI portfolio assistant</span>
          </div>

          {messages.length === 0 ? (
            <div className="assistant-welcome">
              <h3>What would you like to know?</h3>
              <p>Choose a starting point, or ask something of your own.</p>
              <div className="prompt-list">
                {suggestions.map((item) => (
                  <button
                    className="prompt-item"
                    key={item.title}
                    onClick={() => sendQuestion(item.question)}
                    disabled={loading}
                  >
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
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
                    {message.role === "user" ? "You" : "AskAbby"}
                  </span>
                  <p>{message.content}</p>
                </div>
              ))}
              {loading && (
                <div className="chat-message assistant">
                  <span className="chat-author">AskAbby</span>
                  <p className="thinking">Thinking...</p>
                </div>
              )}
              {error && (
                <div className="chat-error">
                  {error}
                  <button
                    onClick={() => sendQuestion(messages.at(-1)?.content)}
                    disabled={loading}
                  >
                    Try again
                  </button>
                </div>
              )}
              <button
                className="reset-chat"
                onClick={startNewChat}
                disabled={loading}
              >
                Start a new conversation
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
            Answers come from Abegail's portfolio knowledge base. AI-generated
            answers may contain errors.
          </p>
        </div>
      </Sheet>

      {/* 2. About me */}
      <Sheet id="about" title="About me">
        <h3 className="lead">
          <Words text="Curious about how things work. Driven by what they can change." />
        </h3>
        <div className="prose">
          <p>
            I'm Abegail, a developer and aspiring AI engineer. My interests sit
            at the intersection of software engineering and artificial
            intelligence. I enjoy turning ideas into working systems, exploring
            research questions, and thinking about how technology can be useful
            in the communities that need it.
          </p>
          <p>
            Beyond code, I care about STEM education, mentoring, and helping
            more young women see a place for themselves in technology.
          </p>
        </div>
      </Sheet>

      {/* 3. Education */}
      <Sheet id="education" title="Education">
        <div className="education-entry">
          <h3>Addis Ababa University</h3>
          <p className="education-degree">
            Bachelor of Science in Computer Science
          </p>
          <p className="education-note">
            A strong foundation in computer science, software development, and
            problem-solving.
          </p>
          <span className="education-honor">Great Distinction</span>
        </div>
      </Sheet>

      {/* 4. Projects and research */}
      <Sheet id="work" title="Projects and research">
        <div className="work-intro">
          <p>
            I'm interested in building intelligent systems that respond to real
            constraints, including language, connectivity, accessibility, and
            local context. My long-term goal is to deepen my expertise in AI and
            machine learning through research and engineering that connect
            technical ideas to practical needs.
          </p>
        </div>

        <div className="work-viewer">
          <div className="work-index">
            {["Research", "Project"].map((kind) => (
              <div className="work-group" key={kind}>
                <h3>{kind === "Research" ? "Research" : "Projects"}</h3>
                {works.map((item, index) =>
                  item.kind === kind ? (
                    <button
                      type="button"
                      className="work-item"
                      key={item.name}
                      aria-current={index === activeWork}
                      onClick={() => selectWork(index)}
                    >
                      {item.name}
                    </button>
                  ) : null
                )}
              </div>
            ))}
          </div>

          <article
            className="work-detail"
            key={current.name}
            ref={detailRef}
            aria-live="polite"
          >
            <span className="work-field">{current.field}</span>
            <h3>{current.name}</h3>
            <p className="work-description">{current.description}</p>
            <p className="work-stack">
              <strong>Built with:</strong> {current.stack}
            </p>
            <a
              className="text-link"
              href={current.link}
              target="_blank"
              rel="noreferrer"
            >
              {current.linkLabel}
            </a>
          </article>
        </div>
      </Sheet>

      {/* 5. Experience */}
      <Sheet id="experience" title="Experience">
        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-entry" key={item.name}>
              <span className="experience-kind">{item.kind}</span>
              <div>
                <h3>{item.name}</h3>
                <p className="experience-role">{item.role}</p>
                <p className="experience-detail">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </Sheet>

      <footer className="footer">
        <span className="footer-name">Abegail Chanyalew</span>
        <div className="footer-links">
          <a href="https://github.com/Abby966" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/abigael-chanyalew-1a8b66378"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="#home">Back to top</a>
        </div>
        <span className="copyright">© 2026 Abegail Chanyalew</span>
      </footer>
    </main>
  );
}

export default App;