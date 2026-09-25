export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="w-10 h-10 border-4 border-neutral-700 border-t-lime-400 rounded-full animate-spin" />
      <p className="text-neutral-500 text-sm mt-4">Loading workouts…</p>
    </div>
  );
}