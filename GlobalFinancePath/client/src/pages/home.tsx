import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CountrySelector from "@/components/country-selector";
import SectionTabs from "@/components/section-tabs";
import SearchBar from "@/components/search-bar";
import FinancialInstruments from "@/components/financial-instruments";
import SavingsSchemes from "@/components/savings-schemes";
import TaxRegulations from "@/components/tax-regulations";
import { GraduationCap, BarChart3, PiggyBank, Calculator, HelpCircle, Phone, MessageSquare, RefreshCw } from "lucide-react";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [activeSection, setActiveSection] = useState("instruments");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: countries, isLoading: countriesLoading } = useQuery({
    queryKey: ["/api/countries"],
  });

  const selectedCountryData = countries?.find((c: any) => c.code === selectedCountry);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "instruments":
        return <FinancialInstruments countryCode={selectedCountry} searchQuery={searchQuery} />;
      case "savings":
        return <SavingsSchemes countryCode={selectedCountry} searchQuery={searchQuery} />;
      case "tax":
        return <TaxRegulations countryCode={selectedCountry} searchQuery={searchQuery} />;
      default:
        return <FinancialInstruments countryCode={selectedCountry} searchQuery={searchQuery} />;
    }
  };

  if (countriesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading financial education platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <GraduationCap className="text-primary text-2xl" />
              <h1 className="text-xl font-semibold text-gray-900">Global Financial Awareness</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Dashboard</a>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Progress</a>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Resources</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Country Selector */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select Country for Financial Guidance</h2>
            <CountrySelector
              countries={countries || []}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>

        {/* Section Tabs */}
        <div className="mb-8">
          <SectionTabs activeSection={activeSection} onSectionChange={setActiveSection} />
        </div>

        {/* Content Sections */}
        <div id="content-container">
          {renderActiveSection()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Learning Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">Financial Glossary</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Investment Basics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tax Planning Guide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Risk Assessment</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Tools & Calculators</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">SIP Calculator</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tax Calculator</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Retirement Planner</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">EMI Calculator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Country Guides</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">India Financial Guide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">US Investment Guide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">European Markets</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Compare Countries</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors flex items-center">
                  <HelpCircle className="h-4 w-4 mr-1" />Help Center
                </a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center">
                  <Phone className="h-4 w-4 mr-1" />Contact Us
                </a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />Feedback
                </a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Updates</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Global Financial Awareness Learning Module. Educational purposes only. Consult financial advisors for personalized advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
