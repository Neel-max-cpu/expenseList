import React from "react";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import {ChartTooltip, ChartContainer, ChartTooltipContent, ChartLegend } from "../ui/chart";
import { addThousandsSeparator } from "@/utils/helper";
import CustomLegend from "./CustomLegend";
import { Bold } from "lucide-react";


const chartConfig = {
  income: {
    label: "Income",    
  },
  expense: {
    label: "Expense",    
  },
}

const CustomAllTransactionChart = ({data}) => {
        const CustomTooltip = ({active, payload}) =>{
        if(active && payload && payload.length){            
            let bal = addThousandsSeparator(payload[0].payload.income - payload[0].payload.expense);
            let inc = addThousandsSeparator(payload[0].payload.income);
            let exp = addThousandsSeparator(payload[0].payload.expense);
            return (

                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <div className="flex flex-col">                        
                        <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.month} </p>
                        <div className="flex">                            
                            <p className="text-sm font-semibold text-slate-800">
                                Balance:{" "}                                 
                                <span className='text-sm font-medium ttext-purple-800'> Rs. {bal} </span>
                            </p>
                        </div>
                        <div className="flex">                            
                            <p className="text-sm font-semibold text-slate-800">
                                Income:{" "} 
                                <span className='text-sm font-medium ttext-purple-800'> Rs. {inc} </span>
                            </p>
                        </div>
                        <div className="flex">                            
                            <p className="text-sm font-semibold text-slate-800">
                                Expense:{" "} 
                                <span className='text-sm font-medium ttext-purple-800'> Rs. {exp} </span>
                            </p>
                        </div>
                    </div>
                </div>  
            );
        }   
        return null;
    }


  return (
    <div className="">

      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tick={{fontSize:12, fontWeight:700, fill: "#000000"}}   className="[&_text]:!fill-black" stroke='none' />
          <YAxis tick={{fontSize:12, fill: "#000000", fontWeight:700}}   className="[&_text]:!fill-black"  stroke='none'/>
          <ChartTooltip content={<CustomTooltip />} />
          <ChartLegend content={<CustomLegend />} />
          <Bar stackId="a" dataKey="income" fill="#875cf5" radius={4} />
          <Bar stackId="a" dataKey="expense" fill="#cfbefb" radius={4} />          
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default CustomAllTransactionChart;
