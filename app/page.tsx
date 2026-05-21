"use client";

import { useEffect, useState } from "react";
import SpendForm from "./components/SpendForm";
import ExpenseList from "./components/ExpenseList";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
  const loadExpenses = () => {
    const savedExpenses =
      localStorage.getItem("expenses");

    if (savedExpenses) {
      setExpenses(
        JSON.parse(savedExpenses) as Expense[]
      );
    }
  };

  loadExpenses();
}, []);

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const totalSpending = expenses.reduce(
  (total, expense) => total + expense.amount,
  0
  );

 return (
  <main className="p-6 max-w-2xl mx-auto">
    <h1 className="text-4xl font-bold mb-6">
      AI Spend Audit Dashboard
    </h1>

    <div className="bg-black text-white p-6 rounded-xl mb-6">
      <h2 className="text-xl font-semibold">
        Total Spending
      </h2>

      <p className="text-3xl font-bold mt-2">
        ₹ {totalSpending}
      </p>
    </div>

    <SpendForm addExpense={addExpense} />

    <ExpenseList expenses={expenses} />
  </main>
);
}