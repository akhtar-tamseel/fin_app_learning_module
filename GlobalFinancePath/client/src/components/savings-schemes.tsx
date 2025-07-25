import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator } from "lucide-react";

interface SavingsSchemesProps {
  countryCode: string;
  searchQuery: string;
}

export default function SavingsSchemes({ countryCode, searchQuery }: SavingsSchemesProps) {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investmentPeriod, setInvestmentPeriod] = useState("");
  const [riskAppetite, setRiskAppetite] = useState("");

  const { data: schemes, isLoading } = useQuery({
    queryKey: ["/api/countries", countryCode, "schemes"],
  });

  const { data: country } = useQuery({
    queryKey: ["/api/countries", countryCode],
  });

  const filteredSchemes = schemes?.filter((scheme: any) =>
    searchQuery === "" ||
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.keyFeatures.some((feature: string) =>
      feature.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getTenureBadgeColor = (tenure: string) => {
    if (tenure.includes("15 years") || tenure.includes("21 years") || tenure.includes("Until")) {
      return "bg-blue-100 text-blue-800";
    } else if (tenure.includes("5 years") || tenure.includes("10 years")) {
      return "bg-green-100 text-green-800";
    } else if (tenure.includes("1") || tenure.includes("28 days")) {
      return "bg-orange-100 text-orange-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Savings Schemes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {country?.name} - Popular Savings Schemes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scheme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tenure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Key Features
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax Benefits
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchemes?.map((scheme: any) => (
                  <tr key={scheme.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{scheme.name}</div>
                      {scheme.eligibility && (
                        <div className="text-xs text-gray-500">{scheme.eligibility}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getTenureBadgeColor(scheme.tenure)}>
                        {scheme.tenure}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {scheme.interestRate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="space-y-1">
                        {scheme.keyFeatures?.slice(0, 2).map((feature: string, index: number) => (
                          <div key={index} className="text-xs">• {feature}</div>
                        ))}
                        {scheme.keyFeatures?.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{scheme.keyFeatures.length - 2} more
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {scheme.taxBenefits || "None"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scheme Comparison Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="investment-amount" className="text-sm font-medium text-gray-700 mb-2">
                Investment Amount ({country?.currencySymbol})
              </Label>
              <Input
                id="investment-amount"
                type="number"
                placeholder="150000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="investment-period" className="text-sm font-medium text-gray-700 mb-2">
                Investment Period (Years)
              </Label>
              <Select value={investmentPeriod} onValueChange={setInvestmentPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 years</SelectItem>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="risk-appetite" className="text-sm font-medium text-gray-700 mb-2">
                Risk Appetite
              </Label>
              <Select value={riskAppetite} onValueChange={setRiskAppetite}>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="bg-primary text-white hover:bg-blue-700 transition-colors">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Best Options
          </Button>
          
          {investmentAmount && investmentPeriod && riskAppetite && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-3">Recommended Schemes</h5>
              <div className="space-y-2">
                {filteredSchemes?.slice(0, 3).map((scheme: any) => (
                  <div key={scheme.id} className="flex justify-between items-center p-2 bg-white rounded border">
                    <span className="text-sm font-medium">{scheme.name}</span>
                    <Badge variant="outline">{scheme.interestRate}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
