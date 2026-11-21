import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { DATA } from "./data";
import { LOGOS } from "./logos";
import Network from "./Network";
import Palette from "./Palette";
import type { Item } from "./Palette";
import type { Project } from "./types";

const slug = (n: string) => "p-" + n.toLowerCase().replace(/\W+/g, "-");
const used = (s: string) =>
  [...DATA.projects, ...DATA.analytics]
    .filter(p => p.stack.some(t => { const a = t.toLowerCase(), b = s.toLowerCase(); return b.includes(a) || a.includes(b); }))
    .map(p => p.name);

function go(id: string) {
  const e = document.getElementById(id);
  if (!e) return;
  e.scrollIntoView({ behavior: "smooth", block: "center" });
  e.classList.add("flash");
  setTimeout(() => e.classList.remove("flash"), 1400);
}

const Chips = ({ items }: { items: string[] }) => (
  <div className="chips">{items.map(x => <span className="chip" key={x}>{x}</span>)}</div>
);
const Ext = ({ href, children, cls = "btn" }: { href: string; children: ReactNode; cls?: string }) => (
  <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

function Typed({ words }: { words: string[] }) {
  const [t, setT] = useState("");
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) { setT(words[0]); return; }
    let i = 0, j = 0, del = false, id = 0;
    const tick = () => {
      const w = words[i];
      setT(w.slice(0, j));
      let d = 55;
      if (!del && j < w.length) j++;
      else if (!del) { del = true; d = 1700; }
      else if (j > 0) { j--; d = 28; }
      else { del = false; i = (i + 1) % words.length; d = 300; }
      id = window.setTimeout(tick, d);
    };
    tick();
    return () => clearTimeout(id);
  }, [words]);
  return <p className="typed"><span>{t}</span><span className="cur" /></p>;
}

