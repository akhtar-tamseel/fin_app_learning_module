import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Building, TrendingUp, ArrowUpDown, CheckCircle } from "lucide-react";

interface FinancialInstrumentsProps {
  countryCode: string;
  searchQuery: string;
}

export default function FinancialInstruments({ countryCode, searchQuery }: FinancialInstrumentsProps) {
  const { data: instruments, isLoading } = useQuery({
    queryKey: ["/api/countries", countryCode, "instruments"],
  });

  const { data: recommendations } = useQuery({
    queryKey: ["/api/countries", countryCode, "recommendations"],
  });

  const { data: country } = useQuery({
    queryKey: ["/api/countries", countryCode],
  });

  const filteredInstruments = instruments?.filter((instrument: any) =>
    searchQuery === "" ||
    instrument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instrument.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instrument.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "equity":
        return BarChart3;
      case "debt":
        return Building;
      case "derivatives":
        return ArrowUpDown;
      default:
        return TrendingUp;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "equity":
        return "from-blue-50 to-blue-100 border-blue-200";
      case "debt":
        return "from-green-50 to-green-100 border-green-200";
      case "derivatives":
        return "from-orange-50 to-orange-100 border-orange-200";
      default:
        return "from-purple-50 to-purple-100 border-purple-200";
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
      case "very low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
      case "very high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Financial Instruments Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {country?.name} - Financial Instruments Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstruments?.map((instrument: any) => {
              const Icon = getCategoryIcon(instrument.category);
              const colorClass = getCategoryColor(instrument.category);

              return (
                <div
                  key={instrument.id}
                  className={`bg-gradient-to-br ${colorClass} rounded-lg p-6 border`}
                >
                  <div className="flex items-center mb-3">
                    <Icon className="text-xl mr-3" />
                    <h4 className="font-semibold text-gray-900">{instrument.name}</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{instrument.description}</p>
                  <div className="space-y-2 mb-4">
                    {instrument.features?.slice(0, 3).map((feature: string, index: number) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge className={getRiskBadgeColor(instrument.riskLevel)}>
                      {instrument.riskLevel} Risk
                    </Badge>
                    <span className="text-sm font-medium text-gray-900">
                      Min: {instrument.minInvestment}
                    </span>
                  </div>
                  {instrument.taxation && (
                    <div className="mt-2 text-xs text-gray-600">
                      Tax: {instrument.taxation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Age and Occupation Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recommendations by Age & Occupation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-3">By Age Group</h5>
                <div className="space-y-3">
                  {recommendations
                    ?.filter((rec: any) => rec.ageGroup)
                    .map((rec: any) => (
                      <div
                        key={rec.id}
                        className={`p-3 rounded-lg ${
                          rec.ageGroup === "20-30"
                            ? "bg-blue-50"
                            : rec.ageGroup === "30-45"
                            ? "bg-green-50"
                            : "bg-orange-50"
                        }`}
                      >
                        <div
                          className={`font-medium ${
                            rec.ageGroup === "20-30"
                              ? "text-blue-900"
                              : rec.ageGroup === "30-45"
                              ? "text-green-900"
                              : "text-orange-900"
                          }`}
                        >
                          {rec.ageGroup} years
                        </div>
                        <div
                          className={`text-sm ${
                            rec.ageGroup === "20-30"
                              ? "text-blue-700"
                              : rec.ageGroup === "30-45"
                              ? "text-green-700"
                              : "text-orange-700"
                          }`}
                        >
                          {rec.description}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-3">By Occupation</h5>
                <div className="space-y-3">
                  {recommendations
                    ?.filter((rec: any) => rec.occupation && rec.occupation !== "All")
                    .map((rec: any) => (
                      <div
                        key={rec.id}
                        className={`p-3 rounded-lg ${
                          rec.occupation === "Salaried"
                            ? "bg-purple-50"
                            : rec.occupation === "Self-Employed"
                            ? "bg-indigo-50"
                            : "bg-pink-50"
                        }`}
                      >
                        <div
                          className={`font-medium ${
                            rec.occupation === "Salaried"
                              ? "text-purple-900"
                              : rec.occupation === "Self-Employed"
                              ? "text-indigo-900"
                              : "text-pink-900"
                          }`}
                        >
                          {rec.occupation}
                        </div>
                        <div
                          className={`text-sm ${
                            rec.occupation === "Salaried"
                              ? "text-purple-700"
                              : rec.occupation === "Self-Employed"
                              ? "text-indigo-700"
                              : "text-pink-700"
                          }`}
                        >
                          {rec.instrumentTypes?.join(", ")}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
