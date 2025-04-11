
import { Fund } from "@/components/FundCard";

// Mock database of funds
const mockFunds: Fund[] = [
  {
    id: "fund-1",
    name: "ICICI Prudential Technology Fund",
    ticker: "ICICTECH-GR",
    fundHouse: "ICICI Prudential",
    category: "Sectoral/Thematic",
    returns: {
      oneYear: 18.5,
      threeYear: 22.3,
      fiveYear: 19.8,
    },
    aum: "₹8,245 Cr",
    risk: "High",
    description: "This fund invests in technology and technology related companies including software, services, hardware, semiconductors and telecommunications.",
  },
  {
    id: "fund-2",
    name: "Axis Bluechip Fund",
    ticker: "AXISBLU-GR",
    fundHouse: "Axis Mutual Fund",
    category: "Large Cap",
    returns: {
      oneYear: 12.4,
      threeYear: 15.7,
      fiveYear: 14.2,
    },
    aum: "₹37,892 Cr",
    risk: "Moderate",
    description: "This fund primarily invests in blue chip companies with strong fundamentals, stable earnings, and potential for long-term growth.",
  },
  {
    id: "fund-3",
    name: "SBI Small Cap Fund",
    ticker: "SBISMALL-GR",
    fundHouse: "SBI Mutual Fund",
    category: "Small Cap",
    returns: {
      oneYear: 25.7,
      threeYear: 31.2,
      fiveYear: 22.5,
    },
    aum: "₹15,367 Cr",
    risk: "Very High",
    description: "This fund invests in small-cap companies with high growth potential, focusing on emerging businesses with innovative models.",
  },
  {
    id: "fund-4",
    name: "HDFC Corporate Bond Fund",
    ticker: "HDFCCORP-GR",
    fundHouse: "HDFC Mutual Fund",
    category: "Debt",
    returns: {
      oneYear: 7.2,
      threeYear: 8.1,
      fiveYear: 7.8,
    },
    aum: "₹28,641 Cr",
    risk: "Low",
    description: "This fund invests in corporate bonds with high credit quality, aiming to provide stable returns with lower volatility.",
  },
  {
    id: "fund-5",
    name: "Mirae Asset Emerging Bluechip",
    ticker: "MIRAEEM-GR",
    fundHouse: "Mirae Asset",
    category: "Large & Mid Cap",
    returns: {
      oneYear: 16.8,
      threeYear: 19.4,
      fiveYear: 18.2,
    },
    aum: "₹22,173 Cr",
    risk: "High",
    description: "This fund invests in a mix of established large caps and growing mid-cap companies with strong fundamentals.",
  },
  {
    id: "fund-6",
    name: "Aditya Birla Sun Life Digital India Fund",
    ticker: "ABSLDIG-GR",
    fundHouse: "Aditya Birla Sun Life",
    category: "Sectoral/Thematic",
    returns: {
      oneYear: 17.3,
      threeYear: 23.8,
      fiveYear: 21.2,
    },
    aum: "₹6,789 Cr",
    risk: "High",
    description: "This fund invests in companies that benefit from digitalization trends in India, including IT, e-commerce, fintech, and digital services.",
  },
  {
    id: "fund-7",
    name: "Kotak Balanced Advantage Fund",
    ticker: "KOTAKBA-GR",
    fundHouse: "Kotak Mahindra",
    category: "Hybrid",
    returns: {
      oneYear: 10.5,
      threeYear: 12.7,
      fiveYear: 11.3,
    },
    aum: "₹15,423 Cr",
    risk: "Moderate",
    description: "This fund dynamically manages allocation between equity and debt based on market conditions to optimize returns while managing volatility.",
  },
  {
    id: "fund-8",
    name: "Parag Parikh Flexi Cap Fund",
    ticker: "PPFCF-GR",
    fundHouse: "PPFAS Mutual Fund",
    category: "Flexi Cap",
    returns: {
      oneYear: 15.2,
      threeYear: 18.6,
      fiveYear: 16.9,
    },
    aum: "₹31,820 Cr",
    risk: "Moderate",
    description: "This fund invests across market caps and geographies with a value investing approach, focusing on companies with strong moats.",
  },
];

