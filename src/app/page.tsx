import Hero from "../components/Hero";
import WorkoutCard from "../components/WorkoutCard";
import { getAllWorkouts } from "../lib/api";

const Page = async () => {
  const workouts = await getAllWorkouts();

  return (
    <div>
      <Hero />

      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-2xl font-bold uppercase text-white mb-1">
          The Library
        </h2>
        <p className="text-neutral-500 text-sm mb-8">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;