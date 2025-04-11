
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { FundCard, Fund } from "@/components/FundCard";
import { searchFunds, analyzeFund } from "@/services/fundService";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleDollarSign, Info, BarChart, PieChart, TrendingUp, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartPieChart, Pie, Cell } from "recharts";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Fund[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [fundAnalysis, setFundAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Initial state to show empty results
  }, []);

  const handleSearch = async (query: string, filters: any) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    try {
      const results = await searchFunds(query, filters);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFundClick = async (fund: Fund) => {
    setSelectedFund(fund);
    setIsAnalyzing(true);
    setShowDialog(true);
    
    try {
      const analysis = await analyzeFund(fund.id);
      setFundAnalysis(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Colors for charts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4 py-8 md:py-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              <span className="gradient-text">Find My Fund</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Intelligent fund search powered by AI technology. Find, analyze, and compare mutual funds with ease.
            </p>
          </div>
          
          {/* Search Section */}
          <SearchBar onSearch={handleSearch} />
          
          {/* Results Section */}
          <div className="w-full bg-card rounded-2xl shadow-lg border border-border overflow-hidden animate-fade-in">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-fund-purple" />
                <h2 className="text-lg font-semibold">Results</h2>
              </div>
              {searchResults.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Found {searchResults.length} funds
                </div>
              )}
            </div>
            
            <div className="p-6">
              {isSearching ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.map((fund) => (
                    <FundCard 
                      key={fund.id} 
                      fund={fund} 
                      onClick={handleFundClick} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="flex justify-center">
                    <Info className="h-12 w-12 text-muted-foreground opacity-50" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">
                    {searchQuery ? "No funds found" : "Enter a search query to find matching funds"}
                  </h3>
                  <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                    {searchQuery 
                      ? "Try broadening your search or using different keywords" 
                      : "Try searching for fund names, categories, or specific requirements like 'high return funds'"}
                  </p>
                  {searchQuery && (
                    <Button 
                      className="mt-4 bg-gradient-purple hover:opacity-90"
                      onClick={() => handleSearch("", {})}
                    >
                      Reset Search
                    </Button>
                  )}
                </div>
              )}
              
              {!isSearching && searchResults.length > 0 && (
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    Load More Funds
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Fund Analysis Dialog */}
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              {isAnalyzing ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : selectedFund && fundAnalysis ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{selectedFund.name}</DialogTitle>
                    <DialogDescription className="flex items-center">
                      <span>{selectedFund.ticker} • {selectedFund.fundHouse}</span>
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Tabs defaultValue="overview" className="mt-4">
                    <TabsList className="grid grid-cols-4 mb-6">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                      <TabsTrigger value="holdings">Holdings</TabsTrigger>
                      <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Info className="mr-2 h-5 w-5 text-fund-purple" />
                            Fund Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p>{fundAnalysis.analysis.summary}</p>
                          
                          <div className="grid grid-cols-2 gap-6 mt-4">
                            <div>
                              <h4 className="font-medium mb-2">Strengths</h4>
                              <ul className="space-y-2">
                                {fundAnalysis.analysis.strengths.map((strength: string, index: number) => (
                                  <li key={index} className="flex items-start">
                                    <ChevronRight className="h-4 w-4 mr-1 mt-1 text-green-500" />
                                    <span>{strength}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Weaknesses</h4>
                              <ul className="space-y-2">
                                {fundAnalysis.analysis.weaknesses.map((weakness: string, index: number) => (
                                  <li key={index} className="flex items-start">
                                    <ChevronRight className="h-4 w-4 mr-1 mt-1 text-red-500" />
                                    <span>{weakness}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <Separator className="my-6" />
                          
                          <div>
                            <h4 className="font-medium mb-4">Key Metrics</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="bg-primary/10 p-4 rounded-lg">
                                <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                                <div className="text-xl font-semibold">{fundAnalysis.analysis.riskMetrics.sharpeRatio}</div>
                              </div>
                              <div className="bg-primary/10 p-4 rounded-lg">
                                <div className="text-sm text-muted-foreground">Standard Deviation</div>
                                <div className="text-xl font-semibold">{fundAnalysis.analysis.riskMetrics.standardDeviation}%</div>
                              </div>
                              <div className="bg-primary/10 p-4 rounded-lg">
                                <div className="text-sm text-muted-foreground">Beta</div>
                                <div className="text-xl font-semibold">{fundAnalysis.analysis.riskMetrics.beta}</div>
                              </div>
                              <div className="bg-primary/10 p-4 rounded-lg">
                                <div className="text-sm text-muted-foreground">Alpha</div>
                                <div className="text-xl font-semibold">{fundAnalysis.analysis.riskMetrics.alpha}</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <CircleDollarSign className="mr-2 h-5 w-5 text-fund-purple" />
                            Recommendation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <p>{fundAnalysis.analysis.recommendation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="performance" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <BarChart className="mr-2 h-5 w-5 text-fund-purple" />
                            Performance vs Benchmark
                          </CardTitle>
                          <CardDescription>
                            Returns comparison over different time periods
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartBarChart
                                data={[
                                  {
                                    name: '1 Year',
                                    fund: fundAnalysis.analysis.benchmarkComparison.oneYear.fund,
                                    benchmark: fundAnalysis.analysis.benchmarkComparison.oneYear.benchmark,
                                  },
                                  {
                                    name: '3 Years',
                                    fund: fundAnalysis.analysis.benchmarkComparison.threeYear.fund,
                                    benchmark: fundAnalysis.analysis.benchmarkComparison.threeYear.benchmark,
                                  },
                                  {
                                    name: '5 Years',
                                    fund: fundAnalysis.analysis.benchmarkComparison.fiveYear.fund,
                                    benchmark: fundAnalysis.analysis.benchmarkComparison.fiveYear.benchmark,
                                  },
                                ]}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" strokeOpacity={0.2} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="fund" name={selectedFund.name} fill="#8884d8" />
                                <Bar dataKey="benchmark" name="Benchmark" fill="#82ca9d" />
                              </RechartBarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="holdings" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <PieChart className="mr-2 h-5 w-5 text-fund-purple" />
                              Sector Allocation
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <RechartPieChart>
                                  <Pie
                                    data={fundAnalysis.analysis.sectorAllocation}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="allocation"
                                    nameKey="sector"
                                  >
                                    {fundAnalysis.analysis.sectorAllocation.map((entry: any, index: number) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                  <Tooltip formatter={(value: any) => `${value}%`} />
                                </RechartPieChart>
                              </ResponsiveContainer>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <BarChart className="mr-2 h-5 w-5 text-fund-purple" />
                              Top Holdings
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {fundAnalysis.analysis.holdings.map((holding: any, index: number) => (
                                <div key={index} className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="w-1 h-6 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <div>
                                      <div className="font-medium">{holding.name}</div>
                                      <div className="text-xs text-muted-foreground">{holding.sector}</div>
                                    </div>
                                  </div>
                                  <div className="font-medium">{holding.allocation}%</div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="analysis" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>AI Analysis</CardTitle>
                          <CardDescription>
                            Advanced insights about this fund
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h4 className="text-lg font-medium mb-2">Performance Analysis</h4>
                            <p>
                              {selectedFund.name} has shown {
                                selectedFund.returns.fiveYear > 15 ? "exceptional" : 
                                selectedFund.returns.fiveYear > 10 ? "strong" : "moderate"
                              } performance over the last 5 years with returns of {selectedFund.returns.fiveYear}%. 
                              This {
                                fundAnalysis.analysis.benchmarkComparison.fiveYear.fund > 
                                fundAnalysis.analysis.benchmarkComparison.fiveYear.benchmark ? "outperforms" : "underperforms"
                              } its benchmark by {
                                Math.abs(
                                  fundAnalysis.analysis.benchmarkComparison.fiveYear.fund - 
                                  fundAnalysis.analysis.benchmarkComparison.fiveYear.benchmark
                                ).toFixed(1)
                              }% over the same period.
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-medium mb-2">Risk Assessment</h4>
                            <p>
                              With a Sharpe ratio of {fundAnalysis.analysis.riskMetrics.sharpeRatio} and a beta of {
                                fundAnalysis.analysis.riskMetrics.beta
                              }, this fund shows {
                                fundAnalysis.analysis.riskMetrics.beta < 0.9 ? "lower" : 
                                fundAnalysis.analysis.riskMetrics.beta < 1.1 ? "similar" : "higher"
                              } volatility compared to the market. The fund's risk level is classified as {selectedFund.risk.toLowerCase()},
                              making it suitable for investors with a {
                                selectedFund.risk === "Low" ? "conservative" : 
                                selectedFund.risk === "Moderate" ? "balanced" : "growth-oriented"
                              } investment approach.
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-medium mb-2">Investment Strategy</h4>
                            <p>
                              The fund's portfolio is concentrated in {
                                fundAnalysis.analysis.sectorAllocation[0].sector
                              } ({fundAnalysis.analysis.sectorAllocation[0].allocation}%) and {
                                fundAnalysis.analysis.sectorAllocation[1].sector
                              } ({fundAnalysis.analysis.sectorAllocation[1].allocation}%) sectors.
                              This {
                                fundAnalysis.analysis.sectorAllocation[0].allocation > 25 ? "high concentration" : "diversified approach"
                              } in key sectors could {
                                fundAnalysis.analysis.sectorAllocation[0].allocation > 25 ? 
                                "increase sector-specific risks but also potential returns" : 
                                "help mitigate sector-specific risks while capturing growth opportunities"
                              }.
                            </p>
                          </div>
                          
                          <div className="pt-4 border-t">
                            <h4 className="text-lg font-medium mb-4">Investor Suitability</h4>
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1 p-4 rounded-lg bg-primary/10 border border-primary/20">
                                <h5 className="font-medium mb-2">Best For</h5>
                                <ul className="space-y-2">
                                  {selectedFund.risk === "Low" ? (
                                    <>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-green-500" />
                                        <span>Conservative investors</span>
                                      </li>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-green-500" />
                                        <span>Capital preservation focus</span>
                                      </li>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-green-500" />
                                        <span>Near-term financial goals</span>
                                      </li>
                                    </>
                                  ) : selectedFund.risk === "Moderate" ? (
                                    <>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-green-500" />
                                        <span>Balanced investors</span>
                                      </li>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-green-500" />
                                        <span>Medium-term goals (5-10 years)</span>
                                      </li>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-green-500" />
                                        <span>Mix of growth and stability</span>
                                      </li>
                                    </>
                                  ) : (
                                    <>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-green-500" />
                                        <span>Growth-oriented investors</span>
                                      </li>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-green-500" />
                                        <span>Long-term wealth creation</span>
                                      </li>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-green-500" />
                                        <span>Higher risk tolerance</span>
                                      </li>
                                    </>
                                  )}
                                </ul>
                              </div>
                              <div className="flex-1 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                                <h5 className="font-medium mb-2">Not Suitable For</h5>
                                <ul className="space-y-2">
                                  {selectedFund.risk === "Low" ? (
                                    <>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-red-500" />
                                        <span>Growth-focused investors</span>
                                      </li>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-red-500" />
                                        <span>Very long-term goals (15+ years)</span>
                                      </li>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-red-500" />
                                        <span>Inflation-beating returns seekers</span>
                                      </li>
                                    </>
                                  ) : selectedFund.risk === "Moderate" ? (
                                    <>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-red-500" />
                                        <span>Very conservative investors</span>
                                      </li>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-red-500" />
                                        <span>Short-term needs (< 3 years)</span>
                                      </li>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-red-500" />
                                        <span>Low risk tolerance individuals</span>
                                      </li>
                                    </>
                                  ) : (
                                    <>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-red-500" />
                                        <span>Conservative investors</span>
                                      </li>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-red-500" />
                                        <span>Short to medium-term goals</span>
                                      </li>
                                      <li className="flex items-start">
                                        <ChevronRight className="h-4 w-4 mr-1 mt-1 text-red-500" />
                                        <span>Investors nearing retirement</span>
                                      </li>
                                    </>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </>
              ) : (
                <div className="text-center py-12">
                  <p>No fund data available</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
