(function() {
  'use strict';

  const STORAGE_KEY = 'fsd-academy-progress';
  const NOTES_KEY = 'fsd-academy-notes';
  const EXERCISES_KEY = 'fsd-academy-exercises';

  let state = {
    currentView: 'dashboard',
    currentModule: null,
    currentInterview: null,
    progress: loadProgress(),
    notes: loadNotes(),
    exercises: loadExercises()
  };

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch { return {}; }
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  }

  function loadNotes() {
    try {
      return JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
    } catch { return {}; }
  }

  function saveNotes() {
    localStorage.setItem(NOTES_KEY, JSON.stringify(state.notes));
  }

  function loadExercises() {
    try {
      return JSON.parse(localStorage.getItem(EXERCISES_KEY)) || {};
    } catch { return {}; }
  }

  function saveExercises() {
    localStorage.setItem(EXERCISES_KEY, JSON.stringify(state.exercises));
  }

  function getCompletedCount() {
    return Object.values(state.progress).filter(v => v === true).length;
  }

  function getProgressPercent() {
    return Math.round((getCompletedCount() / MODULES.length) * 100);
  }

  function getNextModule() {
    for (let m of MODULES) {
      if (!state.progress[m.id]) return m;
    }
    return null;
  }

  // Navigation
  function navigate(view, data) {
    state.currentView = view;
    if (data) {
      if (data.moduleId) state.currentModule = data.moduleId;
      if (data.interviewId) state.currentInterview = data.interviewId;
    }
    render();
    window.scrollTo(0, 0);
    updateNavActive();
  }

  function updateNavActive() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.navigate === state.currentView);
    });
  }

  // Render router
  function render() {
    const app = document.getElementById('app');
    switch (state.currentView) {
      case 'dashboard': app.innerHTML = renderDashboard(); break;
      case 'modules': app.innerHTML = renderModuleList(); break;
      case 'lesson': app.innerHTML = renderLesson(); break;
      case 'interviews': app.innerHTML = renderInterviews(); break;
      case 'interview-detail': app.innerHTML = renderInterviewDetail(); break;
      case 'case-studies': app.innerHTML = renderCaseStudies(); break;
      default: app.innerHTML = renderDashboard();
    }
    attachEventListeners();
  }

  // Dashboard
  function renderDashboard() {
    const completed = getCompletedCount();
    const percent = getProgressPercent();
    const next = getNextModule();

    return `
      <div class="fade-in">
        <div class="dashboard-header">
          <h1>Frontend System Design Academy</h1>
          <p>Master frontend architecture from fundamentals to senior-level interviews</p>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${percent}%</div>
            <div class="stat-label">Overall Progress</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${completed}/${MODULES.length}</div>
            <div class="stat-label">Modules Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${MODULES.length * 4}</div>
            <div class="stat-label">Quiz Questions</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">6</div>
            <div class="stat-label">Interview Walkthroughs</div>
          </div>
        </div>

        <div class="progress-section">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong>Course Progress</strong>
            <span style="color:var(--text-secondary);font-size:0.85rem;">${completed} of ${MODULES.length} modules</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width:${percent}%"></div>
          </div>
        </div>

        <div class="quick-actions">
          ${next ? `
          <div class="action-card" data-action="continue">
            <div class="action-icon">▶️</div>
            <div class="action-text">
              <h3>Continue Learning</h3>
              <p>Module ${next.id}: ${next.title}</p>
            </div>
          </div>` : `
          <div class="action-card" data-action="modules">
            <div class="action-icon">🎉</div>
            <div class="action-text">
              <h3>All Complete!</h3>
              <p>Review any module</p>
            </div>
          </div>`}
          <div class="action-card" data-action="interviews">
            <div class="action-icon">🎯</div>
            <div class="action-text">
              <h3>Interview Practice</h3>
              <p>6 complete walkthroughs</p>
            </div>
          </div>
          <div class="action-card" data-action="case-studies">
            <div class="action-icon">📚</div>
            <div class="action-text">
              <h3>Case Studies</h3>
              <p>Real-world design examples</p>
            </div>
          </div>
          <div class="action-card" data-action="reset">
            <div class="action-icon">🔄</div>
            <div class="action-text">
              <h3>Reset Progress</h3>
              <p>Start fresh</p>
            </div>
          </div>
        </div>

        <div class="section-header">
          <h2>Learning Track</h2>
          <p>12 modules from fundamentals to interview mastery</p>
        </div>
        <div class="modules-grid">
          ${MODULES.map(m => renderModuleCard(m)).join('')}
        </div>
      </div>
    `;
  }

  function renderModuleCard(m) {
    const isComplete = state.progress[m.id] === true;
    return `
      <div class="module-card ${isComplete ? 'completed' : ''}" data-module="${m.id}">
        <div class="module-number">${isComplete ? '✓' : m.id}</div>
        <div class="module-info">
          <h3>${m.icon} ${m.title}</h3>
          <p>${m.description}</p>
        </div>
        <span class="module-status ${isComplete ? 'completed' : 'not-started'}">
          ${isComplete ? 'Complete' : 'Start'}
        </span>
      </div>
    `;
  }

  // Module List
  function renderModuleList() {
    return `
      <div class="fade-in">
        <div class="section-header">
          <h2>All Modules</h2>
          <p>Complete each module to master frontend system design</p>
        </div>
        <div class="modules-grid">
          ${MODULES.map(m => renderModuleCard(m)).join('')}
        </div>
      </div>
    `;
  }

  // Lesson View
  function renderLesson() {
    const m = MODULES.find(mod => mod.id === state.currentModule);
    if (!m) return '<p>Module not found</p>';
    const isComplete = state.progress[m.id] === true;

    return `
      <div class="fade-in">
        <div class="lesson-header">
          <a class="lesson-back" data-action="back-to-modules">← Back to Modules</a>
          <h1>${m.icon} Module ${m.id}: ${m.title}</h1>
          <div class="lesson-meta">
            <span>📖 ~15 min read</span>
            <span>📝 Quiz: ${m.quiz.length} questions</span>
            <span>💪 Practical exercise</span>
          </div>
        </div>

        <div class="lesson-content">
          ${renderLessonSection('Learning Objectives', renderObjectives(m.objectives), true)}
          ${renderLessonSection('Overview', m.content.overview, true)}
          ${renderLessonSection('Lesson Content', m.content.lesson, true)}
          ${renderLessonSection('Architecture Diagram', `<div class="diagram-container">${m.content.diagram}</div>`, false)}
          ${renderLessonSection('Key Tradeoffs', m.content.tradeoffs, false)}
          ${renderLessonSection('Common Mistakes', m.content.mistakes, false)}
          ${renderLessonSection('Interview Angle', m.content.interviewAngle, false)}
          ${renderLessonSection('Practical Exercise', renderExercise(m), false)}
          ${renderLessonSection('Quiz', renderQuiz(m), false)}
          ${renderLessonSection('Notes', renderNotes(m.id), false)}

          <div class="completion-actions">
            ${isComplete
              ? `<button class="btn btn-secondary" data-action="uncomplete" data-module-id="${m.id}">↩ Mark Incomplete</button>`
              : `<button class="btn btn-success btn-lg" data-action="complete" data-module-id="${m.id}">✓ Mark Module Complete</button>`
            }
            ${m.id < MODULES.length
              ? `<button class="btn btn-primary" data-action="next-module" data-next="${m.id + 1}">Next Module →</button>`
              : `<button class="btn btn-primary" data-action="interviews-nav">🎯 Practice Interviews</button>`
            }
          </div>
        </div>
      </div>
    `;
  }

  function renderObjectives(objectives) {
    return `<ul>${objectives.map(o => `<li>${o}</li>`).join('')}</ul>`;
  }

  function renderLessonSection(title, content, openByDefault) {
    return `
      <div class="lesson-section ${openByDefault ? 'open' : ''}">
        <div class="lesson-section-header">
          <span>${title}</span>
          <span class="chevron">▼</span>
        </div>
        <div class="lesson-section-body">
          ${content}
        </div>
      </div>
    `;
  }

  function renderExercise(m) {
    const saved = state.exercises[m.id] || '';
    return `
      <div class="exercise-container">
        <h4>Exercise Prompt</h4>
        <p>${m.exercise.prompt}</p>
        <button class="reveal-btn" data-reveal="hint-${m.id}">Show Hint</button>
        <div class="reveal-content" id="hint-${m.id}">
          <p><strong>Hint:</strong> ${m.exercise.hint}</p>
        </div>
        <textarea placeholder="Write your answer here... Your response is saved automatically." data-exercise="${m.id}">${saved}</textarea>
      </div>
    `;
  }

  function renderQuiz(m) {
    return `
      <div class="quiz-container" data-quiz-module="${m.id}">
        ${m.quiz.map((q, i) => `
          <div class="quiz-question" data-question="${i}">
            <p>${i + 1}. ${q.question}</p>
            <div class="quiz-options">
              ${q.options.map((opt, j) => `
                <div class="quiz-option" data-question-idx="${i}" data-option-idx="${j}">${opt}</div>
              `).join('')}
            </div>
          </div>
        `).join('')}
        <button class="btn btn-primary quiz-submit" data-action="check-quiz" data-module-id="${m.id}">Check Answers</button>
        <div class="quiz-result" id="quiz-result-${m.id}" style="display:none;"></div>
      </div>
    `;
  }

  function renderNotes(moduleId) {
    const saved = state.notes[moduleId] || '';
    return `
      <div class="notes-container">
        <label>Your Notes (auto-saved)</label>
        <textarea placeholder="Take notes as you study this module..." data-notes="${moduleId}">${saved}</textarea>
      </div>
    `;
  }

  // Interviews
  function renderInterviews() {
    return `
      <div class="fade-in">
        <div class="section-header">
          <h2>🎯 Interview Practice</h2>
          <p>Complete frontend system design walkthroughs for common interview questions</p>
        </div>
        <div class="interview-cards">
          ${INTERVIEW_WALKTHROUGHS.map(w => `
            <div class="interview-card" data-interview="${w.id}">
              <h3>${w.title}</h3>
              <p>${w.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderInterviewDetail() {
    const w = INTERVIEW_WALKTHROUGHS.find(i => i.id === state.currentInterview);
    if (!w) return '<p>Interview not found</p>';

    const sections = [
      { title: 'Requirements', content: w.content.requirements },
      { title: 'High-Level Architecture', content: w.content.architecture },
      { title: 'Component Structure', content: w.content.components },
      { title: 'State Strategy', content: w.content.stateStrategy },
      { title: 'API Strategy', content: w.content.apiStrategy },
      { title: 'Performance Strategy', content: w.content.performance },
      { title: 'Accessibility', content: w.content.accessibility },
      { title: 'Tradeoffs', content: w.content.tradeoffs },
      { title: 'Summary', content: w.content.summary },
    ];

    return `
      <div class="fade-in">
        <div class="lesson-header">
          <a class="lesson-back" data-action="back-to-interviews">← Back to Interviews</a>
          <h1>${w.title}</h1>
          <p style="color:var(--text-secondary);margin-top:0.5rem;">${w.description}</p>
        </div>
        <div class="lesson-content">
          ${sections.map((s, i) => renderLessonSection(s.title, s.content, i < 3)).join('')}
        </div>
      </div>
    `;
  }

  // Case Studies
  function renderCaseStudies() {
    return `
      <div class="fade-in">
        <div class="section-header">
          <h2>📚 Case Studies</h2>
          <p>Apply your knowledge with these practical scenarios</p>
        </div>
        <div class="interview-cards">
          <div class="interview-card" data-interview="netflix">
            <h3>🎬 Netflix: Content Platform</h3>
            <p>How to design a video streaming frontend with personalization, adaptive playback, and content discovery at scale.</p>
          </div>
          <div class="interview-card" data-interview="slack">
            <h3>💬 Slack: Real-Time Messaging</h3>
            <p>Designing a real-time chat application with presence, threads, and offline support.</p>
          </div>
          <div class="interview-card" data-interview="ecommerce">
            <h3>🛒 Ecommerce: Shopping Platform</h3>
            <p>Building a fast, SEO-friendly shopping experience with cart persistence and checkout optimization.</p>
          </div>
          <div class="interview-card" data-interview="analytics">
            <h3>📊 Analytics: Data Dashboard</h3>
            <p>Creating a real-time analytics dashboard with independent widgets and large dataset rendering.</p>
          </div>
          <div class="interview-card" data-interview="youtube">
            <h3>📺 YouTube: Video Platform</h3>
            <p>Designing a media-heavy platform balancing SEO, performance, and rich interactions.</p>
          </div>
          <div class="interview-card" data-interview="collaborative-editor">
            <h3>📝 Google Docs: Collaborative Editor</h3>
            <p>Tackling the hardest frontend problem: real-time collaborative editing with CRDTs.</p>
          </div>
        </div>
      </div>
    `;
  }

  // Event Listeners
  function attachEventListeners() {
    // Module cards
    document.querySelectorAll('.module-card[data-module]').forEach(card => {
      card.addEventListener('click', () => {
        navigate('lesson', { moduleId: parseInt(card.dataset.module) });
      });
    });

    // Interview cards
    document.querySelectorAll('.interview-card[data-interview]').forEach(card => {
      card.addEventListener('click', () => {
        navigate('interview-detail', { interviewId: card.dataset.interview });
      });
    });

    // Action cards
    document.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        handleAction(el.dataset.action, el.dataset);
      });
    });

    // Section toggle
    document.querySelectorAll('.lesson-section-header').forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('open');
      });
    });

    // Quiz options
    document.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const siblings = opt.parentElement.querySelectorAll('.quiz-option');
        siblings.forEach(s => s.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });

    // Reveal buttons
    document.querySelectorAll('.reveal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.reveal);
        if (target) target.classList.toggle('visible');
      });
    });

    // Notes auto-save
    document.querySelectorAll('[data-notes]').forEach(textarea => {
      textarea.addEventListener('input', debounce(() => {
        state.notes[textarea.dataset.notes] = textarea.value;
        saveNotes();
      }, 500));
    });

    // Exercise auto-save
    document.querySelectorAll('[data-exercise]').forEach(textarea => {
      textarea.addEventListener('input', debounce(() => {
        state.exercises[textarea.dataset.exercise] = textarea.value;
        saveExercises();
      }, 500));
    });
  }

  function handleAction(action, data) {
    switch (action) {
      case 'continue': {
        const next = getNextModule();
        if (next) navigate('lesson', { moduleId: next.id });
        break;
      }
      case 'modules':
        navigate('modules');
        break;
      case 'interviews':
      case 'interviews-nav':
        navigate('interviews');
        break;
      case 'case-studies':
        navigate('case-studies');
        break;
      case 'reset':
        if (confirm('Reset all progress, notes, and exercise answers? This cannot be undone.')) {
          state.progress = {};
          state.notes = {};
          state.exercises = {};
          saveProgress();
          saveNotes();
          saveExercises();
          render();
        }
        break;
      case 'complete':
        state.progress[parseInt(data.moduleId)] = true;
        saveProgress();
        render();
        break;
      case 'uncomplete':
        delete state.progress[parseInt(data.moduleId)];
        saveProgress();
        render();
        break;
      case 'next-module':
        navigate('lesson', { moduleId: parseInt(data.next) });
        break;
      case 'back-to-modules':
        navigate('modules');
        break;
      case 'back-to-interviews':
        navigate('interviews');
        break;
      case 'check-quiz':
        checkQuiz(parseInt(data.moduleId));
        break;
    }
  }

  function checkQuiz(moduleId) {
    const m = MODULES.find(mod => mod.id === moduleId);
    if (!m) return;

    let correct = 0;
    const questions = document.querySelectorAll(`[data-quiz-module="${moduleId}"] .quiz-question`);

    questions.forEach((qEl, i) => {
      const selected = qEl.querySelector('.quiz-option.selected');
      const options = qEl.querySelectorAll('.quiz-option');

      options.forEach((opt, j) => {
        opt.classList.remove('correct', 'incorrect');
        if (j === m.quiz[i].correct) {
          opt.classList.add('correct');
        }
      });

      if (selected) {
        const selectedIdx = parseInt(selected.dataset.optionIdx);
        if (selectedIdx === m.quiz[i].correct) {
          correct++;
        } else {
          selected.classList.add('incorrect');
        }
      }
    });

    const resultEl = document.getElementById(`quiz-result-${moduleId}`);
    if (resultEl) {
      const total = m.quiz.length;
      const passed = correct >= Math.ceil(total * 0.75);
      resultEl.style.display = 'block';
      resultEl.className = `quiz-result ${passed ? 'pass' : 'fail'}`;
      resultEl.textContent = `${correct}/${total} correct. ${passed ? 'Great job! You passed.' : 'Review the material and try again.'}`;
    }
  }

  // Navigation handlers
  document.querySelectorAll('[data-navigate]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.dataset.navigate;
      navigate(view);
      // Close mobile menu
      document.getElementById('nav-mobile').classList.remove('open');
    });
  });

  // Mobile menu
  document.getElementById('nav-menu-btn').addEventListener('click', () => {
    document.getElementById('nav-mobile').classList.toggle('open');
  });

  // Utility
  function debounce(fn, ms) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // Initial render
  render();
})();
