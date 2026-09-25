"use client";

import { useState } from "react";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "../context/PlanContext";

type SortKey = "duration" | "caloriesBurned" | "rating";

export default function LibrarySection({ workouts }: { workouts: Workout[] }) {
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  const filtered = workouts.filter((w) => {
    const search = query.toLowerCase();
    const nameMatch = w.name.toLowerCase().includes(search);
    const tagMatch = w.muscleGroups.some((tag) =>
      tag.toLowerCase().includes(search)
    );
    return nameMatch || tagMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "caloriesBurned") return b.caloriesBurned - a.caloriesBurned;
    return a.duration - b.duration;
  });

  return (
    <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase text-white mb-1">
            The Library
          </h2>
          <p className="text-neutral-500 text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-neutral-500 text-xs uppercase">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="bg-[#161616] border border-neutral-700 text-white text-sm rounded-full px-4 py-2 outline-none cursor-pointer"
          >
            <option value="duration">Duration</option>
            <option value="caloriesBurned">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or muscle group (e.g. chest, legs)"
          className="w-full bg-[#161616] border border-neutral-700 text-white text-sm rounded-full px-5 py-3 outline-none focus:border-lime-400 transition"
        />
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-16 bg-[#161616] border border-neutral-800 rounded-2xl">
          <p className="text-neutral-400 text-sm">
            No workouts match &quot;{query}&quot;.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}