"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
}

interface CategoryData {
  name: string;
  value: number;
}

export default function Analytics({
  expenses,
}: {
  expenses: Expense[];
}) {
  const categoryData: CategoryData[] = [];

  expenses.forEach((expense) => {
    const existingCategory = categoryData.find(
      (item) => item.name === expense.category
    );

    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      categoryData.push({
        name: expense.category,
        value: expense.amount,
      });
    }
  });

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        Spending Analytics
      </h2>

      <PieChart width={400} height={300}>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {categoryData.map((_, index) => (
            <Cell
              key={index}
              fill={
                COLORS[index % COLORS.length]
              }
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}