// Mock fund search function
export const searchFunds = (query: string, filters: any = {}): Promise<Fund[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      let results = [...mockFunds];
      
      // Apply search query if provided
      if (query) {
        const searchTerms = query.toLowerCase().split(" ");
        results = results.filter(fund => {
          const searchableText = `${fund.name} ${fund.ticker} ${fund.fundHouse} ${fund.category}`.toLowerCase();
          return searchTerms.some(term => searchableText.includes(term));
        });
      }
      
      // Apply filters
      if (filters) {
        // Filter by fund type
        if (filters.fundType && filters.fundType !== "all") {
          const categoryMappings: {[key: string]: string[]} = {
            "equity": ["Large Cap", "Mid Cap", "Small Cap", "Large & Mid Cap", "Flexi Cap", "Sectoral/Thematic"],
            "debt": ["Debt", "Corporate Bond", "Government Bond", "Liquid"],
            "hybrid": ["Hybrid", "Balanced", "Balanced Advantage"],
            "index": ["Index", "ETF"],
            "etf": ["ETF"]
          };
          
          if (categoryMappings[filters.fundType]) {
            results = results.filter(fund => 
              categoryMappings[filters.fundType].some(category => 
                fund.category.includes(category)
              )
            );
          }
        }
        
        // Filter by risk level
        if (filters.riskLevel && filters.riskLevel !== "all") {
          const riskMapping: {[key: string]: string} = {
            "low": "Low",
            "moderate": "Moderate",
            "high": "High",
            "very-high": "Very High"
          };
          
          if (riskMapping[filters.riskLevel]) {
            results = results.filter(fund => fund.risk === riskMapping[filters.riskLevel]);
          }
        }
        
        // Filter by minimum return
        if (filters.minReturn > 0) {
          results = results.filter(fund => fund.returns.oneYear >= filters.minReturn);
        }
      }
      
      resolve(results);
    }, 500);
  });
};

// Fund analysis service
export const analyzeFund = (fundId: string): Promise<any> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const fund = mockFunds.find(f => f.id === fundId);
      
      if (!fund) {
        resolve({ error: "Fund not found" });
        return;
      }
      
      // Mock analysis data
      const analysis = {
        summary: `${fund.name} is a ${fund.risk.toLowerCase()} risk ${fund.category.toLowerCase()} fund from ${fund.fundHouse} with consistent performance over the last 5 years.`,
        strengths: [
          "Strong management team with proven track record",
          `Consistent performance with ${fund.returns.fiveYear}% returns over 5 years`,
          "Well-diversified portfolio reducing concentration risk",
        ],
        weaknesses: [
          "Higher expense ratio compared to peers",
          "May face sector-specific challenges",
          "Performance volatility during market downturns",
        ],
        holdings: [
          { name: "HDFC Bank", allocation: 7.8, sector: "Banking" },
          { name: "Infosys", allocation: 6.5, sector: "IT" },
          { name: "Reliance Industries", allocation: 5.9, sector: "Energy" },
          { name: "TCS", allocation: 4.8, sector: "IT" },
          { name: "ICICI Bank", allocation: 4.2, sector: "Banking" },
        ],
        sectorAllocation: [
          { sector: "Banking & Finance", allocation: 28.5 },
          { sector: "IT", allocation: 18.2 },
          { sector: "Consumer Goods", allocation: 12.7 },
          { sector: "Pharmaceuticals", allocation: 10.5 },
          { sector: "Energy", allocation: 8.9 },
          { sector: "Others", allocation: 21.2 },
        ],
        benchmarkComparison: {
          oneYear: { fund: fund.returns.oneYear, benchmark: fund.returns.oneYear - 1.5 },
          threeYear: { fund: fund.returns.threeYear, benchmark: fund.returns.threeYear - 2.2 },
          fiveYear: { fund: fund.returns.fiveYear, benchmark: fund.returns.fiveYear - 2.8 },
        },
        riskMetrics: {
          sharpeRatio: 1.2,
          standardDeviation: 16.5,
          beta: 0.92,
          alpha: 2.1,
        },
        recommendation: fund.returns.fiveYear > 15 
          ? "This fund has shown strong performance over the long term and could be a good addition to a diversified portfolio."
          : "This fund provides stable returns and could be suitable as a core holding in a balanced portfolio.",
      };
      
      resolve({ fund, analysis });
    }, 1000);
  });
};

