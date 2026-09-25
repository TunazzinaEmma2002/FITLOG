import Image from "next/image";
import { getWorkoutById } from "../../../lib/api";
import WorkoutActions from "../../../components/WorkoutActions";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-neutral-900">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold uppercase text-white">
            {workout.name}
          </h1>
          <p className="text-neutral-400 text-sm mt-3 max-w-md">
            {workout.description}
          </p>

          <div className="flex gap-2 mt-4">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase bg-lime-400 text-black px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 bg-[#161616] border border-neutral-800 rounded-2xl divide-y divide-neutral-800 text-sm">
            {[
              ["Equipment", workout.equipment],
              ["Difficulty", workout.difficulty],
              ["Sets", workout.sets],
              ["Reps", workout.reps],
              ["Duration", `${workout.duration} min`],
              ["Calories", `${workout.caloriesBurned} kcal`],
              ["Rating", workout.rating],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between px-4 py-2.5">
                <span className="text-neutral-500 uppercase text-xs">{label}</span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="font-display text-sm font-bold uppercase text-white mb-3">
              Instructions
            </h2>
            <ol className="space-y-2 text-sm text-neutral-400 list-decimal list-inside">
              {workout.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          <WorkoutActions workout={workout} />
        </div>
      </div>
    </div>
  );
}