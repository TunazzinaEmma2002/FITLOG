"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Workout = {
  id: string;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
  done?: boolean;
};

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  markAsDone: (id: string) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const addToPlan = (workout: Workout) => {
    setPlan((prev) => (prev.find((w) => w.id === workout.id) ? prev : [...prev, workout]));
  };

  const addToSaved = (workout: Workout) => {
    setSaved((prev) => (prev.find((w) => w.id === workout.id) ? prev : [...prev, workout]));
  };

  const removeFromPlan = (id: string) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const removeFromSaved = (id: string) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  const markAsDone = (id: string) => {
    setPlan((prev) => prev.map((w) => (w.id === id ? { ...w, done: true } : w)));
  };

  return (
    <PlanContext.Provider value={{ plan, saved, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markAsDone }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within PlanProvider");
  return context;
}