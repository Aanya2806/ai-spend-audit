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
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-black">
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
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-black">
        AI Insights
      </h2>

      <div className="space-y-4">
        <div className="border border-gray-300 p-4 rounded-xl bg-gray-100 text-black">
          <h3 className="font-semibold text-black">
            Total Spending
          </h3>

          <p className="text-lg mt-1 text-gray-700">
            ₹ {totalSpending}
          </p>
        </div>

        <div className="border border-gray-200 p-4 rounded-xl bg-gray-50">
          <h3 className="font-semibold text-black">
            Highest Expense
          </h3>

          <p className="text-lg mt-1 text-gray-700">
            {highestExpense.title} —
            ₹ {highestExpense.amount}
          </p>
        </div>

        <div className="border border-gray-200 p-4 rounded-xl bg-gray-50">
          <h3 className="font-semibold text-black">
            Highest Spending Category
          </h3>

          <p className="text-lg mt-1 text-gray-700">
            {highestCategory}
          </p>
        </div>

        <div className="border border-gray-300 p-4 rounded-xl bg-black text-white">
          <h3 className="font-semibold">
            Smart Suggestion
          </h3>

          <p className="mt-1 text-gray-700">
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