import { Flag } from "lucide-react";

interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
}

interface CountrySelectorProps {
  countries: Country[];
  selectedCountry: string;
  onCountryChange: (countryCode: string) => void;
}

export default function CountrySelector({ countries, selectedCountry, onCountryChange }: CountrySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {countries.map((country) => (
        <button
          key={country.code}
          onClick={() => onCountryChange(country.code)}
          className={`px-6 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            selectedCountry === country.code
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Flag className="inline h-4 w-4 mr-2" />
          {country.name}
        </button>
      ))}
    </div>
  );
}
