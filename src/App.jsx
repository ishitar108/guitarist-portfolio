import { useState, useEffect,useRef } from "react";
import potrait from "./assets/potrait.jpeg";
import grou from "./assets/grou.jpeg";
import studio from "./assets/studio.jpeg";
import campus from "./assets/campus.jpeg";
import battle from "./assets/battlebands.jpeg";
import unplu from "./assets/unplu.jpeg";
import song from "./assets/sapnajaha.wav";

/* ✏️ EDIT YOUR DETAILS HERE */
const DATA = {
  name: "Ravi Singh",
  tagline: "Guitarist · Composer · Session Artist",
  bio: "I'm a third-year student at Galgotias College of Engineering and Technology, a guitarist with 5+ years of experience, and the current Head of the RAAG Music Club at GCET. From performing at college events to leading a community of passionate musicians.Performed on North India's Biggest Fest at Galgotias University.",
  email: "ravi07sn@gmail.com",
  stats: [["5+","Years playing"],["10+","Live shows"]],
  genres: ["Rock","Acoustic","Classical","Metal"],
  gear: ["Fender Stratocaster","Yamaha Acoustic Guitar","behringer fx600 pedal","behringer OD 300","behringer TO300","behringer SF 300","BOSS loop station"],
  achievements: [
    ["2026","Competition at GL Bajaj College","Secured 3rd Position."],
    ["2025","UPITS","Secured 1st Position."],
    ["2025","Jaipuria Battle of the Bands","Secured 1st Position,voted best Rythm guitarist."],
    ["2024","Jaipuria Battle of the Bands","Secured 3rd Position."],
  ],
  photos: [
    {title:"Unifest",cat:"Live",img:potrait},{title:"UPITS",cat:"Live",img:grou},
    {title:"Studio Session",cat:"Studio",img:studio},{title:"Unplugged Night",cat:"Acoustic",img:campus},
    {title:"Battle of the Bands",cat:"Live",img:battle},{title:"Campus Fest",cat:"Stage",img:unplu},
  ],
  tracks: [{title:"Sapna Jahaan",time:"2:13",src:song}],
  gigs: [["Not Confirm","Date","Battle of Bands at NIT Kurukshetra"]],
  quotes: [["Effortless feel and a tone you can't forget.","— Festival Director"],["Delivers in the studio on the first take.","— Producer"],["A crowd favourite every single time.","— Venue Manager"]]
};

const Guitar = () => (
  <svg viewBox="0 0 100 160" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M62 8l14 14M70 15L52 62"/><path d="M52 62c-10-4-22 2-22 14 0 6-8 8-8 18 0 14 12 22 26 22s26-8 26-22c0-8-6-10-6-18 0-10-8-16-16-16z"/>
    <circle cx="48" cy="94" r="6"/>
  </svg>
);

