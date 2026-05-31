const MODULES = [
  {
    id: 1,
    title: "Frontend Architecture",
    description: "Feature-based architecture, component composition, and scaling frontend teams",
    icon: "🏛️",
    objectives: [
      "Understand feature-based folder architecture",
      "Apply separation of concerns in frontend code",
      "Design component boundaries for large apps",
      "Choose between smart and presentational components",
      "Define ownership boundaries for scaling teams"
    ],
    content: {
      overview: `<p>Frontend architecture is the foundation that determines how maintainable, scalable, and testable your application will be as it grows. Poor architecture choices made early compound over time, leading to tightly coupled modules, unclear ownership, and painful refactoring.</p>
<p>In a system design interview, demonstrating that you think about architecture shows maturity. It signals you've worked on real applications at scale, not just toy projects.</p>
<p>The key insight is: <strong>good frontend architecture optimizes for change</strong>. Requirements shift, teams grow, features get added and removed. Your folder structure, component boundaries, and module interfaces should make change cheap and safe.</p>`,

      lesson: `<h4>Feature-Based Architecture</h4>
<p>The most scalable approach for large frontend apps is feature-based (or domain-based) architecture. Instead of grouping by technical role (all components together, all hooks together), you group by business feature.</p>
<pre>src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── index.ts
│   ├── cart/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── index.ts
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── index.ts
│   └── checkout/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
├── app/
│   ├── routes/
│   ├── layout/
│   └── providers/
└── lib/
    ├── api-client/
    └── analytics/</pre>
<p>This structure works because each feature folder is a self-contained module. You can add, modify, or remove a feature without touching unrelated code. Team ownership maps naturally to features.</p>

<h4>Component Composition</h4>
<p>Good frontend architecture relies on composition over inheritance. Components should be small, focused, and composable. The two key patterns are:</p>
<ul>
<li><strong>Container/Presentational split:</strong> Containers handle data fetching and state; presentational components just render UI based on props. This separation makes presentational components reusable and easy to test.</li>
<li><strong>Compound components:</strong> Instead of one monolithic component with dozens of props, break it into related sub-components that share implicit state (like a Tabs component with Tab and TabPanel children).</li>
</ul>

<h4>Separation of Concerns</h4>
<p>Even within a feature folder, separate concerns by layer:</p>
<ul>
<li><strong>UI layer:</strong> Components that render markup and handle user interaction</li>
<li><strong>State layer:</strong> Hooks and stores that manage data</li>
<li><strong>Service layer:</strong> API calls, transformations, business logic</li>
<li><strong>Type layer:</strong> Interfaces and type definitions</li>
</ul>
<p>The rule is: each layer should only depend on layers below it. UI depends on state, state depends on services, services depend on types. Never have services importing from UI components.</p>

<h4>Smart vs Presentational Components</h4>
<p>Smart (container) components:</p>
<ul>
<li>Fetch data, manage state, handle side effects</li>
<li>Know about the application's data layer</li>
<li>Pass data and callbacks down to presentational components</li>
<li>Harder to reuse because they're tied to specific data sources</li>
</ul>
<p>Presentational (dumb) components:</p>
<ul>
<li>Receive all data via props</li>
<li>Have no knowledge of where data comes from</li>
<li>Highly reusable and easy to test</li>
<li>Can be shared across features and even across applications</li>
</ul>

<h4>API/Data Layer Boundaries</h4>
<p>Your frontend should have a clear data layer that sits between the UI and the backend. This layer handles:</p>
<ul>
<li>API client configuration (base URL, headers, interceptors)</li>
<li>Request/response transformation</li>
<li>Caching strategy</li>
<li>Error normalization</li>
<li>Optimistic updates</li>
</ul>
<p>Never make raw fetch calls from components. Always go through a service layer that can be mocked, tested, and swapped independently.</p>

<h4>Scaling Frontend Teams</h4>
<p>Architecture decisions should support team scaling:</p>
<ul>
<li><strong>Clear ownership:</strong> Each feature folder should have a clear owning team</li>
<li><strong>Public APIs:</strong> Features expose only what's needed via their index.ts barrel file</li>
<li><strong>Dependency direction:</strong> Features can import from shared/ but never from other features directly</li>
<li><strong>Lint rules:</strong> Enforce architectural boundaries with eslint-plugin-boundaries or similar</li>
</ul>
<div class="callout"><p><strong>Interview Tip:</strong> When discussing architecture, always connect it to a real constraint—team size, deployment frequency, or performance requirements. "We chose feature-based architecture because we had 8 teams working on the same app and needed clear ownership boundaries."</p></div>`,

      diagram: `<svg viewBox="0 0 600 350" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="580" height="330" fill="none" stroke="#353b55" rx="8"/>
<text x="300" y="40" text-anchor="middle" fill="#e8eaf0" font-size="14" font-weight="bold">Feature-Based Architecture</text>
<rect x="40" y="60" width="160" height="120" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="120" y="85" text-anchor="middle" fill="#6c63ff" font-size="11" font-weight="bold">Feature: Auth</text>
<text x="120" y="110" text-anchor="middle" fill="#a0a8c0" font-size="10">components/</text>
<text x="120" y="128" text-anchor="middle" fill="#a0a8c0" font-size="10">hooks/</text>
<text x="120" y="146" text-anchor="middle" fill="#a0a8c0" font-size="10">services/</text>
<text x="120" y="164" text-anchor="middle" fill="#a0a8c0" font-size="10">types.ts</text>
<rect x="220" y="60" width="160" height="120" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="300" y="85" text-anchor="middle" fill="#6c63ff" font-size="11" font-weight="bold">Feature: Products</text>
<text x="300" y="110" text-anchor="middle" fill="#a0a8c0" font-size="10">components/</text>
<text x="300" y="128" text-anchor="middle" fill="#a0a8c0" font-size="10">hooks/</text>
<text x="300" y="146" text-anchor="middle" fill="#a0a8c0" font-size="10">services/</text>
<text x="300" y="164" text-anchor="middle" fill="#a0a8c0" font-size="10">types.ts</text>
<rect x="400" y="60" width="160" height="120" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="480" y="85" text-anchor="middle" fill="#6c63ff" font-size="11" font-weight="bold">Feature: Cart</text>
<text x="480" y="110" text-anchor="middle" fill="#a0a8c0" font-size="10">components/</text>
<text x="480" y="128" text-anchor="middle" fill="#a0a8c0" font-size="10">hooks/</text>
<text x="480" y="146" text-anchor="middle" fill="#a0a8c0" font-size="10">services/</text>
<text x="480" y="164" text-anchor="middle" fill="#a0a8c0" font-size="10">types.ts</text>
<rect x="120" y="220" width="360" height="50" fill="#1e2235" stroke="#4caf50" rx="6"/>
<text x="300" y="250" text-anchor="middle" fill="#4caf50" font-size="12" font-weight="bold">Shared Layer (components, hooks, utils)</text>
<rect x="120" y="290" width="360" height="40" fill="#1e2235" stroke="#ff9800" rx="6"/>
<text x="300" y="315" text-anchor="middle" fill="#ff9800" font-size="12" font-weight="bold">App Shell (routes, layout, providers)</text>
<line x1="120" y1="180" x2="120" y2="220" stroke="#353b55" stroke-dasharray="4"/>
<line x1="300" y1="180" x2="300" y2="220" stroke="#353b55" stroke-dasharray="4"/>
<line x1="480" y1="180" x2="480" y2="220" stroke="#353b55" stroke-dasharray="4"/>
</svg>`,

      tradeoffs: `<ul>
<li><strong>Feature-based vs layer-based:</strong> Feature-based scales better with teams but requires discipline in shared code. Layer-based is simpler for small apps but creates cross-cutting changes for every feature.</li>
<li><strong>Barrel exports vs direct imports:</strong> Barrel files (index.ts) provide clean public APIs but can hurt tree-shaking and create circular dependencies if misused.</li>
<li><strong>Strict boundaries vs pragmatism:</strong> Overly strict rules can slow development. Start flexible, add constraints as pain emerges.</li>
<li><strong>Monorepo vs polyrepo:</strong> Monorepos enable code sharing and atomic changes but require tooling investment. Polyrepos provide stronger isolation but make cross-cutting changes harder.</li>
</ul>`,

      mistakes: `<ul>
<li>Grouping files by type (all components in one folder) instead of by feature</li>
<li>Creating deeply nested folder structures that are hard to navigate</li>
<li>Allowing circular dependencies between features</li>
<li>Making every component "smart" by connecting it directly to the data layer</li>
<li>Skipping the service layer and making API calls directly from components</li>
<li>Not defining clear public APIs for feature modules</li>
<li>Over-engineering architecture for a small app that doesn't need it yet</li>
</ul>`,

      interviewAngle: `<p>In a system design interview, architecture comes up in two ways:</p>
<ol>
<li><strong>Explicit question:</strong> "How would you structure the frontend for this application?" — Answer with feature-based architecture, explain component hierarchy, and discuss how teams would own different parts.</li>
<li><strong>Implicit signal:</strong> When designing any system, mention the high-level architecture before diving into details. "I'd use a feature-based architecture with three main domains: feed, messaging, and notifications, each with their own components, hooks, and services."</li>
</ol>
<p>Show that you think about architecture as a tool for enabling teams to move fast independently, not just as a way to organize files.</p>`
    },
    exercise: {
      prompt: "Design the folder structure for an ecommerce frontend with these features: product browsing, search, cart, checkout, user accounts, order history, wishlist, reviews, and an admin panel. Consider which pieces are shared, how teams would own different areas, and where the API layer lives.",
      hint: "Think about which features are closely related (cart and checkout share state) vs independent (reviews vs wishlist). Consider that the admin panel might be a separate entry point."
    },
    quiz: [
      {
        question: "What is the primary advantage of feature-based folder structure over layer-based structure?",
        options: [
          "It makes the app faster at runtime",
          "Related code stays together, enabling independent team ownership",
          "It requires fewer files overall",
          "It eliminates the need for shared components"
        ],
        correct: 1
      },
      {
        question: "In a well-architected frontend, which dependency direction is correct?",
        options: [
          "Services import from UI components",
          "UI components import from features they don't own",
          "Features import from the shared layer, not from other features",
          "The shared layer imports from feature modules"
        ],
        correct: 2
      },
      {
        question: "What is the role of a barrel file (index.ts) in feature-based architecture?",
        options: [
          "It bundles all feature code into one file for performance",
          "It defines the public API of a feature module",
          "It prevents the feature from being imported by other code",
          "It automatically generates TypeScript types"
        ],
        correct: 1
      },
      {
        question: "When should you NOT use feature-based architecture?",
        options: [
          "When your app has more than 5 features",
          "When you have multiple teams working on the same app",
          "When your app is small with 2-3 screens and one developer",
          "When you need to deploy features independently"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 2,
    title: "State Management",
    description: "Local state, server state, global state, and choosing the right tool for each",
    icon: "🔄",
    objectives: [
      "Categorize state by type: local, shared, server, URL, form",
      "Choose appropriate state management tools for each category",
      "Understand when global state is and isn't needed",
      "Implement optimistic updates and cache invalidation",
      "Design state architecture for complex applications"
    ],
    content: {
      overview: `<p>State management is one of the most over-engineered aspects of frontend development. Many applications reach for Redux or similar tools far too early, creating unnecessary complexity. The key insight is that <strong>not all state is the same</strong>, and different types of state need different management strategies.</p>
<p>Understanding state categories—and matching the right tool to each—is a hallmark of senior frontend thinking. In interviews, this nuance separates candidates who've built real applications from those who've only followed tutorials.</p>`,

      lesson: `<h4>Types of State</h4>
<p>Every piece of state in a frontend application falls into one of these categories:</p>
<ul>
<li><strong>Local UI state:</strong> A dropdown being open, a form field value, hover state. Lives in the component. Use useState/useReducer.</li>
<li><strong>Shared client state:</strong> Theme, user preferences, sidebar collapsed. Multiple components need it but it doesn't come from the server. Use Context, Zustand, or Jotai.</li>
<li><strong>Server state:</strong> Data fetched from APIs—user profile, product list, notifications. Has unique challenges: caching, staleness, synchronization. Use TanStack Query, SWR, or Apollo.</li>
<li><strong>URL state:</strong> Search filters, pagination, active tab. Should be in the URL so users can share links and use back/forward. Use URL params and router.</li>
<li><strong>Form state:</strong> Complex multi-step forms with validation. Use React Hook Form, Formik, or built-in form handling.</li>
</ul>

<h4>The Mistake: Putting Everything in Global State</h4>
<p>A common anti-pattern is putting all state in Redux (or equivalent). This creates problems:</p>
<ul>
<li>Components become coupled to a global store instead of being self-contained</li>
<li>Simple state changes require actions, reducers, and selectors</li>
<li>Server state loses its natural lifecycle (loading, error, stale, fresh)</li>
<li>Testing becomes harder because you need to mock the entire store</li>
</ul>
<div class="callout"><p><strong>Rule of thumb:</strong> If state is only used by one component or a small subtree, keep it local. If it's server data, use a server-state library. Only reach for global state for truly app-wide client concerns.</p></div>

<h4>Server State with TanStack Query</h4>
<p>Server state is fundamentally different from client state because it's a cache of remote data. TanStack Query (React Query) handles the hard parts:</p>
<pre>// This single hook handles loading, error, caching,
// background refetching, and stale data
const { data, isLoading, error } = useQuery({
  queryKey: ['products', categoryId],
  queryFn: () => api.getProducts(categoryId),
  staleTime: 5 * 60 * 1000, // 5 minutes
});</pre>
<p>Key concepts:</p>
<ul>
<li><strong>Stale time:</strong> How long data is considered fresh (no refetch needed)</li>
<li><strong>Cache time:</strong> How long unused data stays in memory</li>
<li><strong>Background refetch:</strong> Automatically refetches stale data when component mounts or window refocuses</li>
<li><strong>Query invalidation:</strong> After a mutation, mark related queries as stale</li>
</ul>

<h4>Optimistic Updates</h4>
<p>For a responsive UI, update the client state before the server confirms the change:</p>
<pre>const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['todos']);
    // Snapshot previous value
    const previous = queryClient.getQueryData(['todos']);
    // Optimistically update
    queryClient.setQueryData(['todos'], (old) =>
      old.map(t => t.id === newTodo.id ? newTodo : t)
    );
    return { previous };
  },
  onError: (err, newTodo, context) => {
    // Rollback on error
    queryClient.setQueryData(['todos'], context.previous);
  },
  onSettled: () => {
    queryClient.invalidateQueries(['todos']);
  },
});</pre>

<h4>URL State for Filters and Pagination</h4>
<p>Anything that represents the user's current view should be in the URL:</p>
<ul>
<li>Search query: <code>?q=react+hooks</code></li>
<li>Filters: <code>?category=electronics&price=100-500</code></li>
<li>Pagination: <code>?page=3</code></li>
<li>Sort order: <code>?sort=price_asc</code></li>
<li>Active tab: <code>?tab=reviews</code></li>
</ul>
<p>Benefits: shareable URLs, browser back/forward works, page refreshes maintain state, analytics tools can track views.</p>

<h4>When to Use What</h4>
<pre>┌─────────────────────────────────────────────────┐
│ State Type        │ Tool                         │
├─────────────────────────────────────────────────┤
│ Local UI          │ useState, useReducer         │
│ Shared UI         │ Context, Zustand, Jotai      │
│ Server data       │ TanStack Query, SWR          │
│ URL/navigation    │ Router params, searchParams   │
│ Forms             │ React Hook Form, native       │
│ Complex client    │ Zustand, Redux Toolkit       │
└─────────────────────────────────────────────────┘</pre>
<div class="callout"><p><strong>Interview Tip:</strong> When asked "how would you manage state?" in an interview, always start by categorizing the state. Don't say "I'd use Redux for everything." Say "The product data is server state so I'd use TanStack Query, the filters are URL state so they go in search params, and the cart total is derived state computed from the cart items."</p></div>`,

      diagram: `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="30" text-anchor="middle" fill="#e8eaf0" font-size="14" font-weight="bold">State Management Strategy</text>
<rect x="20" y="50" width="130" height="80" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="85" y="75" text-anchor="middle" fill="#6c63ff" font-size="10" font-weight="bold">Local State</text>
<text x="85" y="95" text-anchor="middle" fill="#a0a8c0" font-size="9">useState</text>
<text x="85" y="112" text-anchor="middle" fill="#a0a8c0" font-size="9">useReducer</text>
<rect x="160" y="50" width="130" height="80" fill="#1e2235" stroke="#4caf50" rx="6"/>
<text x="225" y="75" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">Server State</text>
<text x="225" y="95" text-anchor="middle" fill="#a0a8c0" font-size="9">TanStack Query</text>
<text x="225" y="112" text-anchor="middle" fill="#a0a8c0" font-size="9">SWR</text>
<rect x="300" y="50" width="130" height="80" fill="#1e2235" stroke="#ff9800" rx="6"/>
<text x="365" y="75" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="bold">URL State</text>
<text x="365" y="95" text-anchor="middle" fill="#a0a8c0" font-size="9">searchParams</text>
<text x="365" y="112" text-anchor="middle" fill="#a0a8c0" font-size="9">router</text>
<rect x="440" y="50" width="140" height="80" fill="#1e2235" stroke="#f44336" rx="6"/>
<text x="510" y="75" text-anchor="middle" fill="#f44336" font-size="10" font-weight="bold">Global Client</text>
<text x="510" y="95" text-anchor="middle" fill="#a0a8c0" font-size="9">Zustand / Redux</text>
<text x="510" y="112" text-anchor="middle" fill="#a0a8c0" font-size="9">Context</text>
<rect x="100" y="170" width="400" height="50" fill="#1e2235" stroke="#353b55" rx="6"/>
<text x="300" y="200" text-anchor="middle" fill="#e8eaf0" font-size="11" font-weight="bold">Component Tree</text>
<rect x="100" y="240" width="400" height="40" fill="#1e2235" stroke="#353b55" rx="6"/>
<text x="300" y="265" text-anchor="middle" fill="#a0a8c0" font-size="11">API Layer / Backend</text>
<line x1="225" y1="130" x2="225" y2="240" stroke="#4caf50" stroke-dasharray="4"/>
<line x1="85" y1="130" x2="85" y2="170" stroke="#6c63ff" stroke-dasharray="4"/>
<line x1="365" y1="130" x2="365" y2="170" stroke="#ff9800" stroke-dasharray="4"/>
</svg>`,

      tradeoffs: `<ul>
<li><strong>Redux vs Zustand:</strong> Redux has mature ecosystem and devtools but significant boilerplate. Zustand is simpler with less ceremony but smaller ecosystem.</li>
<li><strong>Normalized vs denormalized cache:</strong> Normalized cache (like Apollo) prevents data inconsistency but adds complexity. Denormalized (like React Query) is simpler but may show stale data in some views.</li>
<li><strong>Optimistic vs pessimistic updates:</strong> Optimistic feels faster but requires rollback logic. Pessimistic is simpler but feels sluggish.</li>
<li><strong>Server state in global store vs dedicated library:</strong> Dedicated libraries handle caching, deduplication, and background sync automatically. Rolling your own means maintaining that complexity.</li>
</ul>`,

      mistakes: `<ul>
<li>Putting server-fetched data in Redux instead of using a server-state library</li>
<li>Using global state for data that only one component needs</li>
<li>Not keeping filter/pagination state in the URL</li>
<li>Forgetting to handle loading and error states</li>
<li>Creating "state management" abstractions before understanding the problem</li>
<li>Prop drilling through 10+ levels instead of using context for shared state</li>
<li>Using context for frequently-updating state (causes unnecessary rerenders)</li>
</ul>`,

      interviewAngle: `<p>State management questions are common in system design interviews. The interviewer wants to see:</p>
<ol>
<li>You can categorize state correctly (not "I'd put everything in Redux")</li>
<li>You understand server state vs client state</li>
<li>You know when URL state is appropriate</li>
<li>You can discuss caching and invalidation tradeoffs</li>
<li>You think about derived state and avoid duplication</li>
</ol>
<p>A strong answer pattern: "For this feature, the [data] is server state that I'd manage with React Query. The [filters] are URL state. The [UI toggles] are local component state. The only truly global client state would be [auth/theme]."</p>`
    },
    exercise: {
      prompt: "For an ecommerce application, categorize and choose a state management strategy for each of the following: shopping cart contents, product catalog data, search filters, user authentication status, checkout form data, recently viewed products, and product recommendations.",
      hint: "Cart is interesting because it's client state that needs to persist (localStorage) and eventually sync to server. Think about which state is URL-worthy and which is ephemeral."
    },
    quiz: [
      {
        question: "Which type of state should typically be managed with TanStack Query or SWR?",
        options: [
          "Whether a modal is open or closed",
          "Product data fetched from an API",
          "The current search filter values in the URL",
          "Whether the user prefers dark mode"
        ],
        correct: 1
      },
      {
        question: "What is the main problem with putting API data in Redux?",
        options: [
          "Redux can't store objects",
          "You lose automatic caching, background refetching, and stale data management",
          "Redux is slower than Context",
          "API data is too large for Redux"
        ],
        correct: 1
      },
      {
        question: "Which state should be stored in URL search params?",
        options: [
          "User's auth token",
          "Whether a tooltip is visible",
          "Product list filters and sort order",
          "Shopping cart items"
        ],
        correct: 2
      },
      {
        question: "What is an optimistic update?",
        options: [
          "Fetching data before the user needs it",
          "Updating the UI immediately before the server confirms the change",
          "Caching API responses for faster subsequent loads",
          "Using optimistic concurrency control in the database"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 3,
    title: "API Layer Design",
    description: "REST, GraphQL, BFF patterns, error handling, and type-safe API contracts",
    icon: "🔌",
    objectives: [
      "Design a clean API client abstraction",
      "Choose between REST and GraphQL for frontend use cases",
      "Implement error handling, retries, and cancellation",
      "Design pagination and infinite scroll patterns",
      "Understand the Backend-for-Frontend pattern"
    ],
    content: {
      overview: `<p>The API layer is the bridge between your frontend and backend. A well-designed API layer makes your application resilient, testable, and easy to evolve. A poorly designed one leaks network concerns into your UI components and makes every backend change a frontend emergency.</p>
<p>Frontend engineers often inherit API designs they can't change. The skill is building a robust client layer that handles the messy reality of network communication: failures, slow responses, race conditions, and inconsistent API shapes.</p>`,

      lesson: `<h4>API Client Architecture</h4>
<p>Every frontend app should have a centralized API client that handles cross-cutting concerns:</p>
<pre>// api-client.ts
class ApiClient {
  constructor(private baseUrl: string) {}

  private async request(endpoint, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      ...options,
    };

    const response = await fetch(
      this.baseUrl + endpoint,
      config
    );

    if (!response.ok) {
      throw new ApiError(response.status, await response.json());
    }

    return response.json();
  }

  get(endpoint, params) { /* ... */ }
  post(endpoint, body) { /* ... */ }
  put(endpoint, body) { /* ... */ }
  delete(endpoint) { /* ... */ }
}</pre>
<p>This centralization gives you one place to add auth headers, handle token refresh, log requests, and transform responses.</p>

<h4>REST from the Frontend Perspective</h4>
<p>REST APIs are the most common. Frontend concerns include:</p>
<ul>
<li><strong>Over-fetching:</strong> GET /users returns 50 fields but you only need 3. Wasteful on mobile.</li>
<li><strong>Under-fetching:</strong> To show a dashboard, you need 5 different endpoints. Creates request waterfalls.</li>
<li><strong>Inconsistent response shapes:</strong> Different endpoints return errors differently.</li>
<li><strong>Versioning:</strong> API changes can break your frontend if not handled carefully.</li>
</ul>
<p>Mitigations: use a BFF (Backend-for-Frontend) to aggregate data, request only needed fields if the API supports sparse fieldsets, and always normalize API responses in your service layer.</p>

<h4>GraphQL from the Frontend Perspective</h4>
<p>GraphQL solves over/under-fetching by letting the frontend specify exactly what data it needs:</p>
<pre>query ProductPage($id: ID!) {
  product(id: $id) {
    name
    price
    images { url, alt }
    reviews(first: 5) {
      rating
      text
      author { name }
    }
  }
}</pre>
<p>Tradeoffs: more complex client setup (Apollo, urql), harder to cache at the HTTP level, can still have performance issues with deeply nested queries, requires backend investment.</p>

<h4>Backend-for-Frontend (BFF) Pattern</h4>
<p>A BFF is a lightweight server that sits between your frontend and your microservices. It:</p>
<ul>
<li>Aggregates multiple service calls into one frontend-friendly response</li>
<li>Transforms data into the shape the UI needs</li>
<li>Handles auth token management</li>
<li>Can be owned by the frontend team</li>
</ul>
<p>Use a BFF when: you have microservices, your frontend needs data from multiple sources per page, or you need to keep secrets off the client.</p>

<h4>Error Handling Strategy</h4>
<p>Good error handling is layered:</p>
<ul>
<li><strong>Network layer:</strong> Detect offline, timeout, DNS failures → show connectivity error</li>
<li><strong>HTTP layer:</strong> Handle 401 (redirect to login), 403 (show forbidden), 404 (show not found), 429 (back off), 500 (show generic error)</li>
<li><strong>Business logic layer:</strong> Handle validation errors, display field-specific messages</li>
<li><strong>UI layer:</strong> Toast notifications, inline errors, error boundaries for crashes</li>
</ul>

<h4>Pagination Patterns</h4>
<p>Two main approaches:</p>
<ul>
<li><strong>Offset-based:</strong> <code>?page=3&limit=20</code> — simple but can miss or duplicate items if data changes between pages</li>
<li><strong>Cursor-based:</strong> <code>?after=abc123&limit=20</code> — more reliable, required for infinite scroll, but can't jump to arbitrary pages</li>
</ul>
<p>For infinite scroll, cursor-based pagination with TanStack Query's useInfiniteQuery gives you automatic page management, deduplication, and background refetching.</p>

<h4>Request Cancellation</h4>
<p>Cancel requests when they're no longer needed (user navigates away, new search replaces old one):</p>
<pre>const controller = new AbortController();

fetch('/api/search?q=react', {
  signal: controller.signal
});

// User types again, cancel previous request
controller.abort();</pre>
<p>TanStack Query handles this automatically—when a component unmounts or query key changes, in-flight requests are cancelled.</p>

<h4>Type-Safe API Contracts</h4>
<p>Use TypeScript to create type-safe API layers:</p>
<ul>
<li>Generate types from OpenAPI/Swagger specs</li>
<li>Use tools like <code>openapi-typescript</code> or <code>graphql-codegen</code></li>
<li>Validate runtime responses with Zod schemas</li>
<li>Type your API client methods with generics</li>
</ul>
<div class="callout"><p><strong>Interview Tip:</strong> Always mention error handling and loading states when discussing API design. Candidates who only talk about the happy path miss a huge part of real-world frontend work.</p></div>`,

      diagram: `<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" fill="#e8eaf0" font-size="14" font-weight="bold">API Layer Architecture</text>
<rect x="180" y="40" width="240" height="45" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="300" y="67" text-anchor="middle" fill="#6c63ff" font-size="11" font-weight="bold">UI Components</text>
<line x1="300" y1="85" x2="300" y2="105" stroke="#353b55" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="180" y="105" width="240" height="45" fill="#1e2235" stroke="#4caf50" rx="6"/>
<text x="300" y="132" text-anchor="middle" fill="#4caf50" font-size="11" font-weight="bold">Hooks (useQuery, useMutation)</text>
<line x1="300" y1="150" x2="300" y2="170" stroke="#353b55" stroke-width="2"/>
<rect x="180" y="170" width="240" height="45" fill="#1e2235" stroke="#ff9800" rx="6"/>
<text x="300" y="197" text-anchor="middle" fill="#ff9800" font-size="11" font-weight="bold">Service Layer (transforms, validation)</text>
<line x1="300" y1="215" x2="300" y2="235" stroke="#353b55" stroke-width="2"/>
<rect x="180" y="235" width="240" height="45" fill="#1e2235" stroke="#f44336" rx="6"/>
<text x="300" y="262" text-anchor="middle" fill="#f44336" font-size="11" font-weight="bold">API Client (fetch, headers, errors)</text>
<line x1="300" y1="280" x2="300" y2="300" stroke="#353b55" stroke-width="2"/>
<text x="300" y="315" text-anchor="middle" fill="#a0a8c0" font-size="11">Backend / BFF</text>
<text x="80" y="67" text-anchor="middle" fill="#a0a8c0" font-size="9">Loading/Error UI</text>
<text x="80" y="132" text-anchor="middle" fill="#a0a8c0" font-size="9">Caching, Refetch</text>
<text x="80" y="197" text-anchor="middle" fill="#a0a8c0" font-size="9">Type Safety</text>
<text x="80" y="262" text-anchor="middle" fill="#a0a8c0" font-size="9">Auth, Retry</text>
</svg>`,

      tradeoffs: `<ul>
<li><strong>REST vs GraphQL:</strong> REST is simpler and leverages HTTP caching naturally. GraphQL gives flexible queries but adds client complexity and makes HTTP caching harder.</li>
<li><strong>BFF vs direct API calls:</strong> BFF adds a deployment and a network hop but provides aggregation and keeps secrets off the client.</li>
<li><strong>Fetch vs Axios:</strong> Fetch is native and lighter but lacks interceptors and automatic JSON parsing. Axios has more features but adds bundle size.</li>
<li><strong>Aggressive retry vs fail fast:</strong> Retries improve resilience for transient errors but can overwhelm a struggling backend. Use exponential backoff and only retry idempotent requests.</li>
</ul>`,

      mistakes: `<ul>
<li>Making fetch calls directly in components without a service layer</li>
<li>Not handling loading and error states for every API call</li>
<li>Ignoring request cancellation (causes "update unmounted component" bugs)</li>
<li>Not normalizing error responses from different endpoints</li>
<li>Retrying non-idempotent requests (POST, DELETE)</li>
<li>Hardcoding API URLs instead of using environment configuration</li>
<li>Not implementing request deduplication for identical concurrent requests</li>
</ul>`,

      interviewAngle: `<p>API layer design comes up in almost every frontend system design interview. Show that you think about:</p>
<ol>
<li><strong>Data fetching strategy:</strong> What data does each page need? Can we batch requests?</li>
<li><strong>Error resilience:</strong> What happens when the API is slow or down?</li>
<li><strong>Loading states:</strong> Skeleton screens vs spinners vs progressive loading</li>
<li><strong>Caching:</strong> What data can be cached? For how long?</li>
<li><strong>Type safety:</strong> How do we ensure the frontend stays in sync with API changes?</li>
</ol>`
    },
    exercise: {
      prompt: "Design the API layer for an analytics dashboard that displays: a chart of daily active users (30 days), top 10 pages by views, real-time active user count, and user segmentation breakdown. Consider that some data updates every minute, some hourly, and some daily. How would you handle caching, loading states, and errors for each widget independently?",
      hint: "Different widgets have different freshness requirements. Consider using different staleTime values for each query. Think about what happens when one widget fails—should the whole dashboard break?"
    },
    quiz: [
      {
        question: "What problem does the Backend-for-Frontend (BFF) pattern solve?",
        options: [
          "It makes the backend faster",
          "It aggregates multiple microservice calls into one frontend-optimized response",
          "It replaces the need for a database",
          "It eliminates the need for authentication"
        ],
        correct: 1
      },
      {
        question: "When should you use cursor-based pagination instead of offset-based?",
        options: [
          "When you need to jump to page 50 directly",
          "When the dataset is small enough to fit in memory",
          "When implementing infinite scroll with frequently changing data",
          "When the API only supports GET requests"
        ],
        correct: 2
      },
      {
        question: "What is the purpose of request cancellation with AbortController?",
        options: [
          "To speed up API response times",
          "To prevent processing outdated responses when a newer request replaces the old one",
          "To authenticate requests",
          "To compress request payloads"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 4,
    title: "Caching Strategies",
    description: "Browser cache, CDN, service workers, and cache invalidation patterns",
    icon: "💾",
    objectives: [
      "Understand the multi-layer caching stack",
      "Configure HTTP cache headers for frontend assets",
      "Implement client-side caching with service workers",
      "Design cache invalidation strategies",
      "Debug caching-related bugs"
    ],
    content: {
      overview: `<p>Caching is the single most impactful performance optimization for frontend applications. It operates at multiple layers—CDN, browser HTTP cache, service worker, in-memory application cache—and each layer has different tradeoffs around freshness vs speed.</p>
<p>The hard part of caching isn't caching itself; it's <strong>cache invalidation</strong>—knowing when cached data is stale and needs refreshing. As Phil Karlton famously said: "There are only two hard things in computer science: cache invalidation and naming things."</p>`,

      lesson: `<h4>The Caching Layers</h4>
<p>Frontend caching operates at multiple levels, from closest to the user to farthest:</p>
<ol>
<li><strong>In-memory cache (React Query, SWR):</strong> Data cached in JavaScript memory. Fastest access but lost on page refresh.</li>
<li><strong>Browser storage (localStorage, IndexedDB):</strong> Persists across sessions. Good for user preferences and offline data.</li>
<li><strong>Service Worker cache:</strong> Intercepts network requests. Enables offline support and custom caching strategies.</li>
<li><strong>HTTP cache (browser):</strong> Governed by Cache-Control headers. Zero-cost subsequent requests for cached assets.</li>
<li><strong>CDN cache:</strong> Geographically distributed. Reduces latency and server load.</li>
</ol>

<h4>HTTP Caching for Frontend Assets</h4>
<p>For static assets (JS, CSS, images), use content-hashing + immutable caching:</p>
<pre>// Build output: main.a3f2b1c.js
// HTTP header: Cache-Control: public, max-age=31536000, immutable

// HTML entry point (index.html):
// HTTP header: Cache-Control: no-cache
// (always revalidate to get latest asset references)</pre>
<p>This pattern means: the HTML always fetches fresh (checking for new deployments), but once it loads a hashed JS/CSS file, that file is cached forever because the hash guarantees the content hasn't changed.</p>

<h4>Stale-While-Revalidate Pattern</h4>
<p>This strategy serves cached data immediately while fetching fresh data in the background:</p>
<pre>// With React Query
useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
  staleTime: 60_000,      // Data is "fresh" for 1 minute
  cacheTime: 5 * 60_000,  // Keep in memory for 5 minutes
  // When stale: show cached data immediately,
  // refetch in background, update when new data arrives
});</pre>
<p>The user sees instant data (from cache) and gets automatic updates without explicit refresh. This is ideal for data that changes occasionally but doesn't need to be real-time.</p>

<h4>Service Worker Caching Strategies</h4>
<ul>
<li><strong>Cache First:</strong> Check cache, fall back to network. Best for static assets that rarely change.</li>
<li><strong>Network First:</strong> Try network, fall back to cache. Best for dynamic content where freshness matters.</li>
<li><strong>Stale While Revalidate:</strong> Serve from cache immediately, fetch update in background. Best balance of speed and freshness.</li>
<li><strong>Network Only:</strong> Always hit the network. For data that must never be stale (checkout, payments).</li>
<li><strong>Cache Only:</strong> Only serve from cache. For assets you precached during install.</li>
</ul>

<h4>Cache Invalidation Strategies</h4>
<p>The hardest problem. Common approaches:</p>
<ul>
<li><strong>Time-based expiry:</strong> Set max-age or staleTime. Simple but data may be stale until expiry.</li>
<li><strong>Event-based invalidation:</strong> After a mutation, invalidate related queries. Requires knowing the dependency graph.</li>
<li><strong>Version/ETag:</strong> Server returns a version tag; client asks "has this changed?" with conditional requests.</li>
<li><strong>Polling:</strong> Periodically refetch. Simple but wasteful if data doesn't change often.</li>
<li><strong>WebSocket/SSE push:</strong> Server notifies client of changes. Most responsive but requires infrastructure.</li>
</ul>

<h4>When Caching Causes Bugs</h4>
<p>Common caching bugs in frontend applications:</p>
<ul>
<li><strong>Showing stale data after mutation:</strong> User updates their profile but sees old data because the cache wasn't invalidated.</li>
<li><strong>Cache key mismatch:</strong> Two components fetch the same data with slightly different keys, creating duplicate/inconsistent caches.</li>
<li><strong>Old deployment assets:</strong> User's browser serves a cached JS bundle from a previous deployment that calls APIs that no longer exist.</li>
<li><strong>CDN serving old content:</strong> You deployed but the CDN hasn't purged its cache yet.</li>
</ul>
<div class="callout"><p><strong>Interview Tip:</strong> When discussing caching in an interview, always address invalidation. It's easy to say "I'd cache this" but the follow-up is always "how do you know when to invalidate it?" Have a clear answer.</p></div>`,

      diagram: `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" fill="#e8eaf0" font-size="14" font-weight="bold">Frontend Caching Layers</text>
<rect x="200" y="40" width="200" height="40" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="300" y="65" text-anchor="middle" fill="#6c63ff" font-size="11" font-weight="bold">In-Memory (React Query)</text>
<rect x="175" y="95" width="250" height="40" fill="#1e2235" stroke="#4caf50" rx="6"/>
<text x="300" y="120" text-anchor="middle" fill="#4caf50" font-size="11" font-weight="bold">Browser Storage (localStorage)</text>
<rect x="150" y="150" width="300" height="40" fill="#1e2235" stroke="#ff9800" rx="6"/>
<text x="300" y="175" text-anchor="middle" fill="#ff9800" font-size="11" font-weight="bold">Service Worker Cache</text>
<rect x="125" y="205" width="350" height="40" fill="#1e2235" stroke="#f44336" rx="6"/>
<text x="300" y="230" text-anchor="middle" fill="#f44336" font-size="11" font-weight="bold">HTTP Cache (Browser)</text>
<rect x="100" y="260" width="400" height="40" fill="#1e2235" stroke="#9c27b0" rx="6"/>
<text x="300" y="285" text-anchor="middle" fill="#9c27b0" font-size="11" font-weight="bold">CDN Cache (Edge)</text>
<text x="540" y="65" fill="#a0a8c0" font-size="9">~0ms (fastest)</text>
<text x="540" y="120" fill="#a0a8c0" font-size="9">~1ms</text>
<text x="540" y="175" fill="#a0a8c0" font-size="9">~2ms</text>
<text x="540" y="230" fill="#a0a8c0" font-size="9">~0ms (cached)</text>
<text x="540" y="285" fill="#a0a8c0" font-size="9">~20-50ms</text>
</svg>`,

      tradeoffs: `<ul>
<li><strong>Freshness vs speed:</strong> Longer cache times mean faster loads but more risk of stale data.</li>
<li><strong>Client cache vs server cache:</strong> Client caching reduces network requests; server/CDN caching reduces server load. Use both.</li>
<li><strong>Simple TTL vs smart invalidation:</strong> TTL is simple but imprecise. Event-driven invalidation is precise but complex to implement correctly.</li>
<li><strong>Offline-first vs online-first:</strong> Offline-first provides the best UX on poor networks but requires conflict resolution for writes.</li>
</ul>`,

      mistakes: `<ul>
<li>Caching data that changes frequently (real-time prices, stock levels) with long TTLs</li>
<li>Not invalidating cache after mutations</li>
<li>Using the same cache key for different data shapes</li>
<li>Forgetting to version-bust static assets on deployment</li>
<li>Caching authenticated/personalized data in shared CDN cache</li>
<li>Not handling the "stale cache after deployment" scenario</li>
</ul>`,

      interviewAngle: `<p>Caching questions test whether you understand the full stack of optimizations available. In an interview:</p>
<ol>
<li>Start by identifying what's cacheable and what's not</li>
<li>Assign appropriate cache layers and durations</li>
<li>Explain your invalidation strategy for each layer</li>
<li>Address edge cases: what happens during deployment? After a write? On poor networks?</li>
</ol>`
    },
    exercise: {
      prompt: "Design the caching strategy for a product detail page that shows: product info (changes rarely), price (changes hourly), stock availability (changes every minute), user reviews (changes when users submit), and related products (changes daily). For each data type, specify the caching layer, TTL, and invalidation strategy.",
      hint: "Different data types need different cache durations. Think about which data can tolerate staleness and which needs real-time accuracy."
    },
    quiz: [
      {
        question: "What is the stale-while-revalidate caching pattern?",
        options: [
          "Never serve cached data; always fetch fresh",
          "Serve cached data immediately while fetching fresh data in the background",
          "Only serve data from the CDN",
          "Cache data until the user manually refreshes"
        ],
        correct: 1
      },
      {
        question: "Why should HTML files use 'Cache-Control: no-cache' while JS/CSS use long max-age?",
        options: [
          "HTML is larger than JS/CSS files",
          "HTML references hashed asset filenames, so it must always be fresh to pick up new deployments",
          "Browsers can't cache HTML files",
          "CDNs don't support HTML caching"
        ],
        correct: 1
      },
      {
        question: "Which service worker caching strategy is best for an API that returns user-specific dashboard data?",
        options: [
          "Cache Only",
          "Cache First",
          "Network First with cache fallback",
          "Cache First with no expiry"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 5,
    title: "Rendering Models",
    description: "CSR, SSR, SSG, ISR, RSC — choosing the right rendering strategy",
    icon: "🖥️",
    objectives: [
      "Understand the spectrum of rendering approaches",
      "Choose rendering strategies based on content type and user needs",
      "Explain hydration and its performance implications",
      "Understand React Server Components architecture",
      "Make SEO-aware rendering decisions"
    ],
    content: {
      overview: `<p>Rendering strategy is one of the most consequential architectural decisions in frontend development. It determines your app's initial load performance, SEO capability, infrastructure requirements, and developer experience. The spectrum ranges from fully client-rendered SPAs to fully static sites, with many hybrid approaches in between.</p>
<p>Modern frameworks like Next.js, Remix, and Astro have made hybrid rendering practical—you can use different strategies for different pages within the same application. The skill is knowing which strategy fits which use case.</p>`,

      lesson: `<h4>Client-Side Rendering (CSR)</h4>
<p>The browser downloads a minimal HTML shell and a JavaScript bundle that renders the entire UI on the client.</p>
<ul>
<li><strong>Pros:</strong> Simple deployment (static files), rich interactivity, no server needed, good for authenticated apps</li>
<li><strong>Cons:</strong> Slow initial paint (blank screen while JS loads), poor SEO without workarounds, large JS bundles</li>
<li><strong>Best for:</strong> Internal dashboards, authenticated apps, highly interactive tools</li>
</ul>

<h4>Server-Side Rendering (SSR)</h4>
<p>The server renders HTML for each request. The browser shows content immediately, then JavaScript "hydrates" the page to make it interactive.</p>
<ul>
<li><strong>Pros:</strong> Fast first paint, good SEO, works without JS initially, personalized content</li>
<li><strong>Cons:</strong> Requires a server, TTFB depends on server speed, hydration cost, more complex deployment</li>
<li><strong>Best for:</strong> Content that's different per user, pages needing SEO + fresh data</li>
</ul>

<h4>Static Site Generation (SSG)</h4>
<p>Pages are rendered to HTML at build time. The CDN serves pre-built HTML files.</p>
<ul>
<li><strong>Pros:</strong> Fastest possible TTFB (CDN-served), no server runtime, trivial to scale, most secure</li>
<li><strong>Cons:</strong> Content is stale until next build, build times grow with page count, can't personalize without client JS</li>
<li><strong>Best for:</strong> Marketing pages, documentation, blogs, landing pages</li>
</ul>

<h4>Incremental Static Regeneration (ISR)</h4>
<p>Static pages that automatically regenerate after a specified time interval without rebuilding the entire site.</p>
<ul>
<li><strong>Pros:</strong> CDN speed with eventual freshness, no full rebuild needed, scales to millions of pages</li>
<li><strong>Cons:</strong> Some users see stale content (until regeneration), requires hosting that supports it, less predictable than SSG</li>
<li><strong>Best for:</strong> Product pages, news articles, any content that changes periodically</li>
</ul>

<h4>React Server Components (RSC)</h4>
<p>Components that run on the server and send rendered output (not source code) to the client. They never hydrate or run on the client.</p>
<ul>
<li><strong>Pros:</strong> Zero JS bundle for server components, direct database/API access, streaming, progressive rendering</li>
<li><strong>Cons:</strong> Can't use client-side features (useState, event handlers), new mental model, limited ecosystem support</li>
<li><strong>Best for:</strong> Data-heavy pages mixing static content with interactive islands</li>
</ul>

<h4>Hydration Deep Dive</h4>
<p>Hydration is the process where client-side JavaScript "takes over" server-rendered HTML to make it interactive. It's expensive because:</p>
<ul>
<li>The browser must download, parse, and execute the full component tree's JavaScript</li>
<li>React must reconcile the server HTML with its virtual DOM</li>
<li>Event handlers must be attached to existing DOM elements</li>
</ul>
<p>This creates a "uncanny valley" where the page looks interactive (content is visible) but isn't (buttons don't work yet). Solutions:</p>
<ul>
<li><strong>Selective hydration:</strong> Hydrate interactive parts first, defer non-critical parts</li>
<li><strong>Progressive hydration:</strong> Hydrate components as they enter the viewport</li>
<li><strong>Islands architecture:</strong> Only hydrate interactive "islands" in a sea of static HTML (Astro's approach)</li>
</ul>

<h4>Streaming SSR</h4>
<p>Instead of waiting for the entire page to render on the server before sending any HTML, streaming sends HTML in chunks as components finish rendering. Combined with Suspense boundaries, this means:</p>
<ul>
<li>The browser shows content progressively</li>
<li>Slow data fetches don't block the entire page</li>
<li>TTFB is near-instant regardless of data loading time</li>
</ul>

<h4>SEO Implications</h4>
<p>Search engines need HTML content to index. Impact by strategy:</p>
<ul>
<li><strong>CSR:</strong> Googlebot can execute JS but it's slower and less reliable. Other search engines may not index at all.</li>
<li><strong>SSR/SSG/ISR:</strong> Full HTML is available immediately. Best for SEO.</li>
<li><strong>RSC:</strong> Server-rendered HTML is sent. Good for SEO.</li>
</ul>
<div class="callout"><p><strong>Interview Tip:</strong> Don't say "I'd use SSR" without explaining why. Connect it to specific requirements: "The marketing pages need SEO so I'd use SSG. The dashboard is authenticated and dynamic so CSR is fine. The product pages need SEO but change hourly so I'd use ISR."</p></div>`,

      diagram: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" fill="#e8eaf0" font-size="14" font-weight="bold">Rendering Strategy Spectrum</text>
<line x1="50" y1="80" x2="550" y2="80" stroke="#353b55" stroke-width="2"/>
<circle cx="90" cy="80" r="8" fill="#6c63ff"/>
<text x="90" y="105" text-anchor="middle" fill="#6c63ff" font-size="10" font-weight="bold">SSG</text>
<text x="90" y="120" text-anchor="middle" fill="#a0a8c0" font-size="8">Build time</text>
<circle cx="210" cy="80" r="8" fill="#4caf50"/>
<text x="210" y="105" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">ISR</text>
<text x="210" y="120" text-anchor="middle" fill="#a0a8c0" font-size="8">Periodic</text>
<circle cx="340" cy="80" r="8" fill="#ff9800"/>
<text x="340" y="105" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="bold">SSR</text>
<text x="340" y="120" text-anchor="middle" fill="#a0a8c0" font-size="8">Per request</text>
<circle cx="460" cy="80" r="8" fill="#f44336"/>
<text x="460" y="105" text-anchor="middle" fill="#f44336" font-size="10" font-weight="bold">CSR</text>
<text x="460" y="120" text-anchor="middle" fill="#a0a8c0" font-size="8">Client</text>
<text x="50" y="60" fill="#a0a8c0" font-size="9">Static</text>
<text x="530" y="60" fill="#a0a8c0" font-size="9">Dynamic</text>
<rect x="40" y="150" width="250" height="110" fill="#1e2235" stroke="#353b55" rx="6"/>
<text x="165" y="175" text-anchor="middle" fill="#e8eaf0" font-size="10" font-weight="bold">Use SSG / ISR when:</text>
<text x="165" y="195" text-anchor="middle" fill="#a0a8c0" font-size="9">• Content is same for all users</text>
<text x="165" y="212" text-anchor="middle" fill="#a0a8c0" font-size="9">• SEO matters</text>
<text x="165" y="229" text-anchor="middle" fill="#a0a8c0" font-size="9">• Data changes infrequently</text>
<text x="165" y="246" text-anchor="middle" fill="#a0a8c0" font-size="9">• Maximum performance needed</text>
<rect x="310" y="150" width="250" height="110" fill="#1e2235" stroke="#353b55" rx="6"/>
<text x="435" y="175" text-anchor="middle" fill="#e8eaf0" font-size="10" font-weight="bold">Use SSR / CSR when:</text>
<text x="435" y="195" text-anchor="middle" fill="#a0a8c0" font-size="9">• Content is personalized</text>
<text x="435" y="212" text-anchor="middle" fill="#a0a8c0" font-size="9">• Real-time data needed</text>
<text x="435" y="229" text-anchor="middle" fill="#a0a8c0" font-size="9">• Heavy user interaction</text>
<text x="435" y="246" text-anchor="middle" fill="#a0a8c0" font-size="9">• Authenticated content</text>
</svg>`,

      tradeoffs: `<ul>
<li><strong>SSR vs CSR:</strong> SSR is faster to first paint and better for SEO, but requires server infrastructure. CSR is simpler to deploy but slower initial load.</li>
<li><strong>SSG vs ISR:</strong> SSG gives certainty (you know what's deployed) but rebuilds are slow. ISR is faster to publish but users might see stale content briefly.</li>
<li><strong>Full hydration vs partial:</strong> Full hydration is simpler but downloads all component JS. Partial/islands architecture is faster but requires framework support and more careful architecture.</li>
<li><strong>Streaming vs blocking SSR:</strong> Streaming gives faster TTFB but complicates error handling and requires streaming-capable infrastructure.</li>
</ul>`,

      mistakes: `<ul>
<li>Using SSR for everything when most pages could be static</li>
<li>Using CSR for public content that needs SEO</li>
<li>Not considering hydration cost in performance budgets</li>
<li>Assuming "SSR makes everything fast" without addressing bundle size</li>
<li>Building a static site that requires a full rebuild for every content change</li>
<li>Not handling the hydration mismatch between server and client renders</li>
</ul>`,

      interviewAngle: `<p>Rendering model questions are about demonstrating you can match the strategy to the use case. Strong answers:</p>
<ol>
<li>Acknowledge that different pages in the same app might use different strategies</li>
<li>Connect the choice to specific requirements (SEO, personalization, freshness)</li>
<li>Discuss the infrastructure implications of each choice</li>
<li>Mention hydration and its performance cost</li>
</ol>`
    },
    exercise: {
      prompt: "For an application that has: marketing landing pages, a product catalog with 100K products, user dashboards, an admin panel, a blog with 500 articles, and real-time notification feeds — choose a rendering strategy for each section and justify your choice. Consider SEO, performance, and infrastructure cost.",
      hint: "Marketing pages are a clear SSG case. Dashboards are CSR. But what about the product catalog with 100K pages? And the blog that gets new articles daily?"
    },
    quiz: [
      {
        question: "What is hydration in the context of SSR?",
        options: [
          "Converting CSS to inline styles",
          "Fetching data from the server to populate the page",
          "Client-side JavaScript attaching event handlers to server-rendered HTML",
          "Compressing HTML before sending to the client"
        ],
        correct: 2
      },
      {
        question: "Which rendering strategy requires NO server at runtime?",
        options: [
          "SSR",
          "CSR with Static Files",
          "ISR",
          "Streaming SSR"
        ],
        correct: 1
      },
      {
        question: "When should you choose ISR over SSG?",
        options: [
          "When you need real-time data",
          "When content updates periodically and you can't afford full rebuilds",
          "When SEO doesn't matter",
          "When you have fewer than 10 pages"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 6,
    title: "Performance Optimization",
    description: "Core Web Vitals, code splitting, lazy loading, and performance budgets",
    icon: "⚡",
    objectives: [
      "Measure and optimize Core Web Vitals",
      "Implement code splitting and lazy loading",
      "Identify and fix rendering bottlenecks",
      "Design performance budgets and monitoring",
      "Optimize images, fonts, and third-party scripts"
    ],
    content: {
      overview: `<p>Performance directly impacts business metrics. Google reports that a 1-second delay in mobile page load decreases conversions by 20%. Amazon found that every 100ms of latency costs 1% in revenue. Performance is not a nice-to-have; it's a product requirement.</p>
<p>Modern performance optimization is measured through Core Web Vitals: LCP (Largest Contentful Paint), INP (Interaction to Next Paint), and CLS (Cumulative Layout Shift). These metrics capture the user's real experience of loading, interactivity, and visual stability.</p>`,

      lesson: `<h4>Core Web Vitals</h4>
<ul>
<li><strong>LCP (Largest Contentful Paint):</strong> Time until the largest visible content element renders. Target: under 2.5s. Affected by: server response time, render-blocking resources, resource load time, client-side rendering.</li>
<li><strong>INP (Interaction to Next Paint):</strong> Time from user interaction to the next visual update. Target: under 200ms. Affected by: long JavaScript tasks, heavy rendering, excessive re-renders.</li>
<li><strong>CLS (Cumulative Layout Shift):</strong> How much the page layout shifts unexpectedly. Target: under 0.1. Caused by: images without dimensions, dynamically injected content, web fonts causing text reflow.</li>
</ul>

<h4>Bundle Size and Code Splitting</h4>
<p>Large JavaScript bundles are the #1 cause of slow load times on mobile. Code splitting breaks your bundle into smaller chunks loaded on demand:</p>
<pre>// Route-based splitting (most impactful)
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

// Component-based splitting
const HeavyChart = lazy(() => import('./components/Chart'));

// Conditional splitting
const AdminPanel = lazy(() => {
  if (user.isAdmin) return import('./pages/Admin');
});</pre>
<p>Route-based splitting gives the biggest wins because each page only loads its own code. A user visiting the homepage never downloads the settings page bundle.</p>

<h4>Lazy Loading</h4>
<p>Defer loading resources until they're needed:</p>
<ul>
<li><strong>Images:</strong> Use loading="lazy" or Intersection Observer</li>
<li><strong>Components:</strong> React.lazy + Suspense for below-the-fold content</li>
<li><strong>Third-party scripts:</strong> Load analytics and chat widgets after the page is interactive</li>
<li><strong>Data:</strong> Don't prefetch data the user hasn't requested yet</li>
</ul>

<h4>Avoiding Unnecessary Re-renders</h4>
<p>React re-renders are often the cause of poor INP. Common patterns:</p>
<pre>// Problem: new object reference every render
&lt;Child style={{ color: 'red' }} /&gt;

// Fix: memoize or hoist
const style = useMemo(() => ({ color: 'red' }), []);

// Problem: context change re-renders all consumers
// Fix: split context by update frequency
const ThemeContext = createContext(); // rarely changes
const UserDataContext = createContext(); // changes often

// Problem: large list re-renders entirely
// Fix: virtualize with react-window or tanstack-virtual</pre>

<h4>Network Waterfalls</h4>
<p>A "waterfall" happens when resources load sequentially instead of in parallel:</p>
<ul>
<li><strong>Problem:</strong> Component mounts → fetches data → renders child → child fetches more data → renders grandchild...</li>
<li><strong>Solution 1:</strong> Hoist data fetching to the route level (Remix/Next.js loaders)</li>
<li><strong>Solution 2:</strong> Prefetch data before navigation</li>
<li><strong>Solution 3:</strong> Use parallel data fetching in parent components</li>
</ul>

<h4>Image Optimization</h4>
<ul>
<li>Use modern formats: WebP (30% smaller than JPEG), AVIF (50% smaller)</li>
<li>Serve responsive sizes with srcset</li>
<li>Use CDN image transformation for on-demand resizing</li>
<li>Always set width/height or aspect-ratio to prevent CLS</li>
<li>Lazy load below-fold images, eagerly load above-fold LCP image</li>
</ul>

<h4>Performance Budgets</h4>
<p>Set concrete limits and enforce them in CI:</p>
<ul>
<li>Main bundle: &lt; 100KB gzipped</li>
<li>Total page JS: &lt; 300KB gzipped</li>
<li>LCP: &lt; 2.5s on 4G</li>
<li>INP: &lt; 200ms</li>
<li>Time to Interactive: &lt; 5s on mid-range mobile</li>
</ul>
<p>Use tools: Lighthouse CI, bundlesize, webpack-bundle-analyzer, Chrome DevTools Performance panel.</p>

<h4>Prefetching and Preloading</h4>
<pre>&lt;!-- Preload critical resources --&gt;
&lt;link rel="preload" href="/fonts/main.woff2" as="font"&gt;
&lt;link rel="preload" href="/hero.webp" as="image"&gt;

&lt;!-- Prefetch next likely navigation --&gt;
&lt;link rel="prefetch" href="/dashboard.js"&gt;

&lt;!-- DNS prefetch for third-party domains --&gt;
&lt;link rel="dns-prefetch" href="//api.example.com"&gt;</pre>
<div class="callout"><p><strong>Interview Tip:</strong> When asked to "optimize performance," don't jump to micro-optimizations. Start with measurement ("First I'd profile with DevTools and identify the biggest bottleneck"), then address the highest-impact issues first (usually bundle size, images, and network waterfalls).</p></div>`,

      diagram: `<svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" fill="#e8eaf0" font-size="14" font-weight="bold">Page Load Timeline</text>
<line x1="50" y1="70" x2="550" y2="70" stroke="#353b55" stroke-width="2"/>
<rect x="50" y="55" width="80" height="30" fill="#f44336" rx="4" opacity="0.8"/>
<text x="90" y="75" text-anchor="middle" fill="white" font-size="9">TTFB</text>
<rect x="130" y="55" width="120" height="30" fill="#ff9800" rx="4" opacity="0.8"/>
<text x="190" y="75" text-anchor="middle" fill="white" font-size="9">FCP</text>
<rect x="250" y="55" width="150" height="30" fill="#4caf50" rx="4" opacity="0.8"/>
<text x="325" y="75" text-anchor="middle" fill="white" font-size="9">LCP</text>
<rect x="400" y="55" width="100" height="30" fill="#6c63ff" rx="4" opacity="0.8"/>
<text x="450" y="75" text-anchor="middle" fill="white" font-size="9">TTI</text>
<text x="300" y="120" text-anchor="middle" fill="#e8eaf0" font-size="12" font-weight="bold">Optimization Targets</text>
<rect x="40" y="135" width="160" height="100" fill="#1e2235" stroke="#f44336" rx="6"/>
<text x="120" y="157" text-anchor="middle" fill="#f44336" font-size="10" font-weight="bold">Reduce TTFB</text>
<text x="120" y="175" text-anchor="middle" fill="#a0a8c0" font-size="9">CDN, Edge, Caching</text>
<text x="120" y="192" text-anchor="middle" fill="#a0a8c0" font-size="9">Streaming SSR</text>
<text x="120" y="209" text-anchor="middle" fill="#a0a8c0" font-size="9">Preconnect</text>
<rect x="220" y="135" width="160" height="100" fill="#1e2235" stroke="#4caf50" rx="6"/>
<text x="300" y="157" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">Improve LCP</text>
<text x="300" y="175" text-anchor="middle" fill="#a0a8c0" font-size="9">Preload hero image</text>
<text x="300" y="192" text-anchor="middle" fill="#a0a8c0" font-size="9">Minimize blocking CSS</text>
<text x="300" y="209" text-anchor="middle" fill="#a0a8c0" font-size="9">Optimize fonts</text>
<rect x="400" y="135" width="160" height="100" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="480" y="157" text-anchor="middle" fill="#6c63ff" font-size="10" font-weight="bold">Lower INP</text>
<text x="480" y="175" text-anchor="middle" fill="#a0a8c0" font-size="9">Code splitting</text>
<text x="480" y="192" text-anchor="middle" fill="#a0a8c0" font-size="9">Avoid long tasks</text>
<text x="480" y="209" text-anchor="middle" fill="#a0a8c0" font-size="9">Virtualization</text>
</svg>`,

      tradeoffs: `<ul>
<li><strong>Code splitting granularity:</strong> Too coarse = large bundles. Too fine = too many network requests and lost compression benefits.</li>
<li><strong>Lazy loading vs prefetching:</strong> Lazy loading reduces initial bundle but causes loading delays later. Prefetching during idle time gives the best of both.</li>
<li><strong>Memoization overhead:</strong> useMemo/useCallback have a memory cost. Only memoize when the computation or re-render is actually expensive.</li>
<li><strong>Third-party scripts:</strong> Analytics, chat widgets, and A/B testing tools add significant JS but often provide business value. Defer them but don't remove them without business context.</li>
</ul>`,

      mistakes: `<ul>
<li>Optimizing without measuring first (premature optimization)</li>
<li>Memoizing everything including cheap operations</li>
<li>Loading all fonts upfront instead of using font-display: swap</li>
<li>Not setting image dimensions, causing layout shifts</li>
<li>Blocking the main thread with synchronous operations</li>
<li>Ignoring mobile performance (testing only on fast desktop)</li>
<li>Not lazy loading below-fold content and images</li>
</ul>`,

      interviewAngle: `<p>Performance questions are common. Structure your answer:</p>
<ol>
<li><strong>Measure:</strong> "I'd start by profiling with Lighthouse and identifying the biggest bottleneck."</li>
<li><strong>Prioritize:</strong> "The highest impact optimizations are usually bundle size, images, and network waterfalls."</li>
<li><strong>Implement:</strong> Discuss specific techniques relevant to the scenario.</li>
<li><strong>Monitor:</strong> "I'd set up RUM (Real User Monitoring) to track Core Web Vitals in production."</li>
</ol>`
    },
    exercise: {
      prompt: "You're given a slow analytics dashboard. Users report it takes 8 seconds to load and interactions feel laggy. The dashboard shows 6 chart widgets, each fetching its own data. The main bundle is 2.4MB. There are 12 third-party scripts loaded in the head. Propose a comprehensive optimization plan with priorities.",
      hint: "Start with the biggest wins: bundle size (code split), loading strategy (parallel data fetching, lazy charts), third-party scripts (defer/async). Think about what the user sees first and optimize for that."
    },
    quiz: [
      {
        question: "What does LCP (Largest Contentful Paint) measure?",
        options: [
          "The time until all JavaScript has executed",
          "The time until the largest visible content element finishes rendering",
          "The total size of the page in bytes",
          "The number of DOM elements on the page"
        ],
        correct: 1
      },
      {
        question: "Which optimization has the biggest impact on initial load time for most SPAs?",
        options: [
          "Adding useMemo to all components",
          "Route-based code splitting",
          "Using CSS-in-JS instead of CSS files",
          "Minifying HTML comments"
        ],
        correct: 1
      },
      {
        question: "What causes Cumulative Layout Shift (CLS)?",
        options: [
          "Slow JavaScript execution",
          "Large bundle sizes",
          "Elements changing size or position after initial render (e.g., images without dimensions)",
          "Too many API calls"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 7,
    title: "Authentication & Security",
    description: "Login flows, token management, XSS, CSRF, and protected routes",
    icon: "🔐",
    objectives: [
      "Implement secure authentication flows",
      "Choose between cookies and tokens for auth storage",
      "Protect against XSS and CSRF attacks",
      "Design role-based access control for frontend",
      "Understand frontend security limitations"
    ],
    content: {
      overview: `<p>Authentication and security in frontend applications is a balancing act. The frontend cannot be fully trusted—any code running in the browser can be inspected, modified, and replayed by users. Yet the frontend is responsible for the user's login experience, protecting tokens, and enforcing access control in the UI layer.</p>
<p>The key principle is: <strong>the frontend enforces security for UX, the backend enforces it for real</strong>. Frontend route guards and role checks prevent confusion; backend authorization prevents actual unauthorized access.</p>`,

      lesson: `<h4>Authentication Flows</h4>
<p>Modern web authentication typically uses one of these flows:</p>
<ul>
<li><strong>Session-based (cookies):</strong> Server creates a session, sets a HttpOnly cookie. Browser sends cookie with every request automatically. Simplest and most secure for traditional web apps.</li>
<li><strong>Token-based (JWT):</strong> Server issues a signed token. Frontend stores it and sends it in Authorization header. Works for SPAs and mobile apps that call APIs directly.</li>
<li><strong>OAuth 2.0 / OIDC:</strong> Delegates authentication to a third party (Google, GitHub). User is redirected to the provider, then back with a code. Backend exchanges code for tokens.</li>
</ul>

<h4>Token Storage Options</h4>
<ul>
<li><strong>HttpOnly cookie:</strong> Most secure. Not accessible via JavaScript, automatically included in requests, protected from XSS. Server sets it.</li>
<li><strong>localStorage:</strong> Persists across sessions. Vulnerable to XSS (any script can read it). Avoid for sensitive tokens.</li>
<li><strong>sessionStorage:</strong> Cleared when tab closes. Same XSS vulnerability as localStorage.</li>
<li><strong>In-memory (variable):</strong> Lost on refresh but immune to XSS. Can be combined with a refresh token in HttpOnly cookie.</li>
</ul>
<div class="callout"><p><strong>Best practice:</strong> Use HttpOnly cookies for session tokens when possible. If you must use JWTs on the client (e.g., for a pure SPA calling a separate API), keep access tokens short-lived (15 min) and use a refresh token in an HttpOnly cookie to get new ones.</p></div>

<h4>XSS (Cross-Site Scripting)</h4>
<p>XSS allows attackers to inject malicious scripts into your page. Types:</p>
<ul>
<li><strong>Stored XSS:</strong> Attacker saves malicious content to the database (e.g., a comment with a script tag). Every user who views it gets attacked.</li>
<li><strong>Reflected XSS:</strong> Malicious payload in a URL parameter is reflected in the page without sanitization.</li>
<li><strong>DOM-based XSS:</strong> Client-side code inserts untrusted data into the DOM unsafely (innerHTML, dangerouslySetInnerHTML).</li>
</ul>
<p>Prevention:</p>
<ul>
<li>Never use innerHTML or dangerouslySetInnerHTML with user data</li>
<li>React auto-escapes by default—don't bypass it</li>
<li>Use Content Security Policy (CSP) headers</li>
<li>Sanitize user input with libraries like DOMPurify</li>
<li>Use HttpOnly cookies so stolen XSS can't access tokens</li>
</ul>

<h4>CSRF (Cross-Site Request Forgery)</h4>
<p>CSRF tricks a user's browser into making unwanted requests to a site where they're authenticated. Example: user is logged into their bank. They visit a malicious site that has a hidden form posting to the bank's transfer endpoint.</p>
<p>Prevention:</p>
<ul>
<li><strong>CSRF tokens:</strong> Server generates a unique token per session/request. Frontend includes it in forms/headers.</li>
<li><strong>SameSite cookies:</strong> Set SameSite=Strict or Lax to prevent cookies from being sent on cross-origin requests.</li>
<li><strong>Check Origin/Referer headers:</strong> Server rejects requests from unexpected origins.</li>
</ul>

<h4>CORS (Cross-Origin Resource Sharing)</h4>
<p>CORS is a browser security feature that restricts which domains can make requests to your API. The server must explicitly allow origins:</p>
<pre>// Server response headers
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Allow-Credentials: true</pre>
<p>Common frontend CORS issues: developing on localhost (different port = different origin), forgetting credentials: 'include' for cookie-based auth, preflight requests failing.</p>

<h4>Protected Routes</h4>
<pre>// Route guard pattern
function ProtectedRoute({ children, requiredRole }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return &lt;LoadingSpinner /&gt;;
  if (!user) return &lt;Navigate to="/login" /&gt;;
  if (requiredRole && !user.roles.includes(requiredRole)) {
    return &lt;Navigate to="/unauthorized" /&gt;;
  }

  return children;
}</pre>
<p>Remember: route guards are a UX feature, not a security feature. The backend must verify authorization for every API request regardless of what the frontend shows.</p>

<h4>Role-Based Access Control (RBAC)</h4>
<p>Frontend RBAC involves:</p>
<ul>
<li>Hiding UI elements the user can't use (menus, buttons, pages)</li>
<li>Disabling actions the user isn't authorized for</li>
<li>Showing appropriate error messages for unauthorized attempts</li>
<li>Not relying on hidden UI as security (users can call APIs directly)</li>
</ul>
<div class="callout"><p><strong>Interview Tip:</strong> Always distinguish between frontend and backend security responsibilities. "The frontend hides the admin panel from non-admin users for UX, but the backend's API middleware rejects any request from non-admins regardless. The frontend is defense-in-depth, not the security boundary."</p></div>`,

      diagram: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" fill="#e8eaf0" font-size="14" font-weight="bold">Authentication Flow (Cookie-based)</text>
<rect x="40" y="50" width="120" height="40" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="100" y="75" text-anchor="middle" fill="#6c63ff" font-size="10" font-weight="bold">Browser</text>
<rect x="240" y="50" width="120" height="40" fill="#1e2235" stroke="#4caf50" rx="6"/>
<text x="300" y="75" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">Server</text>
<rect x="440" y="50" width="120" height="40" fill="#1e2235" stroke="#ff9800" rx="6"/>
<text x="500" y="75" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="bold">Database</text>
<line x1="160" y1="120" x2="240" y2="120" stroke="#6c63ff" stroke-width="1.5" marker-end="url(#arrow)"/>
<text x="200" y="112" text-anchor="middle" fill="#a0a8c0" font-size="8">1. POST /login</text>
<line x1="360" y1="140" x2="440" y2="140" stroke="#4caf50" stroke-width="1.5"/>
<text x="400" y="135" text-anchor="middle" fill="#a0a8c0" font-size="8">2. Verify credentials</text>
<line x1="440" y1="160" x2="360" y2="160" stroke="#ff9800" stroke-width="1.5"/>
<text x="400" y="175" text-anchor="middle" fill="#a0a8c0" font-size="8">3. User valid</text>
<line x1="240" y1="190" x2="160" y2="190" stroke="#4caf50" stroke-width="1.5"/>
<text x="200" y="185" text-anchor="middle" fill="#a0a8c0" font-size="8">4. Set-Cookie: session=abc (HttpOnly)</text>
<line x1="160" y1="220" x2="240" y2="220" stroke="#6c63ff" stroke-width="1.5"/>
<text x="200" y="215" text-anchor="middle" fill="#a0a8c0" font-size="8">5. GET /api/data (Cookie: session=abc)</text>
<line x1="240" y1="250" x2="160" y2="250" stroke="#4caf50" stroke-width="1.5"/>
<text x="200" y="245" text-anchor="middle" fill="#a0a8c0" font-size="8">6. Authenticated response</text>
</svg>`,

      tradeoffs: `<ul>
<li><strong>Cookies vs JWTs:</strong> Cookies are simpler and more secure (HttpOnly). JWTs are stateless and work for cross-domain APIs but require careful storage.</li>
<li><strong>Short vs long token lifetime:</strong> Short tokens reduce damage from theft but require frequent refresh. Long tokens are convenient but dangerous if stolen.</li>
<li><strong>Strict CSP vs developer experience:</strong> Strict Content Security Policy blocks inline scripts and styles, which breaks many libraries and patterns. Balance security with practicality.</li>
<li><strong>Frontend route guards vs server-only auth:</strong> Route guards provide good UX (instant redirect) but add complexity. The backend must always be the real security boundary.</li>
</ul>`,

      mistakes: `<ul>
<li>Storing JWTs in localStorage (vulnerable to XSS)</li>
<li>Relying on frontend route guards as the sole security mechanism</li>
<li>Not validating tokens on every API request server-side</li>
<li>Using dangerouslySetInnerHTML with user-generated content</li>
<li>Forgetting SameSite cookie attributes (CSRF vulnerability)</li>
<li>Not implementing token refresh logic (users get logged out unexpectedly)</li>
<li>Exposing sensitive data in client-side code or Redux store</li>
</ul>`,

      interviewAngle: `<p>Security questions test defensive thinking. Show you understand:</p>
<ol>
<li>The frontend is an untrusted environment</li>
<li>Defense in depth: multiple layers of protection</li>
<li>Common attack vectors (XSS, CSRF) and their mitigations</li>
<li>The difference between UX security (hiding buttons) and real security (backend validation)</li>
</ol>`
    },
    exercise: {
      prompt: "Design the authentication and authorization system for a SaaS dashboard with three roles: Admin (full access), Manager (can view and edit team data), and Viewer (read-only). Include: login flow, token storage strategy, route protection, API authorization, and how you'd handle role changes in real-time.",
      hint: "Think about what happens when a manager is demoted to viewer while they're using the app. How does the frontend learn about the role change? What about the tokens they already have?"
    },
    quiz: [
      {
        question: "Why is HttpOnly cookie recommended over localStorage for auth token storage?",
        options: [
          "Cookies are faster to read than localStorage",
          "HttpOnly cookies cannot be accessed by JavaScript, protecting against XSS token theft",
          "localStorage doesn't work in all browsers",
          "Cookies have more storage space"
        ],
        correct: 1
      },
      {
        question: "What is the frontend's role in access control?",
        options: [
          "The frontend is the primary security boundary",
          "The frontend should never check permissions",
          "The frontend enforces access for UX, while the backend is the real security boundary",
          "Role checks should only happen on the backend, never the frontend"
        ],
        correct: 2
      },
      {
        question: "How does SameSite=Strict cookie attribute help prevent CSRF?",
        options: [
          "It encrypts the cookie value",
          "It prevents the cookie from being sent with cross-origin requests",
          "It makes the cookie expire faster",
          "It blocks JavaScript from reading the cookie"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 8,
    title: "Design Systems",
    description: "Component libraries, design tokens, theming, accessibility, and governance",
    icon: "🎨",
    objectives: [
      "Design a scalable component library architecture",
      "Implement design tokens for consistency",
      "Build accessible components by default",
      "Plan versioning and governance for multi-team adoption",
      "Balance flexibility with consistency"
    ],
    content: {
      overview: `<p>A design system is a collection of reusable components, patterns, and guidelines that ensure visual and behavioral consistency across an organization's products. It's both a technical artifact (component library) and a organizational process (governance, documentation, adoption).</p>
<p>For frontend engineers, the design system is infrastructure. Done well, it accelerates development, enforces accessibility, and provides a consistent user experience. Done poorly, it becomes a bottleneck that teams route around.</p>`,

      lesson: `<h4>Component Library Architecture</h4>
<p>A well-structured component library has clear layers:</p>
<ul>
<li><strong>Primitives:</strong> Basic building blocks—Box, Text, Stack, Grid. Handle layout and spacing. Unstyled or minimally styled.</li>
<li><strong>Atoms:</strong> Small, single-purpose components—Button, Input, Badge, Avatar, Icon.</li>
<li><strong>Molecules:</strong> Compositions of atoms—SearchBar (Input + Button), FormField (Label + Input + ErrorMessage).</li>
<li><strong>Organisms:</strong> Complex, opinionated components—DataTable, Modal, NavigationMenu, Sidebar.</li>
</ul>
<pre>@company/design-system/
├── tokens/          (colors, spacing, typography)
├── primitives/      (Box, Stack, Text)
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Input/
│   ├── Modal/
│   └── ...
├── hooks/           (useDisclosure, useFocusTrap)
├── utils/           (cn, mergeRefs)
└── themes/          (light, dark, brand variants)</pre>

<h4>Design Tokens</h4>
<p>Design tokens are the single source of truth for design decisions, expressed as platform-agnostic values:</p>
<pre>// tokens.ts
export const tokens = {
  color: {
    primary: { 50: '#eff6ff', 500: '#3b82f6', 900: '#1e3a5f' },
    neutral: { 50: '#f8fafc', 500: '#64748b', 900: '#0f172a' },
    semantic: {
      success: '#22c55e',
      error: '#ef4444',
      warning: '#f59e0b',
    }
  },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  radius: { sm: '4px', md: '8px', lg: '12px', full: '9999px' },
  typography: {
    heading: { fontFamily: 'Inter', fontWeight: 700 },
    body: { fontFamily: 'Inter', fontWeight: 400, lineHeight: 1.6 },
  }
};</pre>
<p>Tokens decouple design decisions from implementation. A designer changes a token value; every component updates automatically.</p>

<h4>Theming</h4>
<p>Support multiple themes (light/dark, brand variants) by mapping semantic tokens to theme values:</p>
<pre>// Semantic token mapping
const lightTheme = {
  bg: { surface: tokens.color.neutral[50], elevated: '#ffffff' },
  text: { primary: tokens.color.neutral[900], secondary: tokens.color.neutral[500] },
  border: { default: tokens.color.neutral[200] },
};

const darkTheme = {
  bg: { surface: tokens.color.neutral[900], elevated: tokens.color.neutral[800] },
  text: { primary: tokens.color.neutral[50], secondary: tokens.color.neutral[400] },
  border: { default: tokens.color.neutral[700] },
};</pre>

<h4>Accessibility (a11y)</h4>
<p>Design systems should make accessibility the default, not an afterthought:</p>
<ul>
<li><strong>Color contrast:</strong> All text must meet WCAG AA (4.5:1 ratio). Enforce via tokens.</li>
<li><strong>Keyboard navigation:</strong> All interactive components must be keyboard-accessible. Proper focus management.</li>
<li><strong>ARIA attributes:</strong> Components should set correct roles, labels, and states automatically.</li>
<li><strong>Focus trap:</strong> Modals and dialogs must trap focus within them.</li>
<li><strong>Screen reader support:</strong> Announce dynamic content changes with aria-live regions.</li>
</ul>

<h4>Versioning and Breaking Changes</h4>
<p>Use semantic versioning and communicate changes clearly:</p>
<ul>
<li><strong>Patch (1.0.x):</strong> Bug fixes, no API changes</li>
<li><strong>Minor (1.x.0):</strong> New components, new props, backward compatible</li>
<li><strong>Major (x.0.0):</strong> Breaking changes (renamed props, removed components)</li>
</ul>
<p>Provide codemods for breaking changes so consuming teams can auto-migrate.</p>

<h4>Governance</h4>
<p>Who decides what goes into the design system?</p>
<ul>
<li><strong>Contribution model:</strong> Any team can propose components. Design system team reviews and approves.</li>
<li><strong>Criteria for inclusion:</strong> Must be needed by 3+ teams, follows design guidelines, fully accessible, documented.</li>
<li><strong>Avoiding bloat:</strong> Not every component belongs in the design system. Team-specific components stay in team repos.</li>
<li><strong>Documentation:</strong> Every component needs: props API, usage examples, do/don't guidance, accessibility notes.</li>
</ul>
<div class="callout"><p><strong>Interview Tip:</strong> When discussing design systems, address the organizational challenge, not just the technical one. "The hardest part of a design system isn't building the components—it's getting 10 teams to actually adopt it and contribute back."</p></div>`,

      diagram: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" fill="#e8eaf0" font-size="14" font-weight="bold">Design System Architecture</text>
<rect x="50" y="50" width="500" height="45" fill="#1e2235" stroke="#9c27b0" rx="6"/>
<text x="300" y="78" text-anchor="middle" fill="#9c27b0" font-size="11" font-weight="bold">Design Tokens (colors, spacing, typography, motion)</text>
<rect x="50" y="110" width="240" height="45" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="170" y="138" text-anchor="middle" fill="#6c63ff" font-size="11" font-weight="bold">Primitives (Box, Stack, Text)</text>
<rect x="310" y="110" width="240" height="45" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="430" y="138" text-anchor="middle" fill="#6c63ff" font-size="11" font-weight="bold">Icons + Assets</text>
<rect x="50" y="170" width="155" height="45" fill="#1e2235" stroke="#4caf50" rx="6"/>
<text x="127" y="198" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">Atoms</text>
<rect x="220" y="170" width="155" height="45" fill="#1e2235" stroke="#ff9800" rx="6"/>
<text x="297" y="198" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="bold">Molecules</text>
<rect x="395" y="170" width="155" height="45" fill="#1e2235" stroke="#f44336" rx="6"/>
<text x="472" y="198" text-anchor="middle" fill="#f44336" font-size="10" font-weight="bold">Organisms</text>
<rect x="50" y="235" width="500" height="35" fill="#1e2235" stroke="#353b55" rx="6"/>
<text x="300" y="257" text-anchor="middle" fill="#a0a8c0" font-size="10">Documentation + Storybook + Governance</text>
</svg>`,

      tradeoffs: `<ul>
<li><strong>Rigid vs flexible components:</strong> Rigid components ensure consistency but frustrate teams with edge cases. Flexible components (with slots/composition) enable customization but risk inconsistency.</li>
<li><strong>Centralized vs federated:</strong> A dedicated design system team ensures quality but creates a bottleneck. Federated contributions scale better but risk inconsistency.</li>
<li><strong>Headless vs styled:</strong> Headless components (logic + a11y, no styles) give full design freedom but require more work to use. Pre-styled components are faster to adopt but harder to customize.</li>
<li><strong>Mono-package vs multi-package:</strong> One package is simpler to manage. Multiple packages (per component) enable teams to only install what they need and reduces version conflicts.</li>
</ul>`,

      mistakes: `<ul>
<li>Building a design system before understanding actual product needs (premature abstraction)</li>
<li>Making components too opinionated for edge cases</li>
<li>Neglecting accessibility until after the system is widely adopted</li>
<li>Not documenting usage patterns and guidelines alongside components</li>
<li>Ignoring the adoption and migration experience for consuming teams</li>
<li>Treating the design system as "done" instead of a continuously evolving product</li>
</ul>`,

      interviewAngle: `<p>Design system questions test your ability to think about reusable abstractions and cross-team collaboration:</p>
<ol>
<li>How would you decide what belongs in the system vs stays team-specific?</li>
<li>How do you handle breaking changes with 20 consuming teams?</li>
<li>How do you balance consistency with team-specific needs?</li>
<li>How do you ensure accessibility across all components?</li>
</ol>`
    },
    exercise: {
      prompt: "Design a Button component and a Modal component for a company-wide design system. Specify: the props API, variants/sizes, accessibility requirements, keyboard interactions, theming approach, and how you'd handle edge cases (loading state for buttons, nested modals, long content in modals).",
      hint: "Think about composition: should Modal have built-in header/body/footer or use slots? How does the button communicate loading state to screen readers?"
    },
    quiz: [
      {
        question: "What are design tokens?",
        options: [
          "Authentication tokens for accessing the design system API",
          "Platform-agnostic values representing design decisions (colors, spacing, typography)",
          "React components that generate CSS",
          "Figma plugins that export to code"
        ],
        correct: 1
      },
      {
        question: "When should a component be added to a shared design system?",
        options: [
          "As soon as one team needs it",
          "When 3+ teams need it and it's generic enough to reuse",
          "Only after the product is fully launched",
          "Never; teams should always build their own components"
        ],
        correct: 1
      },
      {
        question: "What is the primary benefit of a headless component library?",
        options: [
          "It loads faster because there's no CSS",
          "It provides behavior and accessibility without imposing visual styles",
          "It doesn't require React or any framework",
          "It works without JavaScript enabled"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 9,
    title: "Real-Time Applications",
    description: "WebSockets, SSE, polling, presence, and offline handling",
    icon: "📡",
    objectives: [
      "Choose the right real-time technology for each use case",
      "Design optimistic UI for instant-feeling interactions",
      "Handle offline/reconnection gracefully",
      "Implement presence and collaborative features",
      "Manage real-time data consistency"
    ],
    content: {
      overview: `<p>Real-time features are increasingly expected in modern applications: live chat, notifications, collaborative editing, live dashboards, and presence indicators. Each has different latency requirements, and the right technology choice depends on the specific use case.</p>
<p>The spectrum ranges from polling (simplest, highest latency) to WebSockets (most complex, lowest latency). Understanding when each approach is appropriate separates pragmatic engineers from those who over-engineer or under-deliver.</p>`,

      lesson: `<h4>Polling</h4>
<p>The simplest real-time approximation. The client periodically asks the server for updates:</p>
<pre>// Simple polling every 30 seconds
setInterval(async () => {
  const data = await fetch('/api/notifications');
  updateUI(data);
}, 30000);</pre>
<ul>
<li><strong>Pros:</strong> Simple, works everywhere, no special infrastructure, easy to implement</li>
<li><strong>Cons:</strong> High latency, wasteful when nothing changes, doesn't scale well with many clients</li>
<li><strong>Best for:</strong> Low-frequency updates (email inbox, order status), when simplicity trumps immediacy</li>
</ul>

<h4>Long Polling</h4>
<p>Client makes a request; server holds it open until new data is available, then responds. Client immediately makes another request.</p>
<ul>
<li><strong>Pros:</strong> Lower latency than polling, server only responds when data changes, wider infrastructure support than WebSockets</li>
<li><strong>Cons:</strong> Still creates many connections, server must handle many held connections, HTTP overhead per message</li>
<li><strong>Best for:</strong> Chat applications where WebSocket infrastructure isn't available</li>
</ul>

<h4>Server-Sent Events (SSE)</h4>
<p>A persistent one-way connection from server to client. Server pushes events; client listens:</p>
<pre>const source = new EventSource('/api/events');

source.addEventListener('notification', (event) => {
  const data = JSON.parse(event.data);
  showNotification(data);
});

source.addEventListener('update', (event) => {
  updateDashboard(JSON.parse(event.data));
});</pre>
<ul>
<li><strong>Pros:</strong> Simple API, automatic reconnection, works through proxies/firewalls, built-in event types</li>
<li><strong>Cons:</strong> One-way only (server to client), limited to 6 connections per domain in HTTP/1.1, text-only</li>
<li><strong>Best for:</strong> Notifications, live feeds, dashboards, any server-push scenario</li>
</ul>

<h4>WebSockets</h4>
<p>Full-duplex, bidirectional communication over a persistent connection:</p>
<pre>const ws = new WebSocket('wss://api.example.com/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'subscribe', channel: 'chat' }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  handleMessage(message);
};

ws.onclose = () => {
  // Implement reconnection logic
  setTimeout(reconnect, 1000);
};</pre>
<ul>
<li><strong>Pros:</strong> Lowest latency, bidirectional, binary data support, efficient for high-frequency updates</li>
<li><strong>Cons:</strong> Complex infrastructure (WebSocket servers, load balancing), connection management, doesn't work through all proxies</li>
<li><strong>Best for:</strong> Chat, gaming, collaborative editing, any bidirectional real-time communication</li>
</ul>

<h4>Presence</h4>
<p>Showing who's online, who's typing, who's viewing a document. Implementation patterns:</p>
<ul>
<li>Send heartbeat every N seconds to signal "I'm here"</li>
<li>Server marks user as offline if no heartbeat for 2*N seconds</li>
<li>Broadcast presence changes to other connected users</li>
<li>For "typing indicators": send typing start event, auto-clear after 3 seconds of no typing</li>
</ul>

<h4>Optimistic UI</h4>
<p>For real-time apps, showing actions immediately makes the app feel responsive:</p>
<ul>
<li>User sends message → immediately show in chat (with "sending" indicator)</li>
<li>Server confirms → remove indicator</li>
<li>Server fails → show error, offer retry, keep message in UI with failed state</li>
</ul>

<h4>Offline and Reconnection</h4>
<p>Robust real-time apps must handle poor connectivity:</p>
<ul>
<li><strong>Queue outgoing messages:</strong> Store in memory or IndexedDB while offline</li>
<li><strong>Reconnection with backoff:</strong> 1s, 2s, 4s, 8s, max 30s</li>
<li><strong>Sync on reconnect:</strong> Fetch missed events since last received timestamp/sequence number</li>
<li><strong>Visual feedback:</strong> Show connection status (connected, reconnecting, offline)</li>
</ul>
<div class="callout"><p><strong>Interview Tip:</strong> When designing real-time features, always address: what happens when the connection drops? How do you sync missed messages? How do you prevent duplicate messages after reconnection?</p></div>`,

      diagram: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" fill="#e8eaf0" font-size="14" font-weight="bold">Real-Time Technology Comparison</text>
<rect x="30" y="50" width="130" height="90" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="95" y="72" text-anchor="middle" fill="#6c63ff" font-size="10" font-weight="bold">Polling</text>
<text x="95" y="92" text-anchor="middle" fill="#a0a8c0" font-size="8">Latency: High</text>
<text x="95" y="107" text-anchor="middle" fill="#a0a8c0" font-size="8">Complexity: Low</text>
<text x="95" y="122" text-anchor="middle" fill="#a0a8c0" font-size="8">Direction: Pull</text>
<rect x="170" y="50" width="130" height="90" fill="#1e2235" stroke="#4caf50" rx="6"/>
<text x="235" y="72" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">Long Polling</text>
<text x="235" y="92" text-anchor="middle" fill="#a0a8c0" font-size="8">Latency: Medium</text>
<text x="235" y="107" text-anchor="middle" fill="#a0a8c0" font-size="8">Complexity: Medium</text>
<text x="235" y="122" text-anchor="middle" fill="#a0a8c0" font-size="8">Direction: Pull+Push</text>
<rect x="310" y="50" width="130" height="90" fill="#1e2235" stroke="#ff9800" rx="6"/>
<text x="375" y="72" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="bold">SSE</text>
<text x="375" y="92" text-anchor="middle" fill="#a0a8c0" font-size="8">Latency: Low</text>
<text x="375" y="107" text-anchor="middle" fill="#a0a8c0" font-size="8">Complexity: Low</text>
<text x="375" y="122" text-anchor="middle" fill="#a0a8c0" font-size="8">Direction: Server→Client</text>
<rect x="450" y="50" width="130" height="90" fill="#1e2235" stroke="#f44336" rx="6"/>
<text x="515" y="72" text-anchor="middle" fill="#f44336" font-size="10" font-weight="bold">WebSocket</text>
<text x="515" y="92" text-anchor="middle" fill="#a0a8c0" font-size="8">Latency: Lowest</text>
<text x="515" y="107" text-anchor="middle" fill="#a0a8c0" font-size="8">Complexity: High</text>
<text x="515" y="122" text-anchor="middle" fill="#a0a8c0" font-size="8">Direction: Bidirectional</text>
<rect x="30" y="170" width="550" height="90" fill="#1e2235" stroke="#353b55" rx="6"/>
<text x="305" y="195" text-anchor="middle" fill="#e8eaf0" font-size="11" font-weight="bold">Choose based on:</text>
<text x="180" y="215" text-anchor="middle" fill="#a0a8c0" font-size="9">Update frequency</text>
<text x="180" y="235" text-anchor="middle" fill="#a0a8c0" font-size="9">Infrastructure budget</text>
<text x="420" y="215" text-anchor="middle" fill="#a0a8c0" font-size="9">Bidirectional need</text>
<text x="420" y="235" text-anchor="middle" fill="#a0a8c0" font-size="9">Latency requirements</text>
</svg>`,

      tradeoffs: `<ul>
<li><strong>WebSocket vs SSE:</strong> WebSocket enables bidirectional communication but requires more infrastructure. SSE is simpler and sufficient for server-push scenarios.</li>
<li><strong>Optimistic vs pessimistic UI:</strong> Optimistic updates feel faster but require rollback logic and conflict resolution. Pessimistic is simpler but feels sluggish.</li>
<li><strong>Real-time vs near-real-time:</strong> True real-time (WebSocket) costs more in infrastructure. For many use cases, 5-10 second polling is "real enough" and much simpler.</li>
<li><strong>Client-side vs server-side ordering:</strong> Server-side ordering is authoritative but adds latency. Client-side ordering is fast but may show temporary inconsistencies.</li>
</ul>`,

      mistakes: `<ul>
<li>Using WebSockets when simple polling or SSE would suffice</li>
<li>Not implementing reconnection logic with exponential backoff</li>
<li>Forgetting to handle duplicate messages after reconnection</li>
<li>Not showing connection status to the user</li>
<li>Keeping WebSocket connections open indefinitely without heartbeats</li>
<li>Not handling message ordering (messages can arrive out of order)</li>
</ul>`,

      interviewAngle: `<p>Real-time system design tests your ability to handle complexity and edge cases:</p>
<ol>
<li>Start with the simplest approach that meets requirements (don't jump to WebSockets for everything)</li>
<li>Address offline/reconnection—this is where most candidates fail to think deeply</li>
<li>Discuss message ordering and deduplication</li>
<li>Consider scale: what happens with 100K concurrent connections?</li>
</ol>`
    },
    exercise: {
      prompt: "Design the frontend for a Slack-like chat application. Include: real-time message delivery, typing indicators, read receipts, presence (online/offline/away), message search, file sharing UI, and thread/reply support. Address: offline behavior, reconnection, message ordering, and optimistic sends.",
      hint: "Think about what uses WebSocket (messages, typing, presence) vs REST (search, file upload, message history). Consider how you'd handle the initial load of a channel with 100K messages."
    },
    quiz: [
      {
        question: "When is Server-Sent Events (SSE) a better choice than WebSockets?",
        options: [
          "When you need the client to send frequent messages to the server",
          "When you only need server-to-client push (notifications, live feeds)",
          "When you need binary data transfer",
          "When latency must be under 1ms"
        ],
        correct: 1
      },
      {
        question: "What should happen when a WebSocket connection drops?",
        options: [
          "Show an error page and require the user to refresh",
          "Silently reconnect without telling the user",
          "Reconnect with exponential backoff and show connection status to the user",
          "Switch to HTTP polling permanently"
        ],
        correct: 2
      },
      {
        question: "How do you implement presence (showing who's online)?",
        options: [
          "Check if the user's last API call was within 5 minutes",
          "Send periodic heartbeats from connected clients; mark absent after timeout",
          "Store presence in localStorage",
          "Check the database for the user's last login timestamp"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 10,
    title: "Micro Frontends",
    description: "Independent deployments, module federation, team ownership, and composition",
    icon: "🧩",
    objectives: [
      "Understand when micro frontends solve real problems",
      "Choose composition strategies (runtime, build-time, route-based)",
      "Handle shared dependencies and design consistency",
      "Design routing and communication between micro frontends",
      "Evaluate performance implications"
    ],
    content: {
      overview: `<p>Micro frontends extend the microservices concept to the frontend: independently developed, deployed, and owned pieces of UI composed into a cohesive application. They solve organizational problems more than technical ones—when multiple autonomous teams need to ship independently without coordinating deployments.</p>
<p>The important caveat: <strong>most applications don't need micro frontends</strong>. They add significant complexity. Use them when the organizational pain of coordinated deployments is greater than the technical complexity of micro frontends.</p>`,

      lesson: `<h4>When to Use Micro Frontends</h4>
<p>Good reasons:</p>
<ul>
<li>5+ teams working on a single frontend application</li>
<li>Teams have different tech stacks or upgrade at different speeds</li>
<li>Independent deployment cycles are a business requirement</li>
<li>The application is large enough that one team can't own it all</li>
</ul>
<p>Bad reasons:</p>
<ul>
<li>You think microservices are cool and want the frontend to match</li>
<li>You have 2 teams and light coordination needs</li>
<li>You want to use different frameworks "just because"</li>
<li>Your application is small or medium-sized</li>
</ul>

<h4>Composition Strategies</h4>
<p><strong>Build-time composition:</strong> Micro frontends are npm packages. Composed at build time into a single bundle.</p>
<ul>
<li>Pro: Simple, good performance (single bundle)</li>
<li>Con: Not independently deployable—requires a rebuild and redeploy of the shell</li>
</ul>

<p><strong>Runtime composition (Module Federation):</strong> Micro frontends loaded at runtime from separate deployments:</p>
<pre>// webpack.config.js (shell app)
new ModuleFederationPlugin({
  remotes: {
    productApp: 'product@https://product.cdn.com/entry.js',
    cartApp: 'cart@https://cart.cdn.com/entry.js',
  },
  shared: ['react', 'react-dom'],
});</pre>
<ul>
<li>Pro: Truly independent deployments, teams can ship at their own pace</li>
<li>Con: Runtime overhead, version conflicts possible, harder to debug</li>
</ul>

<p><strong>Route-based composition:</strong> Each route is a separate application. An app shell routes between them:</p>
<ul>
<li>Pro: Simplest isolation, each "page" is fully independent</li>
<li>Con: Navigation between micro frontends may cause full page reloads, shared state is harder</li>
</ul>

<p><strong>iframe composition:</strong> Each micro frontend runs in an iframe:</p>
<ul>
<li>Pro: Strongest isolation (separate DOM, CSS, JS context)</li>
<li>Con: Worst UX (no shared scrolling, layout complexity, accessibility issues)</li>
</ul>

<h4>Shared Dependencies</h4>
<p>The biggest challenge: how do you share React, design system, and utility libraries without duplicating them?</p>
<ul>
<li><strong>Module Federation shared:</strong> Declare shared dependencies; the first one to load provides them to others</li>
<li><strong>Importmap/externals:</strong> Load shared libraries from a CDN, all micro frontends use the same global instance</li>
<li><strong>Accept duplication:</strong> For small dependencies, duplicating is simpler than coordinating</li>
</ul>

<h4>Design Consistency</h4>
<p>Micro frontends from different teams must look like one product:</p>
<ul>
<li>Shared design system package that all teams use</li>
<li>Design tokens loaded from a central source</li>
<li>Visual regression testing across the composed application</li>
<li>Clear UX guidelines for transitions between micro frontends</li>
</ul>

<h4>Communication Between Micro Frontends</h4>
<ul>
<li><strong>Custom Events:</strong> window.dispatchEvent / addEventListener for loose coupling</li>
<li><strong>Shared state store:</strong> A lightweight pub/sub or a shared instance of a store</li>
<li><strong>URL:</strong> Encode shared state in the URL</li>
<li><strong>Props (if parent-child):</strong> Shell passes data down to embedded micro frontends</li>
</ul>
<p>Rule: keep communication minimal. If micro frontends need to share lots of state, they might be too tightly coupled to be separate.</p>
<div class="callout"><p><strong>Interview Tip:</strong> When discussing micro frontends, always start with "why"—what organizational problem are we solving? Then discuss the technical approach. Candidates who jump straight to Module Federation without justifying the pattern show they haven't worked with it in practice.</p></div>`,

      diagram: `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" fill="#e8eaf0" font-size="14" font-weight="bold">Micro Frontend Architecture</text>
<rect x="100" y="45" width="400" height="40" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="300" y="70" text-anchor="middle" fill="#6c63ff" font-size="11" font-weight="bold">App Shell (routing, auth, layout)</text>
<rect x="30" y="110" width="170" height="80" fill="#1e2235" stroke="#4caf50" rx="6"/>
<text x="115" y="135" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">Team A: Products</text>
<text x="115" y="155" text-anchor="middle" fill="#a0a8c0" font-size="8">React 18 + Vite</text>
<text x="115" y="172" text-anchor="middle" fill="#a0a8c0" font-size="8">Independent deploy</text>
<rect x="215" y="110" width="170" height="80" fill="#1e2235" stroke="#ff9800" rx="6"/>
<text x="300" y="135" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="bold">Team B: Cart</text>
<text x="300" y="155" text-anchor="middle" fill="#a0a8c0" font-size="8">React 18 + Webpack</text>
<text x="300" y="172" text-anchor="middle" fill="#a0a8c0" font-size="8">Independent deploy</text>
<rect x="400" y="110" width="170" height="80" fill="#1e2235" stroke="#f44336" rx="6"/>
<text x="485" y="135" text-anchor="middle" fill="#f44336" font-size="10" font-weight="bold">Team C: Checkout</text>
<text x="485" y="155" text-anchor="middle" fill="#a0a8c0" font-size="8">Next.js</text>
<text x="485" y="172" text-anchor="middle" fill="#a0a8c0" font-size="8">Independent deploy</text>
<rect x="100" y="220" width="400" height="35" fill="#1e2235" stroke="#9c27b0" rx="6"/>
<text x="300" y="242" text-anchor="middle" fill="#9c27b0" font-size="10" font-weight="bold">Shared: Design System + React + Auth SDK</text>
<rect x="100" y="270" width="400" height="25" fill="#1e2235" stroke="#353b55" rx="6"/>
<text x="300" y="287" text-anchor="middle" fill="#a0a8c0" font-size="9">Communication: Custom Events + URL State</text>
</svg>`,

      tradeoffs: `<ul>
<li><strong>Independence vs consistency:</strong> More independence means teams move faster but risk UX inconsistency and duplicated code.</li>
<li><strong>Runtime vs build-time composition:</strong> Runtime enables true independent deployment but adds loading complexity. Build-time is simpler but couples deploy schedules.</li>
<li><strong>Shared framework vs polyglot:</strong> Sharing React ensures consistency and reduces bundle duplication. Allowing different frameworks gives teams freedom but at a high cost.</li>
<li><strong>Performance cost:</strong> Multiple bundles, duplicate dependencies, and runtime composition all add overhead. The organizational benefit must outweigh this cost.</li>
</ul>`,

      mistakes: `<ul>
<li>Adopting micro frontends for a small/medium app with 1-3 teams</li>
<li>Allowing different CSS frameworks resulting in inconsistent look and feel</li>
<li>Not sharing a design system across all micro frontends</li>
<li>Creating tight coupling between micro frontends (defeats the purpose)</li>
<li>Ignoring the performance impact of loading multiple bundles</li>
<li>Not having a clear ownership model for the app shell and shared infrastructure</li>
</ul>`,

      interviewAngle: `<p>Micro frontend questions test organizational thinking and tradeoff analysis:</p>
<ol>
<li>Always justify why micro frontends are needed for the scenario</li>
<li>Discuss team structure and ownership boundaries</li>
<li>Address the performance overhead honestly</li>
<li>Explain how you'd maintain consistency across independently deployed pieces</li>
</ol>`
    },
    exercise: {
      prompt: "Design a micro frontend architecture for a large financial services dashboard that has: account overview (Team A), investment portfolio (Team B), bill payments (Team C), and customer support chat (Team D). Each team has 5-8 engineers and deploys weekly. Address: composition strategy, shared dependencies, cross-micro-frontend communication, routing, and how you'd handle shared authentication.",
      hint: "Consider that financial apps have strict compliance requirements. How does this affect your architecture choice? Think about which pieces truly need independent deployment vs which are stable enough to deploy together."
    },
    quiz: [
      {
        question: "What is the PRIMARY reason to adopt micro frontends?",
        options: [
          "To use multiple JavaScript frameworks in one app",
          "To enable independent team ownership and deployment of different parts of the application",
          "To improve application performance",
          "To reduce the total amount of code"
        ],
        correct: 1
      },
      {
        question: "What is Module Federation?",
        options: [
          "A CSS methodology for managing styles across teams",
          "A webpack feature that allows loading separately-built bundles at runtime, sharing dependencies",
          "A way to deploy backend microservices",
          "A state management library for micro frontends"
        ],
        correct: 1
      },
      {
        question: "When should you NOT use micro frontends?",
        options: [
          "When you have 10 teams working on one product",
          "When teams need independent deploy cycles",
          "When your app is medium-sized with 2-3 teams that coordinate easily",
          "When different parts of the app have different scaling needs"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 11,
    title: "Frontend Observability",
    description: "Error tracking, metrics, RUM, session replay, and debugging production issues",
    icon: "📊",
    objectives: [
      "Design a frontend observability strategy",
      "Implement error tracking and logging",
      "Monitor Core Web Vitals in production",
      "Use session replay for debugging",
      "Set up alerting for frontend health"
    ],
    content: {
      overview: `<p>Frontend observability is the practice of understanding what's happening in your application in production, from the user's perspective. Unlike backend observability (where you control the environment), frontend runs on thousands of different devices, browsers, and network conditions you can't predict or reproduce.</p>
<p>Good observability answers: Is the app working? Is it fast? What errors are users experiencing? Can we reproduce and fix issues quickly?</p>`,

      lesson: `<h4>The Three Pillars + Frontend Extras</h4>
<p>Traditional observability has three pillars: logs, metrics, and traces. Frontend adds:</p>
<ul>
<li><strong>Error tracking:</strong> Capturing and deduplicating JavaScript errors with stack traces, browser info, and user context</li>
<li><strong>Real User Monitoring (RUM):</strong> Measuring actual user-experienced performance (not synthetic tests)</li>
<li><strong>Session replay:</strong> Recording user sessions (DOM changes, clicks, navigation) for debugging</li>
<li><strong>Feature flag monitoring:</strong> Tracking which users see which features and correlating with errors/performance</li>
</ul>

<h4>Error Tracking</h4>
<p>A production error tracking system needs:</p>
<pre>// Global error handler
window.addEventListener('error', (event) => {
  reportError({
    message: event.message,
    stack: event.error?.stack,
    filename: event.filename,
    line: event.lineno,
    col: event.colno,
    userAgent: navigator.userAgent,
    url: window.location.href,
    userId: getCurrentUserId(),
    timestamp: Date.now(),
  });
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  reportError({
    message: event.reason?.message || 'Unhandled Promise Rejection',
    stack: event.reason?.stack,
    type: 'unhandled_rejection',
  });
});</pre>
<p>Key features of error tracking tools (Sentry, Bugsnag, DataDog):</p>
<ul>
<li><strong>Source map support:</strong> Convert minified stack traces back to original source code</li>
<li><strong>Deduplication:</strong> Group identical errors instead of creating one alert per occurrence</li>
<li><strong>Breadcrumbs:</strong> Log user actions leading up to the error (clicks, navigation, API calls)</li>
<li><strong>User context:</strong> Know which user, session, and feature flag variant experienced the error</li>
<li><strong>Release tracking:</strong> Know which deploy introduced a new error</li>
</ul>

<h4>Real User Monitoring (RUM)</h4>
<p>RUM collects performance metrics from actual users in production:</p>
<pre>// Report Core Web Vitals
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP((metric) => reportMetric('LCP', metric.value));
onINP((metric) => reportMetric('INP', metric.value));
onCLS((metric) => reportMetric('CLS', metric.value));</pre>
<p>RUM data segmented by device type, geography, connection speed reveals that your P50 LCP is 2.1s but P95 on mobile in India is 8.3s—a problem you'd never find with lab testing.</p>

<h4>Session Replay</h4>
<p>Tools like LogRocket, FullStory, or Sentry Session Replay record DOM mutations and user interactions, letting you "replay" exactly what a user experienced.</p>
<ul>
<li><strong>Use for:</strong> Understanding complex bugs, seeing what the user did before an error, UX research</li>
<li><strong>Privacy:</strong> Must mask sensitive fields (passwords, credit cards, PII). Most tools do this automatically.</li>
<li><strong>Cost:</strong> Can be expensive at scale. Sample a percentage of sessions.</li>
</ul>

<h4>Frontend Logging</h4>
<p>Structured logging in the frontend helps debug issues:</p>
<pre>const logger = {
  info: (message, context) => {
    if (shouldLog('info')) {
      sendLog({ level: 'info', message, ...context, timestamp: Date.now() });
    }
  },
  warn: (message, context) => { /* ... */ },
  error: (message, context) => { /* ... */ },
};

// Usage
logger.info('Checkout started', { cartSize: items.length, total: cartTotal });
logger.error('Payment failed', { errorCode: err.code, provider: 'stripe' });</pre>
<p>Don't log everything—bandwidth and storage costs add up. Log meaningful business events and errors.</p>

<h4>Alerting</h4>
<p>Set up alerts for:</p>
<ul>
<li>Error rate exceeds threshold (e.g., >1% of sessions have errors)</li>
<li>New error type appears after deployment</li>
<li>Core Web Vitals degrade (P75 LCP > 4s)</li>
<li>API error rates spike from the frontend's perspective</li>
<li>JavaScript bundle size exceeds budget</li>
</ul>
<div class="callout"><p><strong>Interview Tip:</strong> When asked "how would you debug a production issue?" show a systematic approach: check error tracking for new errors, check RUM for performance changes, watch session replay of affected users, check deployment timeline for correlation.</p></div>`,

      diagram: `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" fill="#e8eaf0" font-size="14" font-weight="bold">Frontend Observability Stack</text>
<rect x="50" y="50" width="500" height="40" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="300" y="75" text-anchor="middle" fill="#6c63ff" font-size="11" font-weight="bold">User Browser (source of all signals)</text>
<rect x="50" y="110" width="155" height="70" fill="#1e2235" stroke="#f44336" rx="6"/>
<text x="127" y="133" text-anchor="middle" fill="#f44336" font-size="10" font-weight="bold">Error Tracking</text>
<text x="127" y="150" text-anchor="middle" fill="#a0a8c0" font-size="8">Sentry, Bugsnag</text>
<text x="127" y="165" text-anchor="middle" fill="#a0a8c0" font-size="8">Stack traces + context</text>
<rect x="222" y="110" width="155" height="70" fill="#1e2235" stroke="#4caf50" rx="6"/>
<text x="300" y="133" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">RUM / Performance</text>
<text x="300" y="150" text-anchor="middle" fill="#a0a8c0" font-size="8">Core Web Vitals</text>
<text x="300" y="165" text-anchor="middle" fill="#a0a8c0" font-size="8">User-centric metrics</text>
<rect x="395" y="110" width="155" height="70" fill="#1e2235" stroke="#ff9800" rx="6"/>
<text x="472" y="133" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="bold">Session Replay</text>
<text x="472" y="150" text-anchor="middle" fill="#a0a8c0" font-size="8">DOM recording</text>
<text x="472" y="165" text-anchor="middle" fill="#a0a8c0" font-size="8">User journey replay</text>
<rect x="100" y="210" width="400" height="50" fill="#1e2235" stroke="#353b55" rx="6"/>
<text x="300" y="233" text-anchor="middle" fill="#e8eaf0" font-size="10" font-weight="bold">Dashboards + Alerts</text>
<text x="300" y="250" text-anchor="middle" fill="#a0a8c0" font-size="9">Grafana, DataDog, PagerDuty</text>
</svg>`,

      tradeoffs: `<ul>
<li><strong>Coverage vs performance overhead:</strong> More instrumentation means better observability but adds JavaScript execution time and network requests.</li>
<li><strong>Session replay vs privacy:</strong> Replay is incredibly useful for debugging but raises privacy concerns. Must mask PII aggressively.</li>
<li><strong>Sampling vs completeness:</strong> Sending all data is expensive. Sampling reduces cost but might miss rare edge cases.</li>
<li><strong>Alerting sensitivity:</strong> Too many alerts cause fatigue and get ignored. Too few means missing real issues.</li>
</ul>`,

      mistakes: `<ul>
<li>Not uploading source maps to error tracking tools (unreadable stack traces)</li>
<li>Alerting on every error without deduplication (alert fatigue)</li>
<li>Only testing performance in lab conditions (missing real-world mobile/network issues)</li>
<li>Not correlating errors with deployments (missing obvious regressions)</li>
<li>Logging sensitive user data (PII, passwords) to observability tools</li>
<li>Not setting up alerts until after a major incident</li>
</ul>`,

      interviewAngle: `<p>Observability questions test operational maturity:</p>
<ol>
<li>Show you think about production readiness, not just building features</li>
<li>Demonstrate a systematic debugging approach</li>
<li>Discuss proactive monitoring vs reactive firefighting</li>
<li>Connect observability to deployment safety (canary deploys, feature flags)</li>
</ol>`
    },
    exercise: {
      prompt: "Design the observability strategy for a checkout flow that includes: product selection, cart, shipping address, payment, and confirmation. What would you monitor? What alerts would you set? How would you debug a report of 'checkout is broken for some users'?",
      hint: "Think about the checkout funnel. Track conversion at each step. If users drop off at payment more than usual, that's an alert. Consider: error tracking per step, performance of each step, business metrics (cart abandonment rate)."
    },
    quiz: [
      {
        question: "What is Real User Monitoring (RUM)?",
        options: [
          "Running Lighthouse tests on a CI server",
          "Collecting performance metrics from actual users in production browsers",
          "Monitoring server CPU and memory usage",
          "Reviewing code for performance anti-patterns"
        ],
        correct: 1
      },
      {
        question: "Why should source maps be uploaded to error tracking tools?",
        options: [
          "They make the JavaScript bundle smaller",
          "They convert minified/bundled stack traces back to readable original source code",
          "They prevent errors from occurring",
          "They encrypt error reports for security"
        ],
        correct: 1
      },
      {
        question: "What is a breadcrumb in error tracking?",
        options: [
          "A type of navigation component",
          "A record of user actions leading up to an error (clicks, navigation, API calls)",
          "A way to paginate through error lists",
          "A method for deduplicating errors"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 12,
    title: "Frontend System Design Interviews",
    description: "Framework for answering, common questions, and complete walkthroughs",
    icon: "🎯",
    objectives: [
      "Follow a structured approach to frontend system design questions",
      "Clarify requirements effectively",
      "Communicate architecture decisions clearly",
      "Discuss tradeoffs confidently",
      "Complete a design within the interview time constraint"
    ],
    content: {
      overview: `<p>Frontend system design interviews evaluate your ability to design large-scale frontend applications. Unlike coding interviews (which test algorithm skills) or behavioral interviews (which test soft skills), system design tests your <strong>architectural thinking, tradeoff analysis, and technical communication</strong>.</p>
<p>The key to success is having a framework—a repeatable structure that ensures you cover all important aspects without getting lost in details.</p>`,

      lesson: `<h4>The Framework: How to Answer</h4>
<p>Use this structure for every frontend system design question (adjust time for your interview length):</p>
<ol>
<li><strong>Clarify Requirements (3-5 min):</strong> Ask about users, scale, platforms, features, constraints</li>
<li><strong>Define Scope (2 min):</strong> Narrow to what you'll design in the available time</li>
<li><strong>High-Level Architecture (5 min):</strong> Draw the overall system—components, data flow, APIs</li>
<li><strong>Component Design (10 min):</strong> Break down into components, discuss hierarchy and responsibilities</li>
<li><strong>Data & State (5 min):</strong> Discuss state management, data models, caching</li>
<li><strong>API Design (3 min):</strong> Define key API contracts</li>
<li><strong>Performance (3 min):</strong> Identify bottlenecks, propose optimizations</li>
<li><strong>Deep Dive (5 min):</strong> Interviewer picks an area to go deeper—be prepared for any of the above</li>
</ol>

<h4>Clarifying Requirements</h4>
<p>Always ask before designing. Good questions:</p>
<ul>
<li>"What's the primary user persona? Desktop or mobile?"</li>
<li>"What's the scale? How many concurrent users?"</li>
<li>"What features are must-have vs nice-to-have?"</li>
<li>"Are there specific performance targets?"</li>
<li>"Do we need to support offline?"</li>
<li>"What's the existing tech stack?"</li>
<li>"Is SEO important for this?"</li>
</ul>

<h4>Drawing Architecture</h4>
<p>Use a visual when explaining architecture:</p>
<ul>
<li>Show the main page layouts</li>
<li>Label key component boundaries</li>
<li>Draw data flow arrows</li>
<li>Mark where state lives</li>
<li>Show API boundaries</li>
</ul>

<h4>Discussing Tradeoffs</h4>
<p>The best candidates don't just pick a solution—they explain why they chose it over alternatives:</p>
<ul>
<li>"I'd use SSR here because SEO matters and the data is user-specific. SSG won't work because the content is personalized. CSR would hurt SEO."</li>
<li>"I'd put filters in the URL for shareability, even though it's more complex than component state, because users need to share filtered views."</li>
<li>"I'd choose WebSocket for chat messages but polling for the contact list, since contacts update rarely and WebSocket would be overkill."</li>
</ul>

<h4>Common Mistakes in Interviews</h4>
<ul>
<li><strong>Not clarifying:</strong> Jumping into design without understanding requirements</li>
<li><strong>Going too deep too fast:</strong> Discussing CSS implementation when you haven't defined the component hierarchy</li>
<li><strong>Backend focus:</strong> Spending time on database schema when the question is about frontend</li>
<li><strong>No tradeoffs:</strong> Saying "I'd use X" without explaining why X over Y</li>
<li><strong>Ignoring scale:</strong> Designing for a todo app when the question asks about Netflix-scale</li>
<li><strong>Forgetting accessibility:</strong> Never mentioning keyboard navigation, screen readers, or ARIA</li>
<li><strong>No performance discussion:</strong> Not mentioning how you'd handle slow networks or large datasets</li>
</ul>

<h4>Accessibility Checklist for Interviews</h4>
<p>Mention these for any interactive system:</p>
<ul>
<li>Keyboard navigation for all interactive elements</li>
<li>Focus management for modals and dynamic content</li>
<li>ARIA labels for non-text elements</li>
<li>Screen reader announcements for state changes</li>
<li>Color contrast for text readability</li>
<li>Reduced motion support</li>
</ul>
<div class="callout"><p><strong>Key Insight:</strong> The interviewer isn't looking for the "correct" answer. They want to see how you think, communicate, and handle tradeoffs. It's a conversation, not an exam.</p></div>`,

      diagram: `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" fill="#e8eaf0" font-size="14" font-weight="bold">System Design Interview Framework</text>
<rect x="30" y="50" width="540" height="35" fill="#1e2235" stroke="#6c63ff" rx="6"/>
<text x="300" y="72" text-anchor="middle" fill="#6c63ff" font-size="10" font-weight="bold">1. Clarify Requirements (Who? What? Scale? Constraints?)</text>
<rect x="30" y="95" width="540" height="35" fill="#1e2235" stroke="#4caf50" rx="6"/>
<text x="300" y="117" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">2. High-Level Architecture (Pages, Components, Data Flow)</text>
<rect x="30" y="140" width="260" height="35" fill="#1e2235" stroke="#ff9800" rx="6"/>
<text x="160" y="162" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="bold">3. Component Design</text>
<rect x="310" y="140" width="260" height="35" fill="#1e2235" stroke="#ff9800" rx="6"/>
<text x="440" y="162" text-anchor="middle" fill="#ff9800" font-size="10" font-weight="bold">4. State & Data</text>
<rect x="30" y="185" width="260" height="35" fill="#1e2235" stroke="#f44336" rx="6"/>
<text x="160" y="207" text-anchor="middle" fill="#f44336" font-size="10" font-weight="bold">5. API Design</text>
<rect x="310" y="185" width="260" height="35" fill="#1e2235" stroke="#f44336" rx="6"/>
<text x="440" y="207" text-anchor="middle" fill="#f44336" font-size="10" font-weight="bold">6. Performance</text>
<rect x="30" y="230" width="540" height="35" fill="#1e2235" stroke="#9c27b0" rx="6"/>
<text x="300" y="252" text-anchor="middle" fill="#9c27b0" font-size="10" font-weight="bold">7. Deep Dive (Accessibility, Edge Cases, Scaling)</text>
<text x="300" y="285" text-anchor="middle" fill="#a0a8c0" font-size="10">Time: ~35-45 minutes total</text>
</svg>`,

      tradeoffs: `<ul>
<li><strong>Breadth vs depth:</strong> Cover all areas at a high level, then go deep where the interviewer wants. Don't spend 20 minutes on state management and skip performance entirely.</li>
<li><strong>Ideal vs pragmatic:</strong> Mention the ideal solution but acknowledge practical constraints (time, team size, existing codebase).</li>
<li><strong>Novelty vs reliability:</strong> Using cutting-edge tech shows awareness but established tools show pragmatism. Favor proven solutions unless the scenario specifically requires innovation.</li>
</ul>`,

      mistakes: `<ul>
<li>Not asking any clarifying questions</li>
<li>Designing a backend when asked about frontend</li>
<li>Not drawing diagrams or visual aids</li>
<li>Speaking for too long without checking in with the interviewer</li>
<li>Being too prescriptive without discussing alternatives</li>
<li>Forgetting to mention testing, monitoring, or deployment strategy</li>
<li>Not managing time (spending too long on one aspect)</li>
</ul>`,

      interviewAngle: `<p>This module IS the interview angle. Practice the framework with every walkthrough below until it becomes second nature. Time yourself: can you cover all sections in 35 minutes?</p>`
    },
    exercise: {
      prompt: "Practice the framework: in 5 minutes, write out the clarifying questions you'd ask and scope you'd define for 'Design the frontend for Twitter/X.' Then sketch a high-level component architecture.",
      hint: "Think about: home timeline, compose tweet, notifications, DMs, profile. What's core vs nice-to-have? How does the feed load and update? What about real-time notifications?"
    },
    quiz: [
      {
        question: "What should you do FIRST in a frontend system design interview?",
        options: [
          "Start drawing the component hierarchy",
          "Ask clarifying questions about requirements, users, and constraints",
          "Discuss which framework to use",
          "Write pseudo-code for the main component"
        ],
        correct: 1
      },
      {
        question: "What separates a strong candidate from an average one in system design?",
        options: [
          "Using the most cutting-edge technologies",
          "Writing actual code during the interview",
          "Discussing tradeoffs and explaining why they chose one approach over alternatives",
          "Finishing the design in under 10 minutes"
        ],
        correct: 2
      },
      {
        question: "Which of these is a common mistake in frontend system design interviews?",
        options: [
          "Asking too many clarifying questions",
          "Drawing diagrams",
          "Spending most of the time designing the backend/database schema",
          "Mentioning accessibility"
        ],
        correct: 2
      }
    ]
  }
];
