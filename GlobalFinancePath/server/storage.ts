import {
  type Country,
  type FinancialInstrument,
  type SavingsScheme,
  type TaxRegulation,
  type Recommendation,
  type InsertCountry,
  type InsertFinancialInstrument,
  type InsertSavingsScheme,
  type InsertTaxRegulation,
  type InsertRecommendation,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Countries
  getCountries(): Promise<Country[]>;
  getCountry(code: string): Promise<Country | undefined>;
  createCountry(country: InsertCountry): Promise<Country>;

  // Financial Instruments
  getFinancialInstruments(countryCode: string): Promise<FinancialInstrument[]>;
  createFinancialInstrument(instrument: InsertFinancialInstrument): Promise<FinancialInstrument>;

  // Savings Schemes
  getSavingsSchemes(countryCode: string): Promise<SavingsScheme[]>;
  createSavingsScheme(scheme: InsertSavingsScheme): Promise<SavingsScheme>;

  // Tax Regulations
  getTaxRegulations(countryCode: string): Promise<TaxRegulation[]>;
  createTaxRegulation(regulation: InsertTaxRegulation): Promise<TaxRegulation>;

  // Recommendations
  getRecommendations(countryCode: string): Promise<Recommendation[]>;
  createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation>;

  // Search
  searchContent(countryCode: string, query: string): Promise<{
    instruments: FinancialInstrument[];
    schemes: SavingsScheme[];
    regulations: TaxRegulation[];
  }>;
}

export class MemStorage implements IStorage {
  private countries: Map<string, Country> = new Map();
  private financialInstruments: Map<string, FinancialInstrument> = new Map();
  private savingsSchemes: Map<string, SavingsScheme> = new Map();
  private taxRegulations: Map<string, TaxRegulation> = new Map();
  private recommendations: Map<string, Recommendation> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize countries
    const countriesData: InsertCountry[] = [
      { id: "IN", name: "India", code: "IN", currency: "INR", currencySymbol: "₹" },
      { id: "ES", name: "Spain", code: "ES", currency: "EUR", currencySymbol: "€" },
      { id: "DE", name: "Germany", code: "DE", currency: "EUR", currencySymbol: "€" },
      { id: "MX", name: "Mexico", code: "MX", currency: "MXN", currencySymbol: "$" },
      { id: "US", name: "United States", code: "US", currency: "USD", currencySymbol: "$" },
    ];

    countriesData.forEach(country => {
      this.countries.set(country.code, country as Country);
    });

