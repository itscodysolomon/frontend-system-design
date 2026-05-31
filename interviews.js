const INTERVIEW_WALKTHROUGHS = [
  {
    id: "netflix",
    title: "Design a Netflix Frontend",
    description: "Video streaming platform with personalized content, playback, and recommendations",
    content: {
      requirements: `<ul>
<li>Browse content catalog with categories and genres</li>
<li>Personalized home page with recommendations</li>
<li>Video playback with adaptive streaming</li>
<li>Search with instant results</li>
<li>User profiles and parental controls</li>
<li>Continue watching / watch history</li>
<li>Content detail pages with trailers</li>
<li>Responsive: TV, desktop, tablet, mobile</li>
</ul>`,
      architecture: `<p>The Netflix frontend is a content-heavy application with a few key pages and rich media playback. The architecture centers around:</p>
<ul>
<li><strong>App Shell:</strong> Navigation, profile switcher, search</li>
<li><strong>Home Page:</strong> Multiple "rows" of content (carousels) personalized per user</li>
<li><strong>Browse/Category Pages:</strong> Grid of titles filtered by genre</li>
<li><strong>Title Detail Page:</strong> Hero image, metadata, episodes, similar titles</li>
<li><strong>Video Player:</strong> The core experience—adaptive streaming, controls, subtitles</li>
<li><strong>Search:</strong> Instant search with visual results</li>
</ul>
<p>Key architectural decisions: heavy use of lazy loading (images, rows, player), skeleton loading for perceived performance, and prefetching content the user is likely to click.</p>`,
      components: `<pre>App
├── Navigation (sticky)
│   ├── Logo
│   ├── NavLinks (Home, TV, Movies, My List)
│   ├── SearchBar
│   └── ProfileMenu
├── HomePage
│   ├── HeroBanner (featured content, auto-rotating)
│   └── ContentRow[] (horizontal scrollable carousels)
│       └── ContentCard (poster, title, hover preview)
├── TitleDetailPage
│   ├── HeroSection (backdrop, title, metadata)
│   ├── ActionButtons (Play, My List, Like, Share)
│   ├── EpisodeList (for series)
│   ├── SimilarTitles
│   └── ReviewSection
├── VideoPlayer
│   ├── VideoElement (adaptive bitrate player)
│   ├── Controls (play/pause, seek, volume, fullscreen)
│   ├── SubtitleOverlay
│   ├── QualitySelector
│   └── NextEpisodePrompt
└── SearchResults
    ├── SearchInput (debounced)
    └── ResultsGrid</pre>`,
      stateStrategy: `<ul>
<li><strong>Server state (React Query):</strong> Content catalog, user's list, watch history, recommendations — all fetched from APIs with stale-while-revalidate caching</li>
<li><strong>Local state:</strong> Player controls (volume, seek position, fullscreen), UI interactions (hover states, carousel scroll position)</li>
<li><strong>URL state:</strong> Current page, search query, active genre filter, selected title ID</li>
<li><strong>Persisted state:</strong> Playback position (for "continue watching"), audio/subtitle preferences</li>
</ul>
<p>Content rows use infinite horizontal scrolling with virtualization for off-screen cards.</p>`,
      apiStrategy: `<ul>
<li><strong>Personalization API:</strong> Returns ordered rows for the home page, customized per user profile</li>
<li><strong>Content API:</strong> Title metadata, episodes, similar content</li>
<li><strong>Search API:</strong> Debounced (300ms), returns visual previews</li>
<li><strong>Streaming API:</strong> DASH/HLS manifest URLs, adaptive bitrate selection</li>
<li><strong>Watch Progress API:</strong> Reports and fetches playback positions</li>
</ul>
<p>Use a BFF to aggregate multiple service calls into page-level responses. The home page needs data from recommendation, trending, continue-watching, and my-list services.</p>`,
      performance: `<ul>
<li><strong>Image optimization:</strong> Progressive JPEG, WebP with srcset for different viewport sizes. Lazy load off-screen carousel images.</li>
<li><strong>Video preloading:</strong> Prefetch first few seconds of video when user hovers on a title card</li>
<li><strong>Code splitting:</strong> Video player loaded only when playback starts (it's heavy). Search loaded on demand.</li>
<li><strong>Skeleton screens:</strong> Show content row skeletons immediately while data loads</li>
<li><strong>Virtualization:</strong> Only render visible carousel items; offscreen cards are placeholder divs</li>
<li><strong>Prefetching:</strong> When user scrolls near a content row, prefetch data for the next row</li>
</ul>`,
      accessibility: `<ul>
<li>Video player with full keyboard controls and captions/audio descriptions</li>
<li>Focus management for carousel navigation (arrow keys)</li>
<li>Screen reader announcements for content selection and playback state</li>
<li>Reduced motion: disable auto-playing trailers on hover</li>
<li>High contrast mode for subtitles</li>
<li>Skip navigation links</li>
</ul>`,
      tradeoffs: `<ul>
<li><strong>Auto-play trailers vs static cards:</strong> Trailers increase engagement but use bandwidth and annoy some users. Solution: respect prefers-reduced-motion and let users disable.</li>
<li><strong>Personalized home vs cacheable:</strong> Personalization means every user's home page is different, making CDN caching hard. Solution: cache component data separately, compose on client.</li>
<li><strong>Heavy video player:</strong> The player is 200KB+ of JavaScript. Load it lazily only when user initiates playback, show a poster image until then.</li>
</ul>`,
      summary: `<p>Netflix frontend is a content-consumption app optimized for browsing and playback. Key decisions: lazy loading everything not immediately visible, prefetching what users likely want next, adaptive streaming for varying network conditions, and skeleton loading for perceived performance. The architecture splits cleanly into browse (content-heavy, SEO matters for public pages) and player (interactive, performance-critical, no SEO needed).</p>`
    }
  },
  {
    id: "slack",
    title: "Design a Slack Frontend",
    description: "Real-time messaging with channels, threads, presence, and file sharing",
    content: {
      requirements: `<ul>
<li>Real-time messaging in channels and DMs</li>
<li>Thread/reply support</li>
<li>Typing indicators and presence (online/offline/away)</li>
<li>File sharing and previews</li>
<li>Message search</li>
<li>Notifications (in-app and push)</li>
<li>Emoji reactions</li>
<li>Message editing and deletion</li>
<li>Workspace switching</li>
<li>Desktop and mobile responsive</li>
</ul>`,
      architecture: `<p>Slack is a real-time collaborative app. The architecture must handle: persistent WebSocket connections for instant messaging, efficient rendering of message lists, and complex state with multiple active channels/threads.</p>
<ul>
<li><strong>App Shell:</strong> Workspace sidebar, channel list, main content area</li>
<li><strong>Three-panel layout:</strong> Sidebar (workspaces + channels) | Main chat | Thread/details panel</li>
<li><strong>WebSocket connection manager:</strong> Central connection that routes events to appropriate handlers</li>
<li><strong>Message virtualization:</strong> Only render visible messages (channels can have 100K+ messages)</li>
</ul>`,
      components: `<pre>App
├── WorkspaceSidebar (icons for each workspace)
├── ChannelSidebar
│   ├── SearchButton
│   ├── ChannelList
│   │   ├── ChannelGroup (starred, channels, DMs)
│   │   └── ChannelItem (name, unread badge, presence dot)
│   └── ComposeButton
├── MainPanel
│   ├── ChannelHeader (name, members, pins, search)
│   ├── MessageList (virtualized)
│   │   ├── DateDivider
│   │   ├── Message
│   │   │   ├── Avatar
│   │   │   ├── MessageContent (text, links, code blocks)
│   │   │   ├── Reactions
│   │   │   ├── ThreadIndicator
│   │   │   └── MessageActions (reply, react, more)
│   │   └── SystemMessage (join, leave, etc.)
│   ├── TypingIndicator
│   └── MessageComposer
│       ├── RichTextEditor
│       ├── FileUpload
│       ├── EmojiPicker
│       └── SendButton
└── ThreadPanel (when open)
    ├── ParentMessage
    ├── ReplyList
    └── ReplyComposer</pre>`,
      stateStrategy: `<ul>
<li><strong>WebSocket events:</strong> Real-time message delivery, typing indicators, presence changes — handled by a central WebSocket manager that dispatches to the correct store</li>
<li><strong>Normalized message store:</strong> Messages stored by ID in a normalized map. Channel views reference message IDs. This prevents duplication when messages appear in both channels and search results.</li>
<li><strong>Server state (React Query):</strong> Channel list, user profiles, message history (paginated), search results</li>
<li><strong>Local state:</strong> Draft messages per channel, composer state, which panels are open</li>
<li><strong>URL state:</strong> Active workspace, active channel, active thread</li>
</ul>
<p>Key challenge: handling optimistic message sending. Show the message immediately with a "sending" state, update to "sent" when server confirms, show "failed" with retry option if it fails.</p>`,
      apiStrategy: `<ul>
<li><strong>REST API:</strong> Channel CRUD, user profiles, file upload, search (debounced), message history (cursor-based pagination)</li>
<li><strong>WebSocket:</strong> Real-time message delivery, typing start/stop, presence updates, reaction events, message edits/deletes</li>
<li><strong>Message history:</strong> Load last 50 messages when opening a channel. Scroll up to load more (cursor-based). Jump to specific message for search results/links.</li>
<li><strong>File upload:</strong> Multipart upload with progress indicator. Generate preview on server, deliver via CDN.</li>
</ul>`,
      performance: `<ul>
<li><strong>Message list virtualization:</strong> Only render visible messages. Critical for channels with thousands of messages.</li>
<li><strong>Lazy load message attachments:</strong> Images, files, and link previews load only when scrolled into view</li>
<li><strong>Batch WebSocket events:</strong> Group rapid-fire events (typing indicators from multiple users) into a single UI update</li>
<li><strong>Prefetch adjacent channels:</strong> When user is in #general, prefetch recent messages for their other frequently-used channels</li>
<li><strong>Code split:</strong> Emoji picker, file preview modals, rich text editor loaded on demand</li>
<li><strong>Service worker:</strong> Cache static assets and recent message data for faster subsequent loads</li>
</ul>`,
      accessibility: `<ul>
<li>Full keyboard navigation between channels, messages, and composer</li>
<li>Screen reader announcements for new messages (aria-live polite region)</li>
<li>Focus management when opening/closing thread panel</li>
<li>Alt text for shared images</li>
<li>Keyboard shortcuts for common actions (Cmd+K for channel switcher)</li>
<li>ARIA roles for the virtualized message list</li>
</ul>`,
      tradeoffs: `<ul>
<li><strong>Normalized vs denormalized messages:</strong> Normalized prevents inconsistency (same message in search and channel stays in sync) but adds complexity. Worth it for Slack-scale.</li>
<li><strong>WebSocket vs SSE for events:</strong> WebSocket chosen because messaging is bidirectional (user sends messages too). SSE would require separate POST requests for sending.</li>
<li><strong>Full message history vs truncated:</strong> Loading all messages is expensive. Paginate and virtualize. But "jump to message" (from search) requires loading that specific page.</li>
</ul>`,
      summary: `<p>Slack frontend is a real-time collaborative app centered on WebSocket-driven messaging with optimistic updates. Key technical challenges: virtualized message lists for performance, normalized state to prevent data inconsistency, WebSocket connection management with reconnection logic, and complex keyboard navigation across three panels. The architecture must feel instant (optimistic sends, typing indicators) while handling unreliable networks gracefully (offline queuing, reconnection sync).</p>`
    }
  },
  {
    id: "youtube",
    title: "Design a YouTube Frontend",
    description: "Video platform with upload, playback, recommendations, and comments",
    content: {
      requirements: `<ul>
<li>Video browsing home feed with recommendations</li>
<li>Video playback page with adaptive streaming</li>
<li>Recommendation sidebar ("Up Next")</li>
<li>Comments section with nested replies</li>
<li>Search with filters (duration, upload date, type)</li>
<li>Channel pages with playlists</li>
<li>Like/dislike, subscribe, share</li>
<li>Video upload with progress</li>
<li>Watch history and saved playlists</li>
<li>Mobile-first: works well on phones</li>
</ul>`,
      architecture: `<p>YouTube is a content platform with two primary experiences: discovery (browsing/searching for videos) and consumption (watching videos). The architecture must handle:</p>
<ul>
<li>Heavy media content (thumbnails everywhere, video playback)</li>
<li>SEO for public video pages (SSR or SSG for video metadata)</li>
<li>Infinite scrolling for feeds and search results</li>
<li>Complex video player with ads integration</li>
</ul>`,
      components: `<pre>App
├── TopNav
│   ├── Logo + HamburgerMenu
│   ├── SearchBar (expandable on mobile)
│   ├── VoiceSearchButton
│   └── UserMenu (notifications, upload, avatar)
├── Sidebar (collapsible)
│   ├── NavLinks (Home, Shorts, Subscriptions, Library)
│   └── SubscriptionList
├── HomePage
│   ├── CategoryChips (scrollable filter bar)
│   └── VideoGrid (infinite scroll)
│       └── VideoCard (thumbnail, title, channel, views, age)
├── WatchPage
│   ├── VideoPlayer
│   │   ├── AdaptiveVideoElement
│   │   ├── Controls
│   │   ├── QualitySelector
│   │   └── ChapterMarkers
│   ├── VideoInfo
│   │   ├── Title + Views + Date
│   │   ├── ChannelInfo + SubscribeButton
│   │   └── ActionButtons (like, share, save, clip)
│   ├── DescriptionExpand
│   ├── CommentsSection
│   │   ├── SortDropdown
│   │   ├── CommentComposer
│   │   └── CommentList
│   │       └── Comment (avatar, text, likes, reply toggle)
│   │           └── ReplyList (nested)
│   └── RecommendationSidebar
│       └── VideoCard (compact)
├── SearchPage
│   ├── FilterBar
│   └── SearchResults (infinite scroll)
└── ChannelPage
    ├── ChannelBanner
    ├── TabNav (Videos, Shorts, Playlists, Community)
    └── ContentGrid</pre>`,
      stateStrategy: `<ul>
<li><strong>Server state (React Query):</strong> Video feed, search results, comments, channel data, recommendations — all paginated with infinite queries</li>
<li><strong>Player state (local):</strong> Playing/paused, current time, volume, quality, fullscreen, playback speed</li>
<li><strong>URL state:</strong> Current video ID, search query, filters, channel tab, timestamp (for sharing at specific time)</li>
<li><strong>User state (Context):</strong> Auth, subscriptions, notification preferences</li>
<li><strong>Watch history:</strong> Report progress to server; cache locally for "continue watching"</li>
</ul>`,
      apiStrategy: `<ul>
<li><strong>Feed API:</strong> Personalized recommendations, paginated. Returns video metadata + thumbnail URLs.</li>
<li><strong>Video API:</strong> Full video metadata, streaming manifest (DASH/HLS), related videos</li>
<li><strong>Comments API:</strong> Paginated, sorted by top/newest. Nested replies loaded on demand.</li>
<li><strong>Search API:</strong> Debounced autocomplete + full results with filters</li>
<li><strong>Engagement API:</strong> Like, subscribe, save — optimistic updates</li>
<li><strong>Upload API:</strong> Chunked upload with resumability for large files</li>
</ul>`,
      performance: `<ul>
<li><strong>Thumbnail optimization:</strong> Serve different sizes based on viewport (srcset). Use blur hash or dominant color placeholder while loading.</li>
<li><strong>Video preloading:</strong> Buffer first segment of "Up Next" video so playback starts instantly when auto-play triggers</li>
<li><strong>Infinite scroll with virtualization:</strong> Don't render 500 video cards at once. Virtualize the grid.</li>
<li><strong>Code split the video player:</strong> The player is complex and heavy. Only load when user navigates to watch page.</li>
<li><strong>Image lazy loading:</strong> Only load thumbnails as they scroll into view</li>
<li><strong>SEO:</strong> SSR for video watch pages (title, description, thumbnail in meta tags for social sharing)</li>
</ul>`,
      accessibility: `<ul>
<li>Video player with keyboard controls and captions</li>
<li>Thumbnail carousel navigable with arrow keys</li>
<li>Comment tree with proper ARIA tree roles</li>
<li>Search suggestions navigable with up/down arrows</li>
<li>Skip to main content link</li>
<li>Reduced motion: disable thumbnail preview animations on hover</li>
</ul>`,
      tradeoffs: `<ul>
<li><strong>SSR vs CSR for watch pages:</strong> SSR gives SEO benefits and fast initial paint. But the player itself is client-only. Hybrid approach: SSR the page shell and metadata, client-render the player.</li>
<li><strong>Autoplay:</strong> Good for engagement, controversial for user experience and bandwidth. Let users disable it.</li>
<li><strong>Comments loading:</strong> Load top comments immediately or lazy load when user scrolls? YouTube lazy loads (most users watch video without reading comments).</li>
<li><strong>Recommendation sidebar on mobile:</strong> No room for sidebar. Show recommendations below the video instead. Different layout per breakpoint.</li>
</ul>`,
      summary: `<p>YouTube frontend is a media-heavy content platform optimized for discovery and consumption. Key decisions: heavy image optimization for the thumbnail-heavy grid, code-split video player loaded on demand, SSR for SEO on public pages, infinite scroll with virtualization for feeds, and adaptive streaming for varying network conditions. The mobile experience prioritizes video playback over ancillary features.</p>`
    }
  },
  {
    id: "ecommerce",
    title: "Design an Ecommerce Frontend",
    description: "Online store with product browsing, cart, checkout, and order management",
    content: {
      requirements: `<ul>
<li>Product listing with filters and sort</li>
<li>Product detail page with images, variants, reviews</li>
<li>Shopping cart (persistent)</li>
<li>Multi-step checkout (address, shipping, payment, confirmation)</li>
<li>User account with order history</li>
<li>Search with autocomplete</li>
<li>Wishlist</li>
<li>SEO for product and category pages</li>
<li>Mobile-first (60%+ traffic is mobile)</li>
</ul>`,
      architecture: `<p>Ecommerce has mixed rendering needs: public pages (products, categories) need SEO, while authenticated pages (cart, checkout, account) are purely interactive. The architecture must handle:</p>
<ul>
<li>High product catalog volume (100K+ products)</li>
<li>Fast, filterable product listing</li>
<li>Rich product pages with image galleries</li>
<li>Cart state that persists across sessions</li>
<li>Secure checkout flow</li>
</ul>
<p>Rendering strategy: ISR for product/category pages (SEO + periodic freshness), CSR for cart/checkout/account (personalized, no SEO needed).</p>`,
      components: `<pre>App
├── Header
│   ├── Logo
│   ├── SearchBar (autocomplete)
│   ├── Navigation (categories mega menu)
│   ├── CartIcon (with badge count)
│   └── AccountMenu
├── ProductListPage
│   ├── Breadcrumbs
│   ├── FilterSidebar (mobile: sheet)
│   │   ├── PriceRange
│   │   ├── CategoryFilter
│   │   ├── BrandFilter
│   │   └── RatingFilter
│   ├── SortDropdown
│   ├── ProductGrid
│   │   └── ProductCard (image, name, price, rating, add-to-cart)
│   └── Pagination / LoadMore
├── ProductDetailPage
│   ├── ImageGallery (swipeable, zoomable)
│   ├── ProductInfo (title, price, availability)
│   ├── VariantSelector (size, color)
│   ├── AddToCartButton (with quantity)
│   ├── ProductTabs (description, specs, reviews)
│   └── RelatedProducts
├── CartPage
│   ├── CartItemList
│   │   └── CartItem (image, name, quantity stepper, remove, price)
│   ├── CartSummary (subtotal, shipping estimate, total)
│   └── CheckoutButton
├── CheckoutFlow
│   ├── StepIndicator (address → shipping → payment → confirm)
│   ├── AddressForm
│   ├── ShippingOptions
│   ├── PaymentForm
│   └── OrderConfirmation
└── AccountPage
    ├── OrderHistory
    ├── AddressBook
    └── Wishlist</pre>`,
      stateStrategy: `<ul>
<li><strong>Cart state:</strong> Persisted in localStorage for guests, synced to server for logged-in users. This is the most critical state—never lose a user's cart.</li>
<li><strong>Server state (React Query):</strong> Products, categories, reviews, orders, user addresses</li>
<li><strong>URL state:</strong> Filters (category, price range, brand), sort order, pagination, search query — all in URL for shareable/bookmarkable pages</li>
<li><strong>Form state:</strong> Checkout forms managed with React Hook Form + validation</li>
<li><strong>Optimistic updates:</strong> Add-to-cart shows immediately in cart badge; syncs to server in background</li>
</ul>`,
      apiStrategy: `<ul>
<li><strong>Product Catalog API:</strong> Filtered, sorted, paginated. Consider a BFF to aggregate product data with inventory and pricing.</li>
<li><strong>Search API:</strong> Autocomplete with debouncing (200ms). Returns products, categories, and suggestions.</li>
<li><strong>Cart API:</strong> GET/POST/PUT/DELETE cart items. Use optimistic updates.</li>
<li><strong>Checkout API:</strong> Address validation, shipping rate calculation, payment intent creation.</li>
<li><strong>Price and Inventory:</strong> Short-cache or real-time for accuracy. Stale prices at checkout = trust issues.</li>
</ul>`,
      performance: `<ul>
<li><strong>ISR for product pages:</strong> Pre-rendered for SEO, regenerated periodically for price/stock updates</li>
<li><strong>Image optimization:</strong> Product images in WebP/AVIF, responsive srcset, lazy loading for gallery</li>
<li><strong>Search performance:</strong> Debounced autocomplete, cache recent searches</li>
<li><strong>Above-the-fold priority:</strong> Load product image and price first, defer reviews and related products</li>
<li><strong>Cart data:</strong> Cached locally, background sync. Never show a loading spinner for cart actions.</li>
<li><strong>Checkout:</strong> Prefetch shipping rates while user fills address. Minimize steps.</li>
</ul>`,
      accessibility: `<ul>
<li>Product images with descriptive alt text</li>
<li>Filter sidebar keyboard accessible (checkboxes, range sliders)</li>
<li>Image gallery with arrow key navigation</li>
<li>Cart quantity stepper accessible with screen readers</li>
<li>Checkout form with clear error messages linked to fields (aria-describedby)</li>
<li>Price updates announced to screen readers when variant changes</li>
</ul>`,
      tradeoffs: `<ul>
<li><strong>Guest cart vs auth-required:</strong> Allow guest checkout (don't force account creation). Merge guest cart on login.</li>
<li><strong>Price accuracy:</strong> Cache product data for performance but always verify price at checkout time server-side. Show "price may have changed" if stale.</li>
<li><strong>Filter in URL vs component state:</strong> URL for shareability, but updating URL on every filter change creates too many history entries. Debounce URL updates.</li>
<li><strong>Product page rendering:</strong> ISR gives SEO but might show stale stock. Add client-side stock check on page load.</li>
</ul>`,
      summary: `<p>Ecommerce frontend is a hybrid rendering app: static/ISR for public SEO-critical pages (products, categories) and CSR for personalized experiences (cart, checkout, account). Key challenges: maintaining cart state reliably, balancing cached content with real-time pricing/inventory, creating a fast mobile browsing experience, and making checkout frictionless. The filter/sort UX must be URL-driven for shareability.</p>`
    }
  },
  {
    id: "analytics",
    title: "Design an Analytics Dashboard",
    description: "Data visualization platform with real-time metrics, charts, and custom reports",
    content: {
      requirements: `<ul>
<li>Multiple dashboard pages with customizable widgets</li>
<li>Real-time data updates (some metrics update every minute)</li>
<li>Charts: line, bar, pie, table, heatmap</li>
<li>Date range picker and filters</li>
<li>Export to CSV/PDF</li>
<li>Custom report builder</li>
<li>Role-based access (admin sees all, user sees own data)</li>
<li>Responsive (primarily desktop but usable on tablet)</li>
</ul>`,
      architecture: `<p>Analytics dashboards are data-heavy, read-oriented applications. They typically don't need SEO (they're behind auth), so CSR is appropriate. The key challenges are:</p>
<ul>
<li>Loading and rendering large datasets efficiently</li>
<li>Multiple independent data sources per page</li>
<li>Real-time updates without overwhelming the UI</li>
<li>Complex interactions (zoom, filter, drill-down)</li>
</ul>
<p>Architecture: CSR app with React, chart library (D3 or Recharts), and independent data fetching per widget.</p>`,
      components: `<pre>App
├── TopBar
│   ├── Logo
│   ├── GlobalDateRangePicker
│   ├── RefreshButton
│   └── UserMenu
├── Sidebar
│   ├── DashboardList
│   ├── FavoriteDashboards
│   └── CreateDashboardButton
├── DashboardPage
│   ├── DashboardHeader (title, share, export, edit mode toggle)
│   ├── FilterBar (dimension filters applied to all widgets)
│   └── WidgetGrid (drag-and-drop in edit mode)
│       └── Widget
│           ├── WidgetHeader (title, timeframe indicator, menu)
│           ├── WidgetContent
│           │   ├── LineChart
│           │   ├── BarChart
│           │   ├── PieChart
│           │   ├── DataTable (sortable, paginated)
│           │   ├── MetricCard (big number + trend)
│           │   └── HeatMap
│           └── WidgetFooter (last updated, loading indicator)
├── ReportBuilder
│   ├── DimensionSelector
│   ├── MetricSelector
│   ├── FilterBuilder
│   ├── VisualizationPicker
│   └── PreviewPanel
└── ExportModal</pre>`,
      stateStrategy: `<ul>
<li><strong>Server state (React Query per widget):</strong> Each widget fetches its data independently. This means one slow widget doesn't block others.</li>
<li><strong>Global filters:</strong> Date range and dimension filters stored in Context/Zustand. When they change, all widgets refetch with new params.</li>
<li><strong>URL state:</strong> Active dashboard, date range, applied filters — shareable URLs for specific views</li>
<li><strong>Widget layout:</strong> Grid positions saved to server (user's custom arrangement)</li>
<li><strong>Real-time updates:</strong> SSE or polling with different intervals per metric type</li>
</ul>`,
      apiStrategy: `<ul>
<li><strong>Query API:</strong> Accepts metric name, dimensions, filters, date range. Returns time-series or aggregated data.</li>
<li><strong>Dashboard Config API:</strong> Stores which widgets are on which dashboard, their positions, and configurations</li>
<li><strong>Export API:</strong> Server-side PDF/CSV generation for large datasets</li>
<li><strong>Real-time API:</strong> SSE stream for metrics that update frequently. Different streams for different update frequencies.</li>
</ul>
<p>Key pattern: Each widget makes its own API call with the global date range + its specific metric configuration. Widgets are independent—one failing doesn't break others.</p>`,
      performance: `<ul>
<li><strong>Independent widget loading:</strong> Each widget shows its own skeleton/spinner. Fast widgets appear quickly; slow ones load independently.</li>
<li><strong>Data aggregation:</strong> Request pre-aggregated data from the server. Don't send raw data to the client for processing.</li>
<li><strong>Virtualized tables:</strong> For data tables with 1000+ rows, use virtualization</li>
<li><strong>Canvas vs SVG for charts:</strong> SVG for under 1000 data points (interactive, accessible). Canvas for larger datasets (faster rendering).</li>
<li><strong>Memoize chart rendering:</strong> Don't re-render charts when unrelated widgets update</li>
<li><strong>Lazy load chart libraries:</strong> Only load the charting code for chart types actually on the dashboard</li>
</ul>`,
      accessibility: `<ul>
<li>Charts with data table alternatives for screen readers</li>
<li>Keyboard navigation for dashboard grid</li>
<li>Date range picker fully keyboard accessible</li>
<li>Color-blind safe chart palettes (don't rely solely on color)</li>
<li>ARIA live regions for real-time metric updates</li>
<li>Table sorting and filtering announced to screen readers</li>
</ul>`,
      tradeoffs: `<ul>
<li><strong>Real-time vs polling:</strong> True real-time (WebSocket/SSE) for critical metrics. Polling every 60s for less critical ones. Don't over-engineer.</li>
<li><strong>Pre-aggregated vs raw data:</strong> Pre-aggregated is faster but less flexible. Offer "explore" mode that queries raw data for power users.</li>
<li><strong>SVG vs Canvas charts:</strong> SVG is accessible (screen readers can read elements) but slow with many data points. Canvas is fast but inaccessible. Provide data tables as fallback.</li>
<li><strong>Custom chart library vs off-the-shelf:</strong> Off-the-shelf (Recharts, Chart.js) for standard charts. Custom D3 only for unique visualizations that libraries don't support.</li>
</ul>`,
      summary: `<p>Analytics dashboard is a CSR app optimized for independent data loading per widget, real-time updates for critical metrics, and efficient rendering of large datasets. Key architectural decisions: widgets as independent units with their own data lifecycle, global filters propagated via context, chart rendering strategy based on data volume (SVG vs Canvas), and progressive loading so fast widgets appear immediately while slow ones show loading states.</p>`
    }
  },
  {
    id: "collaborative-editor",
    title: "Design a Collaborative Document Editor",
    description: "Real-time collaborative editing like Google Docs with presence and comments",
    content: {
      requirements: `<ul>
<li>Rich text editing (headings, bold, italic, lists, links, images)</li>
<li>Real-time collaboration (multiple cursors, simultaneous editing)</li>
<li>Presence (who's viewing/editing the document)</li>
<li>Comments and suggestions</li>
<li>Version history</li>
<li>Document sharing with permissions (view, comment, edit)</li>
<li>Offline editing with sync on reconnect</li>
<li>Works well on desktop; basic editing on tablet</li>
</ul>`,
      architecture: `<p>A collaborative editor is one of the hardest frontend system design problems. It requires:</p>
<ul>
<li>A CRDT (Conflict-free Replicated Data Type) or OT (Operational Transformation) algorithm for concurrent edits</li>
<li>WebSocket connection for real-time sync</li>
<li>Complex text rendering with rich formatting</li>
<li>Undo/redo that works per-user even during collaboration</li>
</ul>
<p>Technology choice: Use a library like Yjs (CRDT) or Slate.js/ProseMirror for the editor, with WebSocket for sync. Don't build CRDT from scratch in an interview—acknowledge the complexity and focus on the frontend architecture around it.</p>`,
      components: `<pre>App
├── DocumentList
│   ├── SearchBar
│   ├── FolderNavigation
│   └── DocumentGrid
│       └── DocumentCard (title, last edited, shared users)
├── EditorPage
│   ├── Toolbar
│   │   ├── FormattingButtons (bold, italic, heading, list, etc.)
│   │   ├── InsertMenu (image, table, link, divider)
│   │   ├── UndoRedo
│   │   └── ShareButton
│   ├── PresenceBar (avatars of active editors)
│   ├── EditorCanvas
│   │   ├── DocumentContent (rich text)
│   │   ├── RemoteCursors (other users' cursor positions)
│   │   ├── SelectionHighlights (other users' selections)
│   │   └── CommentMarkers
│   ├── CommentsSidebar
│   │   └── CommentThread
│   │       ├── Comment (author, time, text)
│   │       └── ReplyInput
│   └── StatusBar (saving status, word count, connection)
├── VersionHistory
│   ├── VersionList
│   ├── DiffView
│   └── RestoreButton
└── ShareModal
    ├── PeopleWithAccess
    ├── InviteInput
    └── PermissionSelector</pre>`,
      stateStrategy: `<ul>
<li><strong>Document content (CRDT):</strong> The document model lives in a CRDT (Yjs). This handles merge conflicts automatically when multiple users edit simultaneously.</li>
<li><strong>Awareness/Presence:</strong> Yjs awareness protocol broadcasts cursor positions and user info to all connected peers</li>
<li><strong>Server state:</strong> Document metadata, permissions, comments, version history (fetched via REST)</li>
<li><strong>Local state:</strong> Toolbar active state, sidebar open/closed, zoom level</li>
<li><strong>Undo/redo:</strong> Per-user undo stack that only reverts that user's changes, not collaborators'</li>
<li><strong>Offline:</strong> CRDT changes stored locally (IndexedDB). Synced when connection restores.</li>
</ul>`,
      apiStrategy: `<ul>
<li><strong>WebSocket:</strong> Real-time document sync (CRDT updates), cursor positions, presence</li>
<li><strong>REST API:</strong> Document CRUD, permissions, comments, version history, image upload</li>
<li><strong>Sync protocol:</strong> Client sends CRDT updates to server; server broadcasts to other clients. Server persists the CRDT document state.</li>
<li><strong>Image upload:</strong> Upload to CDN, insert URL reference into document. Progressive loading with placeholder.</li>
</ul>`,
      performance: `<ul>
<li><strong>Rendering:</strong> Only re-render changed paragraphs, not the entire document. The editor library handles this internally.</li>
<li><strong>Large documents:</strong> Virtualize if document exceeds viewport by a lot. Only render visible pages for very long documents.</li>
<li><strong>CRDT update batching:</strong> Don't send every keystroke individually. Batch updates every 50-100ms.</li>
<li><strong>Lazy load features:</strong> Image upload dialog, version history panel, share modal loaded on demand.</li>
<li><strong>Debounce save indicator:</strong> Show "saving..." only when there are pending sync operations. Show "saved" when all changes are confirmed.</li>
</ul>`,
      accessibility: `<ul>
<li>Toolbar buttons with proper labels and keyboard shortcuts</li>
<li>Rich text semantics (headings are real headings, lists are real lists)</li>
<li>Screen reader announcements for collaborative presence ("Alex started editing")</li>
<li>Keyboard shortcuts for all formatting (Cmd+B, Cmd+I, etc.)</li>
<li>Focus management for modal dialogs (share, insert link)</li>
<li>Document structure navigation for screen readers</li>
</ul>`,
      tradeoffs: `<ul>
<li><strong>CRDT vs OT:</strong> CRDTs (Yjs) work peer-to-peer and handle offline. OT (Google Docs approach) requires a server to transform operations. CRDTs are more frontend-friendly.</li>
<li><strong>Custom editor vs library:</strong> Building from scratch gives full control but is years of work. Libraries (ProseMirror, Slate, TipTap) give 90% of functionality with less effort.</li>
<li><strong>Real-time vs periodic sync:</strong> Real-time feels collaborative but uses more bandwidth. Could batch sync every second without users noticing for most typing.</li>
<li><strong>Offline support complexity:</strong> Full offline editing requires conflict resolution on reconnect. Simpler to disable editing offline and just show cached read-only version.</li>
</ul>`,
      summary: `<p>A collaborative editor is architecturally centered around a CRDT (like Yjs) that handles the core challenge of concurrent edits without conflicts. The frontend wraps this with: a rich text editor UI (ProseMirror/TipTap), real-time presence via WebSocket, offline support through IndexedDB persistence of the CRDT state, and REST APIs for metadata operations. Key insight: the CRDT handles the hard problem (concurrent edits); the frontend's job is providing a smooth UX on top of it—responsive typing, smooth remote cursor rendering, and clear collaboration indicators.</p>`
    }
  }
];
