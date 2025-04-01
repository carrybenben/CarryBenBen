import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Waitlist for interested clients
export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  company: text("company"),
  serviceInterest: text("service_interest"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Coal services (main service categories)
export const coalServices = pgTable("coal_services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(),
  
  // Multi-language content
  nameEn: text("name_en").notNull(),
  nameCn: text("name_cn").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionCn: text("description_cn").notNull(),
  
  featuresEn: jsonb("features_en").notNull(),
  featuresCn: jsonb("features_cn").notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Service pages (detailed pages for each service)
export const servicePages = pgTable("service_pages", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull().references(() => coalServices.id),
  slug: text("slug").notNull().unique(),
  
  // Multi-language content
  titleEn: text("title_en").notNull(),
  titleCn: text("title_cn").notNull(),
  contentEn: text("content_en").notNull(),
  contentCn: text("content_cn").notNull(),
  
  imageUrl: text("image_url"),
  metaDescription: text("meta_description"),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Consultation requests
export const consultationRequests = pgTable("consultation_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  serviceType: text("service_type").notNull(),
  message: text("message").notNull(),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Testing agencies (third-party coal quality inspection agencies)
export const testingAgencies = pgTable("testing_agencies", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(), // Unique agency code
  
  // Multi-language content
  nameEn: text("name_en").notNull(),
  nameCn: text("name_cn").notNull(),
  descriptionEn: text("description_en"),
  descriptionCn: text("description_cn"),
  
  address: text("address"),
  contactPerson: text("contact_person"),
  contactPhone: text("contact_phone"),
  contactEmail: text("contact_email"),
  
  // Agency certifications and accreditations
  certifications: jsonb("certifications"),
  
  // API connection information (for direct data integration)
  apiEndpoint: text("api_endpoint"),
  apiKey: text("api_key"),
  
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Testing items (parameters that can be tested)
export const testingItems = pgTable("testing_items", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(), // Unique item code (e.g., CV, MT, ASH)
  
  // Multi-language content
  nameEn: text("name_en").notNull(),
  nameCn: text("name_cn").notNull(),
  descriptionEn: text("description_en"),
  descriptionCn: text("description_cn"),
  
  unit: text("unit").notNull(), // Measurement unit
  minValue: decimal("min_value"), // Minimum possible value
  maxValue: decimal("max_value"), // Maximum possible value
  standardValue: decimal("standard_value"), // Reference standard value
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Testing records (actual test results)
export const testingRecords = pgTable("testing_records", {
  id: serial("id").primaryKey(),
  agencyId: integer("agency_id").notNull().references(() => testingAgencies.id),
  userId: integer("user_id").references(() => users.id),
  
  // Coal sample information
  sampleId: text("sample_id").notNull(),
  sampleDate: date("sample_date").notNull(),
  sampleLocation: text("sample_location"),
  coalType: text("coal_type"),
  
  // Test information
  testDate: date("test_date").notNull(),
  testReport: text("test_report"), // Report number or identifier
  
  // Test results (stored as JSON for flexibility)
  results: jsonb("results").notNull(), // Array of {itemCode, value, weight}
  
  // Weighted average results (calculated)
  weightedResults: jsonb("weighted_results"),
  
  notes: text("notes"),
  attachments: jsonb("attachments"), // URLs to attached documents, images
  
  status: text("status").default("completed").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schemas for inserting data
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const insertWaitlistSchema = createInsertSchema(waitlistEntries).pick({
  name: true,
  email: true,
  company: true,
  serviceInterest: true,
  message: true,
});

export const insertCoalServiceSchema = createInsertSchema(coalServices).pick({
  slug: true,
  icon: true,
  nameEn: true,
  nameCn: true,
  descriptionEn: true,
  descriptionCn: true,
  featuresEn: true,
  featuresCn: true,
});

export const insertServicePageSchema = createInsertSchema(servicePages).pick({
  serviceId: true,
  slug: true,
  titleEn: true,
  titleCn: true,
  contentEn: true,
  contentCn: true,
  imageUrl: true,
  metaDescription: true,
  isPublished: true,
});

export const insertConsultationRequestSchema = createInsertSchema(consultationRequests).pick({
  name: true,
  email: true,
  company: true,
  phone: true,
  serviceType: true,
  message: true,
});

// Testing agencies schema
export const insertTestingAgencySchema = createInsertSchema(testingAgencies).pick({
  code: true,
  nameEn: true,
  nameCn: true,
  descriptionEn: true,
  descriptionCn: true,
  address: true,
  contactPerson: true,
  contactPhone: true,
  contactEmail: true,
  certifications: true,
  apiEndpoint: true,
  apiKey: true,
  isActive: true,
});

// Testing items schema
export const insertTestingItemSchema = createInsertSchema(testingItems).pick({
  code: true,
  nameEn: true,
  nameCn: true,
  descriptionEn: true,
  descriptionCn: true,
  unit: true,
  minValue: true,
  maxValue: true,
  standardValue: true,
});

// Testing records schema
export const insertTestingRecordSchema = createInsertSchema(testingRecords).pick({
  agencyId: true,
  userId: true,
  sampleId: true,
  sampleDate: true,
  sampleLocation: true,
  coalType: true,
  testDate: true,
  testReport: true,
  results: true,
  weightedResults: true,
  notes: true,
  attachments: true,
  status: true,
});

// 煤炭产品表 - 用于煤险处置
export const coalProducts = pgTable("coal_products", {
  id: serial("id").primaryKey(),
  productCode: text("product_code").notNull().unique(),
  titleCn: text("title_cn").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionCn: text("description_cn"),
  descriptionEn: text("description_en"),
  coalType: text("coal_type").notNull(),
  quantity: decimal("quantity").notNull(), // 以吨为单位
  originalPrice: decimal("original_price").notNull(), // 原始价格
  currentPrice: decimal("current_price").notNull(), // 当前价格
  location: text("location").notNull(), // 存放位置
  quality: jsonb("quality").$type<Record<string, string | number>>().notNull(), // 煤炭质量参数
  imageUrl: text("image_url"),
  status: text("status").default("available").notNull(), // available, reserved, sold
  disposalType: text("disposal_type").notNull(), // auction(竞拍), discount(定向降价)
  auctionEndTime: timestamp("auction_end_time"), // 竞拍结束时间（如果是竞拍）
  minDiscountPrice: decimal("min_discount_price"), // 最低折扣价（如果是定向降价）
  collateralRatio: decimal("collateral_ratio"), // 原抵押比率
  riskLevel: text("risk_level").notNull(), // high, medium, low
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 竞拍出价表
export const coalBids = pgTable("coal_bids", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => coalProducts.id),
  userId: integer("user_id").references(() => users.id),
  bidderName: text("bidder_name").notNull(),
  bidderContact: text("bidder_contact").notNull(),
  bidAmount: decimal("bid_amount").notNull(),
  bidTime: timestamp("bid_time").defaultNow().notNull(),
  status: text("status").default("pending").notNull(), // pending, accepted, rejected
  notes: text("notes"),
});

// 煤炭订单表
export const coalOrders = pgTable("coal_orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  productId: integer("product_id").notNull().references(() => coalProducts.id),
  userId: integer("user_id").references(() => users.id),
  buyerName: text("buyer_name").notNull(),
  buyerContact: text("buyer_contact").notNull(),
  buyerCompany: text("buyer_company"),
  quantity: decimal("quantity").notNull(),
  totalAmount: decimal("total_amount").notNull(),
  paymentStatus: text("payment_status").default("pending").notNull(), // pending, paid, refunded
  deliveryStatus: text("delivery_status").default("pending").notNull(), // pending, processing, shipped, delivered
  transactionType: text("transaction_type").notNull(), // auction, direct
  bidId: integer("bid_id").references(() => coalBids.id), // 如果是通过竞拍购买
  deliveryAddress: text("delivery_address"),
  deliveryContact: text("delivery_contact"),
  deliveryPhone: text("delivery_phone"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 产品收藏表
export const coalFavorites = pgTable("coal_favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  productId: integer("product_id").notNull().references(() => coalProducts.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 插入数据模式定义
export const insertCoalProductSchema = createInsertSchema(coalProducts).pick({
  productCode: true,
  titleCn: true,
  titleEn: true,
  descriptionCn: true,
  descriptionEn: true,
  coalType: true,
  quantity: true,
  originalPrice: true,
  currentPrice: true,
  location: true,
  quality: true,
  imageUrl: true,
  status: true,
  disposalType: true,
  auctionEndTime: true,
  minDiscountPrice: true,
  collateralRatio: true,
  riskLevel: true,
});

export const insertCoalBidSchema = createInsertSchema(coalBids).pick({
  productId: true,
  userId: true,
  bidderName: true,
  bidderContact: true,
  bidAmount: true,
  status: true,
  notes: true,
});

export const insertCoalOrderSchema = createInsertSchema(coalOrders).pick({
  orderNumber: true,
  productId: true,
  userId: true,
  buyerName: true,
  buyerContact: true,
  buyerCompany: true,
  quantity: true,
  totalAmount: true,
  paymentStatus: true,
  deliveryStatus: true,
  transactionType: true,
  bidId: true,
  deliveryAddress: true,
  deliveryContact: true,
  deliveryPhone: true,
  notes: true,
});

export const insertCoalFavoriteSchema = createInsertSchema(coalFavorites).pick({
  userId: true,
  productId: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistSchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;

export type InsertCoalService = z.infer<typeof insertCoalServiceSchema>;
export type CoalService = typeof coalServices.$inferSelect;

export type InsertServicePage = z.infer<typeof insertServicePageSchema>;
export type ServicePage = typeof servicePages.$inferSelect;

export type InsertConsultationRequest = z.infer<typeof insertConsultationRequestSchema>;
export type ConsultationRequest = typeof consultationRequests.$inferSelect;

export type InsertTestingAgency = z.infer<typeof insertTestingAgencySchema>;
export type TestingAgency = typeof testingAgencies.$inferSelect;

export type InsertTestingItem = z.infer<typeof insertTestingItemSchema>;
export type TestingItem = typeof testingItems.$inferSelect;

export type InsertTestingRecord = z.infer<typeof insertTestingRecordSchema>;
export type TestingRecord = typeof testingRecords.$inferSelect;

export type InsertCoalProduct = z.infer<typeof insertCoalProductSchema>;
export type CoalProduct = typeof coalProducts.$inferSelect;

export type InsertCoalBid = z.infer<typeof insertCoalBidSchema>;
export type CoalBid = typeof coalBids.$inferSelect;

export type InsertCoalOrder = z.infer<typeof insertCoalOrderSchema>;
export type CoalOrder = typeof coalOrders.$inferSelect;

export type InsertCoalFavorite = z.infer<typeof insertCoalFavoriteSchema>;
export type CoalFavorite = typeof coalFavorites.$inferSelect;
