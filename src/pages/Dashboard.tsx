
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { useAuth } from "@/components/AuthProvider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Fund } from "@/components/FundCard";
import { analyzePortfolio } from "@/services/fundService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleDollarSign, PieChart as PieChartIcon, BarChart, TrendingUp, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Mock portfolio data - in a real app this would come from a database
    const mockPortfolioFundIds = ["fund-2", "fund-4", "fund-5", "fund-8"];
    const mockWeights = [30, 25, 25, 20];

    const fetchPortfolioData = async () => {
      try {
        const data = await analyzePortfolio(mockPortfolioFundIds, mockWeights);
        setPortfolioData(data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [isAuthenticated, navigate]);

  // Performance data for chart
  const performanceData = [
    { month: 'Jan', portfolio: 3.2, benchmark: 2.8 },
    { month: 'Feb', portfolio: 2.1, benchmark: 1.7 },
    { month: 'Mar', portfolio: -1.4, benchmark: -2.1 },
    { month: 'Apr', portfolio: 4.2, benchmark: 3.5 },
    { month: 'May', portfolio: 2.8, benchmark: 2.2 },
    { month: 'Jun', portfolio: 1.5, benchmark: 1.2 },
    { month: 'Jul', portfolio: 3.7, benchmark: 3.1 },
    { month: 'Aug', portfolio: -0.8, benchmark: -1.4 },
    { month: 'Sep', portfolio: 2.9, benchmark: 2.5 },
    { month: 'Oct', portfolio: 1.7, benchmark: 1.4 },
    { month: 'Nov', portfolio: 3.5, benchmark: 2.8 },
    { month: 'Dec', portfolio: 4.1, benchmark: 3.4 },
  ];

  // Colors for pie chart
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Investor'}</h1>
            <p className="text-muted-foreground">
              Monitor your portfolio performance and track your investments
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Portfolio Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="card-with-gradient">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <CircleDollarSign className="mr-2 h-5 w-5 text-fund-purple" />
                      Total Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">₹8,52,430</div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                      <span className="text-green-500 font-medium">+12.4%</span>
                      <span className="ml-1">this year</span>
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="card-with-gradient">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-fund-purple" />
                      Return
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {portfolioData?.analysis?.returns?.oneYear || "14.2"}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      1 Year Return
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="card-with-gradient">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5 text-fund-purple" />
                      Risk Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {portfolioData?.analysis?.risk || "Moderate"}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {portfolioData?.analysis?.risk === "Low" ? "Conservative Strategy" : 
                       portfolioData?.analysis?.risk === "Moderate" ? "Balanced Strategy" : 
                       "Aggressive Strategy"}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Tabs for different views */}
              <Tabs defaultValue="performance" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="allocation">Allocation</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                </TabsList>
                
                {/* Performance Tab */}
                <TabsContent value="performance" className="space-y-6">
                  <Card className="card-with-gradient">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart className="mr-2 h-5 w-5 text-fund-purple" />
                        Historical Performance
                      </CardTitle>
                      <CardDescription>
                        Monthly returns compared to benchmark (last 12 months)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={performanceData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" strokeOpacity={0.2} />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="portfolio" 
                              stroke="#8884d8" 
                              activeDot={{ r: 8 }} 
                              name="Your Portfolio" 
                              strokeWidth={2}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="benchmark" 
                              stroke="#82ca9d" 
                              name="Benchmark" 
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Allocation Tab */}
                <TabsContent value="allocation" className="space-y-6">
                  <Card className="card-with-gradient">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChartIcon className="mr-2 h-5 w-5 text-fund-purple" />
                        Portfolio Allocation
                      </CardTitle>
                      <CardDescription>
                        Current distribution of your investments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex flex-col md:flex-row items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={portfolioData?.analysis?.sectorExposure || []}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="allocation"
                              nameKey="sector"
                            >
                              {(portfolioData?.analysis?.sectorExposure || []).map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: any) => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 md:mt-0 md:ml-8">
                          {(portfolioData?.analysis?.sectorExposure || []).map((sector: any, index: number) => (
                            <div key={index} className="flex items-center mb-2">
                              <div 
                                className="w-3 h-3 mr-2 rounded-sm" 
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              ></div>
                              <span>{sector.sector}: {sector.allocation}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Portfolio Tab */}
                <TabsContent value="portfolio" className="space-y-6">
                  <Card className="card-with-gradient">
                    <CardHeader>
                      <CardTitle>Your Funds</CardTitle>
                      <CardDescription>
                        List of funds in your portfolio
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(portfolioData?.analysis?.portfolioComposition || []).map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-4 border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <div>
                              <h3 className="font-medium">{item.fund}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.category} • {item.risk} Risk
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{item.weight}%</div>
                              <div className="text-sm text-muted-foreground">Allocation</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <Button className="w-full bg-gradient-purple hover:opacity-90">
                          Manage Portfolio
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="card-with-gradient">
                    <CardHeader>
                      <CardTitle>Recommendations</CardTitle>
                      <CardDescription>
                        AI-powered suggestions to optimize your portfolio
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-sm">
                          {portfolioData?.analysis?.recommendation || 
                           "Your portfolio has a balanced mix of funds across categories. Consider adding more international exposure for better diversification."}
                        </p>
                      </div>
                      <div className="mt-6 space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Diversification Score</span>
                          <span className="font-semibold">{portfolioData?.analysis?.diversificationScore || 76}/100</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Sharpe Ratio</span>
                          <span className="font-semibold">{portfolioData?.analysis?.riskMetrics?.sharpeRatio || 1.1}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Beta</span>
                          <span className="font-semibold">{portfolioData?.analysis?.riskMetrics?.beta || 0.95}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
