import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Group A', amount: 400 },
  { name: 'Group B', amount: 300 },
];

const COLORS = ['#0088FE', '#00C49F'];

const WorkingPieChart = () => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#333"
            fontSize="24px"
            fontWeight="bold"
          >
            Rs700
          </text>
          <text
            x="50%"
            y="50%"
            dy="24"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#666"
            fontSize="14px"
          >
            Total Balance
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkingPieChart;
