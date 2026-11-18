import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const skills = ["Python", "SQL", "Pandas", "NumPy", "PostgreSQL", "MongoDB", "Scikit-learn", "PyTorch", "FastAPI", "ETL", "Data Quality", "RAG"];

const projects = [
  {
    title: "ChurnLens",
    kicker: "Customer Retention Analysis",
    year: "2026",
    accent: "lime",
    tags: ["Python", "SQL", "Scikit-learn"],
    text: "Analysed 50,000 customer records, engineered usage and support-history features, and used cohort analysis to understand why customers were leaving.",
    result: "87% recall on churn class",
    details: "Found customers with more than two support tickets in their first 30 days churned at roughly three times the base rate. Built a daily reporting script with null checks and row-count assertions so broken upstream feeds surface immediately."
  },
  {
    title: "ContextIQ",
    kicker: "Document Data Pipeline",
    year: "2026",
    accent: "teal",
    tags: ["Python", "FastAPI", "Pinecone"],
    text: "A traceable document pipeline that turns unstructured business files into searchable, citation-backed answers for non-technical teams.",
    result: "Answers with source citations",
    details: "Built overlap-aware chunking, embeddings, metadata linking to source file and page, schema validation, encoding normalisation, and a FastAPI layer for natural-language questions."
  },
  {
    title: "Deepfake Detection",
    kicker: "Dataset Profiling & ML Research",
    year: "2025–26",
    accent: "coral",
    tags: ["PyTorch", "TensorFlow", "Research"],
    text: "Profiled and repaired a 1,000-video dataset before modelling, removing corrupted frames and standardising resolution and encoding.",
    result: "99.2% accuracy · 0.995 AUC",
    details: "Co-authored a peer-reviewed paper with Dr. Jeevan Pinto covering model bias, explainability, and data governance at AIMIT St. Aloysius."
  }
];

const experience = [
  {
    date: "JAN — APR 2026",
    role: "Data Analyst & Project Lead · Intern",
    company: "Tatvam Consulting",
    location: "Mangalore, India",
    text: "Owned the data layer for METAIA, an operations platform used by four business roles. Agreed metric definitions with stakeholders, then built the schema and validation rules behind them.",
    bullets: [
      "Built Python ETL scripts for Coastal Hub to clean operational data and load a reporting store with validation at ingestion.",
      "Traced a duplicate-record race condition and missing index, fixing both and adding regression tests.",
      "Cut query response times from 340ms to under 80ms with compound indexes and a Redis cache."
    ]
  }
];

