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
    const existingCategory =
      categoryData.find(
        (item) =>
          item.name ===
          expense.category
      );

    if (existingCategory) {
      existingCategory.value +=
        expense.amount;
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
    "#A020F0",
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Spending Analytics
      </h2>

      {categoryData.length === 0 ? (
        <p className="text-gray-500">
          No analytics data available.
        </p>
      ) : (
        <PieChart
          width={400}
          height={300}
        >
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {categoryData.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      )}
    </div>
  );
}