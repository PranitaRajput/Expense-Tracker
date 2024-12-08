import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ExpenseSummary = ({ transactions }) => {
  // Prepare data for the pie chart
  const data = transactions.reduce((acc, item) => {
    const found = acc.find((cat) => cat.name === item.category);
    if (found) {
      found.value += item.amount;
    } else {
      acc.push({ name: item.category, value: item.amount });
    }
    return acc;
  }, []);

  const COLORS = ['#FFBB28', '#FF8042', '#0088FE', '#00C49F'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PieChart width={200} height={220}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          //innerRadius={50}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          PaddingTop="5px"
          verticalAlign="bottom"
          layout="horizontal"
          align="center"
          iconType="rect"
          wrapperStyle={{
            fontSize: '12px',
            color: '#ffffff',
            marginTop:'3',
          }}
        />
      </PieChart>
    </div>
  );
};

export default ExpenseSummary;





