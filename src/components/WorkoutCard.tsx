import Link from "next/link";
import Image from "next/image";
import { Workout } from "../context/PlanContext";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="block bg-[#161616] rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition"
    >
      <div className="relative w-full aspect-video">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase bg-lime-400 text-black px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display font-bold uppercase text-white text-sm mb-1">
          {workout.name}
        </h3>
        <p className="text-neutral-500 text-xs mb-3">{workout.equipment}</p>
        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}