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
      <h2 className="text-2xl font-bold mb-4 text-black">
        Expenses
      </h2>

      <div className="space-y-4">
        {expenses.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-200">
            <p className="text-gray-500 text-lg">
              No expenses found.
            </p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-white border border-gray-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-black">
                    {expense.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {expense.category}
                  </p>
                </div>

                <div>
                  <p className="text-xl font-bold text-black">
                    ₹ {expense.amount}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}