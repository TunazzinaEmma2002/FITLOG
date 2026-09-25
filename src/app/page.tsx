import Hero from "../components/Hero";
import LibrarySection from "../components/LibrarySection";
import { getAllWorkouts } from "../lib/api";

const Page = async () => {
  const workouts = await getAllWorkouts();

  return (
    <div>
      <Hero />
      <LibrarySection workouts={workouts} />
    </div>
  );
};

export default Page;