    // Initialize India data
    this.initializeIndiaData();
    this.initializeSpainData();
    this.initializeGermanyData();
    this.initializeMexicoData();
    this.initializeUSData();
  }

  private initializeIndiaData() {
    // India Financial Instruments
    const indiaInstruments: InsertFinancialInstrument[] = [
      {
        id: randomUUID(),
        countryCode: "IN",
        category: "Equity",
        name: "Stocks & Shares",
        description: "Direct ownership in companies listed on stock exchanges",
        features: ["High growth potential", "Dividend income", "Voting rights", "Market volatility"],
        riskLevel: "High",
        minInvestment: "₹1",
        taxation: "LTCG: 10% above ₹1L, STCG: 15%"
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        category: "Equity",
        name: "Mutual Funds",
        description: "Professionally managed investment pools",
        features: ["Diversification", "Professional management", "SIP options", "Liquidity"],
        riskLevel: "Medium to High",
        minInvestment: "₹500",
        taxation: "Based on holding period and fund type"
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        category: "Debt",
        name: "Government Bonds",
        description: "Fixed-income securities issued by government",
        features: ["Capital protection", "Fixed returns", "Government backing", "Tax efficiency"],
        riskLevel: "Low",
        minInvestment: "₹1,000",
        taxation: "Interest taxable as per slab"
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        category: "Derivatives",
        name: "Futures & Options",
        description: "Derivative contracts for hedging and speculation",
        features: ["Leverage", "Hedging capability", "Settlement options", "High risk"],
        riskLevel: "Very High",
        minInvestment: "Margin based",
        taxation: "Business income taxation"
      }
    ];

    indiaInstruments.forEach(instrument => {
      this.financialInstruments.set(instrument.id!, instrument as FinancialInstrument);
    });

    // India Savings Schemes
    const indiaSchemes: InsertSavingsScheme[] = [
      {
        id: randomUUID(),
        countryCode: "IN",
        name: "Public Provident Fund (PPF)",
        tenure: "15 years",
        interestRate: "7.1% p.a.",
        keyFeatures: ["Tax-free interest", "EEE status", "Loan facility", "Partial withdrawal"],
        taxBenefits: "Section 80C deduction up to ₹1.5L",
        eligibility: "Indian residents",
        minAmount: "₹500",
        maxAmount: "₹1,50,000"
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        name: "National Savings Certificate (NSC)",
        tenure: "5 years",
        interestRate: "6.8% p.a.",
        keyFeatures: ["Fixed interest", "Government backing", "Compounding benefits", "Transferable"],
        taxBenefits: "Section 80C deduction",
        eligibility: "Indian residents above 18",
        minAmount: "₹1,000",
        maxAmount: "No limit"
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        name: "Senior Citizens Savings Scheme",
        tenure: "5 years",
        interestRate: "8.2% p.a.",
        keyFeatures: ["High interest", "Quarterly payouts", "Extension allowed", "Safety"],
        taxBenefits: "Section 80C deduction up to ₹1.5L",
        eligibility: "Age 60+ or 55+ (retired)",
        minAmount: "₹1,000",
        maxAmount: "₹30,00,000"
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        name: "Sukanya Samriddhi Account",
        tenure: "21 years",
        interestRate: "8.2% p.a.",
        keyFeatures: ["For girl child", "Tax-free interest", "Partial withdrawal", "Education focus"],
        taxBenefits: "Section 80C deduction, EEE benefits",
        eligibility: "Girl child below 10 years",
        minAmount: "₹250",
        maxAmount: "₹1,50,000"
      }
    ];

    indiaSchemes.forEach(scheme => {
      this.savingsSchemes.set(scheme.id!, scheme as SavingsScheme);
    });

    // India Tax Regulations
    const indiaTax: InsertTaxRegulation[] = [
      {
        id: randomUUID(),
        countryCode: "IN",
        regime: "New",
        taxSlabs: [
          { range: "₹0 - ₹4,00,000", rate: "0%", amount: "Nil" },
          { range: "₹4,00,001 - ₹8,00,000", rate: "5%", amount: "Up to ₹20,000" },
          { range: "₹8,00,001 - ₹12,00,000", rate: "10%", amount: "₹20,000 + 10% of excess" },
          { range: "₹12,00,001 - ₹16,00,000", rate: "15%", amount: "₹60,000 + 15% of excess" },
          { range: "₹16,00,001 - ₹20,00,000", rate: "20%", amount: "₹1,20,000 + 20% of excess" },
          { range: "₹20,00,001 - ₹24,00,000", rate: "25%", amount: "₹2,00,000 + 25% of excess" },
          { range: "Above ₹24,00,000", rate: "30%", amount: "₹3,00,000 + 30% of excess" }
        ],
        deductions: [],
        otherTaxes: [
          { name: "GST", rate: "5-28%", description: "Goods and Services Tax on consumption" },
          { name: "Securities Transaction Tax", rate: "0.001-0.1%", description: "On securities transactions" }
        ]
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        regime: "Old",
        taxSlabs: [
          { range: "₹0 - ₹2,50,000", rate: "0%", amount: "Nil" },
          { range: "₹2,50,001 - ₹5,00,000", rate: "5%", amount: "Up to ₹12,500" },
          { range: "₹5,00,001 - ₹10,00,000", rate: "20%", amount: "₹12,500 + 20% of excess" },
          { range: "Above ₹10,00,000", rate: "30%", amount: "₹1,12,500 + 30% of excess" }
        ],
        deductions: [
          { section: "80C", name: "Investments & Insurance", limit: "₹1,50,000", description: "PPF, ELSS, Life Insurance, etc." },
          { section: "80D", name: "Health Insurance Premium", limit: "₹75,000", description: "Medical insurance premiums" },
          { section: "24(b)", name: "Home Loan Interest", limit: "₹2,00,000", description: "Interest on home loan" },
          { section: "80G", name: "Donations", limit: "10-100%", description: "Charitable donations" }
        ],
        otherTaxes: [
          { name: "GST", rate: "5-28%", description: "Goods and Services Tax on consumption" }
        ]
      }
    ];

    indiaTax.forEach(tax => {
      this.taxRegulations.set(tax.id!, tax as TaxRegulation);
    });

    // India Recommendations
    const indiaRecommendations: InsertRecommendation[] = [
      {
        id: randomUUID(),
        countryCode: "IN",
        ageGroup: "20-30",
        occupation: "Salaried",
        instrumentTypes: ["Equity Mutual Funds", "SIPs", "PPF"],
        schemes: ["PPF", "ELSS"],
        description: "Focus on growth with high equity allocation. Start SIPs early for long-term wealth creation."
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        ageGroup: "30-45",
        occupation: "Self-Employed",
        instrumentTypes: ["Balanced Funds", "NPS", "Term Insurance"],
        schemes: ["NPS", "PPF", "NSC"],
        description: "Balanced approach with retirement planning focus. Mix of equity and debt instruments."
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        ageGroup: "45+",
        occupation: "All",
        instrumentTypes: ["Fixed Deposits", "Government Securities", "Conservative Funds"],
        schemes: ["Senior Citizens Savings Scheme", "NSC", "PPF"],
        description: "Conservative approach with capital protection and regular income focus."
      }
    ];

    indiaRecommendations.forEach(rec => {
      this.recommendations.set(rec.id!, rec as Recommendation);
    });
  }

  private initializeSpainData() {
    // Spain Financial Instruments
    const spainInstruments: InsertFinancialInstrument[] = [
      {
        id: randomUUID(),
        countryCode: "ES",
        category: "Equity",
        name: "Spanish Stocks (IBEX 35)",
        description: "Shares in companies listed on Spanish stock exchanges",
        features: ["Dividend yields", "EU market access", "Euro stability", "Market volatility"],
        riskLevel: "High",
        minInvestment: "€1",
        taxation: "Capital gains tax applies"
      },
      {
        id: randomUUID(),
        countryCode: "ES",
        category: "Debt",
        name: "Spanish Government Bonds",
        description: "Government-issued debt securities",
        features: ["Government backing", "Fixed returns", "Euro denomination", "Low risk"],
        riskLevel: "Low",
        minInvestment: "€1,000",
        taxation: "Interest taxable as savings income"
      },
      {
        id: randomUUID(),
        countryCode: "ES",
        category: "Equity",
        name: "UCITS Funds",
        description: "EU-regulated mutual funds",
        features: ["EU regulation", "Diversification", "Professional management", "Liquidity"],
        riskLevel: "Medium",
        minInvestment: "€100",
        taxation: "Based on holding period"
      }
    ];

    spainInstruments.forEach(instrument => {
      this.financialInstruments.set(instrument.id!, instrument as FinancialInstrument);
    });

    // Spain Savings Schemes
    const spainSchemes: InsertSavingsScheme[] = [
      {
        id: randomUUID(),
        countryCode: "ES",
        name: "Pension Plans (Planes de Pensiones)",
        tenure: "Until retirement",
        interestRate: "Variable",
        keyFeatures: ["Tax benefits", "Long-term savings", "Retirement focus", "Professional management"],
        taxBenefits: "Up to €1,500 annually",
        eligibility: "Spanish residents",
        minAmount: "€30",
        maxAmount: "€1,500 (tax benefit limit)"
      },
      {
        id: randomUUID(),
        countryCode: "ES",
        name: "Fixed Deposits (Depósitos a Plazo)",
        tenure: "1 month - 5 years",
        interestRate: "0.1% - 2.5%",
        keyFeatures: ["Capital guarantee", "Fixed returns", "Various terms", "FDIC equivalent protection"],
        taxBenefits: "None",
        eligibility: "All residents",
        minAmount: "€500",
        maxAmount: "€100,000 (guaranteed)"
      }
    ];

    spainSchemes.forEach(scheme => {
      this.savingsSchemes.set(scheme.id!, scheme as SavingsScheme);
    });

    // Spain Tax Regulations
    const spainTax: InsertTaxRegulation[] = [
      {
        id: randomUUID(),
        countryCode: "ES",
        regime: "General",
        taxSlabs: [
          { range: "€0 - €12,450", rate: "19%", amount: "Up to €2,365.50" },
          { range: "€12,451 - €20,200", rate: "24%", amount: "€2,365.50 + 24% of excess" },
          { range: "€20,201 - €35,200", rate: "30%", amount: "€4,225.50 + 30% of excess" },
          { range: "€35,201 - €60,000", rate: "37%", amount: "€8,725.50 + 37% of excess" },
          { range: "Above €60,000", rate: "47%", amount: "€17,901.50 + 47% of excess" }
        ],
        deductions: [
          { section: "General", name: "Personal Allowance", limit: "€5,550", description: "Basic personal allowance" },
          { section: "Pension", name: "Pension Contributions", limit: "€1,500", description: "Private pension contributions" }
        ],
        otherTaxes: [
          { name: "VAT (IVA)", rate: "4-21%", description: "Value Added Tax on goods and services" },
          { name: "Wealth Tax", rate: "0.2-3.75%", description: "On net wealth above €700,000" }
        ]
      }
    ];

    spainTax.forEach(tax => {
      this.taxRegulations.set(tax.id!, tax as TaxRegulation);
    });
  }

  private initializeGermanyData() {
    // Germany Financial Instruments
    const germanyInstruments: InsertFinancialInstrument[] = [
      {
        id: randomUUID(),
        countryCode: "DE",
        category: "Equity",
        name: "DAX Stocks",
        description: "Blue-chip German stocks in DAX index",
        features: ["Strong economy", "Export focus", "Dividend tradition", "Euro stability"],
        riskLevel: "Medium to High",
        minInvestment: "€1",
        taxation: "Abgeltungsteuer applies"
      },
      {
        id: randomUUID(),
        countryCode: "DE",
        category: "Debt",
        name: "German Government Bonds (Bunds)",
        description: "Federal government bonds",
        features: ["AAA rating", "Benchmark status", "Low yields", "High safety"],
        riskLevel: "Very Low",
        minInvestment: "€100",
        taxation: "25% withholding tax"
      },
      {
        id: randomUUID(),
        countryCode: "DE",
        category: "Equity",
        name: "ETFs (Exchange Traded Funds)",
        description: "Passive investment funds",
        features: ["Low costs", "Diversification", "Transparency", "Tax efficiency"],
        riskLevel: "Medium",
        minInvestment: "€25",
        taxation: "Abgeltungsteuer (25%)"
      }
    ];

    germanyInstruments.forEach(instrument => {
      this.financialInstruments.set(instrument.id!, instrument as FinancialInstrument);
    });

    // Germany Savings Schemes
    const germanySchemes: InsertSavingsScheme[] = [
      {
        id: randomUUID(),
        countryCode: "DE",
        name: "Riester Pension",
        tenure: "Until age 62+",
        interestRate: "Variable",
        keyFeatures: ["Government subsidies", "Tax benefits", "Retirement planning", "Guaranteed minimum"],
        taxBenefits: "Up to €2,100 annually",
        eligibility: "German employees",
        minAmount: "€60",
        maxAmount: "€2,100"
      },
      {
        id: randomUUID(),
        countryCode: "DE",
        name: "Building Society Savings (Bausparen)",
        tenure: "7-10 years",
        interestRate: "0.1% - 1.0%",
        keyFeatures: ["Home buying focus", "Government bonus", "Low interest loans", "Guaranteed savings rate"],
        taxBenefits: "Wohnungsbauprämie up to €70",
        eligibility: "German residents",
        minAmount: "€40",
        maxAmount: "€50,000"
      }
    ];

    germanySchemes.forEach(scheme => {
      this.savingsSchemes.set(scheme.id!, scheme as SavingsScheme);
    });

    // Germany Tax Regulations
    const germanyTax: InsertTaxRegulation[] = [
      {
        id: randomUUID(),
        countryCode: "DE",
        regime: "General",
        taxSlabs: [
          { range: "€0 - €10,908", rate: "0%", amount: "Tax-free allowance" },
          { range: "€10,909 - €62,809", rate: "14-42%", amount: "Progressive rate" },
          { range: "€62,810 - €277,825", rate: "42%", amount: "€22,827 + 42% of excess" },
          { range: "Above €277,825", rate: "45%", amount: "€112,915 + 45% of excess" }
        ],
        deductions: [
          { section: "Standard", name: "Basic Allowance", limit: "€10,908", description: "Tax-free income threshold" },
          { section: "Work", name: "Work-related Expenses", limit: "€1,230", description: "Employment-related deductions" },
          { section: "Special", name: "Special Expenses", limit: "€36", description: "Various special deductions" }
        ],
        otherTaxes: [
          { name: "VAT (Mehrwertsteuer)", rate: "7-19%", description: "Value Added Tax" },
          { name: "Capital Gains Tax", rate: "25%", description: "Abgeltungsteuer on investment income" },
          { name: "Church Tax", rate: "8-9%", description: "Religious tax (if applicable)" }
        ]
      }
    ];

    germanyTax.forEach(tax => {
      this.taxRegulations.set(tax.id!, tax as TaxRegulation);
    });
  }

  private initializeMexicoData() {
    // Mexico Financial Instruments
    const mexicoInstruments: InsertFinancialInstrument[] = [
      {
        id: randomUUID(),
        countryCode: "MX",
        category: "Equity",
        name: "Mexican Stocks (IPC)",
        description: "Shares in companies listed on Mexican Stock Exchange",
        features: ["Peso denomination", "Emerging market", "Dividend opportunities", "Currency risk"],
        riskLevel: "High",
        minInvestment: "$100",
        taxation: "Capital gains tax applies"
      },
      {
        id: randomUUID(),
        countryCode: "MX",
        category: "Debt",
        name: "CETES (Treasury Bills)",
        description: "Government-issued short-term debt",
        features: ["Government backing", "Short-term", "Peso stability", "High liquidity"],
        riskLevel: "Low",
        minInvestment: "$100",
        taxation: "Interest income taxable"
      },
      {
        id: randomUUID(),
        countryCode: "MX",
        category: "Equity",
        name: "Mexican Mutual Funds (FIBRAS)",
        description: "Real Estate Investment Trusts",
        features: ["Real estate exposure", "Dividend income", "Professional management", "Market liquidity"],
        riskLevel: "Medium",
        minInvestment: "$1,000",
        taxation: "Distribution tax applies"
      }
    ];

    mexicoInstruments.forEach(instrument => {
      this.financialInstruments.set(instrument.id!, instrument as FinancialInstrument);
    });

    // Mexico Savings Schemes
    const mexicoSchemes: InsertSavingsScheme[] = [
      {
        id: randomUUID(),
        countryCode: "MX",
        name: "AFORE (Retirement Funds)",
        tenure: "Until retirement",
        interestRate: "Variable (4-8%)",
        keyFeatures: ["Mandatory for workers", "Government matching", "Professional management", "Portability"],
        taxBenefits: "Tax-deferred growth",
        eligibility: "Mexican workers",
        minAmount: "Mandatory contribution",
        maxAmount: "Based on salary"
      },
      {
        id: randomUUID(),
        countryCode: "MX",
        name: "Bank Time Deposits (Depósitos a Plazo)",
        tenure: "28 days - 5 years",
        interestRate: "5% - 12%",
        keyFeatures: ["Fixed rates", "IPAB protection", "Various terms", "Peso denomination"],
        taxBenefits: "None",
        eligibility: "Mexican residents",
        minAmount: "$1,000",
        maxAmount: "$400,000 (IPAB limit)"
      }
    ];

    mexicoSchemes.forEach(scheme => {
      this.savingsSchemes.set(scheme.id!, scheme as SavingsScheme);
    });

    // Mexico Tax Regulations
    const mexicoTax: InsertTaxRegulation[] = [
      {
        id: randomUUID(),
        countryCode: "MX",
        regime: "General",
        taxSlabs: [
          { range: "$0 - $125,900", rate: "1.92%", amount: "Up to $2,417" },
          { range: "$125,901 - $1,000,000", rate: "1.92-35%", amount: "Progressive rate" },
          { range: "Above $1,000,000", rate: "35%", amount: "$392,841 + 35% of excess" }
        ],
        deductions: [
          { section: "Personal", name: "Personal Deduction", limit: "$125,900", description: "Annual personal allowance" },
          { section: "Medical", name: "Medical Expenses", limit: "No limit", description: "Healthcare-related expenses" }
        ],
        otherTaxes: [
          { name: "VAT (IVA)", rate: "0-16%", description: "Value Added Tax" },
          { name: "ISR", rate: "1.92-35%", description: "Income Tax" }
        ]
      }
    ];

    mexicoTax.forEach(tax => {
      this.taxRegulations.set(tax.id!, tax as TaxRegulation);
    });
  }

  private initializeUSData() {
    // US Financial Instruments
    const usInstruments: InsertFinancialInstrument[] = [
      {
        id: randomUUID(),
        countryCode: "US",
        category: "Equity",
        name: "US Stocks (S&P 500)",
        description: "Shares in US public companies",
        features: ["World's largest market", "High liquidity", "Dividend growth", "Innovation focus"],
        riskLevel: "Medium to High",
        minInvestment: "$1",
        taxation: "Capital gains and dividend tax"
      },
      {
        id: randomUUID(),
        countryCode: "US",
        category: "Debt",
        name: "US Treasury Bonds",
        description: "Federal government bonds",
        features: ["Risk-free rate", "Various maturities", "Dollar stability", "High liquidity"],
        riskLevel: "Very Low",
        minInvestment: "$100",
        taxation: "Federal tax, state tax exempt"
      },
      {
        id: randomUUID(),
        countryCode: "US",
        category: "Equity",
        name: "Index Funds & ETFs",
        description: "Passive investment funds tracking market indices",
        features: ["Low costs", "Broad diversification", "Tax efficiency", "Transparency"],
        riskLevel: "Medium",
        minInvestment: "$1",
        taxation: "Capital gains treatment"
      }
    ];

    usInstruments.forEach(instrument => {
      this.financialInstruments.set(instrument.id!, instrument as FinancialInstrument);
    });

    // US Savings Schemes
    const usSchemes: InsertSavingsScheme[] = [
      {
        id: randomUUID(),
        countryCode: "US",
        name: "401(k) Plans",
        tenure: "Until retirement",
        interestRate: "Variable (market-based)",
        keyFeatures: ["Employer matching", "Tax deferral", "Vesting schedules", "Loan options"],
        taxBenefits: "Up to $23,000 annually (2024)",
        eligibility: "US employees",
        minAmount: "Varies by plan",
        maxAmount: "$23,000 ($30,000 if 50+)"
      },
      {
        id: randomUUID(),
        countryCode: "US",
        name: "Traditional IRA",
        tenure: "Until age 59.5+",
        interestRate: "Variable (investment-based)",
        keyFeatures: ["Tax deduction", "Tax-deferred growth", "Required distributions", "Investment options"],
        taxBenefits: "Up to $7,000 annually",
        eligibility: "US taxpayers under 73",
        minAmount: "$1",
        maxAmount: "$7,000 ($8,000 if 50+)"
      },
      {
        id: randomUUID(),
        countryCode: "US",
        name: "Roth IRA",
        tenure: "Until age 59.5+",
        interestRate: "Variable (investment-based)",
        keyFeatures: ["Tax-free growth", "Tax-free withdrawals", "No required distributions", "Income limits"],
        taxBenefits: "Tax-free growth and withdrawals",
        eligibility: "Income limits apply",
        minAmount: "$1",
        maxAmount: "$7,000 ($8,000 if 50+)"
      }
    ];

    usSchemes.forEach(scheme => {
      this.savingsSchemes.set(scheme.id!, scheme as SavingsScheme);
    });

    // US Tax Regulations
    const usTax: InsertTaxRegulation[] = [
      {
        id: randomUUID(),
        countryCode: "US",
        regime: "Federal",
        taxSlabs: [
          { range: "$0 - $11,000", rate: "10%", amount: "Up to $1,100" },
          { range: "$11,001 - $44,725", rate: "12%", amount: "$1,100 + 12% of excess" },
          { range: "$44,726 - $95,375", rate: "22%", amount: "$5,147 + 22% of excess" },
          { range: "$95,376 - $182,050", rate: "24%", amount: "$16,290 + 24% of excess" },
          { range: "$182,051 - $231,250", rate: "32%", amount: "$37,104 + 32% of excess" },
          { range: "$231,251 - $578,125", rate: "35%", amount: "$52,832 + 35% of excess" },
          { range: "Above $578,125", rate: "37%", amount: "$174,238 + 37% of excess" }
        ],
        deductions: [
          { section: "Standard", name: "Standard Deduction", limit: "$13,850", description: "Standard deduction for single filers" },
          { section: "401k", name: "401(k) Contribution", limit: "$23,000", description: "Pre-tax retirement contributions" },
          { section: "IRA", name: "Traditional IRA", limit: "$7,000", description: "Traditional IRA contributions" }
        ],
        otherTaxes: [
          { name: "State Tax", rate: "0-13.3%", description: "Varies by state" },
          { name: "FICA", rate: "7.65%", description: "Social Security and Medicare" },
          { name: "Capital Gains", rate: "0-20%", description: "On investment gains" }
        ]
      }
    ];

    usTax.forEach(tax => {
      this.taxRegulations.set(tax.id!, tax as TaxRegulation);
    });
  }

  async getCountries(): Promise<Country[]> {
    return Array.from(this.countries.values());
  }

  async getCountry(code: string): Promise<Country | undefined> {
    return this.countries.get(code);
  }

  async createCountry(country: InsertCountry): Promise<Country> {
    const newCountry = country as Country;
    this.countries.set(country.code, newCountry);
    return newCountry;
  }

  async getFinancialInstruments(countryCode: string): Promise<FinancialInstrument[]> {
    return Array.from(this.financialInstruments.values()).filter(
      instrument => instrument.countryCode === countryCode
    );
  }

  async createFinancialInstrument(instrument: InsertFinancialInstrument): Promise<FinancialInstrument> {
    const id = instrument.id || randomUUID();
    const newInstrument = { ...instrument, id } as FinancialInstrument;
    this.financialInstruments.set(id, newInstrument);
    return newInstrument;
  }

  async getSavingsSchemes(countryCode: string): Promise<SavingsScheme[]> {
    return Array.from(this.savingsSchemes.values()).filter(
      scheme => scheme.countryCode === countryCode
    );
  }

  async createSavingsScheme(scheme: InsertSavingsScheme): Promise<SavingsScheme> {
    const id = scheme.id || randomUUID();
    const newScheme = { ...scheme, id } as SavingsScheme;
    this.savingsSchemes.set(id, newScheme);
    return newScheme;
  }

  async getTaxRegulations(countryCode: string): Promise<TaxRegulation[]> {
    return Array.from(this.taxRegulations.values()).filter(
      regulation => regulation.countryCode === countryCode
    );
  }

  async createTaxRegulation(regulation: InsertTaxRegulation): Promise<TaxRegulation> {
    const id = regulation.id || randomUUID();
    const newRegulation = { ...regulation, id } as TaxRegulation;
    this.taxRegulations.set(id, newRegulation);
    return newRegulation;
  }

  async getRecommendations(countryCode: string): Promise<Recommendation[]> {
    return Array.from(this.recommendations.values()).filter(
      recommendation => recommendation.countryCode === countryCode
    );
  }

  async createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation> {
    const id = recommendation.id || randomUUID();
    const newRecommendation = { ...recommendation, id } as Recommendation;
    this.recommendations.set(id, newRecommendation);
    return newRecommendation;
  }

  async searchContent(countryCode: string, query: string): Promise<{
    instruments: FinancialInstrument[];
    schemes: SavingsScheme[];
    regulations: TaxRegulation[];
  }> {
    const searchTerm = query.toLowerCase();

    const instruments = Array.from(this.financialInstruments.values()).filter(
      instrument =>
        instrument.countryCode === countryCode &&
        (instrument.name.toLowerCase().includes(searchTerm) ||
         instrument.description.toLowerCase().includes(searchTerm) ||
         instrument.category.toLowerCase().includes(searchTerm))
    );

    const schemes = Array.from(this.savingsSchemes.values()).filter(
      scheme =>
        scheme.countryCode === countryCode &&
        (scheme.name.toLowerCase().includes(searchTerm) ||
         scheme.keyFeatures.some(feature => feature.toLowerCase().includes(searchTerm)))
    );

    const regulations = Array.from(this.taxRegulations.values()).filter(
      regulation =>
        regulation.countryCode === countryCode &&
        (regulation.regime?.toLowerCase().includes(searchTerm) ||
         regulation.deductions?.some(deduction => 
           deduction.name.toLowerCase().includes(searchTerm) ||
           deduction.description.toLowerCase().includes(searchTerm)
         ))
    );

    return { instruments, schemes, regulations };
  }
}

export const storage = new MemStorage();
