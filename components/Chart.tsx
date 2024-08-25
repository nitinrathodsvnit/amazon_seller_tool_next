"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, Dot, CartesianGrid, XAxis, LabelList } from "recharts";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect } from "react";

const chartConfig = {
  profit: {
    label: "profit",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Chart(props: {
  referralFees: any[];
  closingFees: any[];
  shippingFees: any[];
  frm: any;
}) {
  const { referralFees, closingFees, shippingFees, frm } = props;
const [chartData, setChartData] = useState([{
price: 0,
profit: 0
}])
  function getCharges(frm: any) {
    let fees = 0;
    const cat = referralFees.find((cat) => cat._id === frm.categoryId);
    // console.log(cat);
    if (frm.price > 999) {
      if (cat) {
        fees +=
          cat.PriceRanges[cat.PriceRanges.length - 1].ReferralFeePercentage;
      }
    } else if (cat) {
      const price = cat.PriceRanges.find(
        (range: any) => range.Range >= frm.price
      );
      if (price) {
        fees += price.ReferralFeePercentage;
      }
    }

    const sType = closingFees.find((type) => type._id === frm.shippingType);
    if (frm.price > 999) {
      if (sType) {
        fees += sType.PriceRange[sType.PriceRange.length - 1].fixedClosingFee;
      }
    } else if (sType) {
      const price = sType.PriceRange.find(
        (range: any) => range.range >= frm.price
      );
      if (price) {
        fees += price.fixedClosingFee;
      }
    }

    if (frm.weight && frm.shippingRegion && shippingFees[0]) {
      if (frm.weight < 12000) {
        const region = shippingFees[0].regions.find(
          (fee: any) => fee.name === frm.shippingRegion
        );
        if (frm.weight < 501) {
          fees += region.rates.upto500gms;
        } else if (frm.weight < 1001 && frm.weight > 500) {
          fees +=
            region.rates.upto500gms + region.rates.eachAdditional500gmsUpto1kg;
        } else if (frm.weight < 5001 && frm.weight > 5000) {
          const mul = Math.floor(frm.weight / 1000);
          fees +=
            region.rates.upto500gms +
            region.rates.eachAdditional500gmsUpto1kg +
            mul * region.rates.eachAdditionalKgAfter1kg;
        } else {
          const mul = Math.floor(frm.weight / 1000);
          const x = frm.weight - 5000;
          const mul1 = Math.floor(x / 1000);
          fees +=
            region.rates.upto500gms +
            region.rates.eachAdditional500gmsUpto1kg +
            mul * region.rates.eachAdditionalKgAfter1kg +
            mul1 * region.rates.eachAdditionalKgAfter5kg;
        }
      } else {
        const region = (frm.shippingFeeObj = shippingFees[1].regions(
          (fee: any) => fee.name === frm.shippingRegion
        ));
        const mul = Math.floor((frm.weight - 12000) / 1000);
        fees +=
          region.rates.eachAdditionalKgAfter12kgs * mul +
          region.rates.first12kgs;
      }
    }
    return fees;
  }

  useEffect(() => {
    if(frm.shippingRegion != ""){
      let charTempData = [];
      let profit = -1;
    for (let i = Math.max(frm.price-500, 1); i <= frm.price+500; i++) {
        profit = i - 1.18 * getCharges({...frm, price:i});
        charTempData.push({ price: i, profit: Math.round(profit*100)/100 });
      }
      setChartData(charTempData);
    }else{
      setChartData([]);
    }
      
  }, [frm]);

  return (
    <Card className="grow h-full">
      <CardHeader>
        <CardTitle>Profit vs Price</CardTitle>
        <CardDescription>
          Showing Profit vs Price
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="price"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed"  hideLabel labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }}/>}
            />

            <Area
              dataKey="profit"
              strokeWidth={2}
              type="linear"
              fill="var(--color-profit)"
              fillOpacity={0.4}
              stroke="var(--color-profit)"
        
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={payload.browser}
                    r={4}
                    fill={payload.price == frm.price ? "hsl(var(--chart-2))" : "transparent"}
                    cx={props.cx}
                    cy={props.cy}
                  />
                )
              }}
            >
            </Area>
            <Area
              dataKey="price"
            //   hide 
              strokeWidth={0}
            //   type="linear"
              fill="none"
            //   fillOpacity={0.4}
              
        
            //   dot={({ payload, ...props }) => {
            //     return (
            //       <Dot
            //         key={payload.browser}
            //         r={4}
            //         fill={payload.price == frm.price ? "hsl(var(--chart-2))" : "transparent"}
            //         cx={props.cx}
            //         cy={props.cy}
            //       />
            //     )
            //   }}
            >
            </Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this price <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
