"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import SpendForm from "./components/SpendForm";
import ExpenseList from "./components/ExpenseList";
import Analytics from "./components/Analytics";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
}

export default function Home() {
  const [expenses, setExpenses] = useState<
    Expense[]
  >([]);

  const [search, setSearch] =
    useState("");

  const [filterCategory, setFilterCategory] =
    useState("All");

  useEffect(() => {
    const savedExpenses =
      localStorage.getItem("expenses");

    if (savedExpenses) {
      try {
        const parsedData: Expense[] =
          JSON.parse(savedExpenses);

        setExpenses(parsedData);
      } catch {
        console.log(
          "Error loading expenses"
        );
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      expense,
    ]);
  };

  const totalSpending = expenses.reduce(
    (total, expense) =>
      total + expense.amount,
    0
  );

  const filteredExpenses = expenses.filter(
    (expense) => {
      const matchesSearch =
        expense.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        filterCategory === "All" ||
        expense.category ===
          filterCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  return (
    <main className="p-6 max-w-4xl mx-auto">
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

      <div className="flex gap-4 mt-6 mb-6">
        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded w-full"
        />

        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(
              e.target.value
            )
          }
          className="border p-2 rounded"
        >
          <option value="All">
            All
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Bills">
            Bills
          </option>
        </select>
      </div>

      <ExpenseList
        expenses={filteredExpenses}
      />

      <Analytics
        expenses={filteredExpenses}
      />
    </main>
  );
}