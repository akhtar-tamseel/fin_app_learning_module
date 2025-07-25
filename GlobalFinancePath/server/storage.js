import { randomUUID } from 'crypto';

class MemStorage {
  constructor() {
    this.countries = new Map();
    this.financialInstruments = new Map();
    this.savingsSchemes = new Map();
    this.taxRegulations = new Map();
    this.recommendations = new Map();
    this.initializeData();
  }

  initializeData() {
    // Initialize countries
    const countriesData = [
      { id: "IN", name: "India", code: "IN", currency: "INR", currencySymbol: "₹" },
      { id: "ES", name: "Spain", code: "ES", currency: "EUR", currencySymbol: "€" },
      { id: "DE", name: "Germany", code: "DE", currency: "EUR", currencySymbol: "€" },
      { id: "MX", name: "Mexico", code: "MX", currency: "MXN", currencySymbol: "$" },
      { id: "US", name: "United States", code: "US", currency: "USD", currencySymbol: "$" },
    ];

    countriesData.forEach(country => {
      this.countries.set(country.code, country);
    });

    this.initializeIndiaData();
    this.initializeSpainData();
    this.initializeGermanyData();
    this.initializeMexicoData();
    this.initializeUSData();
  }

  initializeIndiaData() {
    // India Financial Instruments
    const indiaInstruments = [
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
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        category: "Money Market",
        name: "Treasury Bills",
        description: "Short-term government securities",
        features: ["Government backing", "High liquidity", "Short tenure", "Competitive rates"],
        riskLevel: "Very Low",
        minInvestment: "₹25,000",
        taxation: "Interest taxable as per slab"
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        category: "Forex",
        name: "Currency Derivatives",
        description: "Foreign exchange trading instruments",
        features: ["Currency hedging", "High volatility", "Leverage available", "Global exposure"],
        riskLevel: "Very High",
        minInvestment: "Margin based",
        taxation: "Business income taxation"
      }
    ];

    indiaInstruments.forEach(instrument => {
      this.financialInstruments.set(instrument.id, instrument);
    });

