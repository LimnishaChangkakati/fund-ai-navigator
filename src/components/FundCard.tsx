
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp, TrendingDown, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Fund {
  id: string;
  name: string;
  ticker: string;
  fundHouse: string;
  category: string;
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  aum: string;
  risk: "Low" | "Moderate" | "High" | "Very High";
  description: string;
}

interface FundCardProps {
  fund: Fund;
  onClick: (fund: Fund) => void;
}

export function FundCard({ fund, onClick }: FundCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-500 text-white";
      case "Moderate": return "bg-blue-500 text-white";
      case "High": return "bg-orange-500 text-white";
      case "Very High": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <Card 
      className="w-full overflow-hidden card-with-gradient hover-card"
      onClick={() => onClick(fund)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold mb-1">
              {fund.name}
            </CardTitle>
            <div className="text-xs text-muted-foreground">
              {fund.ticker} · {fund.fundHouse}
            </div>
          </div>
          <Badge className={getRiskColor(fund.risk)}>{fund.risk}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-3 gap-2 my-2">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">1Y Return</div>
            <div className={`text-lg font-semibold flex justify-center items-center ${fund.returns.oneYear >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {fund.returns.oneYear >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {fund.returns.oneYear}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">3Y Return</div>
            <div className={`text-lg font-semibold flex justify-center items-center ${fund.returns.threeYear >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {fund.returns.threeYear >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {fund.returns.threeYear}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">5Y Return</div>
            <div className={`text-lg font-semibold flex justify-center items-center ${fund.returns.fiveYear >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {fund.returns.fiveYear >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {fund.returns.fiveYear}%
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
          <div className="flex items-center">
            <span>AUM: {fund.aum}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 ml-1 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Assets Under Management</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Badge variant="outline">{fund.category}</Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="w-full">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onClick(fund);
            }} 
            className="w-full mt-2 bg-gradient-to-r from-fund-purple to-fund-blue text-white hover:opacity-90 flex items-center justify-center gap-2"
          >
            <span>View Details</span>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
