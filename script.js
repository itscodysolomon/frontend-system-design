const lessons = [
  {
    title: "What frontend system design is",
    level: "foundation",
    goal: "Learn the scope: user flows, browser constraints, app architecture, and UX reliability.",
    topics: ["frontend vs backend scope", "requirements", "tradeoffs"],
    action: "Explain how a frontend design answer differs from a backend design answer."
  },
  {
    title: "Requirements and user flows",
    level: "foundation",
    goal: "Start interviews by clarifying users, devices, core actions, permissions, and non-goals.",
    topics: ["personas", "happy path", "edge cases"],
    action: "Write the top five requirements for a checkout frontend."
  },
  {
    title: "Component and route architecture",
    level: "foundation",
    goal: "Break a product into routes, features, shared components, layout, and data boundaries.",
    topics: ["feature folders", "composition", "routing"],
    action: "Sketch a folder structure for a large analytics dashboard."
  },
  {
    title: "State ownership and data flow",
    level: "foundation",
    goal: "Separate local UI state, URL state, global state, server state, and cache state.",
    topics: ["React state", "server state", "optimistic updates"],
    action: "Decide where search filters, auth, cart, and API results should live."
  },
  {
    title: "Data fetching and caching",
    level: "performance",
    goal: "Design fetching, pagination, retries, invalidation, stale data, and realtime updates.",
    topics: ["TanStack Query", "SWR", "pagination"],
    action: "Design stale-while-revalidate behavior for a notifications panel."
  },
  {
    title: "Rendering and performance",
    level: "performance",
    goal: "Improve startup, navigation, interaction speed, and perceived performance.",
    topics: ["code splitting", "virtualization", "SSR/CSR/SSG"],
    action: "Optimize a table with 50,000 rows and frequent updates."
  },
  {
    title: "Resilience and accessibility",
    level: "senior",
    goal: "Handle loading, empty, error, offline, keyboard, screen reader, and slow-network states.",
    topics: ["error boundaries", "a11y", "offline UX"],
    action: "Design error handling for a payment form without losing user input."
  },
  {
    title: "Scaling teams and systems",
    level: "senior",
    goal: "Use design systems, micro frontends, testing, feature flags, and observability wisely.",
    topics: ["design systems", "observability", "micro frontends"],
    action: "Plan how 12 teams could safely share a component library."
  }
];

const architectureLayers = [
  {
    id: "ux",
    label: "Layer 1",
    title: "User flows",
    body: "Start with the product experience: who uses it, what they need to do, and what must work on mobile, desktop, slow networks, and assistive tech.",
    bullets: ["Core screens and journeys", "Loading, empty, and error states", "Accessibility and responsive behavior"]
  },
  {
    id: "ui",
    label: "Layer 2",
    title: "UI composition",
    body: "Break the experience into pages, layouts, feature components, reusable primitives, and design-system pieces.",
    bullets: ["Component boundaries", "Shared vs feature-specific UI", "Theming and consistency"]
  },
  {
    id: "state",
    label: "Layer 3",
    title: "State model",
    body: "Decide ownership for local UI state, URL state, global state, server state, and cached state so the app stays predictable.",
    bullets: ["Local vs global state", "Server-state cache", "Optimistic and realtime updates"]
  },
  {
    id: "data",
    label: "Layer 4",
    title: "Data and APIs",
    body: "Define how the frontend talks to backend services and how it handles partial failure, pagination, auth, and data freshness.",
    bullets: ["API contracts", "Pagination and filtering", "Retries and invalidation"]
  },
  {
    id: "perf",
    label: "Layer 5",
    title: "Performance",
    body: "Make the app feel fast by controlling bundles, rendering cost, network waterfalls, expensive lists, images, and hydration.",
    bullets: ["Code splitting", "Virtualization", "SSR, SSG, CSR, streaming"]
  },
  {
    id: "ops",
    label: "Layer 6",
    title: "Operations at scale",
    body: "For senior answers, include testing, analytics, feature flags, observability, ownership, and safe rollout strategies.",
    bullets: ["Testing strategy", "Error monitoring", "Feature flags and rollbacks"]
  }
];

const prompts = [
  {
    text: "Design a scalable autocomplete search UI.",
    hints: ["Clarify latency, ranking, keyboard support, and mobile behavior.", "Discuss debouncing, request cancellation, caching, and stale results.", "Cover empty, loading, error, and slow-network states."]
  },
  {
    text: "Design the frontend architecture for a Slack-like chat app.",
    hints: ["Separate channels, messages, composer, search, notifications, and presence.", "Discuss WebSockets, pagination, optimistic sends, and offline drafts.", "Mention virtualization for long conversations."]
  },
  {
    text: "Design a dashboard that displays thousands of metrics in real time.",
    hints: ["Clarify refresh rate and what must be realtime.", "Use virtualization, memoization, aggregation, and streaming updates.", "Discuss alerting, filters in URL state, and observability."]
  },
  {
    text: "Design a reusable design system for a large product company.",
    hints: ["Cover tokens, components, documentation, accessibility, and versioning.", "Discuss governance and ownership.", "Explain how teams consume updates safely."]
  },
  {
    text: "Design the frontend for an e-commerce checkout flow.",
    hints: ["Prioritize reliability, validation, persistence, security, and error recovery.", "Discuss state ownership for cart, address, payment, and promos.", "Cover accessibility and preventing duplicate submissions."]
  },
  {
    text: "Design a collaborative document editor from the frontend perspective.",
    hints: ["Clarify collaboration model, presence, conflict handling, and offline edits.", "Discuss editor state, network sync, and optimistic UI.", "Mention performance for large documents."]
  }
];