function Arrow({ direction = "up" }) {
  return <span className={`arrow arrow-${direction}`} aria-hidden="true">↗</span>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [["home", "Home"], ["about", "About"], ["services", "What I do"], ["work", "Work"], ["experience", "Experience"], ["education", "Education"], ["contact", "Contact"]];
  return (
    <header className="nav-wrap">
      <nav className={`nav ${open ? "nav-open" : ""}`}>
        <a className="brand" href="#home" aria-label="Samarpith Menezes home"><span>SM</span><strong>Samarpith<br />Menezes</strong></a>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"><span /><span /></button>
        <div className="nav-links">
          {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
        </div>
        <a className="nav-cta" href="mailto:samarpithmenezes223@gmail.com">Let&apos;s talk <Arrow /></a>
      </nav>
    </header>
  );
}

function Hero() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const handlePointer = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - box.left) / box.width - 0.5) * 12,
      y: ((event.clientY - box.top) / box.height - 0.5) * 12
    });
  };
  return (
    <section id="home" className="hero reference-hero section-shell" onMouseMove={handlePointer} onMouseLeave={() => setPointer({ x: 0, y: 0 })}>
      <div className="hero-greeting">Hello!</div>
      <h1>I&apos;m <em>Samarpith Menezes</em>,<br />Data Analyst &amp; AI/ML Builder</h1>
      <div className="reference-hero-grid">
        <div className="reference-intro">
          <div className="eyebrow"><span className="status-dot" /> MCA · CLASS OF 2026</div>
          <p>I turn</p>
          <strong>raw data into decisions.</strong>
          <small>Data analyst with an MCA and hands-on experience building reliable pipelines, reports, and machine learning systems.</small>
          <div className="open-to-work"><span className="status-dot" /><div><b>Open to work</b><small>Data Analyst · AI/ML roles</small></div></div>
        </div>
        <div className="character-stage" style={{ "--tilt-x": `${pointer.y * -0.35}deg`, "--tilt-y": `${pointer.x * 0.35}deg` }} aria-label="Illustrated analyst working on a laptop">
          <div className="stage-orbit stage-orbit-a" /><div className="stage-orbit stage-orbit-b" />
          <div className="character-circle">
            <div className="character" >
              <div className="hair" /><div className="face"><i className="eye" /><i className="mouth" /></div>
              <div className="neck" /><div className="shirt" /><div className="arm arm-back" /><div className="arm arm-front" />
              <div className="laptop"><span /><b /><i /></div><div className="chair" /><div className="leg leg-one" /><div className="leg leg-two" /><div className="shoe" />
            </div>
            <div className="chart-card"><span /><span /><span /><span /><span /></div>
            <div className="pie-card"><i /></div><div className="coffee">◡</div>
          </div>
          <span className="hero-chip hero-chip-python">Python</span><span className="hero-chip hero-chip-sql">SQL</span><span className="hero-chip hero-chip-power">Power BI</span><span className="hero-chip hero-chip-tableau">Tableau</span>
          <span className="hero-spark spark-one">✦</span><span className="hero-spark spark-two">✦</span>
        </div>
        <div className="roles-card"><strong>3 Projects</strong><span>ChurnLens · Customer Retention</span><span>ContextIQ · Document Pipeline</span><span>Deepfake Detection · Research</span><hr /><a href="#work">Portfolio <Arrow /></a><a className="hire-button" href="mailto:samarpithmenezes223@gmail.com">Hire Me</a></div>
      </div>
      <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><i /></div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-shell about section-pad">
      <div className="section-heading"><span className="section-number">01</span><h2>Part analyst,<br /><em>part builder.</em></h2></div>
      <div className="about-content">
        <p className="large-copy">I like sitting at the messy intersection of data, systems, and people. My job is to make the numbers trustworthy enough that someone can act on them.</p>
        <div className="about-notes">
          <div><span className="note-number">01</span><strong>Profile first</strong><p>I inspect the shape and quality of data before a model or dashboard gets anywhere near it.</p></div>
          <div><span className="note-number">02</span><strong>Build for use</strong><p>Clear requirements, useful validation, and documentation turn analysis into a product.</p></div>
          <div><span className="note-number">03</span><strong>Explain the why</strong><p>Good reporting does not leave interpretation to the reader. It makes the next move clear.</p></div>
        </div>
      </div>
      <div className="stat-strip"><div><strong>99.2%</strong><span>research accuracy</span></div><div><strong>340 → 80ms</strong><span>query optimisation</span></div><div><strong>50k</strong><span>records analysed</span></div><div><strong>04</strong><span>business roles supported</span></div></div>
    </section>
  );
}

function Services() {
  const services = [["01", "Data analysis", "From raw exports to decisions: profiling, cleaning, cohorts, experiments, and clear reporting."], ["02", "Pipelines & quality", "ETL workflows with validation, remediation, lineage, and documentation built in from day one."], ["03", "AI & machine learning", "Feature engineering, classification, NLP, embeddings, and RAG pipelines grounded in good data."], ["04", "Stakeholder enablement", "I translate business questions into metrics, schemas, dashboards, and systems teams can trust."]];
  return <section id="services" className="section-shell section-pad services"><div className="section-heading"><span className="section-number">02</span><h2>What I<br /><em>bring to the table.</em></h2></div><div className="service-list">{services.map(([num, title, text]) => <div className="service-row" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p><Arrow /></div>)}</div></section>;
}

