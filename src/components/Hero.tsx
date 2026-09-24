import Image from "next/image";
import heroImg from "../assets/banner.png";

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <section className="bg-[#161616] rounded-3xl border border-neutral-800 grid md:grid-cols-2 gap-10 items-center px-8 sm:px-12 py-12">
        <div>
          <p className="text-lime-400 text-sm font-semibold tracking-widest mb-3">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase leading-tight text-white">
            Train With Intent. Log Every Set.
          </h1>
          <p className="mt-4 text-neutral-400 max-w-md text-sm">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          <a href="#library" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-lime-400 text-black hover:opacity-90 transition text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6.5 6.5h11v11h-11z" />
              <path d="M6.5 6.5L2 2m20 20l-4.5-4.5" />
            </svg>
            BROWSE WORKOUTS
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-xs aspect-square rounded-2xl overflow-hidden flex items-center justify-center">
            <Image
              src={heroImg}
              alt="Workout illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}