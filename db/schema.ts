import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  numeric,
  boolean,
  jsonb,
  date,
} from "drizzle-orm/pg-core";

// ─── Enums ─────────────────────────────────────────────────────────
export const roleEnum = pgEnum("role", ["client", "companion", "admin"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "inactive", "cancelled"]);
export const planEnum = pgEnum("plan", ["companion", "client"]);
export const subscriptionPlanStatusEnum = pgEnum("subscription_plan_status", ["active", "cancelled", "expired"]);
export const transactionTypeEnum = pgEnum("transaction_type", [
  "subscription",
  "media_sale",
  "gift",
  "tip",
  "featured_fee",
  "withdrawal",
  "referral_bonus",
]);
export const transactionStatusEnum = pgEnum("transaction_status", ["pending", "completed", "failed", "refunded"]);
export const withdrawalStatusEnum = pgEnum("withdrawal_status", ["pending", "processing", "completed", "rejected"]);
export const blogStatusEnum = pgEnum("blog_status", ["draft", "published", "archived"]);
export const campaignStatusEnum = pgEnum("campaign_status", ["active", "paused", "ended"]);
export const targetPeriodEnum = pgEnum("target_period", ["daily", "weekly"]);

// ─── Users ───────────────────────────────────────────────────────────
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 320 }),
  name: varchar("name", { length: 255 }),
  avatar: text("avatar"),
  role: roleEnum("role").default("client").notNull(),
  bio: text("bio"),
  location: varchar("location", { length: 100 }),
  age: integer("age"),
  isFeatured: boolean("is_featured").notNull().default(false),
  featuredExpiresAt: timestamp("featured_expires_at", { withTimezone: true }),
  referralCode: varchar("referral_code", { length: 20 }).unique(),
  referredBy: integer("referred_by"),
  subscriptionStatus: subscriptionStatusEnum("subscription_status").default("inactive").notNull(),
  subscriptionExpiresAt: timestamp("subscription_expires_at", { withTimezone: true }),
  walletBalance: numeric("wallet_balance", { precision: 10, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Subscriptions ───────────────────────────────────────────────────
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  plan: planEnum("plan").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  status: subscriptionPlanStatusEnum("status").default("active").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  paymentMethod: varchar("payment_method", { length: 50 }),
  transactionRef: varchar("transaction_ref", { length: 100 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;

// ─── Conversations ───────────────────────────────────────────────────
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  user1Id: integer("user1_id").notNull(),
  user2Id: integer("user2_id").notNull(),
  lastMessageAt: timestamp("last_message_at", { withTimezone: true }),
  unreadCountUser1: integer("unread_count_user1").notNull().default(0),
  unreadCountUser2: integer("unread_count_user2").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;

// ─── Messages ────────────────────────────────────────────────────────
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  receiverId: integer("receiver_id").notNull(),
  conversationId: integer("conversation_id").notNull(),
  content: text("content"),
  mediaUrl: varchar("media_url", { length: 500 }),
  mediaPrice: numeric("media_price", { precision: 10, scale: 2 }).default("0"),
  isPaid: boolean("is_paid").notNull().default(false),
  isBlocked: boolean("is_blocked").notNull().default(false),
  blockReason: varchar("block_reason", { length: 100 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;

// ─── Transactions ────────────────────────────────────────────────────
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  fromUser: integer("from_user"),
  toUser: integer("to_user"),
  type: transactionTypeEnum("type").notNull(),
  grossAmount: numeric("gross_amount", { precision: 10, scale: 2 }).notNull(),
  platformCut: numeric("platform_cut", { precision: 10, scale: 2 }).default("0"),
  companionCut: numeric("companion_cut", { precision: 10, scale: 2 }).default("0"),
  processingFee: numeric("processing_fee", { precision: 10, scale: 2 }).default("0"),
  netPayout: numeric("net_payout", { precision: 10, scale: 2 }).default("0"),
  status: transactionStatusEnum("status").default("completed").notNull(),
  paymentGateway: varchar("payment_gateway", { length: 50 }),
  reference: varchar("reference", { length: 100 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;

// ─── Withdrawal Requests ─────────────────────────────────────────────
export const withdrawalRequests = pgTable("withdrawal_requests", {
  id: serial("id").primaryKey(),
  companionId: integer("companion_id").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  processingFee: numeric("processing_fee", { precision: 10, scale: 2 }).notNull(),
  netAmount: numeric("net_amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
  paymentDetails: jsonb("payment_details"),
  status: withdrawalStatusEnum("status").default("pending").notNull(),
  requestedAt: timestamp("requested_at", { withTimezone: true }).defaultNow().notNull(),
  processedAt: timestamp("processed_at", { withTimezone: true }),
});

export type WithdrawalRequest = typeof withdrawalRequests.$inferSelect;

// ─── Gifts ───────────────────────────────────────────────────────────
export const gifts = pgTable("gifts", {
  id: serial("id").primaryKey(),
  fromClient: integer("from_client").notNull(),
  toCompanion: integer("to_companion").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  companionShare: numeric("companion_share", { precision: 10, scale: 2 }).notNull(),
  platformShare: numeric("platform_share", { precision: 10, scale: 2 }).notNull(),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Gift = typeof gifts.$inferSelect;

// ─── Referrals ───────────────────────────────────────────────────────
export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerId: integer("referrer_id").notNull(),
  referredUserId: integer("referred_user_id").notNull(),
  rewardAmount: numeric("reward_amount", { precision: 10, scale: 2 }).default("5.00"),
  rewardPaid: boolean("reward_paid").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Referral = typeof referrals.$inferSelect;

// ─── Blog Posts ──────────────────────────────────────────────────────
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  metaDescription: varchar("meta_description", { length: 300 }),
  keywords: jsonb("keywords"),
  seoScore: integer("seo_score"),
  status: blogStatusEnum("status").default("published").notNull(),
  generatedBy: varchar("generated_by", { length: 50 }).default("gpt-4"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;

// ─── DM Violations ───────────────────────────────────────────────────
export const dmViolations = pgTable("dm_violations", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  receiverId: integer("receiver_id").notNull(),
  attemptedContent: text("attempted_content"),
  violationType: varchar("violation_type", { length: 50 }).notNull(),
  detectedAt: timestamp("detected_at", { withTimezone: true }).defaultNow().notNull(),
});

export type DmViolation = typeof dmViolations.$inferSelect;

// ─── Ad Campaigns ────────────────────────────────────────────────────
export const adCampaigns = pgTable("ad_campaigns", {
  id: serial("id").primaryKey(),
  platform: varchar("platform", { length: 50 }).notNull(),
  campaignName: varchar("campaign_name", { length: 255 }).notNull(),
  spend: numeric("spend", { precision: 10, scale: 2 }).default("0"),
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  signups: integer("signups").default(0),
  costPerSignup: numeric("cost_per_signup", { precision: 10, scale: 2 }),
  status: campaignStatusEnum("status").default("active").notNull(),
  date: date("date").notNull(),
});

export type AdCampaign = typeof adCampaigns.$inferSelect;

// ─── Signup Targets ──────────────────────────────────────────────────
export const signupTargets = pgTable("signup_targets", {
  id: serial("id").primaryKey(),
  period: targetPeriodEnum("period").notNull(),
  targetCount: integer("target_count").notNull(),
  currentCount: integer("current_count").default(0),
  setAt: timestamp("set_at", { withTimezone: true }).defaultNow().notNull(),
});

export type SignupTarget = typeof signupTargets.$inferSelect;