function Work() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  return <section id="work" className="section-shell section-pad work"><div className="section-heading"><span className="section-number">03</span><h2>Selected<br /><em>work.</em></h2><p>Projects where careful data work became something useful.</p></div><div className="project-layout"><div className="project-tabs">{projects.map((item, index) => <button key={item.title} className={active === index ? "active" : ""} onClick={() => setActive(index)}><span>0{index + 1}</span><strong>{item.title}</strong><small>{item.kicker}</small><Arrow direction={active === index ? "right" : "up"} /></button>)}</div><article className={`project-card ${project.accent}`}><div className="project-card-top"><span>{project.kicker}</span><span>{project.year}</span></div><h3>{project.title}</h3><p>{project.text}</p><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-result"><span>OUTCOME</span><strong>{project.result}</strong></div><p className="project-details">{project.details}</p></article></div></section>;
}

function Skills() {
  return <section className="skills-band"><div className="section-shell"><div className="skills-title"><span>TOOLKIT</span><h2>Tools for turning<br /><em>questions into clarity.</em></h2></div><div className="skill-cloud">{skills.map((skill, i) => <span className={`skill-pill p-${i % 4}`} key={skill}>{skill}</span>)}</div><div className="skill-groups"><div><span>ANALYSIS & REPORTING</span><p>Pandas · NumPy · Matplotlib · Seaborn · Plotly · Excel · Jupyter · EDA · Statistics · Cohort Analysis · A/B Testing</p></div><div><span>DATA & SYSTEMS</span><p>PostgreSQL · MySQL · MongoDB · Redis · Schema Design · Indexing · ETL · Batch Processing · Data Lineage</p></div><div><span>ML & AI</span><p>Scikit-learn · PyTorch · TensorFlow · Feature Engineering · NLP · Embeddings · RAG · LangChain · Pinecone</p></div></div></div></section>;
}

function Experience() {
  return <section id="experience" className="section-shell section-pad experience"><div className="section-heading"><span className="section-number">04</span><h2>The work<br /><em>behind the work.</em></h2></div><div className="timeline">{experience.map(item => <article className="timeline-item" key={item.company}><div className="timeline-date">{item.date}</div><div className="timeline-marker" /><div className="timeline-copy"><span>{item.company} · {item.location}</span><h3>{item.role}</h3><p>{item.text}</p><ul>{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div></section>;
}

function Education() {
  return <section id="education" className="section-shell section-pad education"><div className="section-heading"><span className="section-number">05</span><h2>The long<br /><em>game.</em></h2><p>Five years of computer science, research, and learning how to ask better questions.</p></div><div className="education-cards"><article><span>2024 — 2026</span><h3>Master of Computer Applications</h3><p>St. Aloysius Institution of Management & IT (AIMIT), Mangalore</p><strong>MCA</strong></article><article><span>2021 — 2024</span><h3>Bachelor of Computer Applications</h3><p>MESMSPS First Grade Degree College, Chikmagalur · Kuvempu University</p><strong>BCA</strong></article></div><div className="research-note"><span>RESEARCH & CERTIFICATIONS</span><p><strong>Deep Fake Impact on Online</strong> · Cutinha, Menezes, Pinto. AIMIT St. Aloysius. 99.2% accuracy, 0.995 AUC.</p><p>NASSCOM FutureSkills Prime · AI & Machine Learning (Govt. of India) · NPTEL / IIT Kharagpur, Object Oriented System Development (SWAYAM, MoE, 2025)</p></div></section>;
}

function Contact() {
  return <footer id="contact" className="contact section-shell"><div className="contact-top"><span className="section-number">06</span><h2>Let&apos;s build something<br /><em>worth measuring.</em></h2><a className="round-arrow" href="mailto:samarpithmenezes223@gmail.com"><Arrow /></a></div><p className="contact-copy">Open to data analyst, AI/ML, and software opportunities. Send me a short note about the role or project.</p><div className="contact-links"><a href="mailto:samarpithmenezes223@gmail.com">samarpithmenezes223@gmail.com <Arrow /></a><a href="tel:+917892949687">+91 78929 49687 <Arrow /></a><a href="https://linkedin.com/in/samarpithmenezes" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div><div className="footer-bottom"><span>© 2026 Samarpith Menezes</span><span>Bengaluru, Karnataka, India</span><a href="#home">Back to top ↑</a></div></footer>;
}

function App() {
  return <><Nav /><main><Hero /><About /><Services /><Work /><Skills /><Experience /><Education /><Contact /></main></>;
}

createRoot(document.getElementById("root")).render(<App />);
