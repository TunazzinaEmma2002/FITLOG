"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  const [loaded, setLoaded] = useState(false);

 useEffect(() => {
  try {
    const p = localStorage.getItem("fitlog-plan");
    const s = localStorage.getItem("fitlog-saved");
    if (p) {
      setPlan(JSON.parse(p) as Workout[]);
    }
    if (s) {
      setSaved(JSON.parse(s) as Workout[]);
    }
  } catch (e) {
    console.error(e);
  }
  setLoaded(true);
}, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, loaded]);

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