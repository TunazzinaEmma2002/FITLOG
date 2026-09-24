export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-white font-bold tracking-wide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ccff00"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M6.5 10v4M17.5 10v4" />
            <path d="M2 12h2M20 12h2" />
            <rect x="6.5" y="8" width="2" height="8" rx="1" fill="#ccff00" stroke="none" />
            <rect x="15.5" y="8" width="2" height="8" rx="1" fill="#ccff00" stroke="none" />
            <path d="M8.5 12h7" />
          </svg>
          FITLOG
        </div>

        <p className="text-neutral-500 text-xs sm:text-sm text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}