// Fund comparison service
export const compareFunds = (fundIds: string[]): Promise<any> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const fundsToCompare = mockFunds.filter(f => fundIds.includes(f.id));
      
      if (fundsToCompare.length < 2) {
        resolve({ error: "At least two funds are required for comparison" });
        return;
      }
      
      // Mock comparison data
      const comparison = {
        funds: fundsToCompare,
        performanceComparison: {
          labels: ["1Y Return", "3Y Return", "5Y Return"],
          datasets: fundsToCompare.map(fund => ({
            name: fund.name,
            data: [fund.returns.oneYear, fund.returns.threeYear, fund.returns.fiveYear]
          }))
        },
        riskComparison: fundsToCompare.map(fund => ({
          name: fund.name,
          risk: fund.risk,
          volatility: fund.risk === "Low" ? "8.5%" : fund.risk === "Moderate" ? "15.2%" : "22.7%",
          maxDrawdown: fund.risk === "Low" ? "10.2%" : fund.risk === "Moderate" ? "18.5%" : "32.3%",
        })),
        expenseRatios: fundsToCompare.map(fund => ({
          name: fund.name,
          ratio: (Math.random() * (2 - 0.5) + 0.5).toFixed(2) + "%"
        })),
        categoryRankings: fundsToCompare.map(fund => ({
          name: fund.name,
          category: fund.category,
          percentileRank: Math.floor(Math.random() * 100) + 1
        })),
        summary: `Based on the comparison, ${
          fundsToCompare.sort((a, b) => b.returns.fiveYear - a.returns.fiveYear)[0].name
        } has shown the strongest long-term performance, while ${
          fundsToCompare.sort((a, b) => {
            const riskLevels = { "Low": 1, "Moderate": 2, "High": 3, "Very High": 4 };
            return riskLevels[a.risk as keyof typeof riskLevels] - riskLevels[b.risk as keyof typeof riskLevels];
          })[0].name
        } offers the lowest risk profile.`
      };
      
      resolve({ funds: fundsToCompare, comparison });
    }, 1500);
  });
};

// Portfolio analysis service
export const analyzePortfolio = (fundIds: string[], weights: number[]): Promise<any> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const portfolioFunds = mockFunds.filter(f => fundIds.includes(f.id));
      
      if (portfolioFunds.length === 0) {
        resolve({ error: "No valid funds selected for portfolio" });
        return;
      }
      
      // Calculate weighted returns
      const calculateWeightedReturn = (returnType: 'oneYear' | 'threeYear' | 'fiveYear') => {
        return portfolioFunds.reduce((acc, fund, index) => {
          const weight = weights[index] / 100 || 1 / portfolioFunds.length;
          return acc + (fund.returns[returnType] * weight);
        }, 0).toFixed(2);
      };
      
      // Calculate risk score (weighted average of risk levels)
      const riskLevels: {[key: string]: number} = { "Low": 1, "Moderate": 2, "High": 3, "Very High": 4 };
      const riskScore = portfolioFunds.reduce((acc, fund, index) => {
        const weight = weights[index] / 100 || 1 / portfolioFunds.length;
        return acc + (riskLevels[fund.risk] * weight);
      }, 0);
      
      let portfolioRisk: string;
      if (riskScore < 1.5) portfolioRisk = "Low";
      else if (riskScore < 2.5) portfolioRisk = "Moderate";
      else if (riskScore < 3.5) portfolioRisk = "High";
      else portfolioRisk = "Very High";
      
      // Mock portfolio analysis
      const analysis = {
        portfolioComposition: portfolioFunds.map((fund, index) => ({
          fund: fund.name,
          weight: weights[index] || (100 / portfolioFunds.length).toFixed(2),
          category: fund.category,
          risk: fund.risk
        })),
        returns: {
          oneYear: calculateWeightedReturn('oneYear'),
          threeYear: calculateWeightedReturn('threeYear'),
          fiveYear: calculateWeightedReturn('fiveYear')
        },
        risk: portfolioRisk,
        sectorExposure: [
          { sector: "Banking & Finance", allocation: 26.8 },
          { sector: "IT", allocation: 20.5 },
          { sector: "Consumer Goods", allocation: 14.2 },
          { sector: "Pharmaceuticals", allocation: 12.1 },
          { sector: "Energy", allocation: 9.5 },
          { sector: "Others", allocation: 16.9 },
        ],
        riskMetrics: {
          sharpeRatio: 1.1,
          standardDeviation: 14.8,
          beta: 0.95,
          alpha: 1.8,
        },
        diversificationScore: 76,
        recommendation: "Your portfolio has a balanced mix of funds across categories. Consider adding more international exposure for better diversification."
      };
      
      resolve({ funds: portfolioFunds, weights, analysis });
    }, 1500);
  });
};
