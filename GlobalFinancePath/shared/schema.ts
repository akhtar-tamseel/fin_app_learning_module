import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const countries = pgTable("countries", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  currency: text("currency").notNull(),
  currencySymbol: text("currency_symbol").notNull(),
});

export const financialInstruments = pgTable("financial_instruments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  countryCode: text("country_code").notNull(),
  category: text("category").notNull(), // equity, debt, derivatives, etc.
  name: text("name").notNull(),
  description: text("description").notNull(),
  features: jsonb("features").$type<string[]>().notNull(),
  riskLevel: text("risk_level").notNull(), // low, medium, high
  minInvestment: text("min_investment"),
  taxation: text("taxation"),
});

export const savingsSchemes = pgTable("savings_schemes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  countryCode: text("country_code").notNull(),
  name: text("name").notNull(),
  tenure: text("tenure").notNull(),
  interestRate: text("interest_rate").notNull(),
  keyFeatures: jsonb("key_features").$type<string[]>().notNull(),
  taxBenefits: text("tax_benefits"),
  eligibility: text("eligibility"),
  minAmount: text("min_amount"),
  maxAmount: text("max_amount"),
});

export const taxRegulations = pgTable("tax_regulations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  countryCode: text("country_code").notNull(),
  regime: text("regime"), // new, old, standard
  taxSlabs: jsonb("tax_slabs").$type<Array<{
    range: string;
    rate: string;
    amount: string;
  }>>().notNull(),
  deductions: jsonb("deductions").$type<Array<{
    section: string;
    name: string;
    limit: string;
    description: string;
  }>>(),
  otherTaxes: jsonb("other_taxes").$type<Array<{
    name: string;
    rate: string;
    description: string;
  }>>,
});

export const recommendations = pgTable("recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  countryCode: text("country_code").notNull(),
  ageGroup: text("age_group").notNull(), // 20-30, 30-45, 45+
  occupation: text("occupation").notNull(), // salaried, self-employed, student
  instrumentTypes: jsonb("instrument_types").$type<string[]>().notNull(),
  schemes: jsonb("schemes").$type<string[]>().notNull(),
  description: text("description").notNull(),
});

export const insertCountrySchema = createInsertSchema(countries);
export const insertFinancialInstrumentSchema = createInsertSchema(financialInstruments);
export const insertSavingsSchemeSchema = createInsertSchema(savingsSchemes);
export const insertTaxRegulationSchema = createInsertSchema(taxRegulations);
export const insertRecommendationSchema = createInsertSchema(recommendations);

export type Country = typeof countries.$inferSelect;
export type FinancialInstrument = typeof financialInstruments.$inferSelect;
export type SavingsScheme = typeof savingsSchemes.$inferSelect;
export type TaxRegulation = typeof taxRegulations.$inferSelect;
export type Recommendation = typeof recommendations.$inferSelect;

export type InsertCountry = z.infer<typeof insertCountrySchema>;
export type InsertFinancialInstrument = z.infer<typeof insertFinancialInstrumentSchema>;
export type InsertSavingsScheme = z.infer<typeof insertSavingsSchemeSchema>;
export type InsertTaxRegulation = z.infer<typeof insertTaxRegulationSchema>;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;
