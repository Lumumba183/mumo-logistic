// ─── Mock User Data ─────────────────────────────────────────────────
export const mockUserClient = {
  id: "user-001",
  email: "alex@elitehub.com",
  name: "Alexander Sterling",
  role: "client",
  avatar: "/assets/companion-avatar-1.jpg",
  location: "New York",
};

export const mockUserCompanion = {
  id: "comp-001",
  email: "sophia@elitehub.com",
  name: "Sophia Chen",
  role: "companion",
  avatar: "/assets/companion-avatar-1.jpg",
  location: "New York",
};

export const mockUserAdmin = {
  id: "admin-001",
  email: "ceo@elitehub.com",
  name: "CEO EliteHub",
  role: "admin",
  avatar: "/assets/companion-avatar-2.jpg",
  location: "London",
};

// ─── Mock Stats ───────────────────────────────────────────────────────
export const mockStats = {
  client: {
    walletBalance: 2450.0,
    monthlyEarnings: 0,
    monthlySpending: 890.0,
    unreadMessages: 3,
    profileViews: 0,
  },
  companion: {
    walletBalance: 3850.0,
    monthlyEarnings: 4200.0,
    monthlySpending: 0,
    unreadMessages: 5,
    profileViews: 128,
  },
  admin: {
    walletBalance: 10000.0,
    monthlyEarnings: 0,
    monthlySpending: 0,
    unreadMessages: 12,
    profileViews: 0,
  },
};

// ─── Mock Transactions ────────────────────────────────────────────
export const mockTransactions = [
  { id: "tx-1", type: "gift", grossAmount: 150.0, toUser: true, createdAt: "2026-06-25T14:00:00Z" },
  { id: "tx-2", type: "withdrawal", grossAmount: 500.0, toUser: false, createdAt: "2026-06-23T10:00:00Z" },
  { id: "tx-3", type: "tip", grossAmount: 75.0, toUser: true, createdAt: "2026-06-20T18:00:00Z" },
  { id: "tx-4", type: "gift", grossAmount: 200.0, toUser: true, createdAt: "2026-06-18T12:00:00Z" },
  { id: "tx-5", type: "withdrawal", grossAmount: 300.0, toUser: false, createdAt: "2026-06-15T09:00:00Z" },
];

// ─── Mock Featured Companions ───────────────────────────────────────
export const mockFeaturedCompanions = [
  { id: "c-1", name: "Sophia Chen", location: "New York", avatar: "/assets/companion-avatar-1.jpg", isFeatured: true },
  { id: "c-2", name: "Marcus Rivera", location: "London", avatar: "/assets/companion-avatar-2.jpg", isFeatured: true },
  { id: "c-3", name: "Isabella Romano", location: "Milan", avatar: "/assets/companion-avatar-3.jpg", isFeatured: true },
  { id: "c-4", name: "Victoria Ashford", location: "Los Angeles", avatar: "/assets/companion-avatar-4.jpg", isFeatured: true },
  { id: "c-5", name: "James Whitfield", location: "Dubai", avatar: "/assets/companion-avatar-5.jpg", isFeatured: false },
  { id: "c-6", name: "Anastasia Volkov", location: "Paris", avatar: "/assets/companion-avatar-6.jpg", isFeatured: false },
];