    // India Savings Schemes
    const indiaSchemes = [
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
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        name: "Kisan Vikas Patra (KVP)",
        tenure: "Variable (doubles money)",
        interestRate: "6.9% p.a.",
        keyFeatures: ["Money doubles", "Transferable", "Loan against certificate", "Post office scheme"],
        taxBenefits: "None",
        eligibility: "Indian residents",
        minAmount: "₹1,000",
        maxAmount: "No limit"
      },
      {
        id: randomUUID(),
        countryCode: "IN",
        name: "Fixed Deposits",
        tenure: "1-5 years",
        interestRate: "3.5-7.5% p.a.",
        keyFeatures: ["Fixed rates", "Bank/Post office", "Premature withdrawal", "Safe investment"],
        taxBenefits: "None (TDS applicable)",
        eligibility: "All residents",
        minAmount: "₹1,000",
        maxAmount: "No limit"
      }
    ];

    indiaSchemes.forEach(scheme => {
      this.savingsSchemes.set(scheme.id, scheme);
    });

    // India Tax Regulations
    const indiaTax = [
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
      this.taxRegulations.set(tax.id, tax);
    });

    // India Recommendations
    const indiaRecommendations = [
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
      this.recommendations.set(rec.id, rec);
    });
  }

  initializeSpainData() {
    // Spain Financial Instruments
    const spainInstruments = [
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
      this.financialInstruments.set(instrument.id, instrument);
    });

    // Spain Savings Schemes
    const spainSchemes = [
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
      this.savingsSchemes.set(scheme.id, scheme);
    });

    // Spain Tax Regulations
    const spainTax = [
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
      this.taxRegulations.set(tax.id, tax);
    });

    // Spain Recommendations
    const spainRecommendations = [
      {
        id: randomUUID(),
        countryCode: "ES",
        ageGroup: "20-30",
        occupation: "All",
        instrumentTypes: ["UCITS Funds", "Spanish Stocks", "Pension Plans"],
        schemes: ["Pension Plans"],
        description: "Build long-term wealth with EU-regulated funds and early pension contributions."
      }
    ];

    spainRecommendations.forEach(rec => {
      this.recommendations.set(rec.id, rec);
    });
  }

  initializeGermanyData() {
    // Germany Financial Instruments
    const germanyInstruments = [
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
      }
    ];

    germanyInstruments.forEach(instrument => {
      this.financialInstruments.set(instrument.id, instrument);
    });

    // Germany Savings Schemes
    const germanySchemes = [
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
      }
    ];

    germanySchemes.forEach(scheme => {
      this.savingsSchemes.set(scheme.id, scheme);
    });

    // Germany Tax Regulations
    const germanyTax = [
      {
        id: randomUUID(),
        countryCode: "DE",
        regime: "Standard",
        taxSlabs: [
          { range: "€0 - €11,604", rate: "0%", amount: "Nil" },
          { range: "€11,605 - €66,760", rate: "14-42%", amount: "Progressive rate" },
          { range: "€66,761 - €277,825", rate: "42%", amount: "Standard rate" },
          { range: "Above €277,826", rate: "45%", amount: "Top rate" }
        ],
        deductions: [
          { section: "Standard", name: "Basic Allowance", limit: "€11,604", description: "Tax-free basic allowance" }
        ],
        otherTaxes: [
          { name: "VAT (MwSt)", rate: "7-19%", description: "Value Added Tax" }
        ]
      }
    ];

    germanyTax.forEach(tax => {
      this.taxRegulations.set(tax.id, tax);
    });
  }

  initializeMexicoData() {
    // Mexico Financial Instruments
    const mexicoInstruments = [
      {
        id: randomUUID(),
        countryCode: "MX",
        category: "Equity",
        name: "Mexican Stocks (IPC)",
        description: "Shares in companies listed on Mexican stock exchange",
        features: ["Emerging market exposure", "Peso denomination", "Growth potential", "Volatility"],
        riskLevel: "High",
        minInvestment: "$100",
        taxation: "Capital gains tax applies"
      }
    ];

    mexicoInstruments.forEach(instrument => {
      this.financialInstruments.set(instrument.id, instrument);
    });

    // Mexico Savings Schemes
    const mexicoSchemes = [
      {
        id: randomUUID(),
        countryCode: "MX",
        name: "AFORE (Retirement Funds)",
        tenure: "Until retirement",
        interestRate: "Variable",
        keyFeatures: ["Mandatory retirement savings", "Government backing", "Professional management", "Portable"],
        taxBenefits: "Tax deferred",
        eligibility: "All workers",
        minAmount: "Mandatory contribution",
        maxAmount: "No limit"
      }
    ];

    mexicoSchemes.forEach(scheme => {
      this.savingsSchemes.set(scheme.id, scheme);
    });

    // Mexico Tax Regulations
    const mexicoTax = [
      {
        id: randomUUID(),
        countryCode: "MX",
        regime: "General",
        taxSlabs: [
          { range: "$0.01 - $746,04", rate: "1.92%", amount: "Progressive" },
          { range: "$746.05 - $6,224.67", rate: "6.4%", amount: "Progressive" },
          { range: "$6,224.68 - $10,374.47", rate: "10.88%", amount: "Progressive" },
          { range: "$10,374.48 - $12,934.82", rate: "16%", amount: "Progressive" },
          { range: "Above $12,934.83", rate: "30%", amount: "Top rate" }
        ],
        deductions: [],
        otherTaxes: [
          { name: "IVA", rate: "16%", description: "Value Added Tax" }
        ]
      }
    ];

    mexicoTax.forEach(tax => {
      this.taxRegulations.set(tax.id, tax);
    });
  }

  initializeUSData() {
    // US Financial Instruments
    const usInstruments = [
      {
        id: randomUUID(),
        countryCode: "US",
        category: "Equity",
        name: "US Stocks (S&P 500)",
        description: "Shares in major US companies",
        features: ["Global market leader", "Dollar denomination", "High liquidity", "Innovation focus"],
        riskLevel: "Medium to High",
        minInvestment: "$1",
        taxation: "Capital gains tax applies"
      },
      {
        id: randomUUID(),
        countryCode: "US",
        category: "Debt",
        name: "US Treasury Bonds",
        description: "Federal government bonds",
        features: ["Risk-free rate", "Dollar strength", "Global benchmark", "High liquidity"],
        riskLevel: "Very Low",
        minInvestment: "$100",
        taxation: "Federal tax, state exempt"
      }
    ];

    usInstruments.forEach(instrument => {
      this.financialInstruments.set(instrument.id, instrument);
    });

    // US Savings Schemes
    const usSchemes = [
      {
        id: randomUUID(),
        countryCode: "US",
        name: "401(k) Plans",
        tenure: "Until retirement",
        interestRate: "Variable",
        keyFeatures: ["Employer matching", "Tax deferred", "Investment options", "Portable"],
        taxBenefits: "Up to $23,000 annually (2024)",
        eligibility: "Employees with qualifying plans",
        minAmount: "Varies by plan",
        maxAmount: "$23,000 (under 50)"
      },
      {
        id: randomUUID(),
        countryCode: "US",
        name: "IRA (Individual Retirement Account)",
        tenure: "Until retirement",
        interestRate: "Variable",
        keyFeatures: ["Tax advantages", "Investment flexibility", "Contribution limits", "Rollover options"],
        taxBenefits: "Up to $7,000 annually (2024)",
        eligibility: "All income earners",
        minAmount: "No minimum",
        maxAmount: "$7,000 (under 50)"
      }
    ];

    usSchemes.forEach(scheme => {
      this.savingsSchemes.set(scheme.id, scheme);
    });

    // US Tax Regulations
    const usTax = [
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
          { range: "Above $578,126", rate: "37%", amount: "$174,238.25 + 37% of excess" }
        ],
        deductions: [
          { section: "Standard", name: "Standard Deduction", limit: "$14,600", description: "Standard deduction for single filers (2024)" },
          { section: "401k", name: "401(k) Contributions", limit: "$23,000", description: "Pre-tax retirement contributions" }
        ],
        otherTaxes: [
          { name: "Social Security", rate: "6.2%", description: "Up to wage base limit" },
          { name: "Medicare", rate: "1.45%", description: "No wage limit" }
        ]
      }
    ];

    usTax.forEach(tax => {
      this.taxRegulations.set(tax.id, tax);
    });

    // US Recommendations
    const usRecommendations = [
      {
        id: randomUUID(),
        countryCode: "US",
        ageGroup: "20-30",
        occupation: "All",
        instrumentTypes: ["401(k)", "S&P 500", "Growth Stocks"],
        schemes: ["401(k)", "IRA"],
        description: "Maximize employer 401(k) matching and invest in growth-oriented funds for long-term wealth building."
      }
    ];

    usRecommendations.forEach(rec => {
      this.recommendations.set(rec.id, rec);
    });
  }

  // Storage Interface Methods
  async getCountries() {
    return Array.from(this.countries.values());
  }

  async getCountry(code) {
    return this.countries.get(code);
  }

  async createCountry(country) {
    this.countries.set(country.code, country);
    return country;
  }

  async getFinancialInstruments(countryCode) {
    return Array.from(this.financialInstruments.values())
      .filter(instrument => instrument.countryCode === countryCode);
  }

  async createFinancialInstrument(instrument) {
    const id = instrument.id || randomUUID();
    const newInstrument = { ...instrument, id };
    this.financialInstruments.set(id, newInstrument);
    return newInstrument;
  }

  async getSavingsSchemes(countryCode) {
    return Array.from(this.savingsSchemes.values())
      .filter(scheme => scheme.countryCode === countryCode);
  }

  async createSavingsScheme(scheme) {
    const id = scheme.id || randomUUID();
    const newScheme = { ...scheme, id };
    this.savingsSchemes.set(id, newScheme);
    return newScheme;
  }

  async getTaxRegulations(countryCode) {
    return Array.from(this.taxRegulations.values())
      .filter(regulation => regulation.countryCode === countryCode);
  }

  async createTaxRegulation(regulation) {
    const id = regulation.id || randomUUID();
    const newRegulation = { ...regulation, id };
    this.taxRegulations.set(id, newRegulation);
    return newRegulation;
  }

  async getRecommendations(countryCode) {
    return Array.from(this.recommendations.values())
      .filter(recommendation => recommendation.countryCode === countryCode);
  }

  async createRecommendation(recommendation) {
    const id = recommendation.id || randomUUID();
    const newRecommendation = { ...recommendation, id };
    this.recommendations.set(id, newRecommendation);
    return newRecommendation;
  }

  async searchContent(countryCode, query) {
    const lowercaseQuery = query.toLowerCase();
    
    const instruments = Array.from(this.financialInstruments.values())
      .filter(instrument => 
        instrument.countryCode === countryCode &&
        (instrument.name.toLowerCase().includes(lowercaseQuery) ||
         instrument.description.toLowerCase().includes(lowercaseQuery) ||
         instrument.category.toLowerCase().includes(lowercaseQuery) ||
         instrument.features.some(feature => feature.toLowerCase().includes(lowercaseQuery)))
      );

    const schemes = Array.from(this.savingsSchemes.values())
      .filter(scheme => 
        scheme.countryCode === countryCode &&
        (scheme.name.toLowerCase().includes(lowercaseQuery) ||
         scheme.keyFeatures.some(feature => feature.toLowerCase().includes(lowercaseQuery)))
      );

    const regulations = Array.from(this.taxRegulations.values())
      .filter(regulation => 
        regulation.countryCode === countryCode &&
        (regulation.regime && regulation.regime.toLowerCase().includes(lowercaseQuery) ||
         (regulation.deductions && regulation.deductions.some(deduction =>
           deduction.name.toLowerCase().includes(lowercaseQuery) ||
           deduction.description.toLowerCase().includes(lowercaseQuery))))
      );

    return { instruments, schemes, regulations };
  }
}

const storage = new MemStorage();
export { storage };