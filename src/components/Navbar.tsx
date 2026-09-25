"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "../context/PlanContext";
import logo from "../assets/logo.png";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Workouts", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display flex items-center gap-2 text-lg font-bold tracking-wide text-white flex-shrink-0">
            <Image src={logo} alt="FitLog" width={24} height={24} />
            FITLOG
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-3">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-display text-sm font-semibold px-3 py-1 rounded-full transition ${
                    isActive
                      ? "bg-lime-400 text-black"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop badges */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/my-plan" className="flex items-center gap-2 text-sm text-neutral-300">
              Plan
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-lime-400 text-black text-xs font-bold">
                {plan.length}
              </span>
            </Link>
            <Link href="/my-plan" className="flex items-center gap-2 text-sm text-neutral-300">
              Saved
              <span className="w-5 h-5 flex items-center justify-center rounded-full border border-neutral-500 text-neutral-300 text-xs font-bold">
                {saved.length}
              </span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-9 h-9 text-white"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3 border-t border-neutral-800 pt-4">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-display text-sm font-semibold px-3 py-2 rounded-full transition text-center ${
                    isActive
                      ? "bg-lime-400 text-black"
                      : "text-neutral-400 border border-neutral-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="flex items-center justify-center gap-6 mt-2">
              <Link href="/my-plan" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm text-neutral-300">
                Plan
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-lime-400 text-black text-xs font-bold">
                  {plan.length}
                </span>
              </Link>
              <Link href="/my-plan" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm text-neutral-300">
                Saved
                <span className="w-5 h-5 flex items-center justify-center rounded-full border border-neutral-500 text-neutral-300 text-xs font-bold">
                  {saved.length}
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}