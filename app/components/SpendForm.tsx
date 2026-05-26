"use client";

import { useState } from "react";

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
};

export default function SpendForm({
  addExpense,
}: {
  addExpense: (expense: Expense) => void;
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExpense: Expense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
    };

    addExpense(newExpense);

    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-6"
    >
      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
      >
        Add Expense
      </button>
    </form>
  );
}