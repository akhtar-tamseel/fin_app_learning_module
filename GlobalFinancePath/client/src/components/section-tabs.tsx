import { BarChart3, PiggyBank, Calculator } from "lucide-react";

interface SectionTabsProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function SectionTabs({ activeSection, onSectionChange }: SectionTabsProps) {
  const sections = [
    { id: "instruments", label: "Financial Instruments", icon: BarChart3 },
    { id: "savings", label: "Savings Schemes", icon: PiggyBank },
    { id: "tax", label: "Tax Regulations", icon: Calculator },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex items-center border-b-2 font-medium py-2 px-1 focus:outline-none transition-colors ${
                activeSection === section.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {section.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