// ─── Mock Blog Posts ────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  content: string;
  coverImage: string;
  keywords: string[];
  seoScore: number;
  createdAt: string;
  readTime: string;
  hashtags: string[];
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "how-to-build-premium-companion-brand",
    title: "How to Build a Premium Companion Brand in 2026: The Elite Guide",
    metaDescription: "Discover the strategies top-tier companions use to build a luxury brand, attract high-value clients, and maximize earnings on EliteHub. From profile optimization to personal branding.",
    coverImage: "/assets/blog-cover-1.jpg",
    keywords: ["companion branding", "premium companion", "luxury brand", "high-value clients", "companion marketing"],
    seoScore: 96,
    readTime: "8 min read",
    createdAt: "2026-06-20T10:00:00Z",
    hashtags: ["#EliteCompanion", "#LuxuryLifestyle", "#PremiumBranding", "#CompanionTips", "#EliteHub"],
    content: `<p class="lead">In the ever-evolving world of premium companionship, your brand is everything. It is the difference between a forgettable encounter and a client who books you exclusively for months. At <strong>EliteHub</strong>, we have analyzed the top 1% of earners and identified the exact blueprint they follow.</p>

<h2>1. Define Your Unique Value Proposition</h2>
<p>What makes <em>you</em> different? The most successful companions do not try to appeal to everyone. They niche down. Whether it is the intellectual conversationalist, the adventure-seeking travel companion, or the sophisticated dinner date, your brand needs a clear identity.</p>
<blockquote>"Clients do not pay for time. They pay for an experience they cannot get anywhere else." — EliteHub Top Earner</blockquote>

<h2>2. Invest in Professional Photography</h2>
<p>Your photos are your first impression. High-quality, professional imagery increases profile views by <strong>340%</strong> on EliteHub. Consider hiring a luxury lifestyle photographer who understands lighting, composition, and the art of subtle seduction.</p>

<h2>3. Craft a Magnetic Bio</h2>
<p>Your bio should tell a story, not just list services. Use sensory language. Paint a picture of the experience. The top profiles read like poetry, not classified ads.</p>

<h2>4. Leverage AI-Powered Growth Tools</h2>
<p>EliteHub's built-in AI Content Studio automatically generates blog posts, social media captions, and marketing campaigns tailored to your brand voice. This saves hours of manual work and ensures consistent, high-quality content.</p>

<h2>5. Build a Loyal Client Base</h2>
<p>Repeat clients spend 4x more than one-time visitors. Offer exclusive packages, personalized experiences, and loyalty perks. The most successful companions treat their regulars like VIPs.</p>

<h2>Ready to Elevate Your Brand?</h2>
<p><a href="/register" class="cta-link">Join EliteHub today</a> and start building the premium brand you deserve. With our AI tools, secure payments, and featured placement options, your success is just one click away.</p>`,
  },
  {
    id: "blog-2",
    slug: "safety-security-premium-companion-platform",
    title: "Safety & Security: Why EliteHub is the Safest Premium Companion Platform",
    metaDescription: "Learn how EliteHub protects both companions and clients with end-to-end encryption, identity verification, escrow payments, and 24/7 monitoring. Your safety is our priority.",
    coverImage: "/assets/blog-cover-2.jpg",
    keywords: ["companion safety", "secure platform", "privacy protection", "escrow payments", "verified profiles"],
    seoScore: 94,
    readTime: "6 min read",
    createdAt: "2026-06-18T14:00:00Z",
    hashtags: ["#CompanionSafety", "#PrivacyFirst", "#SecurePlatform", "#VerifiedOnly", "#EliteHub"],
    content: `<p class="lead">In an industry where discretion and security are paramount, <strong>EliteHub</strong> has invested millions in building the most secure platform for premium companionship. Here is exactly how we protect you.</p>

<h2>1. End-to-End Encrypted Messaging</h2>
<p>Every conversation on EliteHub is protected with military-grade encryption. No one can read your messages except you and the intended recipient — not even our engineering team.</p>

<h2>2. Rigorous Identity Verification</h2>
<p>All companions undergo a thorough verification process including government ID checks, video verification, and background screening. Clients can book with confidence knowing every profile is 100% authentic.</p>

<h2>3. Escrow Payment Protection</h2>
<p>Funds are held in escrow until both parties confirm the transaction is complete. No chargebacks, no scams, no stress. Companions receive their earnings instantly upon confirmation.</p>

<h2>4. AI-Powered Threat Detection</h2>
<p>Our AI monitors all platform activity in real-time, detecting and blocking suspicious behavior before it reaches you. From fake accounts to harassment attempts, we stop threats at the source.</p>

<h2>5. 24/7 Support & Incident Response</h2>
<p>Our dedicated safety team is available around the clock. Whether you need immediate assistance or just want to report a concern, we are here.</p>

<h2>Your Safety is Non-Negotiable</h2>
<p><a href="/register" class="cta-link">Sign up for EliteHub</a> today and experience the peace of mind that comes with true security. Because you deserve a platform that puts your safety first.</p>`,
  },
  {
    id: "blog-3",
    slug: "maximize-earnings-companion-income-guide",
    title: "Maximize Your Earnings: The Companion's Guide to $10K+ Monthly Income",
    metaDescription: "Proven strategies to boost your companion income from $2K to $10K+ per month. Learn pricing psychology, upselling techniques, and revenue diversification from EliteHub's top earners.",
    coverImage: "/assets/blog-cover-3.jpg",
    keywords: ["companion income", "maximize earnings", "pricing strategy", "revenue diversification", "high earner tips"],
    seoScore: 97,
    readTime: "10 min read",
    createdAt: "2026-06-15T09:00:00Z",
    hashtags: ["#HighEarner", "#CompanionIncome", "#FinancialFreedom", "#EliteEarnings", "#EliteHub"],
    content: `<p class="lead">The average EliteHub companion earns <strong>$4,200 per month</strong>. But the top 5%? They clear $10,000+. What is their secret? It is not luck. It is a system. And today, we are sharing that system with you.</p>

<h2>1. Master the Art of Premium Pricing</h2>
<p>Most companions undercharge by 30-50%. Your rates should reflect the quality of your experience, not your insecurity. Research the market, then price at the top 20% of your niche. Clients who pay premium prices are also the most respectful.</p>

<h2>2. Diversify Your Revenue Streams</h2>
<p>Smart companions do not rely on bookings alone. On EliteHub, you can earn through:</p>
<ul>
<li><strong>Exclusive Content Sales</strong> — Sell photos, videos, and personalized experiences directly</li>
<li><strong>Virtual Sessions</strong> — Video calls and digital companionship for clients worldwide</li>
<li><strong>Gift System</strong> — Clients send gifts directly through the platform (50/50 split)</li>
<li><strong>Tips & Bonuses</strong> — Happy clients often tip 20-50% above the base rate</li>
</ul>

<h2>3. Optimize Your Profile for Maximum Visibility</h2>
<p>EliteHub's algorithm favors active, complete profiles. Update your photos weekly, respond to messages within 2 hours, and use all 6 featured photo slots. Active profiles get 5x more views.</p>

<h2>4. Create a Content Calendar</h2>
<p>Our AI Content Studio helps you maintain a consistent posting schedule across all platforms. Consistent content creators earn 60% more than those who post sporadically.</p>

<h2>5. Build Your Personal Brand Beyond the Platform</h2>
<p>Cross-promote on social media, collaborate with other companions, and build a personal website. EliteHub's featured placement puts you on the homepage carousel — a game-changer for visibility.</p>

<h2>Start Your Journey to $10K/Month</h2>
<p><a href="/register" class="cta-link">Create your EliteHub profile</a> and unlock the tools, audience, and earning potential you have been waiting for. The next high-value client is already browsing.</p>`,
  },
  {
    id: "blog-4",
    slug: "ai-powered-marketing-companion-growth",
    title: "AI-Powered Marketing: How EliteHub's AI Grows Your Companion Business Automatically",
    metaDescription: "Discover how EliteHub's AI Content Studio automates blog posts, social media marketing, SEO optimization, and ad campaigns so you can focus on what you do best.",
    coverImage: "/assets/blog-cover-1.jpg",
    keywords: ["AI marketing", "companion automation", "content studio", "SEO optimization", "social media growth"],
    seoScore: 95,
    readTime: "7 min read",
    createdAt: "2026-06-12T11:00:00Z",
    hashtags: ["#AIMarketing", "#ContentAutomation", "#GrowthHacking", "#CompanionGrowth", "#EliteHub"],
    content: `<p class="lead">Imagine having a full marketing team working 24/7 on your behalf — writing blog posts, crafting social media captions, optimizing your SEO, and running ad campaigns. That is exactly what <strong>EliteHub's AI Content Studio</strong> does for you.</p>

<h2>1. Automatic Blog Generation</h2>
<p>Our AI writes SEO-optimized blog posts in your brand voice, tailored to your niche and target audience. Each post is designed to rank on Google and attract high-value clients to your profile.</p>

<h2>2. Social Media Automation</h2>
<p>Never stare at a blank screen again. The AI generates Instagram captions, Twitter threads, and promotional copy that sounds authentically like you. Just review, edit if needed, and post.</p>

<h2>3. Smart SEO Optimization</h2>
<p>Every piece of content is optimized for search engines. The AI analyzes trending keywords, competitor strategies, and search intent to ensure your content ranks higher than the competition.</p>

<h2>4. Personalized Ad Campaigns</h2>
<p>EliteHub's AI creates targeted ad campaigns based on your ideal client profile. The system tests multiple creatives, optimizes budgets, and scales what works — all automatically.</p>

<h2>5. Analytics & Insights</h2>
<p>Your CEO Dashboard shows real-time data on what content performs best, which clients engage most, and where your growth opportunities lie. Make data-driven decisions, not guesses.</p>

<h2>Let AI Handle the Marketing, You Handle the Magic</h2>
<p><a href="/register" class="cta-link">Sign up for EliteHub</a> and activate your AI Content Studio today. Stop spending hours on marketing and start spending time on what truly matters.</p>`,
  },
  {
    id: "blog-5",
    slug: "etiquette-guide-premium-companion-clients",
    title: "The Ultimate Etiquette Guide for Premium Companion Clients",
    metaDescription: "Everything you need to know as a discerning client on EliteHub. From booking etiquette to communication best practices, ensure every experience is unforgettable.",
    coverImage: "/assets/blog-cover-2.jpg",
    keywords: ["companion etiquette", "client guide", "booking tips", "premium experience", "luxury companionship"],
    seoScore: 93,
    readTime: "5 min read",
    createdAt: "2026-06-10T16:00:00Z",
    hashtags: ["#CompanionEtiquette", "#LuxuryExperience", "#PremiumClient", "#EliteLifestyle", "#EliteHub"],
    content: `<p class="lead">Being an exceptional client is an art form. The best clients are not just generous — they are respectful, communicative, and memorable. On <strong>EliteHub</strong>, the most sought-after companions return again and again to clients who understand this. Here is your guide to becoming one of them.</p>

<h2>1. Communication is Everything</h2>
<p>Be clear, respectful, and timely in your messages. Introduce yourself properly, state your interests, and ask questions politely. A well-crafted first message increases your response rate by 85%.</p>

<h2>2. Respect Boundaries</h2>
<p>Every companion has their own comfort zone and boundaries. Read their profile carefully, respect their stated preferences, and never push for services they do not offer. The best experiences happen when both parties are comfortable.</p>

<h2>3. Be Punctual & Prepared</h2>
<p>Arrive on time, come well-groomed, and bring any agreed-upon items. First impressions matter. A client who shows up prepared and polished is always remembered fondly.</p>

<h2>4. Tipping is Appreciated</h2>
<p>While never required, tipping is a powerful way to show appreciation. EliteHub's built-in gift system makes it easy to send tips, gifts, and bonuses directly through the platform.</p>

<h2>5. Leave Reviews</h2>
<p>After a wonderful experience, leave a thoughtful review. It helps the companion grow their business and helps other clients make informed decisions. Reviews are the currency of trust on EliteHub.</p>

<h2>6. Book in Advance</h2>
<p>Popular companions book weeks ahead. Plan ahead and secure your preferred date. Last-minute requests are often declined by the most in-demand companions.</p>

<h2>Become a Client Who is Remembered</h2>
<p><a href="/register" class="cta-link">Join EliteHub as a client</a> and discover a world of premium companionship. The experience you have been waiting for is just one message away.</p>`,
  },
];