function App(){
  const [theme,setTheme]=useState(()=>{try{return localStorage.getItem("t")||""}catch(e){return ""}});
  const [cat,setCat]=useState("All");
  const [lb,setLb]=useState(null);
  const [sent,setSent]=useState(false);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(-1);
  const [prog, setProg] = useState(0);

  const toggle = (i) => {
  const a = audioRef.current;
  if (playing === i) { a.pause(); setPlaying(-1); return; }
  a.src = DATA.tracks[i].src;
  a.play();
  setProg(0);
  setPlaying(i);
  };

  const seek = (e, i) => {
  if (playing !== i) return;
  const r = e.currentTarget.getBoundingClientRect();
  audioRef.current.currentTime = ((e.clientX - r.left) / r.width) * audioRef.current.duration;
  };

  useEffect(()=>{ if(theme) document.documentElement.dataset.theme=theme; try{localStorage.setItem("t",theme)}catch(e){} },[theme]);
  const isDark = theme ? theme==="dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  const cats = ["All", ...new Set(DATA.photos.map(p => p.cat))];
  const shown = DATA.photos.filter(p => cat === "All" || p.cat === cat);
  const grad=c=>`linear-gradient(135deg,${c.split(",")[0]},${c.split(",")[1]})`;

  const submit=e=>{
    e.preventDefault();
    const f=new FormData(e.target);
    window.location.href=`mailto:${DATA.email}?subject=${encodeURIComponent("Booking enquiry from "+f.get("n"))}&body=${encodeURIComponent(f.get("m")+"\n\nReply to: "+f.get("e"))}`;
    setSent(true);
  };

  return (<>
    <nav><div className="wrap">
      <a href="#top" className="logo">{DATA.name}</a>
      <div className="links">
        {["About","Achievements","Gallery","Music","Shows","Contact"].map(l=><a key={l} href={"#"+l.toLowerCase()}>{l}</a>)}
        <button className="tbtn" aria-label="Toggle theme" onClick={()=>setTheme(isDark?"light":"dark")}>{isDark?"☀":"☾"}</button>
      </div>
    </div></nav>

    <header className="hero" id="top"><div className="wrap">
      <div className="reveal">
        <div className="eyebrow">{DATA.tagline}</div>
        <h1>{DATA.name}</h1>
        <p>{DATA.bio}</p>
        <a className="btn p" href="#music">Listen now</a>
        <a className="btn g" href="#contact">Book me</a>
      </div>
      <div className="portrait reveal"><img src={potrait} alt={DATA.name} /></div>
    </div></header>

    <div className="wrap stats">
      {DATA.stats.map(([n,l])=><div className="stat" key={l}><b>{n}</b><small>{l}</small></div>)}
    </div>

    <section id="about"><div className="wrap about">
      <div>
        <h2>About</h2><p className="sub">The story behind the strings</p>
        <p>{DATA.bio} I teach, collaborate and take on live and session work worldwide.</p>
        <div className="chips">{DATA.genres.map(g=><span className="chip" key={g}>{g}</span>)}</div>
      </div>
      <div className="card"><h3>My gear</h3><ul>{DATA.gear.map(g=><li key={g}>{g}</li>)}</ul></div>
    </div></section>

    <section id="achievements" style={{background:"var(--surface)"}}><div className="wrap">
      <h2>Achievements</h2><p className="sub">Milestones along the way</p>
      <div className="tl">{DATA.achievements.map(([y,t,d])=><div key={t}><small>{y}</small><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>

    <section id="gallery"><div className="wrap">
  <h2>Performances</h2><p className="sub">Moments from stage and studio</p>
  <div className="filters">
    {cats.map(c => (
      <button key={c} className={"f" + (c === cat ? " on" : "")} onClick={() => setCat(c)}>{c}</button>
    ))}
  </div>
  <div className="grid">
    {shown.map(p => (
      <button key={p.title} className="ph" onClick={() => setLb(p)}>
        <img src={p.img} alt={p.title} />
        <div><b>{p.title}</b>{p.cat}</div>
      </button>
    ))}
  </div>
</div></section>

    <section id="music" style={{background:"var(--surface)"}}><div className="wrap">
      <h2>Music</h2><p className="sub">Tap to preview</p>
      <div className="tracks">
  <audio
    ref={audioRef}
    onTimeUpdate={(e) => setProg((e.target.currentTime / e.target.duration) * 100 || 0)}
    onEnded={() => { setPlaying(-1); setProg(0); }}
  />
  {DATA.tracks.map((t, i) => (
    <div className="row" key={t.title}>
      <button className="play" aria-label={"Play " + t.title} onClick={() => toggle(i)}>
        {playing === i ? "❚❚" : "▶"}
      </button>
      <div style={{ flex: "0 0 150px" }}><b>{t.title}</b></div>
      <div className="bar" onClick={(e) => seek(e, i)} style={{ cursor: "pointer" }}>
        <i style={{ width: (playing === i ? prog : 0) + "%" }} />
      </div>
      <small style={{ color: "var(--muted)" }}>{t.time}</small>
    </div>
  ))}
  </div>
    </div></section>

    <section id="shows"><div className="wrap">
      <h2>Upcoming shows</h2><p className="sub">Come say hello</p>
      {DATA.gigs.map(([m,d,v,c])=>(
        <div className="gig" key={v}>
          <div className="date"><b>{d}</b><small>{m}</small></div>
          <div style={{flex:1}}><b>{v}</b><div style={{color:"var(--muted)"}}>{c}</div></div>
        </div>))}
    </div></section>

    <section style={{background:"var(--surface)"}}><div className="wrap">
      <h2>Kind words</h2><p className="sub" />
      <div className="quotes">{DATA.quotes.map(([q,a])=><div className="card" key={a}><p>“{q}”</p><small style={{color:"var(--muted)"}}>{a}</small></div>)}</div>
    </div></section>

    <section id="contact"><div className="wrap">
      <h2>Let's work together</h2><p className="sub">Gigs, sessions, lessons or collaborations</p>
      {sent ? <div className="card">Your email app should have opened. Thanks for reaching out!</div> :
      <form onSubmit={submit}>
        <input name="n" placeholder="Your name" required/>
        <input name="e" type="email" placeholder="Your email" required/>
        <textarea name="m" rows="5" placeholder="Tell me about your event or idea" required/>
        <button className="btn p" type="submit">Send message</button>
      </form>}
    </div></section>

    <footer>© 2026 {DATA.name} · {DATA.email}</footer>

    {lb && (
  <div className="light" onClick={() => setLb(null)}>
    <div className="big">
      <img src={lb.img} alt={lb.title} />
      <div className="cap"><b>{lb.title}</b><br />{lb.cat} · tap anywhere to close</div>
    </div>
  </div>
  )}
  </>);
}

export default App;
