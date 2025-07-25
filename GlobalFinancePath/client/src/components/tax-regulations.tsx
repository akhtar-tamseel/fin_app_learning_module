import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, CheckCircle } from "lucide-react";

interface TaxRegulationsProps {
  countryCode: string;
  searchQuery: string;
}

export default function TaxRegulations({ countryCode, searchQuery }: TaxRegulationsProps) {
  const [selectedRegime, setSelectedRegime] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [investments, setInvestments] = useState("");

  const { data: regulations, isLoading } = useQuery({
    queryKey: ["/api/countries", countryCode, "tax"],
  });

  const { data: country } = useQuery({
    queryKey: ["/api/countries", countryCode],
  });

  const filteredRegulations = regulations?.filter((regulation: any) =>
    searchQuery === "" ||
    regulation.regime?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    regulation.deductions?.some((deduction: any) =>
      deduction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deduction.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const activeRegulation = selectedRegime 
    ? filteredRegulations?.find((reg: any) => reg.regime === selectedRegime)
    : filteredRegulations?.[0];

  const getRateBadgeColor = (rate: string) => {
    const numericRate = parseFloat(rate.replace('%', ''));
    if (numericRate === 0) return "bg-green-100 text-green-800";
    if (numericRate <= 10) return "bg-yellow-100 text-yellow-800";
    if (numericRate <= 25) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
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
      {/* Tax Regulations Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {country?.name} - Tax Regulations (2025-26)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tax Regime Selector */}
          {filteredRegulations && filteredRegulations.length > 1 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Choose Tax Regime</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {filteredRegulations.map((regulation: any) => (
                  <div
                    key={regulation.id}
                    onClick={() => setSelectedRegime(regulation.regime)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedRegime === regulation.regime || (!selectedRegime && regulation === filteredRegulations[0])
                        ? "border-primary bg-blue-50 hover:bg-blue-100"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className={`font-semibold ${
                        selectedRegime === regulation.regime || (!selectedRegime && regulation === filteredRegulations[0])
                          ? "text-blue-900"
                          : "text-gray-900"
                      }`}>
                        {regulation.regime} Tax Regime
                      </h5>
                      <CheckCircle className={`h-5 w-5 ${
                        selectedRegime === regulation.regime || (!selectedRegime && regulation === filteredRegulations[0])
                          ? "text-primary"
                          : "text-gray-400"
                      }`} />
                    </div>
                    <p className={`text-sm ${
                      selectedRegime === regulation.regime || (!selectedRegime && regulation === filteredRegulations[0])
                        ? "text-blue-700"
                        : "text-gray-600"
                    }`}>
                      {regulation.deductions && regulation.deductions.length > 0
                        ? `Multiple deductions available`
                        : `Limited deductions, lower rates`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tax Slabs Table */}
          {activeRegulation && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Income Tax Slabs ({activeRegulation.regime} Regime)
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Income Range
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tax Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tax Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activeRegulation.taxSlabs?.map((slab: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {slab.range}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getRateBadgeColor(slab.rate)}>
                            {slab.rate}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {slab.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tax Deductions and Other Information */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Deductions */}
            {activeRegulation?.deductions && activeRegulation.deductions.length > 0 && (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Tax Deductions ({activeRegulation.regime} Regime)
                </h4>
                <div className="space-y-3">
                  {activeRegulation.deductions.map((deduction: any, index: number) => (
                    <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-blue-900">
                            {deduction.section && `Section ${deduction.section}: `}{deduction.name}
                          </h5>
                          <p className="text-sm text-blue-700">{deduction.description}</p>
                        </div>
                        <span className="text-lg font-semibold text-blue-900">
                          {deduction.limit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Taxes */}
            {activeRegulation?.otherTaxes && (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Other Taxes</h4>
                <div className="space-y-3">
                  {activeRegulation.otherTaxes.map((tax: any, index: number) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900">{tax.name}</h5>
                        <span className="font-medium">{tax.rate}</span>
                      </div>
                      <p className="text-sm text-gray-600">{tax.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tax Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Income Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div>
              <Label htmlFor="annual-income" className="text-sm font-medium text-gray-700 mb-2">
                Annual Income ({country?.currencySymbol})
              </Label>
              <Input
                id="annual-income"
                type="number"
                placeholder="1200000"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="age-group" className="text-sm font-medium text-gray-700 mb-2">
                Age Group
              </Label>
              <Select value={ageGroup} onValueChange={setAgeGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="below-60">Below 60</SelectItem>
                  <SelectItem value="60-80">60-80 years</SelectItem>
                  <SelectItem value="above-80">Above 80</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="investments" className="text-sm font-medium text-gray-700 mb-2">
                Investments ({country?.currencySymbol})
              </Label>
              <Input
                id="investments"
                type="number"
                placeholder="150000"
                value={investments}
                onChange={(e) => setInvestments(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-primary text-white hover:bg-blue-700 transition-colors">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Tax
              </Button>
            </div>
          </div>

          {/* Results Display */}
          {annualIncome && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {country?.currencySymbol}1,85,000
                  </div>
                  <div className="text-sm text-gray-600">Tax Liability (New)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {country?.currencySymbol}1,65,000
                  </div>
                  <div className="text-sm text-gray-600">Tax Liability (Old)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {country?.currencySymbol}20,000
                  </div>
                  <div className="text-sm text-gray-600">Savings (Old Regime)</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
