interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
}

export default function AIInsights({
  expenses,
}: {
  expenses: Expense[];
}) {
  if (expenses.length === 0) {
    return (
      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">
          AI Insights
        </h2>

        <p className="text-gray-500">
          Add expenses to generate AI insights.
        </p>
      </div>
    );
  }

  const totalSpending = expenses.reduce(
    (total, expense) =>
      total + expense.amount,
    0
  );

  const highestExpense = expenses.reduce(
    (max, expense) =>
      expense.amount > max.amount
        ? expense
        : max
  );

  const categoryTotals: {
    [key: string]: number;
  } = {};

  expenses.forEach((expense) => {
    if (
      categoryTotals[expense.category]
    ) {
      categoryTotals[
        expense.category
      ] += expense.amount;
    } else {
      categoryTotals[
        expense.category
      ] = expense.amount;
    }
  });

  const highestCategory =
    Object.keys(categoryTotals).reduce(
      (a, b) =>
        categoryTotals[a] >
        categoryTotals[b]
          ? a
          : b
    );

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        AI Insights
      </h2>

      <div className="space-y-4">
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold">
            Total Spending
          </h3>

          <p className="text-lg mt-1">
            ₹ {totalSpending}
          </p>
        </div>

        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold">
            Highest Expense
          </h3>

          <p className="text-lg mt-1">
            {highestExpense.title} —
            ₹ {highestExpense.amount}
          </p>
        </div>

        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold">
            Highest Spending Category
          </h3>

          <p className="text-lg mt-1">
            {highestCategory}
          </p>
        </div>

        <div className="border p-4 rounded-lg bg-yellow-100">
          <h3 className="font-semibold">
            Smart Suggestion
          </h3>

          <p className="mt-1">
            You are spending most on{" "}
            {highestCategory}. Consider
            optimizing your expenses in
            this category.
          </p>
        </div>
      </div>
    </div>
  );
}