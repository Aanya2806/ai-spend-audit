"use client";

import { useState } from "react";

export default function SpendForm() {
  const [formData, setFormData] = useState({
    tool: "",
    plan: "",
    monthlySpend: "",
    seats: "",
    teamSize: "",
    useCase: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-4 p-6"
    >
      <h2 className="text-3xl font-bold">AI Spend Audit</h2>

      <select
        name="tool"
        value={formData.tool}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="">Select Tool</option>
        <option value="ChatGPT">ChatGPT</option>
        <option value="Claude">Claude</option>
        <option value="Cursor">Cursor</option>
        <option value="Copilot">GitHub Copilot</option>
        <option value="Gemini">Gemini</option>
        <option value="OpenAI API">OpenAI API</option>
        <option value="Anthropic API">Anthropic API</option>
        <option value="Windsurf">Windsurf</option>
        <option value="v0">v0</option>
      </select>

      <input
        type="text"
        name="plan"
        placeholder="Current Plan"
        value={formData.plan}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        name="monthlySpend"
        placeholder="Monthly Spend ($)"
        value={formData.monthlySpend}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        name="seats"
        placeholder="Number of Seats"
        value={formData.seats}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        name="teamSize"
        placeholder="Team Size"
        value={formData.teamSize}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <select
        name="useCase"
        value={formData.useCase}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="">Primary Use Case</option>
        <option value="coding">Coding</option>
        <option value="writing">Writing</option>
        <option value="research">Research</option>
        <option value="data">Data</option>
        <option value="mixed">Mixed</option>
      </select>

      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded"
      >
        Generate Audit
      </button>
    </form>
  );
}