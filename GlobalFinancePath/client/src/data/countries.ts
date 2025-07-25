export interface CountryData {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
}

export const COUNTRIES: CountryData[] = [
  {
    code: "IN",
    name: "India",
    currency: "INR",
    currencySymbol: "₹",
    flag: "🇮🇳"
  },
  {
    code: "ES", 
    name: "Spain",
    currency: "EUR",
    currencySymbol: "€",
    flag: "🇪🇸"
  },
  {
    code: "DE",
    name: "Germany", 
    currency: "EUR",
    currencySymbol: "€",
    flag: "🇩🇪"
  },
  {
    code: "MX",
    name: "Mexico",
    currency: "MXN", 
    currencySymbol: "$",
    flag: "🇲🇽"
  },
  {
    code: "US",
    name: "United States",
    currency: "USD",
    currencySymbol: "$", 
    flag: "🇺🇸"
  }
];

export const getCountryByCode = (code: string): CountryData | undefined => {
  return COUNTRIES.find(country => country.code === code);
};

export const getCountryName = (code: string): string => {
  const country = getCountryByCode(code);
  return country ? country.name : "Unknown Country";
};

export const getCurrencySymbol = (code: string): string => {
  const country = getCountryByCode(code);
  return country ? country.currencySymbol : "$";
};