const moduleGrid = document.querySelector("#moduleGrid");
const progressBar = document.querySelector("#progressBar");
const progressText = document.querySelector("#progressText");
const progressPercent = document.querySelector("#progressPercent");
const streakCount = document.querySelector("#streakCount");
const filterButtons = document.querySelectorAll("[data-filter]");
const diagram = document.querySelector("#diagram");
const inspector = document.querySelector("#inspector");
const promptText = document.querySelector("#promptText");
const hintPanel = document.querySelector("#hintPanel");
const noteFields = ["requirements", "architectureNotes", "performanceNotes", "tradeoffNotes"];
let activeFilter = "all";
let currentPrompt = 0;

function getCompleted() {
  return JSON.parse(localStorage.getItem("fsd-v2-progress") || "[]");
}

function setCompleted(completed) {
  localStorage.setItem("fsd-v2-progress", JSON.stringify(completed));
}

function renderLessons() {
  const completed = getCompleted();
  const visibleLessons = lessons
    .map((lesson, index) => ({ ...lesson, index }))
    .filter(lesson => activeFilter === "all" || lesson.level === activeFilter);

  moduleGrid.innerHTML = visibleLessons.map(lesson => {
    const done = completed.includes(lesson.index);
    return `
      <article class="module ${done ? "done" : ""}">
        <div class="module-header">
          <span class="module-number">Lesson ${lesson.index + 1}</span>
          <span class="tag">${lesson.level}</span>
        </div>
        <h3>${lesson.title}</h3>
        <p>${lesson.goal}</p>
        <ul>${lesson.topics.map(topic => `<li>${topic}</li>`).join("")}</ul>
        <p><strong>Action:</strong> ${lesson.action}</p>
        <label class="complete-row">
          <input type="checkbox" data-index="${lesson.index}" ${done ? "checked" : ""} />
          Mark complete
        </label>
      </article>
    `;
  }).join("");
  updateProgress();
}

function updateProgress() {
  const completed = getCompleted();
  const count = completed.length;
  const percent = Math.round((count / lessons.length) * 100);
  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${count} of ${lessons.length} lessons completed`;
  progressPercent.textContent = `${percent}%`;
  streakCount.textContent = count;
}

function renderDiagram(activeId = "ux") {
  diagram.innerHTML = architectureLayers.map(layer => `
    <button class="diagram-node ${layer.id === activeId ? "active" : ""}" data-layer="${layer.id}" type="button">
      <span>${layer.label}</span>
      <strong>${layer.title}</strong>
    </button>
  `).join("");
  renderInspector(activeId);
}

function renderInspector(activeId) {
  const layer = architectureLayers.find(item => item.id === activeId) || architectureLayers[0];
  inspector.innerHTML = `
    <span class="card-label">${layer.label}</span>
    <h3>${layer.title}</h3>
    <p>${layer.body}</p>
    <ul>${layer.bullets.map(item => `<li>${item}</li>`).join("")}</ul>
  `;
}

function renderPrompt(index = currentPrompt) {
  const prompt = prompts[index];
  promptText.textContent = prompt.text;
  hintPanel.hidden = true;
  hintPanel.innerHTML = `
    <span class="card-label">Hints</span>
    <ul>${prompt.hints.map(hint => `<li>${hint}</li>`).join("")}</ul>
  `;
}

moduleGrid.addEventListener("change", event => {
  if (!event.target.matches("input[type='checkbox']")) return;
  const index = Number(event.target.dataset.index);
  const completed = new Set(getCompleted());
  event.target.checked ? completed.add(index) : completed.delete(index);
  setCompleted([...completed].sort((a, b) => a - b));
  renderLessons();
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderLessons();
  });
});

diagram.addEventListener("click", event => {
  const button = event.target.closest("[data-layer]");
  if (!button) return;
  renderDiagram(button.dataset.layer);
});

document.querySelector("#newPrompt").addEventListener("click", () => {
  const next = (currentPrompt + 1 + Math.floor(Math.random() * (prompts.length - 1))) % prompts.length;
  currentPrompt = next;
  renderPrompt();
});

document.querySelector("#showHints").addEventListener("click", () => {
  hintPanel.hidden = !hintPanel.hidden;
});

document.querySelector("#resetProgress").addEventListener("click", () => {
  localStorage.removeItem("fsd-v2-progress");
  renderLessons();
});

noteFields.forEach(id => {
  const field = document.querySelector(`#${id}`);
  field.value = localStorage.getItem(`fsd-note-${id}`) || "";
  field.addEventListener("input", () => localStorage.setItem(`fsd-note-${id}`, field.value));
});

document.querySelector("#clearNotes").addEventListener("click", () => {
  noteFields.forEach(id => {
    localStorage.removeItem(`fsd-note-${id}`);
    document.querySelector(`#${id}`).value = "";
  });
  document.querySelector("#copyStatus").textContent = "Notes cleared.";
});

document.querySelector("#copyNotes").addEventListener("click", async () => {
  const answer = [
    ["Requirements", document.querySelector("#requirements").value],
    ["Architecture", document.querySelector("#architectureNotes").value],
    ["Performance", document.querySelector("#performanceNotes").value],
    ["Tradeoffs", document.querySelector("#tradeoffNotes").value]
  ].map(([title, body]) => `${title}\n${body || "-"}`).join("\n\n");

  try {
    await navigator.clipboard.writeText(answer);
    document.querySelector("#copyStatus").textContent = "Copied to clipboard.";
  } catch {
    document.querySelector("#copyStatus").textContent = "Copy failed. Select the notes manually.";
  }
});

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open.toString());
});

document.querySelectorAll("#nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

renderLessons();
renderDiagram();
renderPrompt();
