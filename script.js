const ME = {
  name: "Junard S. Collamat",
  prologue: [
    "Every story starts with a question.",
    "Mine was: how to become a better person?",
    "Hi, I’m"           
  ],
  chapter1: "I’m from Cebu City Sitio Silangan 1 and I’m studying BSIT at UC-MAIN. I chose IT because I’ve always been curious about how apps and websites work. I want to build things that make life easier for other people.",
  facts: [
    ["Hometown", "Cebu City Sitio Silangan 1 is my home town and what i love about my hometown is how friendly everyone are and how they unite to help each other."],
    ["Studies", "BSIT,Year 3 UC-MAIN."],
    ["Goal", "My Goal is to live freely and have a peaceful life."],
    ["Fun fact", "I look tough but i'm actually a soft person."]
  ],
  skills: [["🛠️", "Troubleshooting", 3], ["🧩", "Problem solving", 4], ["🗣️", "Communication", 3], ["⏰", "Time management", 3], ["🤝", "Teamwork", 4]],
  hobbies: [
    ["🎮", "Gaming", "I really like to play games because it make me forgot some things."],
    ["🎵", "Music", "I like listening to music because some music motivate me to become a better person."],
    ["♟️", "Chess", "I like the way u need to think to play this game."],
    ["🍜", "Food trips", "To get Energy for another battle."]
  ],
};


const $ = id => document.getElementById(id);
const init = ME.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
document.title = ME.name + " | My Story";
$("ini").textContent = init;
$("c1text").textContent = ME.chapter1;


(function(){
  const box = $("lines"); const all = [...ME.prologue, ME.name]; let i = 0;
  (function next(){
    if (i >= all.length) { $("paths").hidden = false; setTimeout(() => $("hint").hidden = false, 1500); return; }
    const p = document.createElement("p"); p.textContent = all[i];
    if (i === all.length - 1) p.className = "big";
    box.append(p); requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add("show")));
    i++; setTimeout(next, i === all.length - 1 ? 900 : 1400);
  })();
})();

$("photoBtn").onclick = e => burst(e.clientX, e.clientY, 40);
ME.facts.forEach(([t, d]) => {
  const b = document.createElement("button"); b.className = "chip"; b.textContent = t;
  b.onclick = () => { document.querySelectorAll(".chip").forEach(x => x.classList.remove("open")); b.classList.add("open"); $("factOut").textContent = d; };
  $("chips").append(b);
});

ME.skills.forEach(([ic, name, lv]) => {
  const b = document.createElement("button"); b.className = "item";
  const draw = () => b.innerHTML = `<span class="ic">${ic}</span><b>${name}</b><span class="lv"> Level ${lv}/5</span><div class="pips">${[1,2,3,4,5].map(n => `<i class="${n <= lv ? "on" : ""}"></i>`).join("")}</div>`;
  draw();
  b.onclick = () => { burst(b.getBoundingClientRect().left + 60, b.getBoundingClientRect().top + 30, 18); b.animate([{transform:"scale(1)"},{transform:"scale(1.1)"},{transform:"scale(1)"}], 300); };
  $("inv").append(b);
});

ME.hobbies.forEach(([e, t, d]) => {
  const b = document.createElement("button"); b.className = "flip"; b.setAttribute("aria-label", t + ": flip card");
  b.innerHTML = `<div class="in"><div class="face front"><div><span class="e">${e}</span>${t}</div></div><div class="face back">${d}</div></div>`;
  b.onclick = () => b.classList.toggle("on");
  $("scrap").append(b);
});

document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const target = document.querySelector(a.getAttribute("href"));
  if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
}));

const stops = [["#0e1230","#1d2160"],["#3b2a6e","#b4527a"],["#e0707a","#ffb26b"],["#ffd98a","#8fd3ff"]];
const hex = h => [1,3,5].map(i => parseInt(h.substr(i, 2), 16));
const mix = (a, b, t) => "#" + hex(a).map((v, i) => Math.round(v + (hex(b)[i] - v) * t).toString(16).padStart(2, "0")).join("");
function paint(){
  const max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? Math.min(1, scrollY / max) : 0;
  const seg = p * (stops.length - 1), i = Math.min(stops.length - 2, Math.floor(seg)), t = seg - i;
  $("sky").style.background = `linear-gradient(${mix(stops[i][0], stops[i+1][0], t)},${mix(stops[i][1], stops[i+1][1], t)})`;
  $("stars").style.opacity = Math.max(0, 1 - p * 2);
  const o = $("orb"); o.style.transform = `translate(${(.08 + p * .78) * innerWidth}px,${(.75 - p * .62) * innerHeight}px)`;
  const sun = p > .5, c = mix("#e9ecff", "#ffcf4a", Math.min(1, p * 1.6));
  o.style.background = c; o.style.boxShadow = `0 0 ${40 + p * 90}px ${c}`;
  $("prog").style.width = p * 100 + "%";
}
addEventListener("scroll", paint, { passive: true }); addEventListener("resize", paint); paint();

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $("chap").textContent = e.target.dataset.title; }), { threshold: .5 });
document.querySelectorAll(".chapter").forEach(c => io.observe(c));

const cv = $("fx"), cx = cv.getContext("2d"); let ps = [];
function fit(){ cv.width = innerWidth; cv.height = innerHeight; } fit(); addEventListener("resize", fit);
function burst(x, y, n){
  const cols = ["#ffd23f", "#ff7a6b", "#4de3b8", "#f6f1e7"], was = ps.length;
  for (let i = 0; i < n; i++) ps.push({ x, y, vx: (Math.random() - .5) * 9, vy: Math.random() * -9 - 2, life: 70, c: cols[i % 4], s: 4 + Math.random() * 5 });
  if (!was) loop();
}
function loop(){
  cx.clearRect(0, 0, cv.width, cv.height); ps = ps.filter(p => p.life-- > 0);
  ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .35; cx.fillStyle = p.c; cx.fillRect(p.x, p.y, p.s, p.s); });
  if (ps.length) requestAnimationFrame(loop); else cx.clearRect(0, 0, cv.width, cv.height);
}

/* ===== CHAPTER 4: YOUR ANSWER (edit the text) ===== */
const ANSWER = {
  steps: [
    ["Be honest", "Tell the truth, even when it’s the harder thing to say."],
    ["Keep learning", "Be okay with not knowing yet, and keep asking questions."],
    ["Help others", "Share what I know, like helping classmates who are stuck."],
    ["Own my mistakes", "Say sorry, fix it, and learn from it instead of hiding it."],
    ["Keep going", "Small improvements every day add up."]
  ],
  ending: "So my answer: becoming a better person isn’t one big moment. It’s small good choices, repeated every day."
};
(function(){
  const box = document.getElementById("steps"), end = document.getElementById("ending"); let opened = 0;
  ANSWER.steps.forEach(([t, d], i) => {
    const b = document.createElement("button"); b.className = "step";
    b.innerHTML = `<span class="n">${i + 1}</span><span><b>${t}</b><small>${d}</small></span>`;
    b.onclick = () => {
      if (b.classList.contains("open")) return;
      b.classList.add("open"); opened++;
      const r = b.getBoundingClientRect(); burst(r.left + 30, r.top + 20, 16);
      if (opened === ANSWER.steps.length) { end.textContent = ANSWER.ending; end.hidden = false; burst(innerWidth / 2, innerHeight / 2, 100); }
    };
    box.append(b);
  });
})();