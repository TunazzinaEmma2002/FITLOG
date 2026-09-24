"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "../context/PlanContext";
import logo from "../assets/logo.png"; 
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const links = [
    { name: "Workouts", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
       <Link href="/" className="font-display flex items-center gap-2 text-lg font-bold tracking-wide text-white">
  <Image src={logo} alt="FitLog" width={24} height={24} />
  FITLOG
</Link>

          <div className="flex items-center gap-3">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold px-3 py-1 rounded-full transition ${
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

          <div className="flex items-center gap-5">
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
        </div>
      </div>
    </nav>
  );
}