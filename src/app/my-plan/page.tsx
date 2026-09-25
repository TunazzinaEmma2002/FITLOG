"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "../../context/PlanContext";
import { toast } from "react-toastify";

type SortKey = "duration" | "caloriesBurned" | "rating";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone, loaded } = usePlan();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  if (!loaded) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-neutral-700 border-t-lime-400 rounded-full animate-spin" />
        <p className="text-neutral-500 text-sm mt-4">Loading workouts…</p>
      </div>
    );
  }

  const rawList = tab === "plan" ? plan : saved;

  const activeList = [...rawList].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "caloriesBurned") return b.caloriesBurned - a.caloriesBurned;
    return a.duration - b.duration;
  });

  const minutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const calories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const handleRemove = (id: string) => {
    if (tab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
    toast.info("Removed");
  };

  const handleDone = (id: string) => {
    markAsDone(id);
    toast.success("Marked as done");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white">
        My Plan
      </h1>
      <p className="text-neutral-500 text-sm mt-2">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 bg-[#161616] border border-neutral-800 rounded-2xl p-5 sm:p-6">
        <div>
          <p className="text-neutral-500 text-xs uppercase tracking-wide">Exercises</p>
          <p className="text-lime-400 text-3xl sm:text-4xl font-bold mt-1">{plan.length}</p>
        </div>
        <div>
          <p className="text-neutral-500 text-xs uppercase tracking-wide">Minutes</p>
          <p className="text-white text-3xl sm:text-4xl font-bold mt-1">{minutes}</p>
        </div>
        <div>
          <p className="text-neutral-500 text-xs uppercase tracking-wide">Calories</p>
          <p className="text-white text-3xl sm:text-4xl font-bold mt-1">{calories}</p>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 mt-8">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("plan")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
              tab === "plan" ? "bg-lime-400 text-black" : "text-neutral-400 border border-neutral-700 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
              tab === "saved" ? "bg-lime-400 text-black" : "text-neutral-400 border border-neutral-700 hover:text-white"
            }`}
          >
            Saved
          </button>
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

      <div className="mt-6 space-y-4">
        {activeList.length === 0 ? (
          <div className="text-center py-20 bg-[#161616] border border-neutral-800 rounded-2xl">
            <h3 className="font-display font-bold uppercase text-white text-lg">
              Nothing Here Yet
            </h3>
            <p className="text-neutral-500 text-sm mt-2">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="inline-block mt-5 px-6 py-2.5 rounded-full bg-lime-400 text-black font-semibold text-sm"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          activeList.map((w) => (
            <div
              key={w.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#161616] border border-neutral-800 rounded-2xl p-4"
            >
              <div className="relative w-full sm:w-20 h-40 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={w.image} alt={w.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold uppercase text-white text-base">
                  {w.name}
                </h3>
                <p className="text-neutral-500 text-sm">{w.equipment}</p>
                <div className="flex gap-4 text-sm text-neutral-400 mt-1">
                  <span>⏱ {w.duration} min</span>
                  <span>🔥 {w.caloriesBurned} kcal</span>
                  <span>⭐ {w.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                <Link
                  href={`/workout/${w.id}`}
                  className="px-4 py-2 rounded-full border border-neutral-700 text-white text-sm hover:bg-neutral-800 transition"
                >
                  View Details
                </Link>
                {tab === "plan" && !w.done && (
                  <button
                    onClick={() => handleDone(w.id)}
                    className="px-4 py-2 rounded-full bg-lime-400 text-black text-sm font-semibold hover:opacity-90 transition"
                  >
                    ✓ Mark as Done
                  </button>
                )}
                <button
                  onClick={() => handleRemove(w.id)}
                  className="px-3 py-2 rounded-full border border-neutral-700 text-neutral-400 text-sm hover:text-white transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}