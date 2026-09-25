import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-bold uppercase text-white">404</h1>
      <p className="text-neutral-500 text-sm mt-3">
        This page doesn't exist. Let's get you back to the library.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 px-6 py-2.5 rounded-full bg-lime-400 text-black font-semibold text-sm"
      >
        Go to workouts
      </Link>
    </div>
  );
}