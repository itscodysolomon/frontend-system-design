const modules = [
  {
    title: "Frontend system design basics",
    goal: "Understand what changes when system design is viewed from the browser and user experience layer.",
    topics: ["requirements", "user flows", "frontend vs backend scope"],
    assignment: "Explain how you would design a photo feed UI in 5 minutes."
  },
  {
    title: "Application architecture",
    goal: "Learn how to structure pages, routes, feature folders, shared components, and services.",
    topics: ["component boundaries", "routing", "feature modules"],
    assignment: "Sketch a folder structure for a large dashboard app."
  },
  {
    title: "State and data flow",
    goal: "Separate UI state, server state, global state, URL state, and cached data.",
    topics: ["React state", "Redux/Zustand", "TanStack Query/SWR"],
    assignment: "Design state ownership for a shopping cart."
  },
  {
    title: "Performance and rendering",
    goal: "Improve loading speed, interaction speed, and perceived performance.",
    topics: ["code splitting", "virtualization", "memoization", "SSR/CSR"],
    assignment: "Optimize a slow table with 50,000 rows."
  },
  {
    title: "Resilient user experiences",
    goal: "Handle real-world failure modes without breaking user trust.",
    topics: ["loading states", "error boundaries", "offline", "retries"],
    assignment: "Design error handling for a payment form."
  },
  {
    title: "Scaling teams and UI systems",
    goal: "Design for many engineers, many screens, and long-term maintainability.",
    topics: ["design systems", "accessibility", "testing", "observability"],
    assignment: "Plan a reusable component library for multiple product teams."
  }
];

const prompts = [
  "Design a scalable autocomplete search UI.",
  "Design the frontend architecture for a Slack-like chat app.",
  "Design a dashboard that displays thousands of metrics in real time.",
  "Design a reusable design system for a large product company.",
  "Design the frontend for an e-commerce checkout flow.",
  "Design a collaborative document editor from the frontend perspective."
];

const grid = document.querySelector("#moduleGrid");
const progressBar = document.querySelector("#progressBar");
const progressText = document.querySelector("#progressText");
const saved = JSON.parse(localStorage.getItem("fsd-progress") || "[]");

function renderModules() {
  grid.innerHTML = modules.map((module, index) => `
    <article class="module">
      <span class="module-number">Module ${index + 1}</span>
      <h3>${module.title}</h3>
      <p>${module.goal}</p>
      <ul>${module.topics.map(topic => `<li>${topic}</li>`).join("")}</ul>
      <p><strong>Mini assignment:</strong> ${module.assignment}</p>
      <label class="complete-row">
        <input type="checkbox" data-index="${index}" ${saved.includes(index) ? "checked" : ""} />
        Mark complete
      </label>
    </article>
  `).join("");
  updateProgress();
}

function updateProgress() {
  const completed = [...document.querySelectorAll('input[type="checkbox"]')].filter(box => box.checked).length;
  const percent = (completed / modules.length) * 100;
  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${completed} of ${modules.length} completed`;
}

grid.addEventListener("change", event => {
  if (!event.target.matches('input[type="checkbox"]')) return;
  const checked = [...document.querySelectorAll('input[type="checkbox"]')]
    .map((box, index) => box.checked ? index : null)
    .filter(value => value !== null);
  localStorage.setItem("fsd-progress", JSON.stringify(checked));
  updateProgress();
});

document.querySelector("#newPrompt").addEventListener("click", () => {
  const current = document.querySelector("#promptText").textContent;
  const choices = prompts.filter(prompt => prompt !== current);
  document.querySelector("#promptText").textContent = choices[Math.floor(Math.random() * choices.length)];
});

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open.toString());
});

renderModules();
