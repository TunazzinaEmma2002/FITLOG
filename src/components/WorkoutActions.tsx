"use client";

import { usePlan, Workout } from "../context/PlanContext";
import { toast } from "react-toastify";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { plan, addToPlan, addToSaved } = usePlan();

  const handleAddToPlan = () => {
    if (plan.length >= 5) {
      toast.error("Plan is full — max 5 lifts for today.");
      return;
    }
    addToPlan(workout);
    toast.success("Added to today's plan");
  };

  const handleSave = () => {
    addToSaved(workout);
    toast.success("Saved for later");
  };

  const isPlanFull = plan.length >= 5;

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={handleAddToPlan}
        disabled={isPlanFull}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-lime-400 text-black hover:opacity-90 transition text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        + Add to today's plan
      </button>
      <button
        onClick={handleSave}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border border-neutral-700 text-white hover:bg-neutral-800 transition text-sm"
      >
        ☆ Save for later
      </button>
    </div>
  );
}