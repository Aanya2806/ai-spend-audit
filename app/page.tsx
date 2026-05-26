"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import SpendForm from "./components/SpendForm";
import ExpenseList from "./components/ExpenseList";
import Analytics from "./components/Analytics";
import AIInsights from "./components/AIInsights";

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
  <main className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 text-center">
        AI Spend Audit Dashboard
      </h1>

      <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-2xl mb-8 shadow-lg">
        <h2 className="text-2xl font-semibold">
          Total Spending
        </h2>

        <p className="text-5xl font-bold mt-4">
          ₹ {totalSpending}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <SpendForm addExpense={addExpense} />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6 mb-8">
        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded-xl w-full shadow-sm"
        />

        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(
              e.target.value
            )
          }
          className="border p-3 rounded-xl shadow-sm"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ExpenseList
            expenses={
              filteredExpenses
            }
          />
        </div>

        <div className="space-y-8">
          <Analytics
            expenses={
              filteredExpenses
            }
          />

          <AIInsights
            expenses={
              filteredExpenses
            }
          />
        </div>
      </div>
    </div>
  </main>
);
}