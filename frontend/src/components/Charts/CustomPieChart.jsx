import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor, }) => {    
    return (
        // <div style={{ width: '100%', height: 380 }}>
        <ResponsiveContainer width="100%" height={380}>
        {/* <ResponsiveContainer> */}
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}                  
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                {/* see documentation for custom - we need to send payload  */}
                <Tooltip content={CustomTooltip} />                
                <Legend content={CustomLegend} />                

                {showTextAnchor && (
                    <g>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"                            
                            fill="#666"
                            fontSize="14px"                            
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"                            
                            fill="#333"
                            fontSize="24px"
                            fontWeight="500"
                        >
                            {totalAmount}
                        </text>

                    </g>
                )}
            </PieChart>
        </ResponsiveContainer>
        // </div>
    )
}

export default CustomPieChart