import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import api from "./api";

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="logo" to="/">Revathi C</Link>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About Me</NavLink>
        <NavLink to="/skills">Skills</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </nav>
  );
}

function Footer() {
  return <footer><p>© {new Date().getFullYear()} Revathi C | Personal Portfolio</p></footer>;
}

function Home({ portfolio }) {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="welcome">{portfolio.welcomeText}</p>
          <h1>Hello, I'm <span>{portfolio.name}</span></h1>
          <h2>{portfolio.role}</h2>
          <p>{portfolio.homeDescription}</p>
          <div className="buttons">
            <Link to="/about" className="btn primary">About Me</Link>
            <Link to="/contact" className="btn secondary">Contact Me</Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="profile-circle">RC</div>
          <h2>{portfolio.name}</h2>
          <p>{portfolio.education?.[0]?.degree}</p>
          <p>Software Developer Aspirant</p>
        </div>
      </section>

      <section className="quick-section">
        <h2>Explore My Portfolio</h2>
        <p>Learn more about me and my skills</p>
        <div className="cards">
          <Link to="/about" className="card">
            <div className="icon">👩‍💻</div>
            <h3>About Me</h3>
            <p>Learn about my education and career objective.</p>
          </Link>
          <Link to="/skills" className="card">
            <div className="icon">💻</div>
            <h3>Skills</h3>
            <p>Explore my programming and technical skills.</p>
          </Link>
          <Link to="/contact" className="card">
            <div className="icon">📩</div>
            <h3>Contact Me</h3>
            <p>Get in touch with me for opportunities.</p>
          </Link>
        </div>
      </section>
    </>
  );
}

function PageHeader({ title, subtitle }) {
  return <section className="page-header"><h1>{title}</h1><p>{subtitle}</p></section>;
}

function About({ portfolio }) {
  return (
    <>
      <PageHeader title="About Me" subtitle="Get to know me better" />
      <section className="content-section">
        <div className="about-box">
          <h2>Career Objective</h2>
          <p>{portfolio.careerObjective}</p>
        </div>
        <div className="about-box">
          <h2>Education</h2>
          {portfolio.education?.map((item, index) => (
            <div className="education-item" key={`${item.degree}-${index}`}>
              <h3>{item.degree}</h3>
              <p>{item.college}</p>
              <p><strong>CGPA:</strong> {item.cgpa}</p>
            </div>
          ))}
        </div>
        <div className="about-box">
          <h2>Who Am I?</h2>
          <p>{portfolio.aboutDescription}</p>
        </div>
      </section>
    </>
  );
}

function Skills({ portfolio }) {
  return (
    <>
      <PageHeader title="Skills & Experience" subtitle="My technical skills and practical experience" />
      <section className="content-section">
        <div className="skills-box">
          <h2>Technical Skills</h2>
          <div className="skill-container">
            {portfolio.skills?.map((skill, index) => (
              <div className="skill" key={`${skill.name}-${index}`}>
                <div className="skill-title">
                  <span>{skill.name}</span><span>{skill.percentage}%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: `${skill.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="experience-box">
          <h2>Internship</h2>
          {portfolio.internship?.map((item, index) => (
            <div className="experience-card" key={`${item.title}-${index}`}>
              <div className="experience-icon">{item.icon || "💼"}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>{item.points?.map((point, pointIndex) => <li key={pointIndex}>{point}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Contact({ portfolio }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSending(true);
    setStatus({ type: "", text: "" });
    try {
      const response = await api.post("/messages", form);
      setStatus({ type: "success", text: response.data.message });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        text: error.response?.data?.message || "Could not send your message. Please try again."
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHeader title="Contact Me" subtitle="Let's connect and create something great" />
      <section className="contact-section">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>I am open to opportunities in software development and technology. Feel free to contact me.</p>
          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div><h3>Address</h3><p>{portfolio.contact?.address}</p></div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📞</div>
            <div><h3>Phone</h3><p>{portfolio.contact?.phone}</p></div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">✉️</div>
            <div><h3>Email</h3><p>{portfolio.contact?.email}</p></div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Me a Message</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your Name" required maxLength="100" />
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Your Email" required maxLength="254" />
            <input name="subject" value={form.subject} onChange={handleChange} type="text" placeholder="Subject" required maxLength="150" />
            <textarea name="message" value={form.message} onChange={handleChange} rows="6" placeholder="Your Message" required maxLength="5000" />
            <button type="submit" disabled={sending}>{sending ? "Sending..." : "Send Message"}</button>
            {status.text && <p className={`form-status ${status.type}`} role="status">{status.text}</p>}
          </form>
        </div>
      </section>
    </>
  );
}

function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api.get("/portfolio")
      .then((response) => { if (active) setPortfolio(response.data); })
      .catch((requestError) => {
        console.error("Portfolio loading error:", requestError);
        if (active) setError("Unable to load portfolio. Make sure MongoDB and the backend server are running.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (loading) return <main className="status-message">Loading portfolio...</main>;
  if (error) return <main className="status-message error">{error}</main>;
  if (!portfolio) return <main className="status-message">Portfolio information is unavailable.</main>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home portfolio={portfolio} />} />
        <Route path="/about" element={<About portfolio={portfolio} />} />
        <Route path="/skills" element={<Skills portfolio={portfolio} />} />
        <Route path="/contact" element={<Contact portfolio={portfolio} />} />
        <Route path="*" element={<PageHeader title="Page not found" subtitle="Please use the navigation above." />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