function CodeWin() {
  const d = DATA;
  const q = (t: string) => <span className="s">"{t}"</span>;
  const kv = (k: string, v: ReactNode) => <>{"  "}<span className="p">{k}</span>{": "}{v}{","}</>;
  const stack = ["React", "TypeScript", "Node", "MongoDB"];
  const lines: ReactNode[] = [
    <><span className="k">const</span>{" developer = {"}</>,
    kv("name", q(d.name)),
    kv("role", q(d.roles[0])),
    kv("stack", <>[{stack.map((x, i) => <span key={x}>{i ? ", " : ""}{q(x)}</span>)}]</>),
    kv("ai", q("Gemini API")),
    kv("location", q(d.location)),
    kv("openToWork", <span className="k">true</span>),
    "};",
    "",
    <span className="m">// ready to build your next product</span>,
  ];
  return (
    <div className="code">
      <div className="cb"><i /><i /><i /><span>developer.ts</span></div>
      <div className="cd">
        {lines.map((l, i) => (
          <div className="ln" key={i} style={{ animationDelay: `${0.5 + i * 0.12}s` }}><em>{i + 1}</em>{l}</div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ p, hidden }: { p: Project; hidden: boolean }) {
  let host = "";
  try { host = new URL(p.live).host; } catch { /* ignore invalid url */ }
  const bg: CSSProperties | undefined = p.image ? undefined : {
    background: `linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px) 0 0/28px 28px,linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px) 0 0/28px 28px,linear-gradient(135deg,${p.color[0]},${p.color[1]})`,
  };
  return (
    <article className={"pc" + (p.featured ? " ft" : "")} id={slug(p.name)} hidden={hidden}>
      <div className="win">
        <div className="wb"><i /><i /><i /><span>{host}</span></div>
        <div className="cv" style={bg}>
          {p.image ? <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" /> : <b>{p.name.split(" ").map(w => w[0]).join("")}</b>}
        </div>
      </div>
      <div className="pb">
        <h3>{p.name}</h3>
        <div className="date">{p.date}</div>
        <p>{p.desc}</p>
        <ul className="pts">{p.points.map(x => <li key={x}>{x}</li>)}</ul>
        <Chips items={p.stack} />
        <div className="acts">
          <Ext href={p.live} cls="btn pri">View live</Ext>
          {p.code.map(([l, u]) => <Ext key={u} href={u}>{l} code</Ext>)}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const [f, setF] = useState("");
  const tags = useMemo(() => {
    const fr: Record<string, number> = {};
    DATA.projects.forEach(p => p.stack.forEach(t => { fr[t] = (fr[t] || 0) + 1; }));
    return Object.keys(fr).sort((a, b) => fr[b] - fr[a] || a.localeCompare(b)).slice(0, 8);
  }, []);
  const nf = DATA.projects.filter(p => !p.featured).length;
  const cols = nf === 4 ? 2 : Math.min(nf, 3) || 1;
  return (
    <section className="blk" id="work">
      <h2 className="sh">Projects</h2>
      <p className="sub">Live products with real user flows, authentication and cloud services. Filter by technology.</p>
      <div className="pf">{["", ...tags].map(t => <button key={t} aria-pressed={f === t} onClick={() => setF(t)}>{t || "All"}</button>)}</div>
      <div className="pg" id="pg" style={{ "--cols": cols } as CSSProperties}>
        {DATA.projects.map(p => <ProjectCard key={p.name} p={p} hidden={!!f && !p.stack.includes(f)} />)}
      </div>
    </section>
  );
}

function DataWork() {
  if (!DATA.analytics.length) return null;
  return (
    <section className="blk" id="data">
      <h2 className="sh">Data and AI work</h2>
      <p className="sub">Beyond web apps, I analyse data, build dashboards and experiment with computer vision.</p>
      <div className="pg">
        {DATA.analytics.map(a => (
          <article className="pc" id={slug(a.name)} key={a.name}>
            <div className="pb">
              <h3>{a.name}</h3><div className="date">{a.tool}</div><p>{a.desc}</p>
              <ul className="pts">{a.points.map(x => <li key={x}>{x}</li>)}</ul>
              <Chips items={a.stack} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const [cat, setCat] = useState("");
  const list = Object.entries(DATA.skills).filter(([k]) => !cat || k === cat).flatMap(([k, v]) => v.map(s => ({ s, k })));
  return (
    <section className="blk" id="skills">
      <h2 className="sh">Skills</h2>
      <p className="sub">The tools I use every day, and the projects where I used them.</p>
      <div className="tabs">{["", ...Object.keys(DATA.skills)].map(c => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c || "All"}</button>)}</div>
      <div className="sg">
        {list.map(({ s, k }, i) => {
          const u = used(s), lg = LOGOS[s.toLowerCase()];
          return (
            <div className="sk" key={k + s}>
              {lg
                ? <i className="lg" dangerouslySetInnerHTML={{ __html: lg }} />
                : <i style={{ background: `linear-gradient(${(i * 53) % 360}deg,var(--a),var(--b))` }}>{s.replace(/[^A-Za-z]/g, "").slice(0, 2)}</i>}
              <div><b>{s}</b><span>{u.length ? "Used in " + u.join(", ") : k}</span></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const Timeline = ({ rows }: { rows: [string, string][] }) => (
  <div className="tl">{rows.map(([t, s]) => <div key={t}><b>{t}</b><span>{s}</span></div>)}</div>
);

export default function App() {
  const d = DATA;
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try { return localStorage.getItem("th") === "light" ? "light" : "dark"; } catch { return "dark"; }
  });
  const [pal, setPal] = useState(false);
  const [copied, setCopied] = useState(false);
  const prog = useRef<HTMLDivElement>(null);
  const nm = d.name.split(" ");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("th", theme); } catch { /* storage unavailable */ }
  }, [theme]);
  const toggle = useCallback(() => setTheme(t => (t === "dark" ? "light" : "dark")), []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPal(p => !p); }
    };
    const scroll = () => {
      if (prog.current) prog.current.style.width = (scrollY / Math.max(document.documentElement.scrollHeight - innerHeight, 1)) * 100 + "%";
    };
    addEventListener("keydown", key);
    addEventListener("scroll", scroll, { passive: true });
    return () => { removeEventListener("keydown", key); removeEventListener("scroll", scroll); };
  }, []);
  const copy = () => {
    navigator.clipboard?.writeText(d.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const items = useMemo<Item[]>(() => {
    const a: Item[] = [];
    d.projects.forEach(p => {
      a.push({ l: p.name, h: "Go to project", f: () => go(slug(p.name)) });
      a.push({ l: p.name + " live demo", h: "Open", f: () => window.open(p.live, "_blank") });
      p.code.forEach(([l, u]) => a.push({ l: `${p.name} ${l} code`, h: "GitHub", f: () => window.open(u, "_blank") }));
    });
    Object.keys(d.skills).forEach(k => a.push({ l: k + " skills", h: d.skills[k].slice(0, 3).join(", "), f: () => go("skills") }));
    d.resumes.forEach(([l, u]) => a.push({ l, h: "Open PDF", f: () => window.open(u, "_blank") }));
    a.push(
      { l: "Education", h: "Go to section", f: () => go("journey") },
      { l: "Contact", h: "Go to section", f: () => go("contact") },
      { l: "Copy email", h: d.email, f: copy },
      { l: "GitHub profile", h: "Open", f: () => window.open(d.github, "_blank") },
      { l: "LinkedIn profile", h: "Open", f: () => window.open(d.linkedin, "_blank") },
      { l: "Toggle dark or light theme", h: "Theme", f: toggle },
    );
    return a;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

  return (
    <>
      <Network />
      <div className="gridbg" />
      <header className="nav">
        <div>
          <a className="logo" href="#top"><i>YG</i>{d.name}</a>
          <nav><a href="#work">Projects</a><a href="#data">Data</a><a href="#skills">Skills</a><a href="#journey">Journey</a><a href="#contact">Contact</a></nav>
          <span className="tools">
            <button onClick={() => setPal(true)} aria-label="Open search">Search <kbd>Ctrl K</kbd></button>
            <button onClick={toggle} aria-label="Toggle theme">Theme</button>
            <a className="btn pri hire" href={"mailto:" + d.email}>Hire me</a>
          </span>
        </div>
        <div id="prog" ref={prog} />
      </header>
      <main id="top">
        <section className="hero">
          <div className="ht">
            <p className="pill"><span className="dot" />Available for full-stack roles</p>
            <h1>{nm[0]}<br />{nm.slice(1).join(" ")}</h1>
            <Typed words={d.roles} />
            <p className="lead">{d.tagline} {d.summary}</p>
            <div className="acts">
              <a className="btn pri" href="#work">View projects</a>
              <Ext href={d.github}>GitHub</Ext>
              <Ext href={d.linkedin}>LinkedIn</Ext>
              <details className="rd">
                <summary className="btn">Resume</summary>
                <div className="rm">{d.resumes.map(([l, u]) => <Ext key={u} href={u} cls="">{l}</Ext>)}</div>
              </details>
            </div>
          </div>
          <CodeWin />
        </section>
        <div className="stats">{d.stats.map(([b, s]) => <div key={b}><b>{b}</b><span>{s}</span></div>)}</div>
        <Projects />
        <DataWork />
        <Skills />
        <section className="blk two" id="journey">
          <div><h3>Education</h3><Timeline rows={d.education} /></div>
          <div id="achievements"><h3>Recognition</h3><Timeline rows={d.achievements} /></div>
        </section>
        <section className="ct" id="contact">
          <h2>Have a role or project in mind?</h2>
          <p>I’m open to full-stack roles. Send me a note and I’ll get back to you quickly.</p>
          <div className="acts">
            <a className="btn pri" href={"mailto:" + d.email}>{d.email}</a>
            <button onClick={copy}>{copied ? "Copied" : "Copy email"}</button>
            {d.resumes.map(([l, u]) => <Ext key={u} href={u}>{l}</Ext>)}
            <Ext href={d.linkedin}>LinkedIn</Ext>
            <Ext href={d.github}>GitHub</Ext>
          </div>
        </section>
      </main>
      <footer>Designed and built by {d.name}, 2026</footer>
      <Palette items={items} open={pal} onClose={() => setPal(false)} />
    </>
  );
}