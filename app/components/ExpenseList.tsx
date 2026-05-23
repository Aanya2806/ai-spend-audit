interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
}

export default function ExpenseList({
  expenses,
}: {
  expenses: Expense[];
}) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Expenses
      </h2>

      <div className="space-y-4">
        {expenses.length === 0 ? (
          <p className="text-gray-500">
            No expenses found.
          </p>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="border p-4 rounded-lg shadow"
            >
              <h3 className="font-semibold text-lg">
                {expense.title}
              </h3>

              <p className="mt-1">
                ₹ {expense.amount}
              </p>

              <p className="text-sm text-gray-500">
                {expense.category}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}